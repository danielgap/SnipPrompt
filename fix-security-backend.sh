#!/bin/bash

# 🔒 Script de Remediación de Seguridad - Backend
# Fecha: 25/06/2025
# Desarrollador: danielgap

set -e  # Salir si cualquier comando falla

echo "🔧 Iniciando remediación de vulnerabilidades críticas - Backend..."
echo "📋 Se aplicarán las siguientes actualizaciones:"
echo "   • Sequelize: v6.6.5 → v6.32.1+ (SQL Injection - CRÍTICO)"
echo "   • SQLite3: v5.0.2 → v5.1.6+ (Code Execution - CRÍTICO)" 
echo "   • Express: v4.17.1 → v4.21.1+ (XSS/Redirect - ALTO)"
echo "   • Nodemon: v2.0.12 → v3.0.1+ (Dependencias)"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encuentra package.json en el directorio actual"
    echo "   Ejecuta este script desde la raíz del proyecto backend"
    exit 1
fi

# Crear backup de package-lock.json
echo "💾 Creando backup de package-lock.json..."
cp package-lock.json package-lock.json.backup-$(date +%Y%m%d-%H%M%S)

# Crear tag de git para rollback
echo "🏷️  Creando tag de git para rollback..."
git add .
git commit -m "Pre-security update backup" || echo "No hay cambios para commit"
git tag pre-security-update-$(date +%Y%m%d-%H%M%S)

echo ""
echo "🚀 Aplicando actualizaciones críticas..."

# FASE 1: Dependencias críticas de seguridad
echo "📦 Actualizando Sequelize (CRÍTICO - SQL Injection)..."
npm install sequelize@^6.32.1

echo "📦 Actualizando SQLite3 (CRÍTICO - Code Execution)..."
npm install sqlite3@^5.1.6

echo "📦 Actualizando Express (ALTO - XSS/Redirect)..."
npm install express@^4.21.1

# FASE 2: Dependencias de desarrollo
echo "📦 Actualizando Nodemon..."
npm install --save-dev nodemon@^3.0.1

# FASE 3: Aplicar audit fix automático
echo "🔧 Aplicando npm audit fix..."
npm audit fix || echo "⚠️  Algunos problemas requieren revisión manual"

echo ""
echo "🧪 Verificando instalación..."

# Verificar que las nuevas versiones se instalaron correctamente
echo "📋 Verificando versiones instaladas:"
echo "   Sequelize: $(npm list sequelize --depth=0 2>/dev/null | grep sequelize || echo 'Error al verificar')"
echo "   SQLite3: $(npm list sqlite3 --depth=0 2>/dev/null | grep sqlite3 || echo 'Error al verificar')"
echo "   Express: $(npm list express --depth=0 2>/dev/null | grep express || echo 'Error al verificar')"
echo "   Nodemon: $(npm list nodemon --depth=0 2>/dev/null | grep nodemon || echo 'Error al verificar')"

echo ""
echo "🔍 Ejecutando audit final..."
npm audit

echo ""
echo "✅ Remediación de seguridad del backend completada"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Ejecutar tests: npm run dev:server"
echo "   2. Verificar conectividad: curl http://localhost:5000/api/snippets"
echo "   3. Revisar logs para errores de compatibilidad"
echo ""
echo "🔄 Para rollback en caso de problemas:"
echo "   git checkout pre-security-update-[timestamp]"
echo "   npm ci"
echo ""
echo "📁 Backup creado: package-lock.json.backup-[timestamp]" 