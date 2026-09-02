# Nova Brand Book — Plan y contexto del proyecto

Última actualización: 2026-09-02.

## Qué es esto
Manual de marca de NovaVenta en formato web (reemplaza el PDF tradicional),
diseñado en Figma y llevado a código. Doble objetivo: (1) verse muy bien para
personas, (2) ser fácil de leer para motores de IA (HTML semántico + datos
estructurados), de forma que un cliente pueda pasarle el link a Claude/ChatGPT
y la IA entienda la marca con precisión.

Este proyecto es además la base de un **sistema reutilizable**: los componentes
y el patrón de navegación deben poder reusarse para el próximo manual de marca
de otro cliente, separando "sistema" (componentes, layout, tokens) de
"contenido" (copy e imágenes de Nova).

## Decisiones confirmadas con Sofia (2026-09-02)
| Tema | Decisión |
|---|---|
| Stack | Next.js (App Router) + TypeScript + Tailwind CSS v4 |
| Alcance | Sistema reutilizable — componentes extraídos de Figma, contenido de Nova separado |
| Hosting | Vercel |
| Assets mobile | Sin diseño mobile en Figma — se extrapola el patrón de las otras páginas, a validar por diseño después |
| Copy | Directo de las capas de Figma (no hay documento de copy aparte) |
| Capa IA-readable | HTML semántico + JSON-LD (schema.org) + `llms.txt`/`brand.json` — **pendiente de construir** |
| Fuente | Plus Jakarta Sans — Google Fonts, licencia libre. Confirmado en 3.5 Fuentes tipográficas del propio archivo. Sin problema de licencia. |
| Azul I (color principal) | `#2B7DF6` — el documentado en 3.1 Paleta cromática. Las Variables de Figma ligadas a componentes (`#007EFA`) están desactualizadas. |
| Páginas 04/05 (Design System / Submarca) | Fuera de alcance por ahora — ocultas del nav y del índice de Home. Existen en Figma, numeradas 4.x/5.x, para una fase futura. |
| Sección "Archivo" en Figma | Ignorar — son versiones viejas/duplicadas de Master Brand y Assets. |

## Fuente de Figma
- Archivo: `NOVA BRANDBOOK GUIDELINES 2026`
- fileKey: `N55zKD9GQSbKa9hkHE2aq4`
- Cuenta MCP: **diseno@panoramabranding.co**

## Sitemap (rutas y anchors)
El menú lateral sticky (componente Figma "Menu v1") es un acordeón: solo la
página activa expande su submenú; el sub-ítem visible en pantalla se resalta
(scroll-spy vía IntersectionObserver — comportamiento no especificado
literalmente en Figma, es una adición de interacción razonable sobre el
diseño existente).

- `/` — **Home** (nodo `1:2`). Hero + bienvenida + Índice completo (solo 01-03) + Footer. ✅ Construido.
- `/estrategia` — **01 Brand Tree** (nodo `509:912`). 1.1 Brand Tree + Where/Who/What/Why/How. 🚧 Placeholder de estructura.
- `/master-brand` — **02 Master Brand** (nodo `99:283`). 2.1–2.14. 🚧 Placeholder de estructura.
- `/assets` — **03 Brand Assets** (nodo `214:273`). 3.1–3.13, agrupado en Color/Tipografía/Fotografía/Iconografía/Tags/Layouts. 🚧 Placeholder de estructura.

Datos del sitemap centralizados en `src/lib/nav-data.ts` — única fuente de verdad
para el nav Y el índice de Home (evita duplicar contenido).

## Componentes extraídos de Figma ("Componentes" — nodo `552:2735`)
| Figma | Código | Estado |
|---|---|---|
| Menu v1 (5 variantes) | `src/components/Nav.tsx` | ✅ Construido — acordeón + scroll-spy + sticky |
| Boton (2 variantes) | `src/components/Button.tsx` | ✅ Construido, aún sin usar en ninguna página real |
| Hero / Hero mobile | — | Extraído para Home (`HeroMark.tsx`), falta versión mobile |
| Footer / Footer mobile | — | Extraído para Home, falta versión mobile |
| Titulo, Quote, Diagrama, fondo nova | — | Pendientes — se extraen cuando se construya Estrategia/Master Brand |

## Progreso
- [x] Scaffold Next.js 16 + TypeScript + Tailwind v4
- [x] Design tokens (`src/app/globals.css`) — paleta completa + Plus Jakarta Sans
- [x] Nav sticky con acordeón + scroll-spy, validado en navegador (Home → Master Brand → Assets → Estrategia)
- [x] Button component (spec extraída, no usado aún)
- [x] Home completo (desktop) — hero, bienvenida, índice, footer
- [x] Nav mobile (hamburguesa + panel, diseño propio — ver nota abajo)
- [x] Home/Estrategia/Master Brand/Assets responsive a 375px (reflow con Tailwind; no verificado pixel-perfect contra los frames "* - Mobile" de Figma todavía)
- [x] Estrategia — contenido real completo (desktop), scroll-spy corregido (ver Notas técnicas)
- [x] Master Brand — contenido real completo (desktop), placeholders explícitos en piezas visuales (diagramas, ejemplos de uso incorrecto)
- [x] Assets — contenido real completo (desktop): paleta con swatches reales, tipografía viva (Plus Jakarta Sans), pilares de diseño completos, sistema fotográfico con prompts de IA incluidos (decisión de Sofia: sí van públicos); placeholders en piezas puramente visuales (diagramas de retícula, ejemplos de contraste, set de íconos, fotos de referencia)
- [ ] Mobile de Estrategia y Master Brand (Assets no tiene mobile — confirmado con Sofia)
- [ ] `llms.txt` / `brand.json` con tokens de marca en texto plano
- [ ] JSON-LD (schema.org) embebido por página
- [ ] Favicon con la marca Nova (hoy usa el favicon por defecto de Next.js)
- [ ] Repo en GitHub + conectar a Vercel para despliegue automático
- [ ] QA de interacciones (hover, focus, mobile) con script tipo `qa.mjs` del portafolio

## ⚠️ Bloqueo activo: límite de llamadas del MCP de Figma
La cuenta diseno@panoramabranding.co está en plan **Starter**, que tiene un límite
bajo de llamadas al MCP de Figma — se agotó el 2026-09-02 durante la construcción
de Estrategia. Mientras siga activo, no puedo extraer más medidas/colores/capturas
frescas de Figma (afecta sobre todo a Master Brand y Assets, que son mucho más
grandes y van a necesitar muchas más llamadas que Estrategia). Opciones: subir de
plan (link de Figma: team 1668749334268099081, "upgrade=mcp_rate_limit_paywall")
o esperar el reset (no confirmado cada cuánto ocurre). Sofia decidió seguir
construyendo con el contenido ya cacheado mientras tanto.

## Notas técnicas
- **Scroll-spy corregido (2026-09-02):** la primera versión usaba
  `IntersectionObserver` con una banda delgada (`rootMargin: -15%/-70%`), que
  fallaba en secciones largas (ej. "What", con 6 ítems) — el resaltado del nav se
  quedaba pegado en la sección anterior porque la banda de detección salía de la
  sección activa antes de entrar a la siguiente. Se cambió a un cálculo por
  posición de scroll (`getBoundingClientRect().top` contra una línea fija de
  160px, con `requestAnimationFrame` para no recalcular en cada frame) — más
  robusto para secciones de cualquier largo. Validado en `/estrategia` navegando
  por las 5 etapas completas.

## Nav mobile (resuelto 2026-09-02 — diseño propio, no extraído de Figma)
Verifiqué en el archivo cacheado que **ninguno de los frames mobile en Figma
tiene equivalente del nav** (ni "Menu v1" ni un "Menu mobile" en la sección de
Componentes) — el diseño mobile solo cubre el reflow del contenido, no la
navegación. Igual que en el proyecto de portafolio, diseñé el patrón desde
cero: barra superior sticky (logo + botón hamburguesa) que abre un panel
pantalla completa con el mismo acordeón/scroll-spy del desktop. Construido y
probado en `/`, `/estrategia`, `/master-brand`, `/assets` a 375px — el toggle,
la navegación y el cierre automático al elegir un ítem funcionan bien.
**Pendiente:** que el equipo de diseño valide este patrón (o traiga uno propio
de Figma) cuando se retome el trabajo allá.

## Notas de contenido a verificar con el equipo de diseño (no corregidas por mi cuenta)
- En la página 03 Assets, el título de sección "3.6 Jerarquías" aparece etiquetado
  como "3.5" en el frame de contenido (duplicado con "3.5 Fuentes tipográficas").
  El nav ("Menu v1") sí trae la numeración correcta (3.5/3.6/3.7) — usé esa como
  fuente de verdad para el código, pero vale la pena corregir el heading en Figma.
- En "Colores secundarios" (3.1), hay un tono muy claro (`#DCEFFF`) etiquetado
  también como "Azul I" — duplicado con el color principal. Lo traté como un tono
  aparte (`--color-azul-tint`) sin nombre propio.
- En el submenú de Estrategia, "Where" y "Who" comparten el mismo subtítulo
  ("Assessing the landscape") — así está en Figma, se usó tal cual (copy = fuente
  de verdad), pero probablemente sea un error de copy/paste del equipo de diseño.

## Cómo correr el proyecto
```bash
npm run dev   # http://localhost:3000
```
