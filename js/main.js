/**
 * JOTAIZA — jotaiza.com
 * JavaScript vanilla: Interacciones accesibles y sobrias
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
     2. MENÚ MÓVIL ACCESIBLE
     -------------------------------------------------------------------------- */
  function initMenuMovil() {
    const botonMenu = document.querySelector('.btn-menu-movil');
    const navPrincipal = document.querySelector('.navegacion-principal');
    const enlacesNav = document.querySelectorAll('.navegacion-principal a');

    if (!botonMenu || !navPrincipal) return;

    function abrirMenu() {
      botonMenu.setAttribute('aria-expanded', 'true');
      botonMenu.setAttribute('aria-label', 'Cerrar menú de navegación');
      navPrincipal.classList.add('menu-abierto');
      document.body.style.overflow = 'hidden';
    }

    function cerrarMenu() {
      botonMenu.setAttribute('aria-expanded', 'false');
      botonMenu.setAttribute('aria-label', 'Abrir menú de navegación');
      navPrincipal.classList.remove('menu-abierto');
      document.body.style.overflow = '';
    }

    botonMenu.addEventListener('click', function () {
      const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
      if (estaAbierto) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    enlacesNav.forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          cerrarMenu();
        }
      });
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && botonMenu.getAttribute('aria-expanded') === 'true') {
        cerrarMenu();
        botonMenu.focus();
      }
    });

    // Cerrar si se redimensiona a pantalla de escritorio
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && botonMenu.getAttribute('aria-expanded') === 'true') {
        cerrarMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. RESALTADO DE SECCIÓN ACTIVA EN NAVEGACIÓN
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

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              enlaces.forEach(function (enlace) {
                enlace.classList.remove('activo');
                enlace.removeAttribute('aria-current');
              });

              const activo = Array.from(enlaces).find(function (enlace) {
                return enlace.getAttribute('href') === '#' + entry.target.id;
              });

              if (activo) {
                activo.classList.add('activo');
                activo.setAttribute('aria-current', 'page');
              }
            }
          });
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0
        }
      );

      secciones.forEach(function (item) {
        observer.observe(item.elemento);
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. COPIAR CORREO ELECTRÓNICO AL PORTAPAPELES
     -------------------------------------------------------------------------- */
  function initBotonCopiarCorreo() {
    const botonCopiar = document.querySelector('.btn-copiar-correo');
    const textoCorreo = document.querySelector('.contacto-correo-texto');
    const toast = document.querySelector('.toast-notificacion');

    if (!botonCopiar || !textoCorreo) return;

    botonCopiar.addEventListener('click', function () {
      const correo = textoCorreo.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(correo).then(function () {
          mostrarAvisoCopiado('Correo copiado al portapapeles');
        }).catch(function () {
          copiarFallback(correo);
        });
      } else {
        copiarFallback(correo);
      }
    });

    function copiarFallback(texto) {
      const inputTemp = document.createElement('input');
      inputTemp.value = texto;
      inputTemp.setAttribute('readonly', '');
      inputTemp.style.position = 'absolute';
      inputTemp.style.left = '-9999px';
      document.body.appendChild(inputTemp);
      inputTemp.select();
      try {
        document.execCommand('copy');
        mostrarAvisoCopiado('Correo copiado al portapapeles');
      } catch (err) {
        mostrarAvisoCopiado('contacto@jotaiza.com');
      }
      document.body.removeChild(inputTemp);
    }

    let timeoutToast;
    function mostrarAvisoCopiado(mensaje) {
      if (!toast) return;
      const textoElemento = toast.querySelector('.toast-texto') || toast;
      textoElemento.textContent = mensaje;
      toast.classList.add('visible');
      toast.setAttribute('aria-hidden', 'false');

      clearTimeout(timeoutToast);
      timeoutToast = setTimeout(function () {
        toast.classList.remove('visible');
        toast.setAttribute('aria-hidden', 'true');
      }, 3500);
    }
  }

  /* --------------------------------------------------------------------------
     5. VENTANAS MODALES ACCESIBLES (AVISO LEGAL, PRIVACIDAD, COOKIES)
     -------------------------------------------------------------------------- */
  function initModalesLegales() {
    const botonesAbrir = document.querySelectorAll('[data-abre-modal]');
    const botonesCerrar = document.querySelectorAll('[data-cierra-modal]');

    botonesAbrir.forEach(function (boton) {
      boton.addEventListener('click', function () {
        const modalId = boton.getAttribute('data-abre-modal');
        const modal = document.getElementById(modalId);
        if (modal && typeof modal.showModal === 'function') {
          modal.showModal();
        } else if (modal) {
          modal.setAttribute('open', '');
        }
      });
    });

    botonesCerrar.forEach(function (boton) {
      boton.addEventListener('click', function () {
        const modal = boton.closest('dialog');
        if (modal && typeof modal.close === 'function') {
          modal.close();
        } else if (modal) {
          modal.removeAttribute('open');
        }
      });
    });

    // Cerrar al hacer clic en el backdrop fuera del contenedor modal
    const modales = document.querySelectorAll('dialog.modal-legal');
    modales.forEach(function (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          if (typeof modal.close === 'function') {
            modal.close();
          } else {
            modal.removeAttribute('open');
          }
        }
      });
    });
  }
})();
