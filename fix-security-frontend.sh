#!/bin/bash

# 🔒 Script de Remediación de Seguridad - Frontend
# Fecha: 25/06/2025
# Desarrollador: danielgap

set -e  # Salir si cualquier comando falla

echo "🔧 Iniciando remediación de vulnerabilidades críticas - Frontend..."
echo "📋 Se aplicarán las siguientes actualizaciones:"
echo "   • Axios: v0.21.4 → v1.10.0+ (CSRF/SSRF - CRÍTICO)"
echo "   • node-sass → sass (Migración - deprecado y vulnerable)"
echo "   • React Scripts: v4.0.3 → v5.0.1+ (BREAKING CHANGE)"
echo ""
echo "⚠️  ADVERTENCIA: Esta actualización incluye BREAKING CHANGES"
echo "    Asegúrate de tener un backup completo antes de continuar"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encuentra package.json en el directorio actual"
    echo "   Ejecuta este script desde el directorio client/"
    exit 1
fi

# Confirmar antes de proceder
read -p "¿Continuar con la actualización? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Operación cancelada por el usuario"
    exit 1
fi

# Crear backup de package-lock.json y node_modules
echo "💾 Creando backups..."
cp package.json package.json.backup-$(date +%Y%m%d-%H%M%S)
cp package-lock.json package-lock.json.backup-$(date +%Y%m%d-%H%M%S)

# Crear tag de git para rollback
echo "🏷️  Creando tag de git para rollback..."
cd ..
git add .
git commit -m "Pre-frontend security update backup" || echo "No hay cambios para commit"
git tag pre-frontend-security-update-$(date +%Y%m%d-%H%M%S)
cd client

echo ""
echo "🚀 Aplicando actualizaciones críticas..."

# FASE 1: Actualizar Axios (crítico)
echo "📦 Actualizando Axios (CRÍTICO - CSRF/SSRF)..."
npm install axios@^1.10.0

# FASE 2: Migrar de node-sass a sass
echo "📦 Migrando de node-sass a sass..."
npm uninstall node-sass
npm install sass@^1.69.0

echo "🔧 Actualizando scripts de build para usar sass..."
# Actualizar package.json si es necesario (sass es compatible con node-sass)

# FASE 3: Actualizar React Scripts (BREAKING CHANGE)
echo "📦 Actualizando React Scripts (BREAKING CHANGE)..."
echo "⚠️  Esta actualización puede requerir ajustes manuales"
npm install react-scripts@^5.0.1

# FASE 4: Aplicar otras actualizaciones críticas
echo "📦 Aplicando otras actualizaciones de seguridad..."

# Actualizar dependencias críticas específicas
npm install follow-redirects@^1.15.6 || echo "⚠️  follow-redirects: revisar manualmente"
npm install immer@^9.0.6 || echo "⚠️  immer: revisar manualmente"
npm install minimist@^1.2.6 || echo "⚠️  minimist: revisar manualmente"

# FASE 5: Audit fix automático
echo "🔧 Aplicando npm audit fix..."
npm audit fix || echo "⚠️  Algunos problemas requieren revisión manual"

echo ""
echo "🧪 Verificando instalación..."

# Verificar que las nuevas versiones se instalaron correctamente
echo "📋 Verificando versiones críticas instaladas:"
echo "   Axios: $(npm list axios --depth=0 2>/dev/null | grep axios || echo 'Error al verificar')"
echo "   Sass: $(npm list sass --depth=0 2>/dev/null | grep sass || echo 'Error al verificar')" 
echo "   React Scripts: $(npm list react-scripts --depth=0 2>/dev/null | grep react-scripts || echo 'Error al verificar')"

echo ""
echo "🔧 Probando compilación..."
echo "⏳ Esto puede tardar varios minutos..."

# Test de compilación
if npm run build; then
    echo "✅ Compilación exitosa"
else
    echo "❌ Error en la compilación - revisar logs arriba"
    echo "🔄 Para rollback:"
    echo "   cd .."
    echo "   git checkout pre-frontend-security-update-[timestamp]"
    echo "   cd client && npm ci"
    exit 1
fi

echo ""
echo "🔍 Ejecutando audit final..."
npm audit

echo ""
echo "✅ Remediación de seguridad del frontend completada"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Verificar estilos: revisar que los estilos SCSS siguen funcionando"
echo "   2. Probar desarrollo: npm start" 
echo "   3. Verificar API calls: probar conexión con backend"
echo "   4. Test completo: npm test"
echo ""
echo "⚠️  Posibles breaking changes a revisar:"
echo "   • Configuración de Webpack (React Scripts v5)"
echo "   • Sintaxis de Sass (diferencias menores con node-sass)"
echo "   • API de Axios (interceptors y configuración)"
echo ""
echo "🔄 Para rollback en caso de problemas:"
echo "   cd .."
echo "   git checkout pre-frontend-security-update-[timestamp]"
echo "   cd client && npm ci"
echo ""
echo "📁 Backups creados: package.json.backup-[timestamp] y package-lock.json.backup-[timestamp]" 