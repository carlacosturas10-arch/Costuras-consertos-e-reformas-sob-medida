document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 1. DARK MODE TOGGLE (com LocalStorage e Detecção de Preferência do SO)
    // =========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // =========================================================================
    // 2. MENU MOBILE (Acessível)
    // =========================================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileNav.hidden = isExpanded;
        });
        
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.hidden = true;
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // =========================================================================
    // 3. FAQ ACCORDION (Acessível)
    // =========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                i.querySelector('.faq-answer').hidden = true;
            });
            
            // Abrir o clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.hidden = false;
            }
        });
    });

    // =========================================================================
    // 4. INTERSECTION OBSERVER (Animações de Scroll Performáticas)
    // =========================================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // IMP: Para de observar após animar, economizando CPU
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section, .service-card, .testimonial-card').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });

    // =========================================================================
    // 5. RASTREAMENTO DE UTMs E INJEÇÃO DINÂMICA NO WHATSAPP (Melhoria Crucial)
    // =========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    
    if (utmSource) {
        localStorage.setItem('utm_source', utmSource);
    }
    
    const savedUtm = localStorage.getItem('utm_source');
    const whatsappNumber = "5511963382485";
    
    // Função para gerar mensagem dinâmica
    function generateWhatsAppMessage(context, serviceName = null) {
        let baseMessage = "Olá, Carla! Vim pelo site e gostaria de um orçamento.";
        
        if (savedUtm) {
            baseMessage = `Olá, Carla! Vim pelo site (anúncio: ${savedUtm}) e gostaria de um orçamento.`;
        }
        
        if (serviceName) {
            baseMessage = `Olá, Carla! Vim pelo site e gostaria de um orçamento para: *${serviceName}*.`;
            if (savedUtm) baseMessage = `Olá, Carla! Vim pelo site (anúncio: ${savedUtm}) e gostaria de um orçamento para: *${serviceName}*.`;
        }
        
        return encodeURIComponent(baseMessage);
    }
    
    // Atualizar todos os links do WhatsApp na página
    document.querySelectorAll('.dynamic-whatsapp').forEach(link => {
        const context = link.getAttribute('data-context') || 'generic';
        const service = link.getAttribute('data-service');
        
        link.href = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(context, service)}`;
        
        link.addEventListener('click', (e) => {
            trackEvent('whatsapp_click', { 
                context: context, 
                service: service || 'general',
                utm_source: savedUtm || 'organic' 
            });
        });
    });

    // =========================================================================
    // 6. FORMULÁRIO INTELIGENTE (Rascunho Local + Fallback WhatsApp)
    // =========================================================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Carregar rascunho
        const draft = localStorage.getItem('contactFormDraft');
        if (draft) {
            const data = JSON.parse(draft);
            document.getElementById('name').value = data.name || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('service').value = data.service || '';
            document.getElementById('message').value = data.message || '';
        }
        
        // Salvar rascunho a cada mudança (Debounce implícito pelo input)
        contactForm.addEventListener('input', () => {
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            localStorage.setItem('contactFormDraft', JSON.stringify(formData));
        });
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            const finalMessage = `Olá, Carla! Me chamo *${name}*.\n📱 Telefone: ${phone}\n🧵 Serviço: ${service}\n💬 Mensagem: ${message}`;
            const encodedFinalMessage = encodeURIComponent(finalMessage);
            
            localStorage.removeItem('contactFormDraft');
            trackEvent('form_submit', { service: service });
            
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedFinalMessage}`, '_blank');
            contactForm.reset();
        });
    }

    // =========================================================================
    // 7. BANNER DE COOKIES (LGPD)
    // =========================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');
    
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1500);
    } else if (cookieConsent === 'accepted') {
        enableAnalytics();
    }
    
    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
            enableAnalytics();
            trackEvent('cookie_accepted');
        });
    }
    
    if (cookieReject) {
        cookieReject.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            cookieBanner.classList.remove('show');
            trackEvent('cookie_rejected');
        });
    }

    // =========================================================================
    // 8. BOTÃO VOLTAR AO TOPO (Com Debounce no Scroll)
    // =========================================================================
    const backToTopBtn = document.getElementById('back-to-top');
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.hidden = false;
            } else {
                backToTopBtn.classList.remove('visible');
                backToTopBtn.hidden = true;
            }
        }, 100); // Debounce de 100ms para performance
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =========================================================================
    // 9. FUNÇÃO DE RASTREAMENTO (Stub Seguro para GTM/GA4)
    // =========================================================================
    window.trackEvent = function(eventName, parameters = {}) {
        console.log(`[Track Event] ${eventName}`, parameters);
        
        // IMP: Verifica consentimento antes de disparar para o dataLayer
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, parameters);
            }
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({ event: eventName, ...parameters });
            }
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', eventName, parameters);
            }
        }
    };
    
    function enableAnalytics() {
        console.log('Analytics ativado com consentimento LGPD.');
    }
});