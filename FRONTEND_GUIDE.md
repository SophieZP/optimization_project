# Guía de Desarrollo del Frontend - Sistema de Optimización Ferroviaria

## 📋 Especificaciones Generales

### Stack Tecnológico
- **Framework**: React 18+ con TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand o React Context API
- **HTTP Client**: Axios
- **UI Framework**: Material-UI (MUI) v5 o Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod para validación
- **Charts**: Recharts o Chart.js para visualizaciones
- **Notifications**: React-Hot-Toast o Sonner

### Estructura del Proyecto

```
frontend/
├── public/
├── src/
│   ├── api/                    # Cliente HTTP y servicios de API
│   │   ├── client.ts          # Configuración de Axios
│   │   ├── transport.api.ts   # Servicios del módulo Transport
│   │   ├── cargo.api.ts       # Servicios del módulo Cargo
│   │   └── optimization.api.ts # Servicios del módulo Optimization
│   ├── components/            # Componentes reutilizables
│   │   ├── common/           # Componentes genéricos (Button, Input, Card, etc.)
│   │   ├── forms/            # Formularios específicos
│   │   ├── visualizations/   # Componentes de gráficos y visualizaciones
│   │   └── layout/           # Layout components (Header, Sidebar, etc.)
│   ├── pages/                # Páginas de la aplicación
│   │   ├── HomePage.tsx
│   │   ├── TransportPage.tsx
│   │   ├── CargoPage.tsx
│   │   ├── OptimizationPage.tsx
│   │   └── ResultsPage.tsx
│   ├── hooks/                # Custom hooks
│   │   ├── useTransport.ts
│   │   ├── useCargo.ts
│   │   └── useOptimization.ts
│   ├── store/                # Estado global (Zustand stores)
│   │   ├── transportStore.ts
│   │   ├── cargoStore.ts
│   │   └── optimizationStore.ts
│   ├── types/                # Definiciones de tipos TypeScript
│   │   ├── transport.types.ts
│   │   ├── cargo.types.ts
│   │   └── optimization.types.ts
│   ├── utils/                # Utilidades y helpers
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Reglas de Desarrollo

### 1. Arquitectura y Organización

#### Regla 1.1: Separación de Responsabilidades
- **Componentes** solo manejan UI y eventos de usuario
- **Hooks personalizados** manejan lógica de negocio y llamadas a API
- **Stores** manejan estado global compartido entre páginas
- **API services** solo realizan llamadas HTTP, sin lógica de negocio

**Ejemplo correcto:**
```typescript
// hooks/useTransport.ts
export const useTransport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const solve = async (problem: TransportProblemDto) => {
    setLoading(true);
    try {
      const result = await transportApi.solve(problem);
      return result;
    } catch (err) {
      setError('Error al resolver el problema');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return { solve, loading, error };
};

// components/TransportForm.tsx
const TransportForm = () => {
  const { solve, loading } = useTransport();
  // UI y manejo de formulario
};
```

#### Regla 1.2: Componentes por Funcionalidad
- Crear un componente por cada funcionalidad principal del backend
- Agrupar componentes relacionados en carpetas

**Estructura requerida:**
```
components/
├── transport/
│   ├── TransportForm.tsx          # Formulario de entrada
│   ├── TransportMatrix.tsx        # Visualización de matriz de costos
│   ├── TransportSolution.tsx      # Resultados de la solución
│   └── AllocationTable.tsx        # Tabla de asignaciones
├── cargo/
│   ├── CargoForm.tsx
│   ├── CargoItemList.tsx
│   ├── CargoSolution.tsx
│   └── EfficiencyChart.tsx
└── optimization/
    ├── IntegratedForm.tsx
    ├── RouteOptimizationCard.tsx
    ├── ProfitChart.tsx
    └── RoutesMap.tsx
```

---

### 2. Tipos TypeScript

#### Regla 2.1: Tipos Exactos del Backend
- Los tipos deben coincidir exactamente con los DTOs del backend
- Importar y reutilizar tipos, no duplicar definiciones

**Archivo: types/transport.types.ts**
```typescript
// Coincide con backend/src/modules/transport/dto/origin.dto.ts
export interface OriginDto {
  name: string;
  supply: number;
}

// Coincide con backend/src/modules/transport/dto/destination.dto.ts
export interface DestinationDto {
  name: string;
  demand: number;
}

// Coincide con backend/src/modules/transport/dto/transport-problem.dto.ts
export interface TransportProblemDto {
  origins: OriginDto[];
  destinations: DestinationDto[];
  costs: number[][];
}

// Coincide con backend/src/modules/transport/dto/transport-solution.dto.ts
export interface AllocationDetail {
  origin: string;
  destination: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface TransportSolutionDto {
  allocations: number[][];
  totalCost: number;
  allocationDetails: AllocationDetail[];
  method: string;
  isBalanced: boolean;
}
```

**Archivo: types/cargo.types.ts**
```typescript
export interface CargoItemDto {
  id: string;
  name: string;
  weight: number;
  profit: number;
  description?: string;
}

export interface KnapsackProblemDto {
  capacity: number;
  items: CargoItemDto[];
}

export interface SelectedItemDetail {
  id: string;
  name: string;
  weight: number;
  profit: number;
}

export interface KnapsackSolutionDto {
  selectedItemIds: string[];
  selectedItems: SelectedItemDetail[];
  totalProfit: number;
  totalWeight: number;
  remainingCapacity: number;
  utilizationPercentage: number;
  method: string;
}
```

**Archivo: types/optimization.types.ts**
```typescript
import { TransportProblemDto, TransportSolutionDto } from './transport.types';
import { CargoItemDto, KnapsackSolutionDto } from './cargo.types';

export interface RouteCargoDto {
  origin: string;
  destination: string;
  capacity: number;
  availableItems: CargoItemDto[];
}

export interface IntegratedProblemDto {
  transportProblem: TransportProblemDto;
  routeCargoConfigs: RouteCargoDto[];
}

export interface RouteOptimization {
  origin: string;
  destination: string;
  quantity: number;
  transportCost: number;
  cargoOptimization?: KnapsackSolutionDto;
  netProfit: number;
}

export interface IntegratedSolutionDto {
  transportSolution: TransportSolutionDto;
  routeOptimizations: RouteOptimization[];
  totalTransportCost: number;
  totalCargoProfit: number;
  totalNetProfit: number;
  activeRoutes: number;
  summary: string;
}
```

---

### 3. Servicios API

#### Regla 3.1: Un Servicio por Módulo del Backend
- Crear un archivo de servicio por cada módulo del backend
- Todas las llamadas HTTP deben usar estos servicios

**Archivo: api/client.ts**
```typescript
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores global
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Error en la petición';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);
```

**Archivo: api/transport.api.ts**
```typescript
import { apiClient } from './client';
import { TransportProblemDto, TransportSolutionDto } from '../types/transport.types';

export const transportApi = {
  solve: async (problem: TransportProblemDto): Promise<TransportSolutionDto> => {
    const response = await apiClient.post<TransportSolutionDto>('/transport/solve', problem);
    return response.data;
  },

  validate: async (problem: TransportProblemDto) => {
    const response = await apiClient.post('/transport/validate', problem);
    return response.data;
  },
};
```

**Archivo: api/cargo.api.ts**
```typescript
import { apiClient } from './client';
import { KnapsackProblemDto, KnapsackSolutionDto } from '../types/cargo.types';

export const cargoApi = {
  solve: async (problem: KnapsackProblemDto): Promise<KnapsackSolutionDto> => {
    const response = await apiClient.post<KnapsackSolutionDto>('/cargo/solve', problem);
    return response.data;
  },

  solveWithLimit: async (problem: KnapsackProblemDto, maxItems: number): Promise<KnapsackSolutionDto> => {
    const response = await apiClient.post<KnapsackSolutionDto>(
      `/cargo/solve-with-limit?maxItems=${maxItems}`,
      problem
    );
    return response.data;
  },

  optimizeMultiple: async (problems: KnapsackProblemDto[]): Promise<KnapsackSolutionDto[]> => {
    const response = await apiClient.post<KnapsackSolutionDto[]>('/cargo/optimize', problems);
    return response.data;
  },

  calculateEfficiency: async (problem: KnapsackProblemDto) => {
    const response = await apiClient.post('/cargo/efficiency', problem);
    return response.data;
  },
};
```

**Archivo: api/optimization.api.ts**
```typescript
import { apiClient } from './client';
import { IntegratedProblemDto, IntegratedSolutionDto } from '../types/optimization.types';

export const optimizationApi = {
  solveComplete: async (problem: IntegratedProblemDto): Promise<IntegratedSolutionDto> => {
    const response = await apiClient.post<IntegratedSolutionDto>('/optimization/solve-complete', problem);
    return response.data;
  },

  getSummary: async (problem: IntegratedProblemDto) => {
    const response = await apiClient.post('/optimization/summary', problem);
    return response.data;
  },

  analyzeEfficiency: async (problem: IntegratedProblemDto) => {
    const response = await apiClient.post('/optimization/analyze-efficiency', problem);
    return response.data;
  },
};
```

---

### 4. Componentes de Formulario

#### Regla 4.1: React Hook Form + Zod para Validación
- Todos los formularios deben usar React Hook Form
- Validaciones con esquemas Zod que repliquen las del backend

**Ejemplo: TransportForm.tsx**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const originSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  supply: z.number().min(0, 'La oferta debe ser mayor o igual a 0'),
});

const destinationSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  demand: z.number().min(0, 'La demanda debe ser mayor o igual a 0'),
});

const transportProblemSchema = z.object({
  origins: z.array(originSchema).min(1, 'Debe haber al menos un origen'),
  destinations: z.array(destinationSchema).min(1, 'Debe haber al menos un destino'),
  costs: z.array(z.array(z.number().min(0))),
});

export const TransportForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(transportProblemSchema),
  });

  const onSubmit = async (data: TransportProblemDto) => {
    // Lógica de envío
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
    </form>
  );
};
```

#### Regla 4.2: Formularios Dinámicos
- Los formularios de orígenes, destinos e items deben permitir agregar/eliminar filas dinámicamente
- Usar `useFieldArray` de React Hook Form

**Ejemplo:**
```typescript
import { useFieldArray } from 'react-hook-form';

export const TransportForm = () => {
  const { control, register } = useForm();
  const { fields: origins, append, remove } = useFieldArray({
    control,
    name: 'origins',
  });

  return (
    <div>
      {origins.map((field, index) => (
        <div key={field.id}>
          <input {...register(`origins.${index}.name`)} placeholder="Nombre" />
          <input {...register(`origins.${index}.supply`, { valueAsNumber: true })} placeholder="Oferta" />
          <button type="button" onClick={() => remove(index)}>Eliminar</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', supply: 0 })}>
        Agregar Origen
      </button>
    </div>
  );
};
```

---

### 5. Visualizaciones

#### Regla 5.1: Componentes de Visualización Requeridos

**Para Módulo de Transporte:**
1. **Matriz de Costos Editable**: Tabla interactiva para ingresar costos
2. **Tabla de Asignaciones**: Mostrar `allocationDetails` con formato
3. **Gráfico de Red**: Visualizar orígenes, destinos y flujos (opcional pero recomendado)

**Para Módulo de Carga:**
1. **Lista de Items**: Tabla con items, pesos, beneficios y checkboxes de selección
2. **Gráfico de Barras**: Comparar peso vs beneficio de items
3. **Medidor de Capacidad**: Barra de progreso mostrando capacidad utilizada
4. **Gráfico de Eficiencia**: Mostrar beneficio/peso de cada item

**Para Módulo de Optimización:**
1. **Dashboard Integrado**: Resumen con métricas clave (costo total, beneficio, margen)
2. **Tabla de Rutas**: Mostrar todas las rutas con sus optimizaciones
3. **Gráfico de Beneficio Neto**: Por ruta
4. **Gráfico de Pastel**: Distribución de costos vs beneficios

#### Regla 5.2: Uso de Librerías de Gráficos
```typescript
// Ejemplo con Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const EfficiencyChart = ({ items }: { items: CargoItemDto[] }) => {
  const data = items.map(item => ({
    name: item.name,
    eficiencia: item.profit / item.weight,
  }));

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="eficiencia" fill="#8884d8" />
    </BarChart>
  );
};
```

---

### 6. Navegación y Rutas

#### Regla 6.1: Estructura de Rutas Requerida
```typescript
// router.tsx
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'transport', element: <TransportPage /> },
      { path: 'cargo', element: <CargoPage /> },
      { path: 'optimization', element: <OptimizationPage /> },
      { path: 'results/:id', element: <ResultsPage /> },
    ],
  },
]);
```

#### Regla 6.2: Navegación Principal
- Header/Sidebar debe tener enlaces a:
  - Inicio
  - Problema de Transporte
  - Problema de Carga
  - Optimización Integrada
  - Documentación (link a Swagger)

---

### 7. Estado Global

#### Regla 7.1: Store para Resultados
```typescript
// store/optimizationStore.ts
import { create } from 'zustand';
import { IntegratedSolutionDto } from '../types/optimization.types';

interface OptimizationStore {
  solution: IntegratedSolutionDto | null;
  setSolution: (solution: IntegratedSolutionDto) => void;
  clearSolution: () => void;
}

export const useOptimizationStore = create<OptimizationStore>((set) => ({
  solution: null,
  setSolution: (solution) => set({ solution }),
  clearSolution: () => set({ solution: null }),
}));
```

---

### 8. Manejo de Errores y Loading

#### Regla 8.1: Estados de UI Consistentes
- Todos los componentes que hacen llamadas a API deben mostrar:
  - Estado de carga (spinner/skeleton)
  - Estado de error (mensaje claro)
  - Estado vacío (cuando no hay datos)
  - Estado de éxito (datos renderizados)

**Ejemplo:**
```typescript
export const TransportPage = () => {
  const { solve, loading, error } = useTransport();
  const [solution, setSolution] = useState<TransportSolutionDto | null>(null);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!solution) return <TransportForm onSubmit={async (data) => {
    const result = await solve(data);
    setSolution(result);
  }} />;

  return <TransportSolution solution={solution} />;
};
```

---

### 9. Diseño UI/UX

#### Regla 9.1: Layout Requerido
```
┌─────────────────────────────────────────┐
│           Header / Navbar               │
├──────────┬──────────────────────────────┤
│          │                              │
│ Sidebar  │      Main Content            │
│          │                              │
│ - Inicio │   ┌─────────────────────┐    │
│ - Trans. │   │   Page Content      │    │
│ - Cargo  │   │                     │    │
│ - Optim. │   └─────────────────────┘    │
│          │                              │
└──────────┴──────────────────────────────┘
```

#### Regla 9.2: Diseño Responsive
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Sidebar colapsable en mobile

#### Regla 9.3: Tema de Colores
```typescript
const theme = {
  primary: '#1976d2',      // Azul - acciones principales
  secondary: '#dc004e',    // Rosa - acciones secundarias
  success: '#4caf50',      // Verde - resultados positivos
  warning: '#ff9800',      // Naranja - advertencias
  error: '#f44336',        // Rojo - errores
  info: '#2196f3',         // Azul claro - información
};
```

---

### 10. Optimización y Performance

#### Regla 10.1: Memoización
- Usar `React.memo` para componentes que reciben props complejas
- Usar `useMemo` para cálculos costosos
- Usar `useCallback` para funciones pasadas como props

#### Regla 10.2: Code Splitting
```typescript
// Lazy loading de páginas
const TransportPage = lazy(() => import('./pages/TransportPage'));
const CargoPage = lazy(() => import('./pages/CargoPage'));
const OptimizationPage = lazy(() => import('./pages/OptimizationPage'));
```

---

### 11. Testing (Opcional pero Recomendado)

#### Regla 11.1: Tests de Componentes Principales
```typescript
// __tests__/TransportForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TransportForm } from '../components/transport/TransportForm';

test('debe agregar un origen al hacer click en agregar', () => {
  render(<TransportForm />);
  const addButton = screen.getByText('Agregar Origen');
  fireEvent.click(addButton);
  expect(screen.getAllByPlaceholderText('Nombre')).toHaveLength(2);
});
```

---

## 📦 Dependencias Requeridas

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "@mui/material": "^5.14.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "recharts": "^2.10.0",
    "react-hot-toast": "^2.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

---

## 🚀 Variables de Entorno

**Archivo: .env**
```
VITE_API_URL=http://localhost:3000/api
```

**Archivo: .env.production**
```
VITE_API_URL=https://api.production.com/api
```

---

## ✅ Checklist de Implementación

### Fase 1: Setup Inicial
- [ ] Crear proyecto con Vite + React + TypeScript
- [ ] Configurar estructura de carpetas
- [ ] Instalar dependencias base
- [ ] Configurar ESLint y Prettier
- [ ] Configurar cliente HTTP (Axios)

### Fase 2: Tipos y API
- [ ] Crear todos los tipos TypeScript
- [ ] Implementar servicios API (transport, cargo, optimization)
- [ ] Probar endpoints con datos de ejemplo

### Fase 3: Componentes Base
- [ ] Crear Layout (Header, Sidebar)
- [ ] Crear componentes comunes (Button, Input, Card)
- [ ] Configurar Router
- [ ] Crear páginas vacías

### Fase 4: Módulo de Transporte
- [ ] TransportForm con orígenes y destinos dinámicos
- [ ] Matriz de costos editable
- [ ] TransportSolution para mostrar resultados
- [ ] Tabla de asignaciones
- [ ] Integrar con API

### Fase 5: Módulo de Carga
- [ ] CargoForm con items dinámicos
- [ ] Visualización de capacidad
- [ ] CargoSolution para resultados
- [ ] Gráficos de eficiencia
- [ ] Integrar con API

### Fase 6: Módulo de Optimización
- [ ] IntegratedForm combinando transport + cargo
- [ ] Dashboard de resultados
- [ ] Visualizaciones de rutas
- [ ] Gráficos de beneficio neto
- [ ] Integrar con API

### Fase 7: Polish y UX
- [ ] Manejo de errores global
- [ ] Loading states
- [ ] Validaciones de formularios
- [ ] Responsive design
- [ ] Animaciones y transiciones

---

## 📝 Notas Finales

### Prioridades de Desarrollo
1. **Crítico**: Formularios funcionales y llamadas a API
2. **Alto**: Visualización básica de resultados
3. **Medio**: Gráficos y visualizaciones avanzadas
4. **Bajo**: Animaciones y mejoras estéticas

### Validaciones Frontend vs Backend
- El frontend debe replicar las validaciones del backend para UX
- Las validaciones del backend son la fuente de verdad
- Mostrar mensajes de error claros y específicos

### Responsive Design
- Priorizar vista desktop (uso profesional/empresarial)
- Mobile como segunda prioridad
- Tablas deben ser scrollables en mobile

### Documentación
- Comentar funciones complejas
- Documentar props de componentes con JSDoc
- Mantener README actualizado con instrucciones de desarrollo
