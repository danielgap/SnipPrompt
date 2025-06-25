# 🚨 Troubleshooting - SnipPrompt Development

## 🐳 Errores Comunes de Docker

### Error: `/client: not found`

**Síntomas:**
```
failed to solve: failed to compute cache key: failed to calculate checksum of ref: "/client": not found
```

**Causa:**
- El contexto de Docker no encuentra el directorio `client/`
- Problema en la configuración del `docker-compose.yml`

**✅ Solución:**
1. **Usar la configuración simplificada:**
   ```bash
   ./start-dev.sh  # Ya configurado para usar docker-compose.simple.yml
   ```

2. **Verificar estructura del proyecto:**
   ```bash
   ls -la client/  # Debe mostrar archivos React
   ls -la ./       # Debe mostrar package.json y src/
   ```

3. **Manual con configuración simple:**
   ```bash
   docker-compose -f docker-compose.simple.yml up
   ```

---

### Error: `Port already in use`

**Síntomas:**
```
ERROR: for frontend  Cannot start service frontend: driver failed programming external connectivity
```

**✅ Solución:**
```bash
# Ver qué proceso usa el puerto
lsof -i :3000
lsof -i :5000

# Matar procesos si es necesario
kill -9 <PID>

# O cambiar puertos en docker-compose.simple.yml
ports:
  - "3001:3000"  # Cambiar puerto local
```

---

### Error: `No space left on device`

**Síntomas:**
```
ERROR: failed to solve: failed to register layer: Error processing tar file
```

**✅ Solución:**
```bash
# Limpiar Docker
docker system prune -a

# Limpiar volúmenes (CUIDADO: borra datos)
docker volume prune

# Verificar espacio
df -h
```

---

### Error: `npm install fails`

**Síntomas:**
- Contenedor se cierra inmediatamente
- Errores de `npm WARN` o `npm ERR`

**✅ Solución:**
```bash
# Limpiar volúmenes de node_modules
docker-compose -f docker-compose.simple.yml down -v

# Reconstruir completamente
docker-compose -f docker-compose.simple.yml up --build --force-recreate

# Verificar logs específicos
docker-compose -f docker-compose.simple.yml logs backend
docker-compose -f docker-compose.simple.yml logs frontend
```

---

### Error: `Cannot connect to backend`

**Síntomas:**
- Frontend carga pero no obtiene datos
- Errores de CORS en console del navegador

**✅ Solución:**
1. **Verificar que ambos servicios están corriendo:**
   ```bash
   docker ps  # Debe mostrar backend y frontend
   ```

2. **Verificar URLs:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/snippets

3. **Verificar variable de entorno:**
   ```bash
   # En .env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

---

### Error: `Permission denied` (Linux/Mac)

**Síntomas:**
```
Permission denied: '/app/data/db.sqlite3'
mkdir: cannot create directory '/app/data': Permission denied
EACCES: permission denied, mkdir '/app/node_modules/.cache'
Failed to compile.
```

**✅ Solución:**
```bash
# Solución automática
chmod +x fix-permissions.sh
./fix-permissions.sh

# O solución manual:
# Ajustar permisos del directorio data
sudo chown -R $USER:$USER ./data ./client
chmod 755 ./data
chmod -R 755 ./client

# Usar configuración con permisos arreglados
docker-compose -f docker-compose.fix.yml up
```

---

## 🔧 Comandos de Diagnóstico

### Verificar Estado General
```bash
# Estado de contenedores
docker ps -a

# Estado de volúmenes
docker volume ls

# Estado de redes
docker network ls

# Uso de espacio
docker system df
```

### Logs Detallados
```bash
# Logs de todos los servicios
docker-compose -f docker-compose.simple.yml logs -f

# Logs específicos con timestamps
docker-compose -f docker-compose.simple.yml logs -f --timestamps backend
docker-compose -f docker-compose.simple.yml logs -f --timestamps frontend

# Últimas 50 líneas
docker-compose -f docker-compose.simple.yml logs --tail=50 frontend
```

### Debugging Interactivo
```bash
# Acceder al contenedor backend
docker-compose -f docker-compose.simple.yml exec backend sh

# Acceder al contenedor frontend
docker-compose -f docker-compose.simple.yml exec frontend sh

# Ejecutar comandos dentro del contenedor
docker-compose -f docker-compose.simple.yml exec backend npm list
docker-compose -f docker-compose.simple.yml exec frontend npm list
```

---

## 🚨 Reset Completo (Último Recurso)

**⚠️ CUIDADO: Esto borra todos los datos**

```bash
# Parar todos los contenedores
docker-compose -f docker-compose.simple.yml down -v

# Limpiar completamente Docker
docker system prune -a --volumes

# Eliminar imágenes específicas
docker rmi $(docker images -q snipprompt*)

# Reiniciar Docker Desktop (Windows/Mac)
# O reiniciar servicio docker (Linux)
sudo systemctl restart docker

# Empezar desde cero
./start-dev.sh
```

---

## 📞 Obtener Ayuda

### Información del Sistema
```bash
# Versiones
docker --version
docker-compose --version
node --version
npm --version

# Sistema operativo
uname -a

# Espacio disponible
df -h
```

### Crear Issue de GitHub
Si nada funciona, crear un issue con:
1. **Output completo** del error
2. **Logs** de docker-compose
3. **Información del sistema** (arriba)
4. **Pasos** que llevaron al error

---

*Última actualización: 25/06/2025* 