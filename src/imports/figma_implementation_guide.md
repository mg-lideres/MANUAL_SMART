
# GUÍA DE IMPLEMENTACIÓN EN FIGMA
## Manual de Usuario SMART - Web Interactiva

---

## 📁 ARCHIVOS ENTREGABLES

1. **smart_manual_structure.json** - Estructura de datos completa
2. **Esta guía** - Instrucciones paso a paso

---

## 🎨 PALETA DE COLORES (Design Tokens)

| Token | Hex | Uso |
|-------|-----|-----|
| Primary | #757DE3 | Botones primarios, acentos, enlaces |
| Secondary | #77DEA2 | Éxito, completado, CTAs de contacto |
| Dark | #002461 | Texto principal, fondos oscuros |
| Light Gray | #F8F8F8 | Fondos de secciones, cards alternadas |
| White | #FFFFFF | Fondos de cards, superficies |
| Medium Gray | #959595 | Texto secundario, descripciones |

---

## 🏗️ ESTRUCTURA DE PÁGINAS EN FIGMA

### Página 1: Design System
- **Colors**: Frame con los 6 colores como estilos de color
- **Typography**: 
  - H1: 24px Bold #002461
  - H2: 18px SemiBold #757DE3
  - Body: 14px Regular #002461
  - Caption: 12px Regular #959595
- **Components**:
  - Button/Primary (bg: #757DE3, text: #FFFFFF, radius: 8px)
  - Button/Secondary (bg: #77DEA2, text: #002461, radius: 8px)
  - Button/Ghost (border: #757DE3, text: #757DE3)
  - Card/Default (bg: #FFFFFF, shadow: 0 2px 8px rgba(0,36,97,0.08), radius: 12px)
  - Card/Highlighted (bg: #757DE3, text: #FFFFFF)
  - Input/Default (border: #959595, focus: #757DE3)
  - Badge/Active (bg: #77DEA2, text: #002461)
  - Badge/Inactive (bg: #FF6B6B, text: #FFFFFF)

### Página 2: Home / Hero
- **Frame**: 1440px ancho (desktop) / 375px (mobile)
- **Hero Section**:
  - Background: #F8F8F8
  - Title: "Bienvenido a SMART" (H1)
  - Subtitle: "Tu guía interactiva..." (Body)
  - CTA Primary: "Explorar módulos" → scrollToModules
  - CTA Secondary: "Preguntas frecuentes" → scrollToFAQs
  - Illustration: Iconos de los 11 módulos en grid 3x4

### Página 3: Módulos (Grid)
- **Grid de tarjetas**: 3 columnas desktop / 1 columna mobile
- **Cada tarjeta**:
  - Icono (48x48px, color #757DE3)
  - Título (H2)
  - Descripción corta (Caption, 2 líneas máx)
  - Hover state: shadow aumentado, borde #757DE3
  - Click: navegación a página del módulo

### Páginas 4-14: Módulos Individuales (una por módulo)
Estructura por módulo:
```
Header (bg: #757DE3, text: #FFFFFF)
  ├── Icono + Título del módulo
  └── Breadcrumb: Inicio > Módulos > [Nombre]

Content
  ├── Quick Actions (botones principales)
  ├── Feature Cards (grid de características)
  ├── Step-by-Step (acordeón o tabs)
  └── Alerts/Tips (bg: #F8F8F8, borde izq: #77DEA2)

Footer Module
  └── "¿Necesitas ayuda con este módulo?" → Contacto
```

### Página 15: FAQs
- **Header**: "Preguntas Frecuentes"
- **Category Tabs**: Acceso | Asistencia | Solicitudes | Proyectos | Tareo | Configuraciones
- **Accordion Items**:
  - Inactivo: bg #FFFFFF, text #002461, icono ▶
  - Activo: bg #757DE3 10% opacity, text #757DE3, icono ▼
  - Respuesta: Body text, padding 16px

### Página 16: Footer / Contacto
- **Background**: #002461
- **Content**:
  - "¿Tienes alguna consulta o detectaste un inconveniente?"
  - Email: equipo.smart@materiagris.pe (color #77DEA2)
  - "¡Estamos para ayudarte!"
  - CTA: "Enviar correo" (bg: #77DEA2, text: #002461)

---

## 🔗 CÓMO IMPORTAR EL JSON A FIGMA

### Opción 1: Plugin "JSON to Figma" (Recomendado)
1. Instala el plugin **"JSON to Figma"** desde la comunidad de Figma
2. Abre el plugin (Plugins > JSON to Figma)
3. Selecciona "Import JSON"
4. Copia el contenido de **smart_manual_structure.json**
5. Pega en el campo de texto del plugin
6. El plugin generará automáticamente:
   - Frames por cada módulo
   - Text layers con títulos y descripciones
   - Estructura de navegación

### Opción 2: Plugin "Data Supplier"
1. Instala **"Data Supplier"**
2. Carga el JSON como fuente de datos
3. Aplica a componentes existentes usando {meta.project_name}, {modules[0].title}, etc.

### Opción 3: Manual con Copy-Paste Estructurado
1. Abre el JSON en un editor
2. Copia sección por sección:
   - Módulos → Páginas de módulos
   - FAQs → Componentes de acordeón
   - Contact → Footer
3. Pega como texto en Figma y formatea

---

## 🧩 COMPONENTES REUTILIZABLES A CREAR

### Componente: ModuleCard
```
Variantes:
├── Default (bg: #FFFFFF)
├── Hover (shadow aumentado, border: #757DE3)
├── Active (bg: #757DE3, text: #FFFFFF)
└── Disabled (opacity: 0.5)

Propiedades:
- Icono: Instance swap (11 opciones)
- Título: Texto
- Descripción: Texto
- Estado: Default/Hover/Active/Disabled
```

### Componente: FAQItem
```
Variantes:
├── Collapsed (icono ▶)
└── Expanded (icono ▼, muestra respuesta)

Propiedades:
- Pregunta: Texto
- Respuesta: Texto
- Categoría: Texto (para filtrado)
- Estado: Collapsed/Expanded
```

### Componente: StepCard
```
Estructura:
├── Número de paso (circle, bg: #757DE3, text: #FFFFFF)
├── Título del paso (H3)
├── Descripción (Body)
└── Alerta opcional (bg: #F8F8F8, border-left: #77DEA2)
```

---

## 📱 RESPONSIVE BREAKPOINTS

| Breakpoint | Ancho | Layout |
|------------|-------|--------|
| Mobile | 375px | 1 columna |
| Tablet | 768px | 2 columnas |
| Desktop | 1440px | 3 columnas |

---

## 🎭 INTERACCIONES Y PROTOTIPADO

### Home → Módulo
- Trigger: Click en ModuleCard
- Action: Navigate to → Página del módulo
- Animation: Smart animate, ease-out, 300ms

### FAQ Accordion
- Trigger: Click en FAQItem
- Action: Open overlay / Change variant
- Animation: Height auto-animate, 200ms

### Scroll to Section
- Trigger: Click en CTA Hero
- Action: Scroll to → Frame destino
- Animation: Smooth scroll

### Hover States
- ModuleCard: shadow 0 4px 16px rgba(117,125,227,0.2)
- Buttons: brightness 1.1
- Links: underline + color shift

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

- [ ] Crear Design System con colores y tipografía
- [ ] Crear componentes reutilizables (ModuleCard, FAQItem, StepCard)
- [ ] Diseñar página Home/Hero
- [ ] Diseñar grid de módulos (11 tarjetas)
- [ ] Diseñar página individual por cada módulo (11 páginas)
- [ ] Diseñar página de FAQs con acordeón
- [ ] Diseñar footer de contacto
- [ ] Configurar prototipado y navegación
- [ ] Aplicar responsive en breakpoints
- [ ] Revisar contraste de accesibilidad (WCAG AA)

---

## 🚀 PUBLICACIÓN CON FIGMA MAKE (Dev Mode)

1. Activa **Dev Mode** (toggle en esquina superior derecha)
2. Selecciona frames para exportar
3. Genera código:
   - CSS para estilos
   - React/Vue components
   - SVG para iconos
4. Comparte link de desarrollo:
   - File > Share > Copy link
   - Permisos: "Anyone with the link can view"
5. Para handoff:
   - Usa "Inspect" tab para ver specs
   - Exporta assets en 1x, 2x, 3x
   - Copia CSS directamente

---

## 📧 INFORMACIÓN DE CONTACTO PARA LA WEB

```
¿Tienes alguna consulta o detectaste un inconveniente?
📧 equipo.smart@materiagris.pe
¡Estamos para ayudarte!
```

Diseño del footer:
- Background: #002461
- Texto principal: #FFFFFF
- Email: #77DEA2 (con hover: underline)
- CTA button: bg #77DEA2, text #002461

---

## 🎯 CONSEJOS DE UX PARA HACERLA LÚDICA

1. **Micro-interacciones**: 
   - Iconos animados al hover (escala 1.1)
   - Checkmarks verdes (#77DEA2) al completar sección
   - Progress bar suave en lectura

2. **Gamificación ligera**:
   - "Módulo completado" con badge
   - Contador de secciones leídas
   - Indicador de progreso global

3. **Búsqueda predictiva**:
   - Barra de búsqueda global en header
   - Sugerencias en tiempo real
   - Highlight de término encontrado

4. **Modo oscuro** (opcional):
   - Background: #002461
   - Cards: #1a1a2e
   - Texto: #F8F8F8
   - Acentos: #757DE3, #77DEA2

---

✅ **Listo para implementar en Figma!**
