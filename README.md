# AgilShop Digital

Landing page moderna, optimizada para SEO y conversión, construida con HTML/CSS/JS vanilla (sin frameworks).

## 📁 Estructura

```
prongando ollama/
├── index.html                  HTML semántico + SEO + JSON-LD
├── assets/
│   ├── style.css               Estilos (dark + light, responsive, animaciones)
│   ├── script.js               Interacciones (reveal, forms, theme, nav)
│   ├── favicon.svg             Ícono del sitio
│   └── img/
│       ├── logo.svg            Wordmark AgilShop Digital
│       ├── og-image.svg        Open Graph 1200×630
│       ├── hero-illustration.svg
│       └── client-1.svg … client-6.svg
└── README.md
```

## 🚀 Uso local

### Opción 1: doble click
Abre `index.html` directamente en tu navegador. Funciona sin servidor.

### Opción 2: servidor local (recomendado)
Para que el sitio se vea exactamente como en producción:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000`.

## 🌐 Deploy

### Netlify Drop (más fácil, sin cuenta)
1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta completa
3. Tendrás una URL pública en 10 segundos

### Netlify / Vercel / GitHub Pages
1. Sube el repositorio a GitHub
2. Conecta el repo en Netlify, Vercel o habilita GitHub Pages
3. No requiere build command ni framework

## ✏️ Dónde editar

| Quiero cambiar… | Archivo / sección |
|---|---|
| Nombre, descripción, keywords | `<head>` de `index.html` (title, meta description, JSON-LD) |
| Headline y copy del hero | Sección `.hero` en `index.html` |
| Precios y planes | Sección `.pricing` en `index.html` |
| Preguntas frecuentes | Sección `.faq` en `index.html` |
| Colores de la paleta | Variables CSS en `assets/style.css` (`--violet`, `--cyan`, `--pink`, etc.) |
| Tipografías | `<link>` de Google Fonts en `<head>` y `--font-sans` / `--font-mono` en CSS |
| Form action del lead | Función `handleLeadForm` en `assets/script.js` (línea comentada) |
| Año del copyright | Automático (JS detecta el año actual) |

## 🔌 Conectar el formulario a un servicio real

Por defecto, los formularios simulan el éxito. Para capturar emails reales, edita `assets/script.js` dentro de `handleLeadForm`. Opciones populares:

- **Mailchimp**: `https://<dc>.list-manage.com/subscribe/post?u=...&id=...`
- **ConvertKit / Kit**: `https://app.convertkit.com/forms/<id>/subscriptions`
- **EmailJS** (sin backend): `emailjs.send(...)`
- **Tu propio backend**: `fetch('/api/leads', { method: 'POST', body: JSON.stringify({ email }) })`

## ✅ Checklist SEO pre-lanzamiento

Antes de publicar, completa esto:

- [ ] Reemplazar `https://agilshop.digital/` por tu dominio real en:
  - `<link rel="canonical">`
  - `og:url`, `og:image`, `og:image:secure_url`
  - `twitter:image`
  - Bloques JSON-LD (`@id` y `url`)
- [ ] Sustituir `assets/img/og-image.svg` por una versión `.png` o `.jpg` (algunos clientes sociales no soportan SVG)
- [ ] Reemplazar `hola@agilshop.digital` y `+34-900-000-000` en JSON-LD por datos reales
- [ ] Actualizar `areaServed` con tus países objetivo
- [ ] Crear `robots.txt` y `sitemap.xml`
- [ ] Añadir Google Search Console y Bing Webmaster Tools
- [ ] Reemplazar logos de cliente en `assets/img/client-1.svg` … `client-6.svg` por logos reales (mismo formato: SVG, alto contraste, fondo transparente)
- [ ] Sustituir testimonios por citas reales de clientes (con su permiso)
- [ ] Añadir favicon `.ico` de 32×32 para compatibilidad legacy (opcional, el SVG ya funciona en navegadores modernos)

## 🧪 Validación recomendada

| Herramienta | URL | Qué valida |
|---|---|---|
| W3C HTML Validator | https://validator.w3.org/ | HTML semántico correcto |
| Schema.org Validator | https://validator.schema.org/ | JSON-LD |
| Google Rich Results | https://search.google.com/test/rich-results | FAQ elegible |
| PageSpeed Insights | https://pagespeed.web.dev/ | Performance, SEO, accesibilidad |
| axe DevTools | Extensión Chrome | Accesibilidad WCAG |
| WAVE | https://wave.webaim.org/ | Accesibilidad |
| OpenGraphCheck | https://www.opengraphcheck.com/ | Preview de redes sociales |

**Objetivo de calidad:** 90+ en las 4 categorías de Lighthouse (Performance, Accessibility, Best Practices, SEO).

## 🎨 Personalización rápida

### Cambiar el color principal (violeta → tu color)
En `assets/style.css`, busca `:root` y reemplaza:
```css
--violet: #8b5cf6;      /* tu color principal -->
--violet-deep: #6d28d9;  /* tono oscuro */
--violet-soft: #c4b5fd;  /* tono claro para texto */
```

### Cambiar los precios
En `index.html`, busca la sección `<!-- Pricing -->` y edita los números en `pricing-card__amount` y `pricing-card__period`. Mantén sincronizado el JSON-LD (`hasOfferCatalog`).

### Cambiar la disponibilidad / cupos
En `index.html`:
- "Este mes solo aceptamos 8 proyectos nuevos" → tu número
- "Quedan 3 cupos" → tu número
- Cambia también el mes si es necesario

## 📊 Estructura de conversión

La landing sigue un embudo clásico en 14 secciones:

1. Header/Nav sticky
2. Hero (propuesta + CTA + lead capture)
3. Social proof (logos de clientes)
4. Problema → Solución
5. Beneficios (4 cards)
6. Servicios detallados
7. Proceso (4 pasos)
8. Testimonios (3 citas)
9. Pricing (3 tiers)
10. FAQ (6 preguntas con JSON-LD)
11. Garantía
12. CTA final (urgencia + lead capture)
13. Footer
14. Sticky CTA mobile (solo < 768px)

## 🛠️ Stack técnico

- **HTML5** semántico (sin frameworks)
- **CSS3** con variables, grid, flexbox, `backdrop-filter`, `clip-path`, animaciones
- **JavaScript** vanilla (ES6+), sin dependencias
- **Google Fonts**: Inter + JetBrains Mono
- **SVG** inline y como archivos sueltos (cero imágenes raster)
- **JSON-LD** para datos estructurados (Organization + Service + FAQPage)

## 📝 Licencia

© 2026 AgilShop Digital. Todos los derechos reservados.

## 🤖 Claude Code Guidance

This project includes a `CLAUDE.md` file that provides guidance to Claude Code (claude.ai/code) when working with this repository. It contains project overview, development commands, architecture, and key modification points. Keep this file to ensure Claude Code understands the project structure and can assist effectively.