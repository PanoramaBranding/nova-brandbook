# CLAUDE.md — Nova Brand Book (reglas de este proyecto)

## Qué es esto
Manual de marca de NovaVenta, en formato web (no PDF), construido para ser legible
tanto por personas como por motores de IA: HTML semántico, metadata estructurada, y
un `llms.txt` / `brand.json` con los tokens de marca en texto plano (pendiente).
Ver **`context.md`** para el estado completo del proyecto (producción, decisiones,
bugs de contenido conocidos, pendientes) y `PLAN.md` para el historial detallado
ronda por ronda de QA.

## Siempre primero
- Este es el **sistema de diseño reutilizable** de Panorama — no solo el sitio de
  Nova. Los componentes (`src/components/`) y el layout deben mantenerse genéricos;
  el contenido específico de Nova vive en datos (`src/lib/`) y en cada `page.tsx`.
- Antes de tocar una sección nueva, llama a `get_design_context` de Figma sobre el
  nodo real (fileKey `UDHz26k3eXAPVtSqav0GGi` — ver nota abajo) — no inventes
  medidas, colores ni layout a partir del texto cacheado. **Esto no es opcional:**
  la ronda de QA del 2026-09-02 encontró 6+ secciones enteras mal construidas
  específicamente por saltarse este paso y asumir a partir de texto/metadata.
  El copy final vive en las capas de Figma (confirmado con Sofia).

## Fuente de Figma
- Archivo a usar: `NOVA BRANDBOOK GUIDELINES 2026 (Copy)` — fileKey
  `UDHz26k3eXAPVtSqav0GGi`. Es una copia que Sofia hizo en su propio team (plan
  Pro) específicamente para evitar el límite de llamadas del plan Starter del
  archivo original (fileKey `N55zKD9GQSbKa9hkHE2aq4` — **no usar ese**, ya se
  agotó su límite una vez).
- Cuenta MCP correcta: **diseno@panoramabranding.co** (no la personal). Si el MCP
  devuelve error de acceso, es porque el conector volvió a la cuenta equivocada —
  hay que reconectarlo desde la configuración de conectores.
- Ignorar la sección **"Archivo"** (`543:1131`) — son versiones viejas/duplicadas
  de Master Brand y Assets. La fuente real son los frames de nivel superior.
- Páginas **"04 DESIGN SYSTEM"** y **"05 SUBMARCA"** existen en el archivo (con
  numeración 4.x/5.x ya referenciada en el índice de Home y en el nav mobile) pero
  están **fuera de alcance por ahora** — ocultas del nav y del índice de Home.

## Flujo de verificación pixel-perfect
Adaptado del proyecto de portafolio (`~/Downloads/portafolio`) que Sofia pidió usar
como referencia:
1. `npm run dev` → http://localhost:3000
2. Tomar screenshot de la página en el navegador (herramienta Browser / Puppeteer).
3. Comparar contra el screenshot de Figma (`get_screenshot` del mismo nodo).
4. Ajustar espaciados/tipografía/color hasta que no haya diferencias visibles.
   Mínimo 2 rondas de comparación antes de dar una sección por terminada.
5. Repetir en mobile (375–390px) para las páginas que sí tienen diseño mobile.

## Design tokens
Ver `src/app/globals.css` — todos los colores son variables (`--color-azul-1`, etc.),
nunca hex sueltos en los componentes. La tipografía es **Plus Jakarta Sans** (Google
Fonts, licencia libre — confirmado, no hay que auto-hospedar archivos de fuente).

⚠️ **Azul I = `#2B7DF6`** (documentado en 3.1 Paleta cromática, confirmado con
Sofia el 2026-09-02). Las Variables de Figma ligadas a los componentes (Menu v1,
Botón) traen `#007EFA` — están desactualizadas, no las copies literalmente.

## Assets de Figma
Los assets exportados por el MCP expiran en ~7 días — cada vez que se descarga uno
para usarlo en el sitio, se guarda localmente en `public/brand/` de inmediato
(nunca referenciar la URL remota de Figma directamente en el código).

## Reglas duras
- No agregues secciones/páginas que no estén en el alcance confirmado con Sofia.
- No inventes colores, copy o cifras — si algo no está en Figma o no se pudo
  verificar, dilo explícitamente en vez de suponer.
- Si dos fuentes contradicen (ej. Variable de Figma vs. página de paleta), no
  promedies ni elijas por tu cuenta — pregunta.
