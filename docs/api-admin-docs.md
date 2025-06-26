# Documentación de API - Gestión de Usuarios

**Proyecto:** SnipPrompt  
**Versión:** 1.0  
**Fecha:** 26 de Enero de 2025

## Resumen

Esta sección documenta los endpoints de la API para la gestión de usuarios. Todas estas rutas están protegidas y requieren que el solicitante sea un **administrador autenticado**.

**Prefijo de la Ruta:** `/api/users`  
**Autenticación Requerida:** `Bearer <token>`  
**Permisos Requeridos:** `role: 'admin'`

---

## Endpoints

### 1. Obtener todos los usuarios

- **Método:** `GET`
- **Ruta:** `/`
- **Descripción:** Devuelve una lista de todos los usuarios registrados en el sistema. La contraseña del usuario se excluye de la respuesta.
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "id": 1,
        "username": "adminUser",
        "email": "admin@example.com",
        "role": "admin",
        "isActive": true,
        "createdAt": "2025-01-26T12:00:00.000Z",
        "updatedAt": "2025-01-26T12:00:00.000Z"
      },
      {
        "id": 2,
        "username": "normalUser",
        "email": "user@example.com",
        "role": "user",
        "isActive": true,
        "createdAt": "2025-01-26T12:05:00.000Z",
        "updatedAt": "2025-01-26T12:05:00.000Z"
      }
    ]
  }
  ```
- **Respuesta de Error:**
  - `401 Unauthorized`: Si el token no es válido o no se proporciona.
  - `403 Forbidden`: Si el usuario no es un administrador.

### 2. Eliminar un usuario

- **Método:** `DELETE`
- **Ruta:** `/:id`
- **Descripción:** Elimina permanentemente a un usuario por su ID. Un administrador no puede eliminarse a sí mismo.
- **Parámetros de URL:**
  - `id` (number): El ID del usuario a eliminar.
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "success": true,
    "message": "Usuario eliminado correctamente."
  }
  ```
- **Respuesta de Error:**
  - `400 Bad Request`: Si un administrador intenta eliminarse a sí mismo.
  - `401 Unauthorized`: Autenticación fallida.
  - `403 Forbidden`: El usuario no es administrador.
  - `404 Not Found`: Si el usuario con el `id` especificado no existe.

### 3. Promover un usuario a administrador

- **Método:** `PUT`
- **Ruta:** `/:id/promote`
- **Descripción:** Cambia el rol de un usuario de `'user'` a `'admin'`.
- **Parámetros de URL:**
  - `id` (number): El ID del usuario a promover.
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "success": true,
    "message": "Usuario promovido a administrador.",
    "data": { ...objeto del usuario actualizado... }
  }
  ```
- **Respuesta de Error:**
  - `401 Unauthorized`: Autenticación fallida.
  - `403 Forbidden`: El usuario no es administrador.
  - `404 Not Found`: Usuario no encontrado.

### 4. Degradar un administrador a usuario

- **Método:** `PUT`
- **Ruta:** `/:id/demote`
- **Descripción:** Cambia el rol de un administrador de `'admin'` a `'user'`. Un administrador no puede degradarse a sí mismo.
- **Parámetros de URL:**
  - `id` (number): El ID del administrador a degradar.
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "success": true,
    "message": "Administrador degradado a usuario.",
    "data": { ...objeto del usuario actualizado... }
  }
  ```
- **Respuesta de Error:**
  - `400 Bad Request`: Si un administrador intenta degradarse a sí mismo.
  - `401 Unauthorized`: Autenticación fallida.
  - `403 Forbidden`: El usuario no es administrador.
  - `404 Not Found`: Usuario no encontrado. 