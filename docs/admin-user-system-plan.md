# Plan de Desarrollo: Sistema de Administración de Usuarios

**Proyecto:** SnippetBox2  
**Fecha de Inicio:** 26 de Enero de 2025  
**Responsable:** Desarrollador Principal  
**Estimación Total:** 8-12 horas de desarrollo  

## 📋 Resumen del Proyecto

Implementar un sistema de roles de usuario que permita designar administradores con capacidades especiales para gestionar usuarios de la plataforma. El primer usuario registrado será automáticamente administrador.

## 🎯 Objetivos

- [x] ✅ Diseño del sistema completado
- [ ] Implementar campo `isAdmin` en el modelo User
- [ ] Crear middleware de autorización para administradores
- [ ] Desarrollar API endpoints para gestión de usuarios
- [ ] Implementar interfaz de administración en el frontend
- [ ] Realizar pruebas de seguridad y funcionalidad
- [ ] Documentar el sistema implementado

---

## 📊 Fases de Desarrollo

### 🗄️ **FASE 1: Base de Datos** (Estimación: 2-3 horas)

#### 1.1 Modificar Modelo User
- [ ] **Tarea:** Añadir campo `isAdmin` al modelo User
  - **Archivo:** `src/models/User.ts`
  - **Detalles:** 
    - Tipo: `BOOLEAN`
    - Valor por defecto: `false`
    - Not null: `true`
  - **Principio SOLID:** SRP - El modelo User mantiene su responsabilidad única

#### 1.2 Crear Migración
- [ ] **Tarea:** Crear migración para añadir columna `isAdmin`
  - **Archivo:** `src/db/migrations/04_add_admin_role.ts`
  - **Detalles:**
    - Migración hacia adelante: ADD COLUMN `isAdmin` BOOLEAN DEFAULT FALSE NOT NULL
    - Migración hacia atrás: DROP COLUMN `isAdmin`
  - **Validación:** Verificar que usuarios existentes no se vean afectados

#### 1.3 Actualizar Interfaces TypeScript
- [ ] **Tarea:** Actualizar interface User
  - **Archivo:** `src/typescript/interfaces/User.ts`
  - **Archivo:** `client/src/typescript/interfaces/User.ts`
  - **Detalles:** Añadir propiedad `isAdmin: boolean`

#### ✅ **Criterios de Aceptación Fase 1:**
- [ ] Migración ejecutada sin errores
- [ ] Modelo User actualizado correctamente
- [ ] Tipos TypeScript actualizados en backend y frontend
- [ ] Base de datos funcional con nueva columna

---

### 🔒 **FASE 2: Backend - Seguridad y API** (Estimación: 4-5 horas)

#### 2.1 Middleware de Autorización
- [ ] **Tarea:** Crear middleware `requireAdmin`
  - **Archivo:** `src/middleware/requireAdmin.ts`
  - **Detalles:**
    - Verificar que `req.user.isAdmin === true`
    - Devolver error 403 si no es admin
    - Usar después de `requireAuth`
  - **Principio SOLID:** SRP - Responsabilidad única de verificar permisos de admin

#### 2.2 Actualizar Exportaciones de Middleware
- [ ] **Tarea:** Añadir export en index de middleware
  - **Archivo:** `src/middleware/index.ts`
  - **Detalles:** Exportar `requireAdmin`

#### 2.3 Modificar Lógica de Registro
- [ ] **Tarea:** Primer usuario = administrador automático
  - **Archivo:** `src/controllers/auth.ts`
  - **Detalles:**
    - Verificar si es el primer usuario registrado
    - Si es el primero, establecer `isAdmin: true`
    - Incluir `isAdmin` en respuesta de login/registro
  - **Principio SOLID:** OCP - Extender funcionalidad sin modificar lógica existente

#### 2.4 Crear Controlador de Usuarios
- [ ] **Tarea:** Nuevo controlador para gestión de usuarios
  - **Archivo:** `src/controllers/users.ts`
  - **Funciones:**
    - `getAllUsers()` - Listar todos los usuarios
    - `deleteUser()` - Eliminar usuario por ID
    - `promoteUser()` - Hacer usuario administrador
    - `demoteUser()` - Quitar privilegios de admin
  - **Principio SOLID:** SRP - Controlador específico para gestión de usuarios

#### 2.5 Crear Rutas de Administración
- [ ] **Tarea:** Nuevas rutas protegidas para administradores
  - **Archivo:** `src/routes/users.ts`
  - **Rutas:**
    - `GET /api/users` - Listar usuarios (requiere admin)
    - `DELETE /api/users/:id` - Eliminar usuario (requiere admin)
    - `PUT /api/users/:id/promote` - Promover a admin (requiere admin)
    - `PUT /api/users/:id/demote` - Quitar admin (requiere admin)
  - **Seguridad:** Todas las rutas protegidas con `requireAuth` y `requireAdmin`

#### 2.6 Registrar Rutas en Servidor
- [ ] **Tarea:** Añadir rutas de usuarios al servidor
  - **Archivo:** `src/server.ts`
  - **Detalles:** Importar y usar rutas `/api/users`

#### ✅ **Criterios de Aceptación Fase 2:**
- [ ] Middleware `requireAdmin` funciona correctamente
- [ ] Primer usuario se registra como administrador automáticamente
- [ ] API endpoints responden correctamente con autenticación
- [ ] Errores 403 se devuelven para usuarios no administradores
- [ ] Respuestas de login incluyen flag `isAdmin`

---

### 🎨 **FASE 3: Frontend - Interfaz de Administración** (Estimación: 3-4 horas)

#### 3.1 Actualizar AuthContext
- [ ] **Tarea:** Incluir estado de administrador en contexto
  - **Archivo:** `client/src/store/AuthContext.tsx`
  - **Detalles:**
    - Añadir `isAdmin` al estado del usuario
    - Actualizar en login/registro
    - Proporcionar función `isUserAdmin()`

#### 3.2 Crear Hook useAdmin
- [ ] **Tarea:** Hook personalizado para verificar permisos de admin
  - **Archivo:** `client/src/hooks/useAdmin.ts` (nuevo archivo)
  - **Detalles:** Hook que devuelve `isAdmin` y funciones relacionadas
  - **Principio SOLID:** SRP - Lógica de admin separada

#### 3.3 Actualizar Navegación
- [ ] **Tarea:** Añadir enlace de administración condicionalmente
  - **Archivo:** `client/src/components/Navigation/Navbar.tsx`
  - **Detalles:**
    - Mostrar "Panel de Administración" solo si es admin
    - Enlace a nueva ruta `/admin/users`

#### 3.4 Crear Página de Administración
- [ ] **Tarea:** Página para gestión de usuarios
  - **Archivo:** `client/src/containers/AdminUsers.tsx` (nuevo archivo)
  - **Componentes:**
    - Lista de usuarios
    - Botones de acción (eliminar, promover, degradar)
    - Confirmaciones de acciones peligrosas

#### 3.5 Crear Componentes de UI para Admin
- [ ] **Tarea:** Componentes específicos de administración
  - **Archivo:** `client/src/components/Admin/UserCard.tsx` (nuevo archivo)
  - **Archivo:** `client/src/components/Admin/UserList.tsx` (nuevo archivo)
  - **Archivo:** `client/src/components/Admin/AdminGuard.tsx` (nuevo archivo)
  - **Detalles:** Componentes reutilizables para la interfaz de admin

#### 3.6 Añadir Rutas de Administración
- [ ] **Tarea:** Configurar routing para páginas de admin
  - **Archivo:** `client/src/components/Navigation/routes.json`
  - **Archivo:** `client/src/App.tsx`
  - **Detalles:** Rutas protegidas que requieren permisos de admin

#### 3.7 Servicios API Frontend
- [ ] **Tarea:** Funciones para llamar APIs de administración
  - **Archivo:** `client/src/utils/api.ts`
  - **Funciones:**
    - `getUsers()`
    - `deleteUser(id)`
    - `promoteUser(id)`
    - `demoteUser(id)`

#### ✅ **Criterios de Aceptación Fase 3:**
- [ ] Panel de administración visible solo para administradores
- [ ] Lista de usuarios se carga correctamente
- [ ] Acciones de admin (eliminar, promover, degradar) funcionan
- [ ] Confirmaciones previas a acciones destructivas
- [ ] UI responsive y accesible

---

### 🧪 **FASE 4: Testing y Documentación** (Estimación: 2-3 horas)

#### 4.1 Pruebas de Seguridad
- [ ] **Tarea:** Verificar que usuarios no admin no accedan a funciones restringidas
  - **Casos de prueba:**
    - Usuario normal intenta acceder a `/api/users` → 403
    - Usuario normal intenta eliminar usuario → 403
    - Admin puede realizar todas las acciones
    - Primer usuario registrado es admin automáticamente

#### 4.2 Pruebas de Funcionalidad
- [ ] **Tarea:** Verificar flujos completos de administración
  - **Casos de prueba:**
    - Registro de primer usuario como admin
    - Promoción de usuario normal a admin
    - Degradación de admin a usuario normal
    - Eliminación de usuario
    - Acceso a panel de administración

#### 4.3 Pruebas Frontend
- [ ] **Tarea:** Verificar interfaces y navegación
  - **Casos de prueba:**
    - Panel de admin visible/invisible según rol
    - Acciones de admin funcionan correctamente
    - Manejo de errores en UI

#### 4.4 Documentación de API
- [ ] **Tarea:** Documentar nuevos endpoints
  - **Archivo:** `docs/api-documentation.md` (actualizar/crear)
  - **Detalles:** Documentar rutas de administración con ejemplos

#### 4.5 Documentación de Usuario
- [ ] **Tarea:** Guía para administradores
  - **Archivo:** `docs/admin-guide.md` (nuevo archivo)
  - **Detalles:** Cómo usar las funciones de administración

#### ✅ **Criterios de Aceptación Fase 4:**
- [ ] Todas las pruebas de seguridad pasan
- [ ] Funcionalidad completa verificada
- [ ] Documentación actualizada
- [ ] Sistema listo para producción

---

## 🔐 Consideraciones de Seguridad

### Críticas
- [ ] **Verificación de permisos:** Todas las rutas de admin verifican permisos
- [ ] **Validación de entrada:** IDs de usuario validados antes de operaciones
- [ ] **Logging de acciones:** Registrar acciones administrativas para auditoría
- [ ] **Prevención de auto-degradación:** Admin no puede quitarse sus propios permisos

### Recomendadas
- [ ] **Rate limiting:** Limitar frecuencia de acciones administrativas
- [ ] **Confirmación doble:** Acciones críticas requieren confirmación
- [ ] **Historial de cambios:** Registro de cambios en roles de usuario

---

## 📝 Registro de Progreso

### Notas de Desarrollo

**[Fecha]** - **[Fase.Tarea]** - **[Estado]** - **[Comentarios]**

_Ejemplo:_
- **26/01/2025** - **1.1** - **✅ Completado** - Modelo User actualizado sin problemas
- **26/01/2025** - **1.2** - **🚧 En progreso** - Trabajando en migración

### Problemas Encontrados

**[Fecha]** - **[Problema]** - **[Solución]** - **[Estado]**

_Ejemplo:_
- **26/01/2025** - **Error en migración** - **Ajustar tipo de dato** - **✅ Resuelto**

### Decisiones Técnicas

**[Fecha]** - **[Decisión]** - **[Justificación]**

_Ejemplo:_
- **26/01/2025** - **Usar boolean en lugar de enum** - **Simplicidad para caso actual, extensible en futuro**

---

## 🎯 Definición de Terminado

El sistema estará completo cuando:

1. ✅ Primer usuario se registra automáticamente como administrador
2. ✅ Administradores pueden acceder al panel de administración
3. ✅ Administradores pueden listar, eliminar, promover y degradar usuarios
4. ✅ Usuarios normales no pueden acceder a funciones de administración
5. ✅ Interfaz de usuario es intuitiva y segura
6. ✅ Todas las pruebas de seguridad pasan
7. ✅ Documentación está actualizada

---

## 🔄 Próximos Pasos (Futuras Mejoras)

- [ ] **Sistema de roles granular:** Editor, Moderador, etc.
- [ ] **Permisos específicos:** En lugar de admin binario
- [ ] **Auditoría avanzada:** Log detallado de acciones
- [ ] **Interfaz de asignación masiva:** Cambios en lote
- [ ] **Integración con proveedores OAuth:** Google, GitHub, etc.

---

**Estado del Plan:** 📋 **Diseñado** | 🚧 **En Desarrollo** | ✅ **Completado**  
**Última Actualización:** 26 de Enero de 2025 