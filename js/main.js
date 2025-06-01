document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Добавляем эффект параллакса для героя
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Анимация при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.menu-item, .about-short, .carousel-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Устанавливаем начальные стили для анимации
    document.querySelectorAll('.menu-item, .about-short, .carousel-section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запускаем при загрузке
});

// Плавная прокрутка для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.dark-header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Для браузеров, не поддерживающих smooth scroll
            if (!('scrollBehavior' in document.documentElement.style)) {
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
                    if (progress < duration) window.requestAnimationFrame(step);
                }
                
                window.requestAnimationFrame(step);
            }
        }
    });
});

// Функция для плавности анимации (ease-in-out)
function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
}
// Анимация пунктов меню
function animateMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    menuItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

// Вызовите функцию при загрузке
document.addEventListener('DOMContentLoaded', animateMenuItems);
// Фразы для hero-секции
const heroPhrases = [
    "Охота на лучшие вкусы открыта",
    "Кулинарный дунжон ждёт героев",
    "S-Rank гастрономии",
    "Врата в мир тенистых вкусов",
    "Место силы для гурманов",
    "Арена кулинарных битв",
    "Проложите путь к совершенству"
];

function rotateHeroPhrase() {
    const phraseElement = document.getElementById('dynamic-phrase');
    if (phraseElement) {
        // Плавное исчезновение
        phraseElement.style.opacity = 0;
        
        setTimeout(() => {
            // Выбор случайной фразы (исключая текущую)
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * heroPhrases.length);
            } while (heroPhrases[newIndex] === phraseElement.textContent);
            
            phraseElement.textContent = heroPhrases[newIndex];
            
            // Плавное появление
            phraseElement.style.opacity = 1;
        }, 500); // Полсекунды на исчезновение
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    rotateHeroPhrase();
    setInterval(rotateHeroPhrase, 5000); // Смена каждые 5 сек
});
