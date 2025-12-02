# Documentación de API - Sistema de Optimización Ferroviaria

## Descripción General

Este sistema resuelve problemas duales de optimización en redes ferroviarias:
1. **Problema de Transporte**: Optimiza la distribución de productos desde centros hacia destinos
2. **Problema de Carga**: Optimiza qué mercancías transportar en cada viaje

## Módulos de la API

### 1. Transport Module (`/api/transport`)

Resuelve problemas de transporte usando el **Método de Aproximación de Vogel (VAM)**.

#### Endpoints:

##### `POST /api/transport/solve`
Resuelve un problema de transporte completo.

**Request Body:**
```json
{
  "origins": [
    { "name": "Centro A", "supply": 100 },
    { "name": "Centro B", "supply": 150 }
  ],
  "destinations": [
    { "name": "Ciudad X", "demand": 120 },
    { "name": "Ciudad Y", "demand": 130 }
  ],
  "costs": [
    [10, 20],
    [15, 10]
  ]
}
```

**Response:**
```json
{
  "allocations": [[70, 30], [50, 100]],
  "totalCost": 2450,
  "allocationDetails": [...],
  "method": "Método de Aproximación de Vogel (VAM)",
  "isBalanced": true
}
```

##### `POST /api/transport/validate`
Valida un problema sin resolverlo.

---

### 2. Cargo Module (`/api/cargo`)

Resuelve el problema de la mochila 0/1 usando **Programación Dinámica**.

#### Endpoints:

##### `POST /api/cargo/solve`
Resuelve el problema básico de optimización de carga.

**Request Body:**
```json
{
  "capacity": 50,
  "items": [
    { "id": "1", "name": "Electrónicos", "weight": 10, "profit": 100 },
    { "id": "2", "name": "Textiles", "weight": 20, "profit": 150 },
    { "id": "3", "name": "Alimentos", "weight": 15, "profit": 90 }
  ]
}
```

**Response:**
```json
{
  "selectedItemIds": ["2", "3"],
  "selectedItems": [...],
  "totalProfit": 240,
  "totalWeight": 35,
  "remainingCapacity": 15,
  "utilizationPercentage": 70,
  "method": "Programación Dinámica - Mochila 0/1"
}
```

##### `POST /api/cargo/solve-with-limit?maxItems=3`
Resuelve con límite de items a seleccionar.

##### `POST /api/cargo/optimize`
Optimiza múltiples escenarios en paralelo.

##### `POST /api/cargo/efficiency`
Calcula eficiencia (beneficio/peso) de cada item.

---

### 3. Optimization Module (`/api/optimization`)

Resuelve el **problema dual integrado** combinando transporte y carga.

#### Endpoints:

##### `POST /api/optimization/solve-complete`
Resuelve el problema dual completo.

**Request Body:**
```json
{
  "transportProblem": {
    "origins": [...],
    "destinations": [...],
    "costs": [...]
  },
  "routeCargoConfigs": [
    {
      "origin": "Centro A",
      "destination": "Ciudad X",
      "capacity": 50,
      "availableItems": [...]
    }
  ]
}
```

**Response:**
```json
{
  "transportSolution": {...},
  "routeOptimizations": [...],
  "totalTransportCost": 2500,
  "totalCargoProfit": 5000,
  "totalNetProfit": 2500,
  "activeRoutes": 4,
  "summary": "..."
}
```

##### `POST /api/optimization/summary`
Obtiene resumen sin resolver el problema.

##### `POST /api/optimization/analyze-efficiency`
Analiza eficiencia de cada ruta (beneficio/costo).

---

## Validaciones

### Transport
- Orígenes y destinos deben tener valores positivos
- Matriz de costos debe ser rectangular
- Todos los costos deben ser no negativos

### Cargo
- Capacidad debe ser positiva
- Items deben tener IDs únicos
- Pesos y beneficios deben ser no negativos

### Optimization
- Las rutas de carga deben corresponder a orígenes/destinos válidos
- Debe haber al menos una configuración de carga

---

## Códigos de Estado

- `200 OK`: Operación exitosa
- `400 Bad Request`: Datos inválidos
- `500 Internal Server Error`: Error del servidor

---

## Ejemplos de Uso

Ver datasets en `/src/common/datasets/` para ejemplos completos de problemas reales.

---

## Documentación Interactiva

Visita `http://localhost:3000/api/docs` para explorar la API con Swagger UI.
