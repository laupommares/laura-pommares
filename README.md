# Laura Pommarés — Portfolio & CV

Sitio personal hecho con Next.js 16 (App Router), React 19, Tailwind CSS 4 y next-intl.
Incluye el portfolio en `/` y una versión imprimible del CV en `/cv`, ambos en español e inglés.

## Requisitos

- Node.js 20+
- Google Chrome (solo para generar los PDFs del CV)

## Levantar el proyecto

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Comandos

| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `npm run cv` | Regenera los PDFs del CV |

## Editar el contenido

Todos los textos viven en `messages/es.json` y `messages/en.json`. **Los componentes no tienen
texto hardcodeado**: para cambiar experiencia, proyectos, educación o certificaciones se editan
esos dos archivos y las dos páginas (portfolio y CV) se actualizan solas.

Las dos claves tienen que tener la misma estructura. Si agregás un ítem en uno, agregalo en el otro.

El idioma se guarda en una cookie (`locale`), no en la URL. Ver `src/i18n/`.

## Regenerar los PDFs del CV

Los PDFs que descarga el botón "Descargar CV" son archivos estáticos en `public/`:

- `public/cv-laura-pommares.pdf` (español)
- `public/cv-laura-pommares-en.pdf` (inglés)

**No se actualizan solos.** Cada vez que cambies contenido en `messages/` o el diseño de `/cv`,
hay que regenerarlos:

```bash
npm run cv
```

El script (`scripts/generate-cv-pdf.mjs`) hace un build, levanta un server en el puerto 4321,
abre `/cv` en Chrome headless para cada idioma e imprime a PDF. Después de correrlo, commiteá
los PDFs actualizados.

Si ya tenés un server corriendo, podés reusarlo:

```bash
CV_BASE_URL=http://localhost:3000 npm run cv
```

Variables opcionales: `CV_PORT` (puerto del server temporal, por defecto 4321) y `CHROME_PATH`
(ruta al binario de Chrome si no es `google-chrome`).

## Estructura

```
messages/          Textos en es/en — acá se edita el contenido
public/            Imágenes de proyectos y los PDFs del CV
scripts/           generate-cv-pdf.mjs (npm run cv)
src/app/           layout, home (/) y la página del CV (/cv + print.css)
src/components/    Secciones del portfolio
src/i18n/          Configuración de next-intl y cambio de idioma
```

## Deploy

Desplegado en Vercel. Cada push a `main` publica automáticamente.

## AGENTS.md / CLAUDE.md

Archivos de instrucciones para asistentes de IA (Claude Code, Cursor, etc.), no afectan al build.
`AGENTS.md` es el formato estándar que leen varias herramientas; `CLAUDE.md` solo lo importa
con `@AGENTS.md` para que Claude Code lea el mismo archivo y no haya dos copias que se
desincronicen.
