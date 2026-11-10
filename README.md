# JOTAIZA — jotaiza.com

Sitio web profesional de **Juan Carlos Otaiza** para servicios especializados e independientes:
1. **Administración funcional y operativa de plataformas Moodle.**
2. **Transformación de manuales y documentación técnica en cursos e-learning.**

---

## 1. Identidad Visual: Editorial Técnica & Estudio de Producción Digital

La identidad visual del proyecto se apoya en el lenguaje de una **publicación técnica especializada** y un **estudio de producción digital**:
- **Blanco neutro de fondo (`#FFFFFF`):** Claridad absoluta donde la información y los datos formativos son los protagonistas.
- **Negro tinta (`#0F1115`):** Textos con máximo contraste y líneas de retícula estructural.
- **Gris frío (`#F6F7F9` / `#D8DCE3`):** Superficies de contraste secundario, hairlines divisorias y metadatos.
- **Azul ultramar intenso (`#0038FF`):** Señal gráfica de acento (señalética, numeraciones técnicas, marcas de estado y puntos de conexión en diagramas).
- **Tipografías:**
  - **IBM Plex Sans:** Titulares de gran escala y texto de lectura claro y riguroso.
  - **IBM Plex Mono:** Numeración técnica, coordenadas, etiquetas de proceso y metadatos de producción.

---

## 2. Estructura de archivos

```text
JOTAIZA/
├── index.html             # Maquetación semántica HTML5 con retícula técnica y esquemas modulares
├── CNAME                  # Dominio personalizado para GitHub Pages (jotaiza.com)
├── README.md              # Documentación técnica de edición, diseño y despliegue
├── css/
│   └── styles.css         # Hoja de estilos en CSS3 puro sin preprocesadores ni dependencias
├── js/
│   └── main.js           # JavaScript vanilla accesible (menú móvil, modales, copiado)
└── assets/
    ├── favicon.svg        # Favicon vectorial técnico (monograma J con señal ultramar)
    ├── logo.svg           # Marca tipográfica vectorial JOTAIZA con coordenadas técnicas
    └── og-image.svg       # Imagen técnica para previsualizaciones Open Graph (1200x630)
```

---

## 3. Paleta cromática en CSS

Centralizada en las variables del bloque `:root` en [`css/styles.css`](css/styles.css):

| Variable | Código Hex | Función en el sistema |
| :--- | :--- | :--- |
| `--color-fondo` | `#FFFFFF` | Fondo principal blanco neutro |
| `--color-tinta` | `#0F1115` | Texto principal, titulares y estructuras sólidas |
| `--color-tinta-suave` | `#2A2D34` | Texto de lectura y párrafos |
| `--color-gris-fondo` | `#F6F7F9` | Superficies de soporte y fondo de módulos |
| `--color-gris-borde` | `#D8DCE3` | Líneas divisorias técnicas de 1px |
| `--color-gris-texto` | `#5E6573` | Etiquetas técnicas, notas y subtítulos secundarios |
| `--color-ultramar` | `#0038FF` | Señal gráfica de acento (numeraciones, marcas, hover activo) |

---

## 4. Diferenciación visual de los servicios

En cumplimiento con el criterio de no repetir bloques idénticos:
- **01 — Administración funcional de Moodle:** Presentado como una **Matriz Operativa de Campus (Operational Ledger)** con registro sistemático de tareas indexadas (`[T-01]` a `[T-08]`), organizadas en una retícula técnica y acompañadas de la cláusula de delimitación del alcance.
- **02 — Transformación de manuales en cursos:** Presentado como un **Pipeline de Producción Didáctica en Dos Niveles** (`MOD-01 Transformación básica` frente a `MOD-02 Diseño didáctico avanzado`), con especificación modular y la nota de recursos multimedia.

---

## 5. Publicación en GitHub Pages

1. **Subir cambios a GitHub:**
   ```bash
   git add .
   git commit -m "Rediseño visual: Identidad editorial técnica y estudio de producción digital"
   git push origin main
   ```
2. **Configuración de Dominio y DNS:**
   - Dominio personalizado: `jotaiza.com` configurado en [`CNAME`](CNAME).
7. **Registros DNS en el registrador (para jotaiza.com):**
   - 4 registros A hacia: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - 1 registro CNAME `www` hacia `ingjcotaizac-hub.github.io.`.
   - Repositorio activo: [https://github.com/ingjcotaizac-hub/jotaiza](https://github.com/ingjcotaizac-hub/jotaiza)
   - Activar **Enforce HTTPS** en la pestaña *Settings > Pages* de GitHub.
