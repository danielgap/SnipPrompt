# 🔒 Script de Verificación de Seguridad - SnipPrompt
# Fecha: 25/06/2025
# Compatible con Windows PowerShell

Write-Host "🔍 Verificando estado de seguridad de SnipPrompt..." -ForegroundColor Cyan
Write-Host ""

# Verificar estructura del proyecto
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: Ejecuta este script desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

Write-Host "📊 RESUMEN DE VULNERABILIDADES" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Yellow

# Backend audit
Write-Host "🔧 Backend:" -ForegroundColor White
try {
    $backendAudit = npm audit --json 2>$null | ConvertFrom-Json
    $backendVulns = $backendAudit.metadata.vulnerabilities
    Write-Host "   Críticas: $($backendVulns.critical)" -ForegroundColor Red
    Write-Host "   Altas: $($backendVulns.high)" -ForegroundColor Yellow
    Write-Host "   Moderadas: $($backendVulns.moderate)" -ForegroundColor Blue
    Write-Host "   Bajas: $($backendVulns.low)" -ForegroundColor Green
    Write-Host "   TOTAL: $($backendVulns.total)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Error al obtener datos de backend" -ForegroundColor Red
}

Write-Host ""

# Frontend audit
Write-Host "⚛️  Frontend:" -ForegroundColor White
try {
    Set-Location "client"
    $frontendAudit = npm audit --json 2>$null | ConvertFrom-Json
    $frontendVulns = $frontendAudit.metadata.vulnerabilities
    Write-Host "   Críticas: $($frontendVulns.critical)" -ForegroundColor Red
    Write-Host "   Altas: $($frontendVulns.high)" -ForegroundColor Yellow
    Write-Host "   Moderadas: $($frontendVulns.moderate)" -ForegroundColor Blue
    Write-Host "   Bajas: $($frontendVulns.low)" -ForegroundColor Green
    Write-Host "   TOTAL: $($frontendVulns.total)" -ForegroundColor White
    Set-Location ".."
} catch {
    Set-Location ".."
    Write-Host "   ❌ Error al obtener datos de frontend" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 RECOMENDACIONES DE ACCIÓN" -ForegroundColor Magenta
Write-Host "=================================" -ForegroundColor Magenta

$totalCritical = ($backendVulns.critical ?? 0) + ($frontendVulns.critical ?? 0)
$totalHigh = ($backendVulns.high ?? 0) + ($frontendVulns.high ?? 0)

if ($totalCritical -gt 0) {
    Write-Host "🚨 CRÍTICO: $totalCritical vulnerabilidades críticas detectadas" -ForegroundColor Red
    Write-Host "   Acción: Ejecutar scripts de remediación INMEDIATAMENTE" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Backend:  ./fix-security-backend.sh" -ForegroundColor White
    Write-Host "   Frontend: ./fix-security-frontend.sh" -ForegroundColor White
    Write-Host ""
    Write-Host "   📋 Ver plan completo: docs/security-audit-plan.md" -ForegroundColor Yellow
} elseif ($totalHigh -gt 0) {
    Write-Host "⚠️  ALTO: $totalHigh vulnerabilidades altas detectadas" -ForegroundColor Yellow
    Write-Host "   Acción: Programar remediación en las próximas 48h" -ForegroundColor Yellow
} else {
    Write-Host "✅ Estado aceptable - Solo vulnerabilidades moderadas/bajas" -ForegroundColor Green
}

Write-Host ""
Write-Host "📚 DOCUMENTACIÓN" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "• Plan de seguridad: docs/security-audit-plan.md"
Write-Host "• Scripts automáticos: fix-security-*.sh"
Write-Host "• Documentación: docs/README.md"

Write-Host ""
Write-Host "🔄 COMANDOS ÚTILES" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "• Audit backend:  npm audit"
Write-Host "• Audit frontend: cd client && npm audit"
Write-Host "• Fix automático: npm audit fix"
Write-Host "• Docker start:   ./start-dev.sh"

Write-Host ""
Write-Host "📞 CONTACTO DE EMERGENCIA" -ForegroundColor Red
Write-Host "=================================" -ForegroundColor Red
Write-Host "Desarrollador: danielgap"
Write-Host "Escalación: Vulnerabilidades críticas > 48h"
Write-Host ""

if ($totalCritical -gt 0) {
    Write-Host "⚠️  NO DESARROLLAR HASTA RESOLVER VULNERABILIDADES CRÍTICAS" -ForegroundColor Red -BackgroundColor Yellow
} 