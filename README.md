# SnippetBox2

![Librería de Snippets](./.github/img/snippets.png)

## Descripción

SnippetBox2 es una aplicación auto-hospedada para organizar tus fragmentos de código. Es una versión evolucionada del proyecto original [Snippet Box](https://github.com/pawelmalak/snippet-box), añadiendo funcionalidades clave como un sistema completo de gestión de usuarios, roles y seguridad mejorada para un entorno multi-usuario.

Permite crear, editar, buscar y gestionar tus snippets en diversos lenguajes de forma sencilla. Con soporte integrado para Markdown, SnippetBox2 facilita la adición de notas o documentación a tu código.

## Mejoras Clave sobre el Original

- **Gestión de Usuarios y Autenticación:** Sistema completo de registro e inicio de sesión de usuarios mediante un sistema seguro basado en JWT (JSON Web Tokens).
- **Roles de Usuario (Administrador y Usuario):**
  - **Administrador:** Tiene control total sobre todos los snippets y usuarios del sistema.
  - **Usuario:** Solo puede gestionar sus propios snippets.
- **Panel de Administración:** Una vista dedicada para que los administradores puedan gestionar todos los usuarios de la plataforma.
- **Seguridad Mejorada:**
  - Gestión segura de secretos (como el `JWT_SECRET`) a través de variables de entorno y archivos `.env`, evitando que las claves se expongan en el código fuente.
  - Actualización de la imagen base de Docker y dependencias para corregir vulnerabilidades conocidas.
- **Entorno de Producción Dockerizado:** Se ha optimizado el `Dockerfile` y `docker-compose.yml` para construir una imagen única, segura y robusta para producción.

## Tecnología

- **Backend**
  - Node.js (v24)
  - TypeScript
  - Express.js
  - Sequelize ORM + SQLite
- **Frontend**
  - React
  - TypeScript
  - Bootstrap
- **Despliegue**
  - Docker & Docker Compose

## Desarrollo

Para levantar un entorno de desarrollo local con recarga en caliente (hot-reloading) para el frontend y el backend.

**Requisitos:** Docker y Docker Compose.

```sh
# 1. Clona el repositorio
git clone https://github.com/danielgap/SnippetBox2.git
cd SnippetBox2

# 2. Levanta los contenedores de desarrollo
# Esto usará el archivo 'docker-compose.working.yml'
docker compose -f docker-compose.working.yml up --build
```
- El frontend estará disponible en `http://localhost:3000`.
- El backend estará disponible en `http://localhost:5000`.

## Despliegue en Producción (con Docker)

Estas instrucciones utilizan la imagen pre-construida y segura disponible en Docker Hub.

**Requisitos:** Docker y Docker Compose.

#### 1. Crear el archivo `.env`

Crea un archivo llamado `.env` en la raíz del proyecto. Este archivo contendrá las variables de entorno, como el secreto para firmar los tokens de autenticación. Es ignorado por Git por seguridad.

```env
# Genera un secreto aleatorio de 32 caracteres o más.
# No uses el carácter '$' para evitar problemas con Docker Compose.
JWT_SECRET=bZ8pD3kF7gRjWnQ4tYvA1xLhS9mC6uE2
```

#### 2. Usar Docker Compose (Recomendado)

Crea un archivo `docker-compose.yml` con el siguiente contenido:

```yaml
services:
  snippetbox2:
    image: danielgap/snippetbox2:latest
    container_name: SnippetBox2
    ports:
      - "5000:5000"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
    restart: unless-stopped
```

Y levanta el contenedor:
```sh
docker compose up -d
```
La aplicación estará disponible en `http://localhost:5000`.

#### 3. Construir la imagen manualmente (Opcional)

Si prefieres construir y gestionar tu propia imagen en lugar de usar la de Docker Hub.

```sh
# Construir la imagen
docker build -t tu-usuario-docker/snippetbox2:latest .

# Subir la imagen a tu repositorio
docker push tu-usuario-docker/snippetbox2:latest
```

## Funcionalidad

- **Búsqueda:** Busca tus snippets con filtros de lenguaje y tags integrados.
- **Snippets Anclados:** Ancla tus snippets favoritos o importantes a la pantalla de inicio para un acceso rápido.

![Pantalla de inicio](./.github/img/home.png)

- **Librería de Snippets:** Gestiona tus snippets y filtra por tags.

![Librería de Snippets](./.github/img/snippets.png)

- **Detalle del Snippet:** Visualiza tu código con resaltado de sintaxis, detalles y documentación. Realiza acciones como editar, anclar o eliminar desde un único lugar.

![Detalle de Snippet](./.github/img/snippet.png)

- **Editor:** Crea y edita tus snippets desde un editor simple y fácil de usar.

![Editor](./.github/img/editor.png)

## Usage

### Search functionality

Visit wiki for search functionality and available filters reference: [Search functionality](https://github.com/pawelmalak/snippet-box/wiki/Search-functionality)
