# API Documentation - User Management

**Project:** SnippetBox2  
**Version:** 1.0  
**Date:** January 26, 2025

## Summary

This section documents the API endpoints for user management. All these routes are protected and require the requester to be an **authenticated administrator**.

**Route Prefix:** `/api/users`  
**Authentication Required:** `Bearer <token>`  
**Permissions Required:** `role: 'admin'`

---

## Endpoints

### 1. Get all users

- **Method:** `GET`
- **Route:** `/`
- **Description:** Returns a list of all registered users in the system. The user's password is excluded from the response.
- **Successful Response (200 OK):**
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
- **Error Response:**
  - `401 Unauthorized`: If the token is invalid or not provided.
  - `403 Forbidden`: If the user is not an administrator.

### 2. Delete a user

- **Method:** `DELETE`
- **Route:** `/:id`
- **Description:** Permanently deletes a user by their ID. An administrator cannot delete themselves.
- **URL Parameters:**
  - `id` (number): The ID of the user to delete.
- **Successful Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User deleted successfully."
  }
  ```
- **Error Response:**
  - `400 Bad Request`: If an administrator tries to delete themselves.
  - `401 Unauthorized`: Authentication failed.
  - `403 Forbidden`: The user is not an administrator.
  - `404 Not Found`: If the user with the specified `id` does not exist.

### 3. Promote a user to administrator

- **Method:** `PUT`
- **Route:** `/:id/promote`
- **Description:** Changes a user's role from `'user'` to `'admin'`.
- **URL Parameters:**
  - `id` (number): The ID of the user to promote.
- **Successful Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User promoted to administrator.",
    "data": { ...updated user object... }
  }
  ```
- **Error Response:**
  - `401 Unauthorized`: Authentication failed.
  - `403 Forbidden`: The user is not an administrator.
  - `404 Not Found`: User not found.

### 4. Demote an administrator to user

- **Method:** `PUT`
- **Route:** `/:id/demote`
- **Description:** Changes an administrator's role from `'admin'` to `'user'`. An administrator cannot demote themselves.
- **URL Parameters:**
  - `id` (number): The ID of the administrator to demote.
- **Successful Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Administrator demoted to user.",
    "data": { ...updated user object... }
  }
  ```
- **Error Response:**
  - `400 Bad Request`: If an administrator tries to demote themselves.
  - `401 Unauthorized`: Authentication failed.
  - `403 Forbidden`: The user is not an administrator.
  - `404 Not Found`: User not found. 