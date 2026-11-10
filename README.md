# JOTAIZA — jotaiza.com

Sitio web profesional, sobrio y editorial para los servicios independientes de **Juan Carlos Otaiza**:
1. **Administración funcional y operativa de plataformas Moodle.**
2. **Transformación de manuales y documentación técnica en cursos e-learning.**

Diseñado con identidad editorial sobria para generar confianza en academias, centros de formación, consultoras y empresas en España.

---

## 1. Características técnicas

- **Tecnologías puras:** HTML5 semántico, CSS3 moderno y JavaScript vanilla.
- **Sin dependencias ni compilación:** No utiliza React, Vue, Next.js, Bootstrap, Tailwind ni gestores de contenido. Carga instantánea y máxima compatibilidad.
- **Sin rastreo ni cookies invasivas:** No requiere banner de cookies al no emplear tecnologías publicitarias ni analíticas de terceros.
- **Accesibilidad WCAG:** Altos ratios de contraste (superan WCAG AA y AAA), navegación por teclado, enlace directo para saltar al contenido principal y diálogos nativos HTML5.
- **SEO & Metadatos:** Open Graph, Twitter Cards, títulos jerárquicos y URL canónica preparada para `https://jotaiza.com/`.
- **Publicación directa:** Compatible de forma nativa con **GitHub Pages**.

---

## 2. Estructura de archivos

```text
JOTAIZA/
├── CNAME                  # Dominio personalizado para GitHub Pages (jotaiza.com)
├── index.html             # Estructura semántica completa del sitio de una sola página
├── README.md              # Documentación detallada de edición y publicación
├── css/
│   └── styles.css         # Hoja de estilos editorial con variables CSS centralizadas
├── js/
│   └── main.js           # Comportamiento accesible (menú móvil, modales, copiado)
└── assets/
    ├── favicon.svg        # Favicon vectorial con la identidad JOTAIZA
    ├── logo.svg           # Marca tipográfica en formato vectorial
    └── og-image.svg       # Imagen para previsualizaciones en redes (1200x630)
```

---

## 3. Paleta cromática oficial

Los colores están centralizados como variables CSS en el bloque `:root` de [`css/styles.css`](css/styles.css):

| Variable | Código Hex | Aplicación y función en el diseño |
| :--- | :--- | :--- |
| `--color-petroleo` | `#263B3D` | Encabezados principales, navegación, fondos de contraste y estructura. |
| `--color-arcilla` | `#A85D43` | Botones de llamada a la acción (CTA), puntos de acento y enlaces activos. |
| `--color-marfil` | `#F2EBDD` | Fondo principal editorial de la página. |
| `--color-carbon` | `#292B2A` | Texto de lectura general con alto contraste. |
| `--color-oliva` | `#8A927A` | Etiquetas de sección, detalles secundarios e iconos sutiles. |
| `--color-blanco` | `#FFFFFF` | Superficies de contraste para tarjetas de servicios y paneles. |

---

## 4. Guía para editar el contenido

### A. Modificar textos y titulares
Abre [`index.html`](index.html) con cualquier editor de texto (VS Code, Notepad++, etc.). Todas las secciones principales están claramente comentadas:
- `A. CABECERA Y NAVEGACIÓN`: Enlaces del menú y logotipo.
- `B. HERO PRINCIPAL`: Titulares principales y botones de acción.
- `C. SERVICIOS`:
  - **Servicio 1:** Administración funcional de Moodle y lista de tareas.
  - **Servicio 2:** Transformación de manuales en cursos e-learning (niveles básico y avanzado).
- `D. CÓMO TRABAJO`: Las 4 fases metodológicas (*Analizamos, Delimitamos, Ejecutamos, Verificamos*).
- `E. SOBRE MÍ`: Perfil profesional de Juan Carlos Otaiza y fundamentos.
- `F. CONTACTO`: Ubicación, horarios de atención y datos de contacto.
- `G. PIE DE PÁGINA & MODALES`: Textos de aviso legal, privacidad y cookies.

### B. Modificar la dirección de correo electrónico
La dirección `contacto@jotaiza.com` se encuentra en los siguientes puntos de [`index.html`](index.html):
1. En el enlace `mailto:` del botón principal de contacto:
   ```html
   <a href="mailto:contacto@jotaiza.com?subject=Consulta%20sobre%20servicios%20-%20Jotaiza" class="btn btn-primary">
   ```
2. En el texto visible del bloque de contacto:
   ```html
   <span class="contacto-correo-texto">contacto@jotaiza.com</span>
   ```
3. En el enlace del pie de página y en los textos legales informativos.

*(Nota: Como se especificó en los requisitos, activa y prueba el buzón de correo en tu proveedor antes de realizar campañas comerciales).*

### C. Modificar colores o tipografía
Para ajustar cualquier tono, edita los valores hexadecimales en [`css/styles.css`](css/styles.css) dentro del bloque `:root`. Los cambios se reflejarán instantáneamente en todo el sitio web.

---

## 5. Guía de publicación en GitHub Pages con dominio propio

El proyecto está listo para publicarse en **GitHub Pages** de forma gratuita, segura y con certificado SSL (HTTPS) automático.

### Paso 1: Crear el repositorio en GitHub
1. Inicia sesión en tu cuenta de [GitHub](https://github.com/).
2. Haz clic en el botón verde **«New»** para crear un nuevo repositorio.
3. Asígnale un nombre (por ejemplo: `jotaiza` o `jotaiza-web`).
4. Selecciona visibilidad **Public** y no marques las opciones de añadir README ni .gitignore (ya los tenemos en local).
5. Haz clic en **«Create repository»**.

### Paso 2: Subir los archivos desde tu ordenador
Abre una terminal o consola de comandos (PowerShell o Git Bash) en la carpeta de este proyecto (`c:\Users\usuario\Documents\JOTAIZA`):

```bash
# Inicializar el repositorio Git local
git init

# Añadir todos los archivos
git add .

# Crear el primer commit
git commit -m "Lanzamiento web profesional Jotaiza"

# Renombrar la rama a main
git branch -M main

# Conectar con tu repositorio en GitHub (sustituye TU-USUARIO por tu nombre de usuario en GitHub)
git remote add origin https://github.com/TU-USUARIO/jotaiza.git

# Subir los archivos
git push -u origin main
```

### Paso 3: Activar GitHub Pages
1. En GitHub, entra en tu repositorio y ve a la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment**:
   - **Source:** Selecciona `Deploy from a branch`.
   - **Branch:** Selecciona `main` y la carpeta `/(root)`.
   - Haz clic en **Save**.

### Paso 4: Configurar el dominio personalizado `jotaiza.com`
El archivo [`CNAME`](CNAME) incluido en la raíz del proyecto ya contiene `jotaiza.com`.
1. En la misma pantalla de **Settings > Pages**, en el campo **Custom domain**, verifica que aparezca `jotaiza.com`.
2. Haz clic en **Save**. GitHub creará una comprobación DNS.

### Paso 5: Configurar los registros DNS en tu registrador de dominio
Accede al panel de control donde compraste el dominio `jotaiza.com` (por ejemplo: DonDominio, Nominalia, Namecheap, Cloudflare, etc.) y dirígete a la gestión de **Zona DNS**:

1. **Crea 4 registros de tipo A** para el dominio principal (`@` o `jotaiza.com`):
   - Tipo: `A` | Host: `@` | Valor: `185.199.108.153`
   - Tipo: `A` | Host: `@` | Valor: `185.199.109.153`
   - Tipo: `A` | Host: `@` | Valor: `185.199.110.153`
   - Tipo: `A` | Host: `@` | Valor: `185.199.111.153`

2. **Crea 1 registro CNAME** para el subdominio `www`:
   - Tipo: `CNAME` | Host: `www` | Valor: `TU-USUARIO.github.io.`

### Paso 6: Forzar HTTPS
Una vez que las DNS se hayan propagado (suele tardar entre 15 minutos y un par de horas), vuelve a **Settings > Pages** en GitHub y marca la casilla:
- **[x] Enforce HTTPS**

GitHub Pages generará automáticamente un certificado SSL gratuito mediante Let's Encrypt para que el sitio funcione siempre bajo `https://jotaiza.com`.

---

## 6. Mantenimiento y buenas prácticas

- **Actualizaciones de texto:** Al no requerir pasos de `build` ni `npm install`, cualquier cambio que guardes en [`index.html`](index.html) o [`css/styles.css`](css/styles.css) y subas mediante `git push` se publicará automáticamente en cuestión de segundos.
- **Preservación de identidad:** Mantén la sobriedad editorial evitando añadir animaciones intrusivas, banners emergentes o librerías pesadas que reduzcan la velocidad de carga.
- **Verificación periódica:** Revisa periódicamente que los enlaces de correo funcionen correctamente y que la información de contacto esté permanentemente actualizada.
