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
  Chip,
} from '@mui/material'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCargo } from '../hooks/useCargo'
import { useCargoStore } from '../store/cargoStore'
import { LoadingSpinner, ErrorMessage } from '../components/common'
import { KnapsackProblemDto } from '../types/cargo.types'

const cargoSchema = z.object({
  capacity: z.number().min(1, 'Capacidad debe ser positiva'),
  items: z.array(
    z.object({
      id: z.string().min(1, 'ID requerido'),
      name: z.string().min(1, 'Nombre requerido'),
      weight: z.number().min(0, 'Peso debe ser no negativo'),
      profit: z.number().min(0, 'Beneficio debe ser no negativo'),
    })
  ),
})

type CargoForm = z.infer<typeof cargoSchema>

export default function CargoPage() {
  const { solve, loading, error } = useCargo()
  const { solution } = useCargoStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CargoForm>({
    resolver: zodResolver(cargoSchema),
    defaultValues: {
      capacity: 50,
      items: [
        { id: '1', name: 'Electrónicos', weight: 10, profit: 100 },
        { id: '2', name: 'Textiles', weight: 20, profit: 150 },
        { id: '3', name: 'Alimentos', weight: 15, profit: 90 },
      ],
    },
  })

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: 'items',
  })

  const onSubmit = async (data: CargoForm) => {
    await solve(data as KnapsackProblemDto)
  }

  if (loading) return <LoadingSpinner message="Resolviendo problema de carga..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Problema de Carga (Mochila 0/1)
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Optimiza qué mercancías transportar en cada viaje usando Programación Dinámica.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Capacity */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Capacidad del Vehículo"
                {...control.register('capacity', { valueAsNumber: true })}
                error={!!errors.capacity}
                helperText={errors.capacity?.message}
                inputProps={{ min: 1 }}
              />
            </Paper>
          </Grid>

          {/* Items */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Artículos Disponibles
              </Typography>
              {itemFields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                  <TextField
                    label="ID"
                    {...control.register(`items.${index}.id`)}
                    error={!!errors.items?.[index]?.id}
                    helperText={errors.items?.[index]?.id?.message}
                    sx={{ width: 80 }}
                  />
                  <TextField
                    fullWidth
                    label="Nombre"
                    {...control.register(`items.${index}.name`)}
                    error={!!errors.items?.[index]?.name}
                    helperText={errors.items?.[index]?.name?.message}
                  />
                  <TextField
                    type="number"
                    label="Peso"
                    {...control.register(`items.${index}.weight`, {
                      valueAsNumber: true,
                    })}
                    error={!!errors.items?.[index]?.weight}
                    helperText={errors.items?.[index]?.weight?.message}
                    inputProps={{ min: 0 }}
                    sx={{ width: 100 }}
                  />
                  <TextField
                    type="number"
                    label="Beneficio"
                    {...control.register(`items.${index}.profit`, {
                      valueAsNumber: true,
                    })}
                    error={!!errors.items?.[index]?.profit}
                    helperText={errors.items?.[index]?.profit?.message}
                    inputProps={{ min: 0 }}
                    sx={{ width: 100 }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeItem(index)}
                    disabled={itemFields.length <= 1}
                  >
                    ×
                  </Button>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() => appendItem({ id: '', name: '', weight: 0, profit: 0 })}
                sx={{ mt: 1 }}
              >
                Agregar Artículo
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mr: 2 }}
            >
              {loading ? 'Resolviendo...' : 'Resolver Problema'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Solution Display */}
      {solution && (
        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Solución
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Alert severity="success">
                Beneficio Total: ${solution.totalProfit}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Alert severity="info">
                Peso Total: {solution.totalWeight} kg
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Alert severity="warning">
                Capacidad Restante: {solution.remainingCapacity} kg
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Alert severity="secondary">
                Utilización: {solution.utilizationPercentage}%
              </Alert>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Artículos Seleccionados
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Peso</TableCell>
                  <TableCell>Beneficio</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {solution.selectedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>${item.profit}</TableCell>
                    <TableCell>
                      <Chip label="Seleccionado" color="success" size="small" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Método utilizado: {solution.method}
          </Typography>
        </Paper>
      )}
    </Box>
  )
}