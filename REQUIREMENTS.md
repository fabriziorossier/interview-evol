# Prueba Técnica Fullstack - Desarrollador Intermedio

## Objetivo
Desarrollar una aplicación web fullstack de gestión de tareas (Todo List) implementando buenas prácticas de desarrollo y arquitectura modular.

## Tiempo Estimado
2-3 días

## Stack Tecnológico

### Frontend
- React + Vite + TypeScript
- Redux Toolkit para gestión de estado
- React Router para navegación
- Tailwind CSS para estilos
- React Testing Library para tests básicos
- Formik + Yup para formularios

### Backend
- NestJS + TypeScript
- PostgreSQL con Sequelize ORM
- Jest para testing básico
- Class Validator para DTOs

### DevOps
- Docker + Docker Compose para desarrollo local
- Variables de entorno básicas

## Funcionalidades Requeridas

### 1. Gestión de Tareas
- CRUD completo de tareas
- Filtros por estado y fecha
- Ordenamiento básico
- Sistema de etiquetas simple

### 2. Modelo de Tarea
```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. API Endpoints
```
GET    /api/tasks              - Obtener tareas con filtros
POST   /api/tasks              - Crear tarea
PUT    /api/tasks/:id         - Actualizar tarea
DELETE /api/tasks/:id         - Eliminar tarea
GET    /api/tags              - Obtener etiquetas
```

### 4. Interfaz de Usuario
- Diseño modular con componentes reutilizables
- Diseño responsive con Tailwind
- Feedback visual para acciones
- Estados de carga básicos
- Manejo de errores simple

## Requerimientos Técnicos Detallados

### Frontend
1. **Arquitectura y Estructura**
   - Organización modular del código
   - Custom hooks básicos
   - Servicios para API
   - TypeScript

2. **Estado y Datos**
   - Redux Toolkit para estado global
   - Persistencia básica con localStorage
   - Manejo eficiente de re-renders

3. **Testing**
   - Tests unitarios básicos
   - Mínimo 50% de cobertura

### Backend
1. **Arquitectura**
   - Estructura modular NestJS
   - Sequelize como ORM
   - DTOs para validación
   - Manejo de errores centralizado

2. **Base de Datos**
   - Modelos Sequelize
   - Migraciones básicas
   - Seeds para datos de prueba

3. **Testing**
   - Tests unitarios básicos
   - Tests de integración para endpoints principales

### DevOps
1. **Docker**
   - Dockerfile para frontend y backend
   - Docker Compose para desarrollo local
   - Variables de entorno configurables

## Entregables
1. Repositorio Git con:
   - Código frontend y backend
   - README detallado con:
     - Instrucciones de instalación
     - Comandos de ejecución
     - Estructura del proyecto
     - Variables de entorno necesarias
   - Crea el Pull Request desde GitHub:
         Base: develop
         Compare: feature/[TU_NOMBRE]-solution
         Título: "Solución Prueba Técnica - [TU_NOMBRE]"
   - Enviar al correo [edison.delgado@evol.energy](mailto:edison.delgado@evol.energy) con copia a [carolina.duarte@evol.energy](mailto: carolina.duarte@evol.energy) avisando que la prueba técnica está lista para revisión con el asunto "Prueba Técnica Evol". 
2. Docker Compose funcional para levantar el proyecto completo

## Criterios de Evaluación (100 puntos)
- Funcionalidad (35 pts)
  - CRUD completo (20 pts)
  - Filtros y ordenamiento (15 pts)
- Código y Arquitectura (30 pts)
  - Estructura del proyecto (15 pts)
  - Uso de TypeScript y buenas prácticas (15 pts)
- Frontend (20 pts)
  - Redux implementation (10 pts)
  - UI/UX y responsividad (10 pts)
- DevOps (15 pts)
  - Docker setup funcional (15 pts)

## Recomendaciones
1. Comenzar con la configuración de Docker y el backend
2. Implementar primero las funcionalidades core
3. Agregar filtros y ordenamiento después de tener el CRUD funcionando
4. Mantener el código limpio y documentado
5. Priorizar la funcionalidad sobre características adicionales