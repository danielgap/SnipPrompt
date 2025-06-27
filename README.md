# SnippetBox2

![Snippet Library](./.github/img/snippets.png)

## Description

SnippetBox2 is a self-hosted application for organizing your code snippets. It is an evolved version of the original [Snippet Box](https://github.com/pawelmalak/snippet-box) project, adding key features such as a complete user management system, roles, and enhanced security for a multi-user environment.

It allows you to easily create, edit, search, and manage your snippets in various languages. With built-in Markdown support, SnippetBox2 makes it easy to add notes or documentation to your code.

## Key Improvements Over the Original

- **User Management and Authentication:** A complete user registration and login system using a secure JWT (JSON Web Tokens) based system.
- **User Roles (Admin and User):**
  - **Admin:** Has full control over all snippets and users in the system.
  - **User:** Can only manage their own snippets.
- **Admin Panel:** A dedicated view for administrators to manage all users on the platform.
- **Enhanced Security:**
  - Secure management of secrets (like `JWT_SECRET`) through environment variables and `.env` files, preventing keys from being exposed in the source code.
  - Updated Docker base image and dependencies to fix known vulnerabilities.
- **Dockerized Production Environment:** The `Dockerfile` and `docker-compose.yml` have been optimized to build a single, secure, and robust image for production.

## Technology

- **Backend**
  - Node.js (v24)
  - TypeScript
  - Express.js
  - Sequelize ORM + SQLite
- **Frontend**
  - React
  - TypeScript
  - Bootstrap
- **Deployment**
  - Docker & Docker Compose

## Development

To set up a local development environment with hot-reloading for the frontend and backend.

**Requirements:** Docker and Docker Compose.

```sh
# 1. Clone the repository
git clone https://github.com/danielgap/SnippetBox2.git
cd SnippetBox2

# 2. Start the development containers
# This will use the 'docker-compose.working.yml' file
docker compose -f docker-compose.working.yml up --build
```
- The frontend will be available at `http://localhost:3000`.
- The backend will be available at `http://localhost:5000`.

## Production Deployment (with Docker)

These instructions use the pre-built, secure image available on Docker Hub.

**Requirements:** Docker and Docker Compose.

#### 1. Create the `.env` file

Create a file named `.env` in the project root. This file will contain environment variables, such as the secret for signing authentication tokens. It is ignored by Git for security.

```env
# Generate a random secret of 32 characters or more.
# Do not use the '$' character to avoid issues with Docker Compose.
JWT_SECRET=bZ8pD3kF7gRjWnQ4tYvA1xLhS9mC6uE2
```

#### 2. Use Docker Compose (Recommended)

Create a `docker-compose.yml` file with the following content:

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

And start the container:
```sh
docker compose up -d
```
The application will be available at `http://localhost:5000`.

#### 3. Build the image manually (Optional)

If you prefer to build and manage your own image instead of using the one from Docker Hub.

```sh
# Build the image
docker build -t your-docker-user/snippetbox2:latest .

# Push the image to your repository
docker push your-docker-user/snippetbox2:latest
```

## Functionality

- **Search:** Search your snippets with built-in language and tag filters.
- **Pinned Snippets:** Pin your favorite or important snippets to the home screen for quick access.

![Home screen](./.github/img/home.png)

- **Snippet Library:** Manage your snippets and filter by tags.

![Snippet Library](./.github/img/snippets.png)

- **Snippet Details:** View your code with syntax highlighting, details, and documentation. Perform actions like editing, pinning, or deleting from a single place.

![Snippet Details](./.github/img/snippet.png)

- **Editor:** Create and edit your snippets from a simple and easy-to-use editor.

![Editor](./.github/img/editor.png)

## Usage

### Search functionality

Visit wiki for search functionality and available filters reference: [Search functionality](https://github.com/pawelmalak/snippet-box/wiki/Search-functionality)
