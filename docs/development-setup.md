# 🛠️ Configuración de Entorno de Desarrollo - SnipPrompt

## 🚀 Reglas de Desarrollo del Proyecto

### ⚠️ **REGLA PRINCIPAL: Desarrollo SOLO con Docker**

**Este proyecto DEBE ejecutarse únicamente usando Docker** para garantizar:
- ✅ **Consistencia** de entorno entre desarrolladores
- ✅ **Evitar conflictos** de versiones de Node.js
- ✅ **Reproducibilidad** de bugs y problemas
- ✅ **Preparación** automática para producción

### 🚫 **NO Permitido**
- ❌ Ejecutar `npm run dev` directamente en local
- ❌ Instalar dependencias globalmente en el sistema
- ❌ Usar diferentes versiones de Node.js entre desarrolladores

---

## 🐳 **Configuración Docker para Desarrollo**

### **Prerequisitos**
- Docker Desktop instalado
- Docker Compose v3+
- Git configurado

### **Primera Configuración**
```bash
# 1. Clonar repositorio
git clone <repository-url>
cd SnipPrompt

# 2. Crear archivo de variables de entorno
cp .env.example .env

# 3. Construir y ejecutar contenedores de desarrollo
docker-compose -f docker-compose.dev.yml up --build
```

### **Comandos de Desarrollo Diarios**
```bash
# Iniciar desarrollo
docker-compose -f docker-compose.dev.yml up

# Iniciar en background
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Parar desarrollo
docker-compose -f docker-compose.dev.yml down

# Reconstruir después de cambios en package.json
docker-compose -f docker-compose.dev.yml up --build
```

---

## 📁 **Estructura de Archivos Docker**

```
SnipPrompt/
├── Dockerfile                  # Producción
├── Dockerfile.dev             # Desarrollo
├── docker-compose.yml         # Producción
├── docker-compose.dev.yml     # Desarrollo
├── .env.example              # Template variables entorno
├── .env                      # Variables entorno (git-ignored)
└── .dockerignore             # Archivos excluidos de contexto Docker
```

---

## 🔧 **Configuración Específica por Entorno**

### **Desarrollo (docker-compose.dev.yml)**
- **Hot Reload**: Cambios se reflejan automáticamente
- **Volúmenes**: Código sincronizado con contenedor
- **Puertos**: 3000 (frontend), 5000 (backend)
- **Base de Datos**: SQLite en volumen persistente

### **Producción (docker-compose.yml)**
- **Optimizado**: Imagen compacta
- **Sin volúmenes**: Código incluido en imagen
- **Puerto**: 5000 únicamente
- **Base de Datos**: SQLite en volumen persistente

---

## 🎯 **URLs de Desarrollo**

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | Aplicación React con hot reload |
| Backend | http://localhost:5000 | API REST con nodemon |
| Base de Datos | `data/db.sqlite3` | SQLite (accesible desde host) |

---

## 🔄 **Flujo de Trabajo Desarrollo**

### **1. Comenzar Día de Desarrollo**
```bash
# Terminal 1: Iniciar servicios
docker-compose -f docker-compose.dev.yml up

# Terminal 2: Ver logs si necesario
docker-compose -f docker-compose.dev.yml logs -f backend
```

### **2. Durante el Desarrollo**
- ✅ Editar archivos normalmente (hot reload automático)
- ✅ Instalar dependencias con `docker-compose exec`
- ✅ Ejecutar comandos dentro del contenedor si necesario

### **3. Instalar Nueva Dependencia**
```bash
# Backend
docker-compose -f docker-compose.dev.yml exec backend npm install nueva-dependencia

# Frontend
docker-compose -f docker-compose.dev.yml exec frontend npm install nueva-dependencia

# Reconstruir para persistir cambios
docker-compose -f docker-compose.dev.yml up --build
```

### **4. Finalizar Día**
```bash
# Parar servicios pero mantener datos
docker-compose -f docker-compose.dev.yml down
```

---

## 🛠️ **Comandos Útiles**

### **Debugging**
```bash
# Acceder a shell del contenedor backend
docker-compose -f docker-compose.dev.yml exec backend sh

# Acceder a shell del contenedor frontend
docker-compose -f docker-compose.dev.yml exec frontend sh

# Ver logs específicos
docker-compose -f docker-compose.dev.yml logs backend
docker-compose -f docker-compose.dev.yml logs frontend
```

### **Base de Datos**
```bash
# Backup de base de datos
docker-compose -f docker-compose.dev.yml exec backend cp /app/data/db.sqlite3 /app/data/backup-$(date +%Y%m%d).sqlite3

# Reset completo de base de datos
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up --build
```

### **Limpieza**
```bash
# Limpiar contenedores, imágenes y volúmenes no utilizados
docker system prune -a

# Limpiar solo volúmenes (CUIDADO: borra datos)
docker volume prune
```

---

## 🚨 **Solución de Problemas Comunes**

### **Puerto ya en uso**
```bash
# Ver qué proceso usa el puerto
lsof -i :3000
lsof -i :5000

# Cambiar puerto en docker-compose.dev.yml
ports:
  - "3001:3000"  # Usar 3001 en lugar de 3000
```

### **Cambios no se reflejan**
```bash
# Reconstruir completamente
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build --force-recreate
```

### **Problemas de permisos (Linux/Mac)**
```bash
# Ajustar permisos de archivos generados por Docker
sudo chown -R $USER:$USER .
```

### **Error de memoria (Windows/Mac)**
- Aumentar memoria asignada a Docker Desktop (≥ 4GB)
- Cerrar aplicaciones innecesarias

---

## ⚡ **Performance Tips**

### **Optimización para Desarrollo**
1. **Usar .dockerignore** para excluir `node_modules`, `.git`, etc.
2. **Volúmenes específicos** para node_modules (evitar bind mount)
3. **Multi-stage builds** en Dockerfile.dev para optimizar capas
4. **Cache de dependencias** aprovechando capas de Docker

### **Configuración Recomendada Docker Desktop**
- **Memory**: 4GB mínimo, 8GB recomendado
- **CPUs**: 2 mínimo, 4 recomendado
- **Swap**: 2GB
- **Disk Space**: 20GB mínimo

---

## 📋 **Checklist de Configuración Inicial**

### **Antes del Primer Desarrollo**
- [ ] Docker Desktop instalado y funcionando
- [ ] Archivo `.env` creado desde `.env.example`
- [ ] Variables de entorno configuradas
- [ ] Puertos 3000 y 5000 disponibles
- [ ] Espacio en disco suficiente (≥ 2GB)

### **Verificación de Configuración**
- [ ] `docker --version` muestra versión ≥ 20.x
- [ ] `docker-compose --version` muestra versión ≥ 1.29
- [ ] Frontend accesible en http://localhost:3000
- [ ] Backend responde en http://localhost:5000/api/snippets
- [ ] Hot reload funciona (cambiar texto y ver actualización)

---

## 🎯 **Reglas de Contribución**

### **Antes de hacer Push**
1. ✅ Verificar que la app funciona en Docker
2. ✅ Verificar que no hay errores en logs
3. ✅ Actualizar documentación si hay cambios de configuración
4. ✅ No commitear archivos `.env` o `data/`

### **Pull Requests**
- **Incluir**: Capturas de pantalla si hay cambios UI
- **Documentar**: Cualquier nueva variable de entorno
- **Verificar**: Que docker-compose.dev.yml funciona para reviewer

---

**⚠️ Nota Importante**: Esta configuración es obligatoria para todos los desarrolladores del proyecto. No se aceptarán PRs que no hayan sido desarrollados y probados usando Docker.

*Última actualización: 25/06/2025* 