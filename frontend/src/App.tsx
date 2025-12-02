import { Routes, Route } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import TransportPage from './pages/TransportPage'
import CargoPage from './pages/CargoPage'
import OptimizationPage from './pages/OptimizationPage'

function App() {
  const location = useLocation()

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Optimización Ferroviaria
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            variant={location.pathname === '/' ? 'outlined' : 'text'}
          >
            Transporte
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/cargo"
            variant={location.pathname === '/cargo' ? 'outlined' : 'text'}
          >
            Carga
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/optimization"
            variant={location.pathname === '/optimization' ? 'outlined' : 'text'}
          >
            Optimización Integrada
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<TransportPage />} />
          <Route path="/cargo" element={<CargoPage />} />
          <Route path="/optimization" element={<OptimizationPage />} />
        </Routes>
      </Container>
    </>
  )
}

export default App