/* =========================================================
   AgilShop Digital — Landing Page
   Comportamiento: reveal, formularios, theme, nav, scroll
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 0. Mobile viewport height fix ---------- */
  function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  // Set on load
  setVh();
  // Set on resize
  window.addEventListener('resize', setVh);
  // Set on orientation change (covers some mobile browsers)
  window.addEventListener('orientationchange', setVh);

  /* ---------- 1. Año automático en el footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Theme toggle (dark / light) con persistencia ---------- */
  const THEME_KEY = 'agilshop-theme';
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  const getInitialTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
      );
    }
  };

  applyTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
    });
  }

  // Sincronizar si el sistema cambia y no hay preferencia explícita
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ---------- 3. Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    const setNavOpen = (open) => {
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      siteNav.setAttribute('data-open', String(open));
      document.body.classList.toggle('nav-open', open);
    };

    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!isOpen);
    });

    // Cerrar al hacer clic en un enlace
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNavOpen(false));
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNavOpen(false);
        navToggle.focus();
      }
    });
  }

  /* ---------- 4. Header shadow on scroll ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    let ticking = false;
    const updateHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
    updateHeader();
  }

  /* ---------- 5. Reveal on scroll (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: mostrar todo
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- 6. Formularios de lead capture ---------- */
  const handleLeadForm = (form) => {
    if (!form) return;
    const success = () => {
      const wrap = form.parentElement;
      const message = document.createElement('div');
      message.className = 'lead-form--success';
      message.setAttribute('role', 'status');
      message.setAttribute('aria-live', 'polite');
      message.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 0.75rem;" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <p style="font-size: 1.05rem; font-weight: 600; margin-bottom: 0.4rem;">¡Gracias por tu interés!</p>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Te contactaremos en menos de 24 h con tu cotización personalizada.</p>
      `;
      form.replaceWith(message);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const select = form.querySelector('select');
      if (!input) return;

      const email = input.value.trim();
      const service = select ? select.value : 'No especificado';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        input.style.borderColor = 'var(--error)';
        return;
      }

      if (!service) {
        select.style.borderColor = 'var(--error)';
        select.focus();
        return;
      }

      input.removeAttribute('aria-invalid');
      input.style.borderColor = '';
      if (select) select.style.borderColor = '';

      try {
        // INTEGRACIÓN CON EXCEL/GOOGLE SHEETS vía SheetDB.io
        // Para que esto funcione, crea una hoja en Google Sheets,
        // regístrala en sheetdb.io y pega tu API URL aquí:
        const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/66jbnxhqq1iqz';

        if (SHEETDB_API_URL.includes('YOUR_API_ID')) {
          console.warn('[AgilShop] SheetDB API URL no configurada. Simulando envío...');
        } else {
          const response = await fetch(SHEETDB_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: {
                email: email,
                servicio: service,
                fecha: new Date().toLocaleString()
              }
            })
          });
          if (!response.ok) throw new Error('Error al guardar en la hoja');
        }
      } catch (err) {
        console.error('[AgilShop] Error al enviar lead:', err);
        alert('Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo.');
        return;
      }

      console.info('[AgilShop] Lead capturado y enviado:', { email, service });
      success();
    });

    const input = form.querySelector('input[type="email"]');
    if (input) {
      input.addEventListener('input', () => {
        input.removeAttribute('aria-invalid');
        input.style.borderColor = '';
      });
    }
    const select = form.querySelector('select');
    if (select) {
      select.addEventListener('change', () => {
        select.style.borderColor = '';
      });
    }
  };

  handleLeadForm(document.getElementById('lead-hero'));
  handleLeadForm(document.getElementById('lead-final'));

  /* ---------- 7. FAQ: solo un item abierto a la vez (opcional UX) ---------- */
  // Comentado: permitimos que el usuario abra varios a la vez. Descomentar si prefieres acordeón estricto.
  /*
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
  */

  /* ---------- 8. Smooth scroll polyfill para prefers-reduced-motion ---------- */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  /* ---------- 9. Tracking: log de CTAs (opcional) ---------- */
  document.querySelectorAll('a[href^="#contacto"], a[href^="#precios"]').forEach((link) => {
    link.addEventListener('click', () => {
      console.info('[AgilShop] CTA click:', link.textContent.trim(), link.getAttribute('href'));
    });
  });

})();
