# 📋 Plan de Implementación: Gestión de Usuarios - SnipPrompt

## 🎯 Objetivo
Implementar un sistema de autenticación y autorización para que cada usuario tenga sus propios snippets privados, manteniendo la simplicidad y consistencia del proyecto existente.

## 📅 Cronograma General
- **Duración Total**: 4 semanas
- **Metodología**: Desarrollo incremental siguiendo principios SOLID
- **Base de Datos**: Nueva (sin migraciones necesarias)
- **⚠️ Entorno de Desarrollo**: OBLIGATORIO usar Docker (ver [development-setup.md](./development-setup.md))

---

## 🗓️ SEMANA 1: Backend - Modelos y Autenticación Base

### ✅ Tareas Completadas
- [ ] **1.1 Modelo de Usuario**
  - [ ] Crear `src/models/User.ts`
  - [ ] Definir interface `src/typescript/interfaces/User.ts`
  - [ ] Configurar relaciones con Sequelize
  
- [ ] **1.2 Esquema de Base de Datos**
  - [ ] Tabla `users` con campos: id, username, email, password, firstName, lastName, role, isActive, timestamps
  - [ ] Modificar tabla `snippets` para añadir `userId` (foreign key)
  - [ ] Configurar asociaciones en `src/db/associateModels.ts`

- [ ] **1.3 Controller de Autenticación**
  - [ ] Crear `src/controllers/auth.ts` con métodos:
    - [ ] `register` - Registro de nuevos usuarios
    - [ ] `login` - Autenticación con JWT
    - [ ] `logout` - Invalidación de token (opcional)
    - [ ] `getProfile` - Obtener perfil del usuario

### 📝 Notas de Implementación Semana 1
```
Fecha: 25/06/2025
Desarrollador: danielgap
Notas:


Problemas encontrados:


```

---

## 🗓️ SEMANA 2: Backend - Middleware y Controllers Actualizados

### ✅ Tareas Completadas
- [ ] **2.1 Middleware de Autenticación**
  - [ ] Crear `src/middleware/auth.ts` con:
    - [ ] `requireAuth` - Verificación de JWT
    - [ ] `optionalAuth` - Auth opcional para rutas públicas
  - [ ] Actualizar `src/middleware/index.ts` para exportar nuevos middlewares

- [ ] **2.2 Rutas de Autenticación**
  - [ ] Crear `src/routes/auth.ts`
  - [ ] Integrar en `src/server.ts` como `/api/auth`
  - [ ] Configurar validaciones con `requireBody`

- [ ] **2.3 Actualizar Controller de Snippets**
  - [ ] Modificar `getAllSnippets` para filtrar por `userId`
  - [ ] Modificar `createSnippet` para incluir `userId` automáticamente
  - [ ] Añadir validación de propiedad en `updateSnippet` y `deleteSnippet`
  - [ ] Mantener funcionalidad existente para snippets sin usuario (retrocompatibilidad)

- [ ] **2.4 Configuración JWT**
  - [ ] Crear `src/config/auth.ts` para configuración de tokens
  - [ ] Variables de entorno para JWT_SECRET
  - [ ] Configurar expiración de tokens (15 minutos recomendado)

### 📝 Notas de Implementación Semana 2
```
Fecha: ___________
Desarrollador: ___________
Notas:


Problemas encontrados:


```

---

## 🗓️ SEMANA 3: Frontend - Contexto y Componentes de Autenticación

### ✅ Tareas Completadas
- [ ] **3.1 Contexto de Autenticación**
  - [ ] Crear `client/src/store/AuthContext.tsx` con:
    - [ ] Estado de usuario actual
    - [ ] Métodos `login`, `logout`, `register`
    - [ ] Persistencia en localStorage
    - [ ] Auto-verificación de token al cargar

- [ ] **3.2 Componentes de Autenticación**
  - [ ] Crear `client/src/components/Auth/LoginForm.tsx`
  - [ ] Crear `client/src/components/Auth/RegisterForm.tsx`
  - [ ] Crear `client/src/components/Auth/AuthGuard.tsx` (protección de rutas)
  - [ ] Actualizar `client/src/components/UI/index.ts` para exportar nuevos componentes

- [ ] **3.3 Integración HTTP**
  - [ ] Crear `client/src/utils/api.ts` con:
    - [ ] Interceptor para añadir token automáticamente
    - [ ] Manejo de errores 401
    - [ ] Base URL configurada

- [ ] **3.4 Actualizar Navegación**
  - [ ] Modificar `client/src/components/Navigation/Navbar.tsx`
  - [ ] Añadir menú de usuario (login/logout/perfil)
  - [ ] Mostrar estado de autenticación

### 📝 Notas de Implementación Semana 3
```
Fecha: ___________
Desarrollador: ___________
Notas:


Problemas encontrados:


```

---

## 🗓️ SEMANA 4: Integración y Testing

### ✅ Tareas Completadas
- [ ] **4.1 Integración Frontend-Backend**
  - [ ] Modificar `client/src/store/SnippetsContext.tsx` para usar AuthContext
  - [ ] Actualizar llamadas API para incluir autenticación
  - [ ] Testing de flujos de autenticación

- [ ] **4.2 Mejoras UX**
  - [ ] Redirección automática después de login/logout
  - [ ] Mensajes de error y éxito
  - [ ] Loading states en formularios
  - [ ] Validación frontend de formularios

- [ ] **4.3 Testing y Validación**
  - [ ] Testing manual de todos los endpoints
  - [ ] Verificar funcionamiento con/sin autenticación
  - [ ] Testing de casos edge (token expirado, usuario inválido)
  - [ ] Verificar retrocompatibilidad con snippets existentes

- [ ] **4.4 Documentación y Cleanup**
  - [ ] Actualizar README.md con nuevas funcionalidades
  - [ ] Documentar endpoints de API
  - [ ] Cleanup de código temporal
  - [ ] Preparar para producción

### 📝 Notas de Implementación Semana 4
```
Fecha: ___________
Desarrollador: ___________
Notas:


Problemas encontrados:


```

---

## 🏗️ Estructura de Archivos Final

### Backend (Nuevos/Modificados)
```
src/
├── models/
│   ├── User.ts                 # NUEVO
│   └── Snippet.ts             # MODIFICAR (añadir userId)
├── controllers/
│   ├── auth.ts                # NUEVO
│   └── snippets.ts            # MODIFICAR (filtros por usuario)
├── middleware/
│   ├── auth.ts                # NUEVO
│   └── index.ts               # MODIFICAR (export auth)
├── routes/
│   ├── auth.ts                # NUEVO
│   └── snippets.ts            # MODIFICAR (añadir middleware)
├── typescript/interfaces/
│   └── User.ts                # NUEVO
├── config/
│   └── auth.ts                # NUEVO
└── server.ts                  # MODIFICAR (añadir ruta auth)
```

### Frontend (Nuevos/Modificados)
```
client/src/
├── store/
│   ├── AuthContext.tsx        # NUEVO
│   └── SnippetsContext.tsx    # MODIFICAR (usar AuthContext)
├── components/
│   ├── Auth/                  # NUEVO directorio
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── AuthGuard.tsx
│   └── Navigation/
│       └── Navbar.tsx         # MODIFICAR (menú usuario)
└── utils/
    └── api.ts                 # NUEVO
```

---

## 🔧 Especificaciones Técnicas

### Base de Datos
```sql
-- Tabla users
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  role VARCHAR(20) DEFAULT 'user',
  isActive BOOLEAN DEFAULT true,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Modificar tabla snippets
ALTER TABLE snippets ADD COLUMN userId INTEGER;
ALTER TABLE snippets ADD FOREIGN KEY (userId) REFERENCES users(id);
```

### API Endpoints Nuevos
```
POST   /api/auth/register     # Registro de usuario
POST   /api/auth/login        # Login
GET    /api/auth/profile      # Perfil del usuario
POST   /api/auth/logout       # Logout (opcional)
```

### Variables de Entorno Necesarias
```
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRES_IN=15m
NODE_ENV=development
```

---

## ⚠️ Principios SOLID Aplicados

### Single Responsibility Principle (SRP)
- ✅ AuthController: Solo maneja autenticación
- ✅ AuthContext: Solo maneja estado de usuario
- ✅ AuthGuard: Solo protege rutas

### Open/Closed Principle (OCP)
- ✅ Middleware extensible para diferentes tipos de auth
- ✅ Componentes reutilizables para diferentes formularios

### Liskov Substitution Principle (LSP)
- ✅ Interfaces permiten intercambiar implementaciones

### Interface Segregation Principle (ISP)
- ✅ Interfaces específicas para User, Auth, etc.

### Dependency Inversion Principle (DIP)
- ✅ Controllers dependen de interfaces, no implementaciones

---

## 🚀 Criterios de Aceptación

### Funcionalidades Mínimas
- [ ] Usuario puede registrarse con email/username único
- [ ] Usuario puede hacer login y recibir JWT
- [ ] Usuario solo ve sus propios snippets
- [ ] Usuario solo puede modificar/eliminar sus snippets
- [ ] Snippets existentes permanecen accesibles
- [ ] Logout limpia el estado de autenticación

### Funcionalidades Adicionales (Nice to Have)
- [ ] Perfil de usuario editable
- [ ] Recuperación de contraseña
- [ ] Snippets públicos/privados
- [ ] Roles de administrador

---

## 📊 Métricas de Éxito

- **Tiempo de Desarrollo**: ≤ 4 semanas
- **Breaking Changes**: 0 (retrocompatibilidad total)
- **Cobertura de Tests**: ≥ 80% para nuevos componentes
- **Performance**: Sin degradación en tiempo de respuesta
- **UX**: Flujo de autenticación < 3 clicks

---

## 📝 Notas Finales

**Contacto del Proyecto:**
- Desarrollador Principal: ___________
- Fecha de Inicio: ___________
- Fecha Estimada de Finalización: ___________

**Repositorio:**
- Branch Principal: `master`
- Branch de Desarrollo: `feature/user-management`

**Backups y Seguridad:**
- [ ] Backup de base de datos antes de comenzar
- [ ] Variables de entorno configuradas
- [ ] Secrets de JWT seguros

---

*Última actualización: [Fecha]*
*Versión del documento: 1.0* 