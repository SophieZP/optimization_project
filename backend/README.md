# Backend - Sistema de Optimización Ferroviaria

Backend desarrollado en NestJS para resolver problemas de transporte (Método de Vogel) y optimización de carga (Problema de la Mochila 0/1).

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas (N-tier):

```
src/
├── modules/
│   ├── transport/          # Módulo de Transporte (Método de Vogel)
│   │   ├── controllers/    # Capa de presentación
│   │   ├── services/       # Capa de lógica de negocio
│   │   ├── repositories/   # Capa de acceso a datos
│   │   ├── entities/       # Modelos de dominio
│   │   └── dto/           # Data Transfer Objects
│   ├── cargo/             # Módulo de Carga (Mochila 0/1)
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── entities/
│   │   └── dto/
│   └── optimization/      # Módulo de Optimización Integrada
│       ├── controllers/
│       ├── services/
│       └── dto/
└── common/               # Recursos compartidos
    ├── filters/         # Filtros de excepciones
    ├── interceptors/    # Interceptores
    ├── decorators/      # Decoradores personalizados
    └── interfaces/      # Interfaces compartidas
```

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

Copia el archivo `.env.example` a `.env` y ajusta las variables según tu entorno:

```bash
cp .env.example .env
```

## 📦 Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📚 Documentación API

La documentación de la API está disponible en Swagger:

```
http://localhost:3000/api/docs
```

## 🛠️ Tecnologías

- **NestJS** - Framework backend
- **TypeScript** - Lenguaje de programación
- **Class Validator** - Validación de DTOs
- **Swagger** - Documentación de API
- **ConfigModule** - Gestión de variables de entorno

## 📋 Fases de Desarrollo

- [x] **Fase 1**: Configuración e Infraestructura Base
- [x] **Fase 2**: Módulo de Transporte (Transport Module)
- [x] **Fase 3**: Módulo de Carga/Mochila (Cargo Module)
- [x] **Fase 4**: Módulo Integrado (Optimization Module)
- [x] **Fase 5**: Validación y Documentación

## 🎯 Características Principales

### Módulo de Transporte
- ✅ Método de Aproximación de Vogel (VAM)
- ✅ Balanceo automático de problemas
- ✅ Cálculo de penalizaciones y solución óptima
- ✅ Validación de matrices de costos

### Módulo de Carga
- ✅ Algoritmo de Programación Dinámica
- ✅ Problema de la Mochila 0/1
- ✅ Optimización con límite de items
- ✅ Análisis de eficiencia (beneficio/peso)

### Módulo de Optimización Integrada
- ✅ Resolución del problema dual
- ✅ Orquestación de Transport + Cargo
- ✅ Cálculo de beneficio neto total
- ✅ Análisis de eficiencia por ruta

## 📖 Documentación

- **API Documentation**: Ver `API_DOCUMENTATION.md`
- **Swagger UI**: http://localhost:3000/api/docs
- **Datasets de ejemplo**: Ver `src/common/datasets/`

## 🧪 Ejemplos de Uso

Ver los archivos en `src/common/datasets/` para ejemplos completos de:
- Problemas de transporte (pequeños, grandes, balanceados, desbalanceados)
- Problemas de carga (diferentes capacidades y mercancías)
- Problemas integrados (optimización dual completa)
