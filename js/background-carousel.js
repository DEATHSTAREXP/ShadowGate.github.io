document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('background-carousel');
    const images = [
        'images/gate-bg1.jpg',
        'images/gate-bg2.jpg',
        'images/gate-bg3.jpg'
        // Добавьте больше изображений сюда, если нужно
    ];
    let currentIndex = 0;

    // Функция для создания и отображения фонового изображения
    function showImage(index) {
        // Удаляем все активные классы у текущих элементов
        const currentActive = carouselContainer.querySelector('.background-carousel-item.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }

        // Если элемент для следующего изображения уже существует, используем его
        let nextImageElement = carouselContainer.querySelector(`.background-carousel-item[data-index="${index}"]`);

        if (!nextImageElement) {
            // Если не существует, создаем новый элемент
            nextImageElement = document.createElement('div');
            nextImageElement.classList.add('background-carousel-item');
            nextImageElement.dataset.index = index;
            nextImageElement.style.backgroundImage = `url('${images[index]}')`;
            carouselContainer.appendChild(nextImageElement);
        }

        // Добавляем класс 'active' для нового изображения
        nextImageElement.classList.add('active');

        // Очищаем старые, неактивные элементы, чтобы избежать накопления DOM-элементов
        // Это опционально, но помогает поддерживать DOM чистым
        Array.from(carouselContainer.children).forEach(child => {
            if (child !== nextImageElement && child.classList.contains('active')) {
                child.classList.remove('active');
            }
            // Удаляем элементы, которые не являются текущим и не находятся в процессе перехода
            // Для более сложной логики можно добавить задержку перед удалением
        });
    }

    // Инициализация карусели
    function initCarousel() {
        if (images.length === 0) {
            console.warn('Нет изображений для фоновой карусели.');
            return;
        }

        // Показываем первое изображение
        showImage(currentIndex);

        // Автоматическое переключение изображений
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 8000); // Меняем изображение каждые 8 секунд (8000 миллисекунд)
    }

    initCarousel();
});