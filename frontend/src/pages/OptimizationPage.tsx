import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useOptimization } from '../hooks/useOptimization'
import { useOptimizationStore } from '../store/optimizationStore'
import { LoadingSpinner, ErrorMessage } from '../components/common'
import { IntegratedProblemDto } from '../types/optimization.types'

const optimizationSchema = z.object({
  transportProblem: z.object({
    origins: z.array(
      z.object({
        name: z.string().min(1, 'Nombre requerido'),
        supply: z.number().min(0, 'Suministro debe ser positivo'),
      })
    ),
    destinations: z.array(
      z.object({
        name: z.string().min(1, 'Nombre requerido'),
        demand: z.number().min(0, 'Demanda debe ser positiva'),
      })
    ),
    costs: z.array(z.array(z.number().min(0, 'Costo debe ser no negativo'))),
  }),
  routeCargoConfigs: z.array(
    z.object({
      origin: z.string().min(1, 'Origen requerido'),
      destination: z.string().min(1, 'Destino requerido'),
      capacity: z.number().min(1, 'Capacidad debe ser positiva'),
      availableItems: z.array(
        z.object({
          id: z.string().min(1, 'ID requerido'),
          name: z.string().min(1, 'Nombre requerido'),
          weight: z.number().min(0, 'Peso debe ser no negativo'),
          profit: z.number().min(0, 'Beneficio debe ser no negativo'),
        })
      ),
    })
  ),
})

type OptimizationForm = z.infer<typeof optimizationSchema>

export default function OptimizationPage() {
  const { solveComplete, loading, error } = useOptimization()
  const { solution } = useOptimizationStore()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OptimizationForm>({
    resolver: zodResolver(optimizationSchema),
    defaultValues: {
      transportProblem: {
        origins: [
          { name: 'Centro A', supply: 100 },
          { name: 'Centro B', supply: 150 },
        ],
        destinations: [
          { name: 'Ciudad X', demand: 120 },
          { name: 'Ciudad Y', demand: 130 },
        ],
        costs: [
          [10, 20],
          [15, 10],
        ],
      },
      routeCargoConfigs: [
        {
          origin: 'Centro A',
          destination: 'Ciudad X',
          capacity: 50,
          availableItems: [
            { id: '1', name: 'Electrónicos', weight: 10, profit: 100 },
            { id: '2', name: 'Textiles', weight: 20, profit: 150 },
          ],
        },
      ],
    },
  })

  const {
    fields: originFields,
    append: appendOrigin,
    remove: removeOrigin,
  } = useFieldArray({
    control,
    name: 'transportProblem.origins',
  })

  const {
    fields: destinationFields,
    append: appendDestination,
    remove: removeDestination,
  } = useFieldArray({
    control,
    name: 'transportProblem.destinations',
  })

  const {
    fields: routeFields,
    append: appendRoute,
    remove: removeRoute,
  } = useFieldArray({
    control,
    name: 'routeCargoConfigs',
  })

  const watchedOrigins = watch('transportProblem.origins')
  const watchedDestinations = watch('transportProblem.destinations')

  const onSubmit = async (data: OptimizationForm) => {
    await solveComplete(data as IntegratedProblemDto)
  }

  if (loading) return <LoadingSpinner message="Resolviendo optimización integrada..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Optimización Integrada
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Resuelve el problema dual combinando transporte y optimización de carga para maximizar el beneficio neto.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Transport Problem */}
          <Grid item xs={12}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Problema de Transporte</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Centros de Origen
                    </Typography>
                    {originFields.map((field, index) => (
                      <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          {...control.register(`transportProblem.origins.${index}.name`)}
                          error={!!errors.transportProblem?.origins?.[index]?.name}
                          helperText={errors.transportProblem?.origins?.[index]?.name?.message}
                        />
                        <TextField
                          type="number"
                          label="Suministro"
                          {...control.register(`transportProblem.origins.${index}.supply`, {
                            valueAsNumber: true,
                          })}
                          error={!!errors.transportProblem?.origins?.[index]?.supply}
                          helperText={errors.transportProblem?.origins?.[index]?.supply?.message}
                        />
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => removeOrigin(index)}
                          disabled={originFields.length <= 1}
                        >
                          ×
                        </Button>
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      onClick={() => appendOrigin({ name: '', supply: 0 })}
                      sx={{ mt: 1 }}
                    >
                      Agregar Origen
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Destinos
                    </Typography>
                    {destinationFields.map((field, index) => (
                      <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          {...control.register(`transportProblem.destinations.${index}.name`)}
                          error={!!errors.transportProblem?.destinations?.[index]?.name}
                          helperText={errors.transportProblem?.destinations?.[index]?.name?.message}
                        />
                        <TextField
                          type="number"
                          label="Demanda"
                          {...control.register(`transportProblem.destinations.${index}.demand`, {
                            valueAsNumber: true,
                          })}
                          error={!!errors.transportProblem?.destinations?.[index]?.demand}
                          helperText={errors.transportProblem?.destinations?.[index]?.demand?.message}
                        />
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => removeDestination(index)}
                          disabled={destinationFields.length <= 1}
                        >
                          ×
                        </Button>
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      onClick={() => appendDestination({ name: '', demand: 0 })}
                      sx={{ mt: 1 }}
                    >
                      Agregar Destino
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Route Cargo Configurations */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Configuraciones de Carga por Ruta
            </Typography>
            {routeFields.map((field, index) => (
              <Accordion key={field.id} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    Ruta {index + 1}: {watch(`routeCargoConfigs.${index}.origin`)} →{' '}
                    {watch(`routeCargoConfigs.${index}.destination`)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Origen"
                        {...control.register(`routeCargoConfigs.${index}.origin`)}
                        error={!!errors.routeCargoConfigs?.[index]?.origin}
                        helperText={errors.routeCargoConfigs?.[index]?.origin?.message}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Destino"
                        {...control.register(`routeCargoConfigs.${index}.destination`)}
                        error={!!errors.routeCargoConfigs?.[index]?.destination}
                        helperText={errors.routeCargoConfigs?.[index]?.destination?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Capacidad del Vehículo"
                        {...control.register(`routeCargoConfigs.${index}.capacity`, {
                          valueAsNumber: true,
                        })}
                        error={!!errors.routeCargoConfigs?.[index]?.capacity}
                        helperText={errors.routeCargoConfigs?.[index]?.capacity?.message}
                        inputProps={{ min: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        Artículos Disponibles
                      </Typography>
                      {/* Items would be added here - simplified for brevity */}
                      <Button variant="outlined" size="small">
                        Agregar Artículo
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
            <Button
              variant="outlined"
              onClick={() =>
                appendRoute({
                  origin: '',
                  destination: '',
                  capacity: 50,
                  availableItems: [],
                })
              }
              sx={{ mt: 1 }}
            >
              Agregar Ruta
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mr: 2 }}
            >
              {loading ? 'Resolviendo...' : 'Resolver Problema Completo'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Solution Display */}
      {solution && (
        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Resultado de Optimización Integrada
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Alert severity="info">
                Costo de Transporte: ${solution.totalTransportCost}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Alert severity="success">
                Beneficio de Carga: ${solution.totalCargoProfit}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Alert severity={solution.totalNetProfit >= 0 ? 'success' : 'warning'}>
                Beneficio Neto: ${solution.totalNetProfit}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Alert severity="secondary">
                Rutas Activas: {solution.activeRoutes}
              </Alert>
            </Grid>
          </Grid>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {solution.summary}
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Detalles de Solución de Transporte</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Transport solution details would go here */}
              <Typography>Detalles de asignaciones de transporte...</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Optimizaciones de Carga por Ruta</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Route optimizations would go here */}
              <Typography>Detalles de optimización de carga por ruta...</Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      )}
    </Box>
  )
}