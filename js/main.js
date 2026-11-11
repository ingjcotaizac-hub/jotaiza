/**
 * JOTAIZA — jotaiza.com
 * JavaScript vanilla: Interacciones accesibles, sobrias y precisas
 * Sin dependencias externas ni rastreadores
 */

(function () {
  'use strict';

  // Esperar a que el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initCabeceraScroll();
    initMenuMovil();
    initNavegacionActiva();
    initBotonCopiarCorreo();
    initModalesLegales();
  }

  /* --------------------------------------------------------------------------
     1. SOMBRA DE CABECERA AL HACER SCROLL
     -------------------------------------------------------------------------- */
  function initCabeceraScroll() {
    const cabecera = document.querySelector('.sitio-cabecera');
    if (!cabecera) return;

    function actualizarCabecera() {
      if (window.scrollY > 20) {
        cabecera.classList.add('con-sombra');
      } else {
        cabecera.classList.remove('con-sombra');
      }
    }

    window.addEventListener('scroll', actualizarCabecera, { passive: true });
    actualizarCabecera();
  }

  /* --------------------------------------------------------------------------
     2. MENÚ MÓVIL ACCESIBLE CON GESTIÓN DE FOCO Y SCROLL SEGURO
     -------------------------------------------------------------------------- */
  function initMenuMovil() {
    const botonMenu = document.querySelector('.btn-menu-movil');
    const navPrincipal = document.querySelector('.navegacion-principal');
    const enlacesNav = document.querySelectorAll('.navegacion-principal a');

    if (!botonMenu || !navPrincipal) return;

    let overflowPrevio = '';

    function abrirMenu() {
      botonMenu.setAttribute('aria-expanded', 'true');
      botonMenu.setAttribute('aria-label', 'Cerrar menú de navegación');
      navPrincipal.classList.add('menu-abierto');
      overflowPrevio = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Mover foco al primer enlace navegable para accesibilidad con teclado
      const primerEnlace = navPrincipal.querySelector('a');
      if (primerEnlace) {
        primerEnlace.focus();
      }
    }

    function cerrarMenu(devolverFoco) {
      botonMenu.setAttribute('aria-expanded', 'false');
      botonMenu.setAttribute('aria-label', 'Abrir menú de navegación');
      navPrincipal.classList.remove('menu-abierto');
      document.body.style.overflow = overflowPrevio || '';

      if (devolverFoco) {
        botonMenu.focus();
      }
    }

    botonMenu.addEventListener('click', function () {
      const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
      if (estaAbierto) {
        cerrarMenu(true);
      } else {
        abrirMenu();
      }
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    enlacesNav.forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          cerrarMenu(false);
        }
      });
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && botonMenu.getAttribute('aria-expanded') === 'true') {
        cerrarMenu(true);
      }
    });

    // Restaurar estado si se redimensiona a pantalla de escritorio
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && botonMenu.getAttribute('aria-expanded') === 'true') {
        cerrarMenu(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. RESALTADO ESTABLE DE SECCIÓN ACTIVA EN NAVEGACIÓN
     -------------------------------------------------------------------------- */
  function initNavegacionActiva() {
    const enlaces = document.querySelectorAll('.menu-navegacion a[href^="#"]');
    const secciones = [];

    enlaces.forEach(function (enlace) {
      const id = enlace.getAttribute('href').slice(1);
      const seccion = document.getElementById(id);
      if (seccion) {
        secciones.push({ id: id, elemento: seccion, enlace: enlace });
      }
    });

    if (secciones.length === 0) return;

    function marcarActivo(idActivo) {
      enlaces.forEach(function (enlace) {
        const coincide = enlace.getAttribute('href') === '#' + idActivo;
        if (coincide) {
          enlace.classList.add('activo');
          enlace.setAttribute('aria-current', 'page');
        } else {
          enlace.classList.remove('activo');
          enlace.removeAttribute('aria-current');
        }
      });
    }

    if ('IntersectionObserver' in window) {
      const ratiosVisibilidad = new Map();

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            ratiosVisibilidad.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
          });

          // Determinar de forma estable la sección con mayor visibilidad en el viewport
          let mejorSeccionId = null;
          let mayorRatio = 0;

          secciones.forEach(function (item) {
            const ratio = ratiosVisibilidad.get(item.id) || 0;
            if (ratio > mayorRatio) {
              mayorRatio = ratio;
              mejorSeccionId = item.id;
            }
          });

          // Si ninguna supera el umbral (scroll rápido), determinar por posición vertical
          if (!mejorSeccionId) {
            const scrollPos = window.scrollY + 120;
            for (let i = secciones.length - 1; i >= 0; i--) {
              if (scrollPos >= secciones[i].elemento.offsetTop) {
                mejorSeccionId = secciones[i].id;
                break;
              }
            }
          }

          if (mejorSeccionId) {
            marcarActivo(mejorSeccionId);
          }
        },
        {
          rootMargin: '-15% 0px -40% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1.0]
        }
      );

      secciones.forEach(function (item) {
        observer.observe(item.elemento);
      });
    } else {
      // Fallback para navegadores sin IntersectionObserver
      function onScroll() {
        const scrollPos = window.scrollY + 120;
        let idActivo = null;
        for (let i = secciones.length - 1; i >= 0; i--) {
          if (scrollPos >= secciones[i].elemento.offsetTop) {
            idActivo = secciones[i].id;
            break;
          }
        }
        if (idActivo) {
          marcarActivo(idActivo);
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* --------------------------------------------------------------------------
     4. COPIAR CORREO ELECTRÓNICO CON VERIFICACIÓN REAL Y MENSAJE ACCESIBLE
     -------------------------------------------------------------------------- */
  function initBotonCopiarCorreo() {
    const botonCopiar = document.querySelector('.btn-copiar-correo');
    const textoCorreo = document.querySelector('.contacto-correo-texto');
    const toast = document.querySelector('.toast-notificacion');

    if (!botonCopiar || !textoCorreo) return;

    botonCopiar.addEventListener('click', function () {
      const correo = textoCorreo.textContent.trim();

      if (navigator.clipboard && window.isSecureContext && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(correo).then(function () {
          mostrarAvisoCopiado('Correo copiado al portapapeles', true);
        }).catch(function () {
          ejecutarFallback(correo);
        });
      } else {
        ejecutarFallback(correo);
      }
    });

    function ejecutarFallback(texto) {
      const exito = copiarFallback(texto);
      if (exito) {
        mostrarAvisoCopiado('Correo copiado al portapapeles', true);
      } else {
        mostrarAvisoCopiado('No se pudo copiar automáticamente: ' + texto, false);
      }
    }

    function copiarFallback(texto) {
      let resultado = false;
      const inputTemp = document.createElement('textarea');
      inputTemp.value = texto;
      inputTemp.setAttribute('readonly', '');
      inputTemp.style.position = 'fixed';
      inputTemp.style.top = '-9999px';
      inputTemp.style.left = '-9999px';
      inputTemp.style.opacity = '0';
      document.body.appendChild(inputTemp);
      inputTemp.select();
      inputTemp.setSelectionRange(0, 99999);
      try {
        resultado = document.execCommand('copy');
      } catch (err) {
        resultado = false;
      }
      document.body.removeChild(inputTemp);
      return Boolean(resultado);
    }

    let timeoutToast;
    function mostrarAvisoCopiado(mensaje, esExito) {
      if (!toast) return;
      const textoElemento = toast.querySelector('.toast-texto') || toast;
      textoElemento.textContent = mensaje;

      if (esExito) {
        toast.classList.remove('toast-error');
      } else {
        toast.classList.add('toast-error');
      }

      toast.classList.add('visible');
      toast.setAttribute('aria-hidden', 'false');

      clearTimeout(timeoutToast);
      timeoutToast = setTimeout(function () {
        toast.classList.remove('visible');
        toast.setAttribute('aria-hidden', 'true');
      }, esExito ? 3500 : 5000);
    }
  }

  /* --------------------------------------------------------------------------
     5. VENTANAS MODALES ACCESIBLES (<dialog> CON GESTIÓN DE FOCO Y TECLADO)
     -------------------------------------------------------------------------- */
  function initModalesLegales() {
    const botonesAbrir = document.querySelectorAll('[data-abre-modal]');
    const botonesCerrar = document.querySelectorAll('[data-cierra-modal]');
    let elementoActivador = null;

    botonesAbrir.forEach(function (boton) {
      boton.addEventListener('click', function () {
        const modalId = boton.getAttribute('data-abre-modal');
        const modal = document.getElementById(modalId);
        if (!modal) return;

        elementoActivador = boton;

        if (typeof modal.showModal === 'function') {
          modal.showModal();
          // Enfocar el botón de cerrar para navegación accesible con teclado
          const btnCerrar = modal.querySelector('.modal-btn-cerrar') || modal.querySelector('[data-cierra-modal]');
          if (btnCerrar) {
            btnCerrar.focus();
          }
        } else {
          // Si el navegador no soporta showModal, navegación directa accesible
          window.location.hash = modalId;
        }
      });
    });

    function cerrarDialogo(modal) {
      if (!modal) return;
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
      if (elementoActivador && typeof elementoActivador.focus === 'function') {
        elementoActivador.focus();
        elementoActivador = null;
      }
    }

    botonesCerrar.forEach(function (boton) {
      boton.addEventListener('click', function () {
        const modal = boton.closest('dialog');
        cerrarDialogo(modal);
      });
    });

    // Cerrar al hacer clic en el backdrop fuera del contenedor modal
    const modales = document.querySelectorAll('dialog.modal-legal');
    modales.forEach(function (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          cerrarDialogo(modal);
        }
      });

      // Manejar el evento nativo 'close' (Escape nativo)
      modal.addEventListener('close', function () {
        if (elementoActivador && typeof elementoActivador.focus === 'function') {
          elementoActivador.focus();
          elementoActivador = null;
        }
      });
    });
  }
})();
