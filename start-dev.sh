#!/bin/bash

# 🚀 Script de Inicio Rápido - SnippetBox2 Development
# =====================================================

echo "🐳 Iniciando SnippetBox2 en modo desarrollo..."

# Verificar si Docker está funcionando
if ! docker --version > /dev/null 2>&1; then
    echo "❌ Error: Docker no está instalado o no está funcionando"
    echo "   Instala Docker Desktop desde: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Verificar si docker-compose está disponible
if ! docker-compose --version > /dev/null 2>&1; then
    echo "❌ Error: docker-compose no está disponible"
    exit 1
fi

# Verificar estructura del proyecto
echo "🔍 Verificando estructura del proyecto..."
if [ ! -d "./client" ]; then
    echo "❌ Error: El directorio ./client no existe"
    exit 1
fi

if [ ! -f "./client/package.json" ]; then
    echo "❌ Error: No se encontró ./client/package.json"
    exit 1
fi

if [ ! -f "./package.json" ]; then
    echo "❌ Error: No se encontró ./package.json en la raíz"
    exit 1
fi

echo "✅ Estructura del proyecto verificada"

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env desde template..."
    cp .env.template .env
    echo "✅ Archivo .env creado. Revisa las variables de entorno si es necesario."
fi

# Crear directorio de datos si no existe
mkdir -p ./data

echo "🏗️  Iniciando contenedores (versión optimizada)..."
echo "   Esto puede tardar unos minutos la primera vez..."

# === LIMPIEZA COMPLETA DE CONTENEDORES ===
echo "🧹 Realizando limpieza completa de contenedores..."

# Limpiar usando docker-compose
docker-compose -f docker-compose.simple.yml down 2>/dev/null
docker-compose -f docker-compose.fix.yml down 2>/dev/null
docker-compose -f docker-compose.working.yml down -v 2>/dev/null

# Limpiar contenedores específicos por nombre (más agresivo)
echo "🔧 Eliminando contenedores específicos..."
docker rm -f SnippetBox2-backend-dev 2>/dev/null || true
docker rm -f SnippetBox2-frontend-dev 2>/dev/null || true
docker rm -f cbf1a91be57200abefc2891b173078e4191dc3408af5e8e0b1912c7290b55b0a-SnippetBox2-backend-dev-1 2>/dev/null || true
docker rm -f cbf1a91be57200abefc2891b173078e4191dc3408af5e8e0b1912c7290b55b0a-SnippetBox2-frontend-dev-1 2>/dev/null || true

# Limpiar contenedores que contengan "SnippetBox2" en el nombre
echo "🗑️  Eliminando todos los contenedores relacionados con SnippetBox2..."
docker ps -a --filter "name=SnippetBox2" --format "{{.ID}}" | xargs -r docker rm -f 2>/dev/null || true

# Limpiar redes huérfanas
echo "🌐 Limpiando redes..."
docker network prune -f 2>/dev/null || true

# Limpiar volúmenes huérfanos (opcional - comenta si quieres conservar datos)
echo "💾 Limpiando volúmenes no utilizados..."
docker volume prune -f 2>/dev/null || true

echo "✅ Limpieza completa terminada"

# Eliminar el archivo de metadatos de migración para forzar la ejecución
echo "💥 Eliminando metadatos de migración para forzar la re-ejecución..."
rm -f migrations-meta.json
echo "✅ Metadatos de migración eliminados."

# --- INICIO DE LA SOLUCIÓN DEFINITIVA ---
echo "🧹 Limpieza profunda: Eliminando node_modules y package-lock.json del backend..."
docker run --rm -v "$(pwd):/app" node:16-alpine sh -c "rm -rf /app/node_modules /app/package-lock.json"
echo "✅ Limpieza profunda del backend completada."

echo "🧹 Limpieza profunda: Eliminando node_modules y package-lock.json del cliente usando Docker..."
# Usamos un contenedor de Docker para eliminar los archivos y evitar problemas de permisos en el host.
docker run --rm -v "$(pwd)/client:/app" node:16-alpine sh -c "rm -rf /app/node_modules /app/package-lock.json"
echo "✅ Limpieza profunda completada. Se forzará una instalación limpia."
# --- FIN DE LA SOLUCIÓN DEFINITIVA ---

# Iniciar servicios de desarrollo con la versión que funciona
docker-compose -f docker-compose.working.yml up --build

# El script se ejecuta hasta que se pare docker-compose
echo ""
echo "🛑 SnippetBox2 detenido"
echo "💡 Para reiniciar: ./start-dev.sh"
echo "💡 Para limpiar: docker-compose -f docker-compose.working.yml down -v" 