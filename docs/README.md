# 📚 Documentación del Proyecto SnipPrompt

## 🔒 **ALERTA DE SEGURIDAD CRÍTICA**
**Estado**: 🔴 **CRÍTICO** - 211 vulnerabilidades detectadas (19 críticas)  
**Acción requerida**: [📋 Ver Plan de Remediación](security-audit-plan.md)  
**Fecha límite**: 02/07/2025

| Componente | Críticas | Altas | Moderadas | Bajas | Total |
|------------|----------|-------|-----------|-------|-------|
| Backend    | 5        | 15    | 10        | 4     | **34** |
| Frontend   | 14       | 49    | 109       | 5     | **177** |

### 🚨 Scripts de Remediación Automática
```bash
# Backend (Vulnerabilidades críticas) - ✅ COMPLETADO
./fix-security-backend.sh

# Frontend (Incluye breaking changes) - ✅ COMPLETADO  
./fix-security-frontend.sh
```

### 🔧 Problemas Post-Actualización Resueltos
- ✅ **Webpack 5 Polyfills**: [Ver solución completa](webpack5-polyfills-fix.md)
- ✅ **React Scripts v5**: Configuración CRACO implementada
- ✅ **Micromark compatibility**: Todos los errores de `assert` resueltos

---

Esta carpeta contiene toda la documentación relacionada con el desarrollo y mantenimiento del proyecto SnipPrompt.

## 📁 Estructura de Documentación

### ⚠️ Seguridad (PRIORITARIO)
- **[🔒 security-audit-plan.md](./security-audit-plan.md)** - **CRÍTICO** - Plan de remediación de vulnerabilidades
- **[troubleshooting.md](./troubleshooting.md)** - Solución de problemas comunes

### Planes de Desarrollo
- **[user-management-plan.md](./user-management-plan.md)** - Plan completo para implementar gestión de usuarios

### Configuración y Desarrollo
- **[development-setup.md](./development-setup.md)** - ⚠️ **REGLAS OBLIGATORIAS** de desarrollo con Docker

### Documentación Futura (A crear según necesidad)
- `api-documentation.md` - Documentación de endpoints de API
- `deployment-guide.md` - Guía de despliegue en producción
- `architecture-overview.md` - Visión general de la arquitectura
- `database-schema.md` - Esquema y relaciones de base de datos
- `testing-strategy.md` - Estrategia y guías de testing

## ⚠️ **IMPORTANTE: Reglas de Desarrollo**

### 🚨 Regla Principal de Seguridad
- ✅ **EJECUTAR scripts de seguridad ANTES de desarrollar**
- ✅ **Solo desarrollo con Docker** (docker-compose.working.yml)
- ❌ **NO usar npm run dev directamente**
- ❌ **NO desarrollar con vulnerabilidades críticas**

**ANTES DE DESARROLLAR**, lee obligatoriamente: **[development-setup.md](./development-setup.md)**

## 🎯 Cómo Usar Esta Documentación

### Para Desarrolladores (FLUJO OBLIGATORIO)
1. **🔒 SEGURIDAD PRIMERO**: [security-audit-plan.md](./security-audit-plan.md) - Ejecutar scripts de remediación
2. **📖 LEER**: [development-setup.md](./development-setup.md) - Configuración obligatoria
3. **Consultar planes**: Revisar los planes de implementación antes de comenzar features
4. **Seguir progreso**: Usar los checkboxes en los planes para marcar progreso
5. **Documentar cambios**: Añadir notas y problemas encontrados en las secciones correspondientes

### Para Project Managers
1. **🔒 Prioridad Seguridad**: Verificar que vulnerabilidades críticas estén resueltas
2. **Tracking**: Los planes incluyen checkboxes para seguimiento de progreso
3. **Estimaciones**: Cada plan incluye cronogramas y métricas de éxito
4. **Riesgos**: Documentar problemas en las secciones de notas

## 📝 Convenciones

### Formato de Documentos
- **Markdown**: Todos los documentos en formato `.md`
- **Emojis**: Usar emojis para mejor legibilidad visual
- **Checkboxes**: `- [ ]` para tareas pendientes, `- [x]` para completadas
- **Secciones de Notas**: Incluir espacios para documentar problemas y soluciones

### Naming Convention
- `kebab-case` para nombres de archivos
- Fechas en formato `YYYY-MM-DD`
- Versiones en formato `vX.Y.Z`

## 🔄 Mantenimiento

### Automatización de Seguridad
```bash
# Monitoreo semanal automático
npm audit --json | jq '.metadata.vulnerabilities.total'

# CI/CD: Fallar si vulnerabilidades críticas > 0
npm audit --audit-level critical
```

### Actualización de Documentos
- Actualizar fecha de "Última actualización" al modificar documentos
- Incrementar versión del documento en cambios significativos
- Mantener historial de cambios cuando sea relevante
- **Documentar vulnerabilidades resueltas**

### Archivado
- Documentos obsoletos se mueven a carpeta `docs/archive/`
- Mantener al menos la última versión de cada tipo de documento
- **Guardar reportes de seguridad históricos**

## 📋 Responsabilidades

### Desarrollador Principal
- **Mantener seguridad actualizada** (máximo 48h para críticas)
- Mantener documentación técnica actualizada
- Revisar y aprobar cambios en planes de desarrollo
- Documentar decisiones arquitectónicas importantes

### Equipo de Desarrollo
- **🔒 Ejecutar scripts de seguridad antes de desarrollar**
- **Seguir reglas de Docker** establecidas en development-setup.md
- Marcar progreso en checklists de planes
- Documentar problemas y soluciones encontradas
- Proponer mejoras a los procesos documentados
- **Reportar nuevas vulnerabilidades inmediatamente**

---

## 🆘 Contacto de Emergencia

**Para vulnerabilidades críticas:**
- Desarrollador: danielgap
- Escalación: Si vulnerabilidades críticas > 48h sin resolver
- **Estado actual**: 🔴 CRÍTICO - 19 vulnerabilidades críticas detectadas

---

**⚠️ Nota Importante**: 
1. **SEGURIDAD ES PRIORIDAD #1** - No desarrollar con vulnerabilidades críticas
2. La configuración Docker es **OBLIGATORIA** - no se aceptan PRs desarrollados localmente
3. Esta documentación es un documento vivo que debe evolucionar con el proyecto

*Última actualización: 25/06/2025*  
*Estado de seguridad: 🔴 CRÍTICO - [Ver plan de remediación](security-audit-plan.md)* 