import { NextRequest, NextResponse } from "next/server";

/**
 * Protección con contraseña del brandbook (revisión interna / pre-entrega).
 *
 * Credenciales por VARIABLES DE ENTORNO, no hardcodeadas — así el cliente (o
 * el equipo) las cambia desde el panel de Vercel sin tocar el código:
 *   BRANDBOOK_USER  → usuario  (default "nova" si no se define)
 *   BRANDBOOK_PASS  → contraseña
 *
 * Comportamiento:
 *   - Si BRANDBOOK_PASS está vacío/no definido, el sitio queda ABIERTO (no
 *     bloquea). Esto evita dejar el sitio inaccesible por olvido; para
 *     protegerlo hay que definir BRANDBOOK_PASS en Vercel.
 *   - Si está definido, pide Basic Auth (el navegador muestra el diálogo de
 *     usuario/contraseña) y sólo deja pasar con las credenciales correctas.
 *
 * Corre en el Edge Runtime de Next; `atob` está disponible ahí.
 */
export function middleware(req: NextRequest) {
  const USER = process.env.BRANDBOOK_USER || "nova";
  const PASS = process.env.BRANDBOOK_PASS || "";

  // Sin contraseña configurada → no bloquear.
  if (!PASS) return NextResponse.next();

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(":");
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    } catch {
      // header malformado → cae al 401 de abajo
    }
  }

  return new NextResponse("Autenticación requerida.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Nova Brandbook", charset="UTF-8"',
    },
  });
}

export const config = {
  // Protege todo el sitio (incluidas las descargas en /brand), salvo los
  // assets internos de Next y el favicon. El navegador reenvía el header de
  // auth automáticamente, así que las descargas siguen funcionando una vez
  // autenticado.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
