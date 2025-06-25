#!/bin/bash

# 🚀 Script de Inicio Rápido - SnipPrompt Development
# =====================================================

echo "🐳 Iniciando SnipPrompt en modo desarrollo..."

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

# Limpiar contenedores previos si existen
docker-compose -f docker-compose.simple.yml down 2>/dev/null
docker-compose -f docker-compose.fix.yml down 2>/dev/null
docker-compose -f docker-compose.working.yml down 2>/dev/null

# Iniciar servicios de desarrollo con la versión que funciona
docker-compose -f docker-compose.working.yml up --build

# El script se ejecuta hasta que se pare docker-compose
echo ""
echo "🛑 SnipPrompt detenido"
echo "💡 Para reiniciar: ./start-dev.sh"
echo "💡 Para limpiar: docker-compose -f docker-compose.working.yml down -v" 