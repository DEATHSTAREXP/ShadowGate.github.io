document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Учитываем высоту фиксированного хедера при прокрутке
                const headerOffset = document.querySelector('.dark-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Дополнительный отступ

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Анимация элементов при скролле ---
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const headerHeight = document.querySelector('.dark-header').offsetHeight;

    function checkVisibility() {
        animateOnScrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            // Активируем анимацию, когда элемент появляется в нижней половине экрана
            // Учитываем высоту хедера
            if (elementTop < window.innerHeight - headerHeight / 2) {
                element.classList.add('active');
            }
            // Можно добавить условие для удаления 'active' при выходе из видимости,
            // если анимации должны проигрываться каждый раз.
            // else {
            //     element.classList.remove('active');
            // }
        });
    }

    // Инициализируем анимацию при загрузке страницы
    checkVisibility();

    // Запускаем проверку при каждом скролле
    window.addEventListener('scroll', checkVisibility);

    // --- Анимация заголовков Hero-секции ---
    // Эти анимации запускаются один раз при загрузке страницы
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtn = document.querySelector('.hero-content-wrapper .btn');

    if (heroTitle) {
        heroTitle.style.animation = 'textReveal 1.5s forwards';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'textReveal 1.5s forwards 0.5s'; // Задержка 0.5с
    }
    if (heroBtn) {
        heroBtn.style.animation = 'scaleIn 1s forwards 1.5s'; // Задержка 1.5с
    }

    // --- Логика для страниц форм (login, register, booking) ---
    const animateForm = function() {
        document.querySelectorAll('.form-group input').forEach(input => {
            input.addEventListener('focus', () => {
                input.classList.add('input-focus');
            });
            input.addEventListener('blur', () => {
                input.classList.remove('input-focus');
            });
        });
        document.querySelectorAll('input[type="submit"], .submit-button, .form-button').forEach(button => {
            button.addEventListener('mousedown', () => {
                button.classList.add('button-press');
            });
            button.addEventListener('mouseup', () => {
                button.classList.remove('button-press');
            });
            button.addEventListener('mouseleave', () => { // На случай, если кнопка отпускается вне элемента
                button.classList.remove('button-press');
            });
        });
    };

    // --- Логика для страницы профиля ---
    const animateProfile = function() {
        const profileInfo = document.querySelector('.profile-info');
        if (profileInfo) {
            profileInfo.classList.add('info-fade-in');
        }

        const bookingItems = document.querySelectorAll('.booking-item');
        bookingItems.forEach((item, index) => {
            item.style.animationDelay = `${0.2 + index * 0.1}s`; // Задержка для каскадного появления
            item.classList.add('booking-slide-in'); // Класс для анимации появления бронирования
        });

        const couponItems = document.querySelectorAll('.coupon-item');
        couponItems.forEach((item, index) => {
            item.style.animationDelay = `${0.3 + index * 0.1}s`; // Задержка для каскадного появления
            item.classList.add('coupon-fade-in'); // Класс для анимации появления купонов
        });
    };

    // --- Запуск функций в зависимости от текущей страницы ---
    const path = window.location.pathname;

    if (path.includes('login.html') || path.includes('register.html') || path.includes('booking.html')) {
        animateForm();
    }

    if (path.includes('profile.html')) {
        animateProfile();
    }
});