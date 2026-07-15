// ============================================================
// BRIVOX DIGITAL — interações
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  initMobileNav();
  initFaq();
  initScrollReveal();
  initChatDemo();
});

// Ano dinâmico no rodapé
function setYear(){
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// Menu mobile
function initMobileNav(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Acordeão do FAQ
function initFaq(){
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen){
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Revelação suave ao rolar a página
function initScrollReveal(){
  const targets = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || targets.length === 0){
    targets.forEach(t => t.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(t => observer.observe(t));
}

// Simulação de conversa no WhatsApp dentro do mockup do celular
function initChatDemo(){
  const body = document.getElementById('chatBody');
  if (!body) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const script = [
    { side: 'in',  text: 'Olá! Vi a página de vocês 👀' },
    { side: 'out', text: 'Oi! Que bom que chegou até aqui. Como posso ajudar?' },
    { side: 'in',  text: 'Gostaria de agendar uma avaliação' },
    { side: 'out', text: 'Perfeito! Temos horário amanhã às 14h ✅' },
  ];

  if (prefersReducedMotion){
    script.forEach(msg => body.appendChild(createBubble(msg)));
    return;
  }

  let i = 0;
  function playNext(){
    if (i >= script.length){
      setTimeout(() => {
        body.innerHTML = '';
        i = 0;
        playNext();
      }, 3200);
      return;
    }
    body.appendChild(createBubble(script[i]));
    body.scrollTop = body.scrollHeight;
    i++;
    setTimeout(playNext, 1250);
  }

  // Só inicia quando o mockup entra na tela, para não gastar ciclos à toa
  const phone = document.querySelector('.phone');
  if ('IntersectionObserver' in window && phone){
    const chatObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          playNext();
          chatObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    chatObserver.observe(phone);
  } else {
    playNext();
  }
}

function createBubble({ side, text }){
  const div = document.createElement('div');
  div.className = `bubble ${side}`;
  div.textContent = text;
  return div;
}

// Sombra mais forte no header ao rolar
(function headerShadowOnScroll(){
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 12){
      header.style.borderBottomColor = 'var(--line)';
    } else {
      header.style.borderBottomColor = 'var(--line-soft)';
    }
  }, { passive: true });
})();
