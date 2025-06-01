document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const totalItems = items.length;

    // Создаем индикаторы
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';
    carouselInner.parentNode.appendChild(indicatorsContainer);

    for (let i = 0; i < totalItems; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToItem(i));
        indicatorsContainer.appendChild(indicator);
    }

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем активные индикаторы
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function goToItem(index) {
        if (index < 0) {
            currentIndex = totalItems - 1;
        } else if (index >= totalItems) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateCarousel();
    }

    function nextItem() {
        goToItem(currentIndex + 1);
    }

    function prevItem() {
        goToItem(currentIndex - 1);
    }

    // Автоматическое перелистывание
    let interval = setInterval(nextItem, 5000);

    // Останавливаем автоматическое перелистывание при наведении
    carouselInner.parentNode.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    // Возобновляем автоматическое перелистывание при уходе курсора
    carouselInner.parentNode.addEventListener('mouseleave', () => {
        interval = setInterval(nextItem, 5000);
    });

    // Кнопки управления
    nextBtn.addEventListener('click', nextItem);
    prevBtn.addEventListener('click', prevItem);

    // Обновляем карусель при загрузке страницы
    updateCarousel();
});