#!/bin/bash

# 🔧 Script para Arreglar Permisos - SnippetBox2
# =============================================

echo "🔧 Arreglando problema de permisos del frontend..."

# Parar contenedores actuales
echo "🛑 Parando contenedores actuales..."
docker-compose -f docker-compose.simple.yml down 2>/dev/null

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env desde template..."
    cp .env.template .env
fi

# Crear y arreglar permisos del directorio client
echo "🔧 Arreglando permisos del directorio client..."
mkdir -p ./data
chmod 755 ./data

# En sistemas Unix, arreglar permisos del directorio client
if [ "$(uname)" != "Darwin" ] && [ "$(expr substr $(uname -s) 1 5)" != "MINGW" ]; then
    echo "🐧 Detectado sistema Unix - arreglando permisos..."
    sudo chown -R $USER:$USER ./client 2>/dev/null || true
    chmod -R 755 ./client 2>/dev/null || true
fi

echo "🏗️  Iniciando con configuración de permisos arreglada..."

# Intentar con la configuración que funciona
docker-compose -f docker-compose.working.yml up --build

echo ""
echo "🛑 SnippetBox2 detenido"
echo "💡 Si el problema persiste, ejecuta: docker system prune -a" 