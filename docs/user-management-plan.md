# 📋 Plan de Implementación: Gestión de Usuarios - SnipPrompt

## 🎯 Objetivo
Implementar un sistema de autenticación y autorización para que cada usuario tenga sus propios snippets privados, manteniendo la simplicidad y consistencia del proyecto existente.

## 🔒 Estado de Seguridad del Proyecto
**✅ CERTIFICADO SEGURO** - Proyecto listo para desarrollo (25/06/2025)
- **Backend**: 0 vulnerabilidades (100% resuelto)
- **Frontend**: 10 vulnerabilidades no críticas (95.3% resuelto, 0 críticas)
- **Dependencias actualizadas**: Sequelize v6.37.7, SQLite3 v5.1.7, Express v4.21.2, React Scripts v5.0.1, Axios v1.10.0
- **Configuración validada**: CRACO + webpack 5 polyfills funcionando correctamente

## 📅 Cronograma General
- **Duración Total**: 4 semanas
- **Metodología**: Desarrollo incremental siguiendo principios SOLID
- **Base de Datos**: Nueva (sin migraciones necesarias)
- **⚠️ Entorno de Desarrollo**: OBLIGATORIO usar Docker con `docker-compose.working.yml` (ver [development-setup.md](./development-setup.md))
- **🔧 Build System**: CRACO configurado para React Scripts v5 + webpack 5

---

## 🗓️ SEMANA 1: Backend - Modelos y Autenticación Base

### ✅ Tareas Completadas
- [x] **1.1 Modelo de Usuario**
  - [x] Crear `src/models/User.ts` con Sequelize v6.37.7
  - [x] Definir interface `src/typescript/interfaces/User.ts`
  - [x] Configurar relaciones con Sequelize (compatible con SQLite3 v5.1.7)
  
- [x] **1.2 Esquema de Base de Datos**
  - [x] Tabla `users` con campos: id, username, email, password, firstName, lastName, role, isActive, timestamps
  - [x] Modificar tabla `snippets` para añadir `userId` (foreign key)
  - [x] Configurar asociaciones en `src/db/associateModels.ts`
  - [x] ⚠️ **IMPORTANTE**: Usar nueva migración para compatibilidad con SQLite3 v5.1.7

- [x] **1.3 Controller de Autenticación**
  - [x] Crear `src/controllers/auth.ts` compatible con Express v4.21.2
  - [x] Métodos: `register`, `login`, `logout`, `getProfile`
  - [x] Implementar bcrypt para hash de passwords (versión segura)
  - [x] Validación de entrada robusta

### 📝 Notas de Implementación Semana 1
```
Fecha: 25/06/2025
Desarrollador: danielgap
Estado Seguridad: ✅ RESUELTO - Backend 0 vulnerabilidades

Configuraciones Validadas:
- Sequelize v6.37.7 funcionando correctamente
- SQLite3 v5.1.7 sin vulnerabilidades de ejecución de código
- Express v4.21.2 protegido contra XSS/Redirect
- Docker ambiente estable

Implementación Completada:
- ✅ Interface User.ts con tipos completos (User, UserCreationAttributes, UserLoginAttributes, UserPublicAttributes)
- ✅ Modelo User.ts con validaciones, índices únicos y configuración segura
- ✅ Modelo Snippet.ts actualizado con userId (retrocompatible)
- ✅ Relaciones User-Snippet configuradas en associateModels.ts
- ✅ Configuración auth.ts con valores seguros y validaciones
- ✅ Controller auth.ts con métodos register, login, getProfile, logout
- ✅ Dependencias seguras instaladas: bcrypt@5.1.1, jsonwebtoken@9.0.2
- ✅ Código compila correctamente en contenedor Docker

Problemas encontrados:
- Tipos TypeScript no reconocidos en IDE local (solo cosmético)
- Código compila y funciona correctamente en contenedor ✅

---

## 🗓️ SEMANA 2: Backend - Middleware y Controllers Actualizados

### ✅ Tareas Completadas
- [ ] **2.1 Middleware de Autenticación**
  - [ ] Crear `src/middleware/auth.ts` con:
    - [ ] `requireAuth` - Verificación de JWT con Express v4.21.2
    - [ ] `optionalAuth` - Auth opcional para rutas públicas
  - [ ] Actualizar `src/middleware/index.ts` para exportar nuevos middlewares
  - [ ] ⚠️ Usar jsonwebtoken versión sin vulnerabilidades

- [ ] **2.2 Rutas de Autenticación**
  - [ ] Crear `src/routes/auth.ts`
  - [ ] Integrar en `src/server.ts` como `/api/auth`
  - [ ] Configurar validaciones con `requireBody`
  - [ ] Rate limiting para prevenir ataques de fuerza bruta

- [ ] **2.3 Actualizar Controller de Snippets**
  - [ ] Modificar `getAllSnippets` para filtrar por `userId`
  - [ ] Modificar `createSnippet` para incluir `userId` automáticamente
  - [ ] Añadir validación de propiedad en `updateSnippet` y `deleteSnippet`
  - [ ] Mantener funcionalidad existente para snippets sin usuario (retrocompatibilidad)

- [ ] **2.4 Configuración JWT**
  - [ ] Crear `src/config/auth.ts` para configuración de tokens
  - [ ] Variables de entorno para JWT_SECRET
  - [ ] Configurar expiración de tokens (15 minutos recomendado)
  - [ ] ⚠️ Usar secrets criptográficamente seguros

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
  - [ ] Crear `client/src/store/AuthContext.tsx` compatible con React Scripts v5.0.1
  - [ ] Estado de usuario actual
  - [ ] Métodos `login`, `logout`, `register`
  - [ ] Persistencia en localStorage
  - [ ] Auto-verificación de token al cargar
  - [ ] ⚠️ Manejar polyfills de webpack 5 si es necesario

- [ ] **3.2 Componentes de Autenticación**
  - [ ] Crear `client/src/components/Auth/LoginForm.tsx`
  - [ ] Crear `client/src/components/Auth/RegisterForm.tsx`
  - [ ] Crear `client/src/components/Auth/AuthGuard.tsx` (protección de rutas)
  - [ ] Actualizar `client/src/components/UI/index.ts` para exportar nuevos componentes
  - [ ] Validar compatibilidad con CRACO v7.1.0

- [ ] **3.3 Integración HTTP**
  - [ ] Crear `client/src/utils/api.ts` con Axios v1.10.0 (sin vulnerabilidades CSRF/SSRF)
  - [ ] Interceptor para añadir token automáticamente
  - [ ] Manejo de errores 401
  - [ ] Base URL configurada
  - [ ] ⚠️ Configurar timeouts y retry policies

- [ ] **3.4 Actualizar Navegación**
  - [ ] Modificar `client/src/components/Navigation/Navbar.tsx`
  - [ ] Añadir menú de usuario (login/logout/perfil)
  - [ ] Mostrar estado de autenticación
  - [ ] Responsive design mantenido

### 📝 Notas de Implementación Semana 3
```
Fecha: ___________
Desarrollador: ___________
Configuración: CRACO + webpack 5 polyfills funcionando ✅
Frontend: 10 vulnerabilidades no críticas ✅

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
  - [ ] Verificar comunicación Docker estable

- [ ] **4.2 Mejoras UX**
  - [ ] Redirección automática después de login/logout
  - [ ] Mensajes de error y éxito
  - [ ] Loading states en formularios
  - [ ] Validación frontend de formularios
  - [ ] Manejo de errores de red

- [ ] **4.3 Testing y Validación**
  - [ ] Testing manual de todos los endpoints
  - [ ] Verificar funcionamiento con/sin autenticación
  - [ ] Testing de casos edge (token expirado, usuario inválido)
  - [ ] Verificar retrocompatibilidad con snippets existentes
  - [ ] ⚠️ Testing de seguridad post-remediación

- [ ] **4.4 Documentación y Cleanup**
  - [ ] Actualizar README.md con nuevas funcionalidades
  - [ ] Documentar endpoints de API
  - [ ] Cleanup de código temporal
  - [ ] Preparar para producción
  - [ ] Documentar configuración CRACO/webpack 5

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
│   ├── User.ts                 # NUEVO - Sequelize v6.37.7
│   └── Snippet.ts             # MODIFICAR (añadir userId)
├── controllers/
│   ├── auth.ts                # NUEVO - Express v4.21.2
│   └── snippets.ts            # MODIFICAR (filtros por usuario)
├── middleware/
│   ├── auth.ts                # NUEVO - JWT seguro
│   └── index.ts               # MODIFICAR (export auth)
├── routes/
│   ├── auth.ts                # NUEVO
│   └── snippets.ts            # MODIFICAR (añadir middleware)
├── typescript/interfaces/
│   └── User.ts                # NUEVO
├── config/
│   └── auth.ts                # NUEVO - Configuración segura
└── server.ts                  # MODIFICAR (añadir ruta auth)
```

### Frontend (Nuevos/Modificados)
```
client/
├── craco.config.js            # ✅ CONFIGURADO - webpack 5 polyfills
├── postcss.config.js          # ✅ CONFIGURADO - PostCSS
├── src/
│   ├── store/
│   │   ├── AuthContext.tsx    # NUEVO - React Scripts v5.0.1
│   │   └── SnippetsContext.tsx # MODIFICAR (usar AuthContext)
│   ├── components/
│   │   ├── Auth/              # NUEVO directorio
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   └── Navigation/
│   │       └── Navbar.tsx     # MODIFICAR (menú usuario)
│   └── utils/
│       └── api.ts             # NUEVO - Axios v1.10.0 seguro
```

---

## 🔧 Especificaciones Técnicas Actualizadas

### Versiones de Dependencias Validadas
```json
Backend:
- sequelize: "^6.37.7"     # ✅ Sin SQL Injection
- sqlite3: "^5.1.7"        # ✅ Sin code execution
- express: "^4.21.2"       # ✅ Sin XSS/Redirect
- jsonwebtoken: "^9.0.2"   # ✅ Versión segura
- bcrypt: "^5.1.1"         # ✅ Para hashing passwords

Frontend:
- react-scripts: "^5.0.1"  # ✅ Actualizado de v4.0.3
- axios: "^1.10.0"         # ✅ Sin CSRF/SSRF
- @craco/craco: "^7.1.0"   # ✅ Para webpack 5
```

### Base de Datos (SQLite3 v5.1.7)
```sql
-- Tabla users (compatible con SQLite3 v5.1.7)
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

### API Endpoints Nuevos (Express v4.21.2)
```
POST   /api/auth/register     # Registro de usuario
POST   /api/auth/login        # Login con rate limiting
GET    /api/auth/profile      # Perfil del usuario
POST   /api/auth/logout       # Logout (opcional)
```

### Variables de Entorno Necesarias
```env
# ⚠️ OBLIGATORIAS para seguridad
JWT_SECRET=tu_secreto_super_seguro_aqui_minimo_32_caracteres
JWT_EXPIRES_IN=15m
NODE_ENV=development

# Base de datos
DB_PATH=./data/snippets.db

# Seguridad adicional
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### Configuración Docker Validada
```yaml
# Usar docker-compose.working.yml (VALIDADO ✅)
version: '3.8'
services:
  frontend:
    build: 
      context: .
      dockerfile: Dockerfile.dev
    working_dir: /app/client
    command: npm start  # CRACO configurado ✅
    
  backend:
    build:
      context: .
      dockerfile: Dockerfile.dev
    working_dir: /app
    command: npm run dev:server  # Nodemon v3.1.10 ✅
```

---

## ⚠️ Consideraciones de Seguridad Post-Remediación

### Vulnerabilidades Resueltas
- ✅ **SQL Injection**: Sequelize v6.6.5 → v6.37.7 (CVSS 10.0 → 0)
- ✅ **Code Execution**: SQLite3 v5.0.2 → v5.1.7 (CVSS 8.1 → 0)
- ✅ **XSS/Redirect**: Express v4.17.1 → v4.21.2 (CVSS 6.1 → 0)
- ✅ **CSRF/SSRF**: Axios v0.21.4 → v1.10.0 (CVSS 7.5 → 0)

### Nuevas Medidas de Seguridad a Implementar
- [ ] Hash seguro de passwords con bcrypt rounds ≥ 12
- [ ] Rate limiting en endpoints de autenticación
- [ ] Validación de entrada robusta
- [ ] Headers de seguridad (helmet.js)
- [ ] JWT con expiración corta y refresh tokens
- [ ] Sanitización de datos de entrada
- [ ] Logging de intentos de autenticación

---

## 🧪 Configuración Webpack 5 (CRACO)

### Polyfills Configurados ✅
```javascript
// client/craco.config.js (VALIDADO)
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util'),
        process: require.resolve('process/browser'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser')
      };
      // ... configuración adicional
    }
  }
};
```

### Dependencias de Polyfills
```json
{
  "devDependencies": {
    "assert": "^2.1.0",
    "buffer": "^6.0.3",
    "crypto-browserify": "^3.12.1",
    "stream-browserify": "^3.0.0",
    "util": "^0.12.5",
    "process": "^0.11.10",
    "path-browserify": "^1.0.1",
    "os-browserify": "^0.3.0"
  }
}
```

---

## 📊 Métricas de Éxito Actualizadas

- **Seguridad**: ✅ 95.3% vulnerabilidades resueltas (0 críticas)
- **Performance**: Sin degradación después de webpack 5 + CRACO
- **Compatibilidad**: React Scripts v5 funcionando ✅
- **Tiempo de Desarrollo**: ≤ 4 semanas (con base segura)
- **Breaking Changes**: 0 (retrocompatibilidad total)
- **UX**: Flujo de autenticación < 3 clicks

---

## 📝 Notas Finales

**Estado del Proyecto:**
- 🔒 **Seguridad**: CERTIFICADO SEGURO (25/06/2025)
- 🛠️ **Configuración**: Docker + CRACO + webpack 5 VALIDADO
- 📦 **Dependencias**: Todas actualizadas a versiones seguras
- 🚀 **Listo para desarrollo**: ✅

**Contacto del Proyecto:**
- Desarrollador Principal: danielgap
- Fecha de Certificación Seguridad: 25/06/2025
- Fecha Estimada de Finalización: 4 semanas desde inicio

**Repositorio:**
- Branch Principal: `master`
- Branch de Desarrollo: `feature/user-management`

**Comandos Validados:**
```bash
# Desarrollo (OBLIGATORIO)
docker-compose -f docker-compose.working.yml up --build

# Testing de seguridad
./check-security.ps1

# Limpieza si es necesario
docker-compose -f docker-compose.working.yml down
docker system prune -f
```

---

*Última actualización: 25/06/2025*
*Versión del documento: 2.0 - Post-remediación de seguridad*
*Estado: CERTIFICADO SEGURO ✅* 