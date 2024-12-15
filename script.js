document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const productCards = document.querySelectorAll(".product-card");
    const categoryCards = document.querySelectorAll(".category-card");

    // Поиск
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        productCards.forEach((card) => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();
            const category = card.querySelector(".category-label").textContent.toLowerCase();

            if (
                name.includes(query) ||
                description.includes(query) ||
                category.includes(query)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // Фильтрация по категориям
    categoryCards.forEach((categoryCard) => {
        categoryCard.addEventListener("click", () => {
            const selectedCategory = categoryCard.getAttribute("data-category");
            productCards.forEach((productCard) => {
                const productCategory = productCard.getAttribute("data-category");
                if (selectedCategory === "Все" || productCategory === selectedCategory) {
                    productCard.style.display = "block";
                } else {
                    productCard.style.display = "none";
                }
            });
        });
    });
});

/* Кнопка купить */
// Функция открытия WhatsApp с предзаполненным сообщением
function openWhatsApp(productName, productUrl) {
    const whatsappNumber = "79390060606"; // Замените на номер вашего WhatsApp
    const message = `Я бы хотел(-а) приобрести данный товар: ${productName}%0AСсылка: ${productUrl}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank"); // Открыть в новой вкладке
}
// Обработчик для всех кнопок "Купить"
document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".buy-button");

    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-name"); // Название товара
            const productUrl = button.getAttribute("data-url");   // Ссылка на товар
            openWhatsApp(productName, productUrl);
        });
    });
});



/* Галерея */
// Массив изображений для товаров
const productImages = [
    ["Image/Книги/Смягчение сердец Кораном.jpg", "Image/Книги/2.jpg"],
    ["Image/Часы/Аль-Харамен1.jpg", "Image/Часы/2.jpg"],
    ["Image/Парфюм/1.jpg", "Image/Парфюм/2.jpg"]
];

let currentImageIndex = 0;
let currentModalIndex = 0;

// Открытие модального окна
function openModal(index) {
    currentModalIndex = index;
    currentImageIndex = 0;

    // Заполнение данными из HTML
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const modalBuyButton = document.getElementById("modal-buy-button");

    // Получение данных из карточки
    const productCard = document.querySelectorAll(".product-card")[index];
    const title = productCard.querySelector("h3").textContent;
    const description = productCard.querySelector("p").textContent;
    const price = productCard.querySelector(".price").textContent;

    // Заполнение модального окна
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalPrice.textContent = price;
    modalImage.src = productImages[index][0]; // Первое изображение
    modalBuyButton.onclick = () => {
        const whatsappMessage = `Я бы хотел(-а) приобрести: ${title}`;
        window.open(`https://wa.me/79390060606?text=${encodeURIComponent(whatsappMessage)}`);
    };

    document.getElementById("product-modal").classList.add("active");





    // For big img when we are click 
let modal_gallery_close = document.querySelector(".modal-img-close")
let modal_gallery_img = document.querySelector(".modal-gallery img")
let modal_content = document.querySelector(".modal-content")
let modal_details = document.querySelector(".modal-details")

    modal_content.addEventListener("click", (e) => {
        if(modal_details.style.display == 'block') {
            modal_content.style.cssText = "background: transparent;"
            modal_details.style.cssText = 'display: none;'
            modal_gallery_img.style.cssText = "transform: scale(1.3);"
            modal_gallery_close.style.cssText = "display: block; z-index: 9999; position: relative;"
            
        }  else {
            modal_content.style.cssText = "background: white;"
            modal_details.style.cssText = "display: block;"
            modal_gallery_img.style.cssText = "transform: scale(1);"
            modal_gallery_close.style.cssText = "display: none;"
        }

    
    console.log(e.currentTarget)
})


}

// Обновление изображения в модальном окне
function updateModalImage() {
    const modalImage = document.getElementById("modal-image");
    modalImage.src = productImages[currentModalIndex][currentImageIndex];
}

// Навигация между изображениями
document.querySelector(".gallery-nav.prev").addEventListener("click", () => {
    const images = productImages[currentModalIndex];
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalImage();
});

document.querySelector(".gallery-nav.next").addEventListener("click", () => {
    const images = productImages[currentModalIndex];
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalImage();
});

// Закрытие модального окна
document.querySelector(".modal-close").addEventListener("click", () => {
    document.getElementById("product-modal").classList.remove("active");
});

// Закрытие при клике на фон
document.getElementById("product-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("product-modal")) {
        document.getElementById("product-modal").classList.remove("active");
    }
});

// Закрытие по клавише Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.getElementById("product-modal").classList.remove("active");
    }
});

// Добавление свайпа для модального изображения
const modalContent = document.querySelector(".modal-content");
let startX = 0;

modalContent.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

modalContent.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX > 50) {
        // Свайп вправо
        const images = productImages[currentModalIndex];
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateModalImage();
    } else if (deltaX < -50) {
        // Свайп влево
        const images = productImages[currentModalIndex];
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateModalImage();
    }
});





// Подсветка 1.5 сек при переходе по ссылке 
document.addEventListener("DOMContentLoaded", () => {
    // Получаем идентификатор товара из URL
    const urlHash = window.location.hash; // Например, #product-1
    if (urlHash) {
        const targetElement = document.querySelector(urlHash); // Найти элемент по id
        if (targetElement) {
            // Добавляем класс выделения
            targetElement.classList.add("highlight");

            // Удаляем выделение при клике или касании
            const removeHighlight = () => {
                targetElement.classList.remove("highlight");
                document.removeEventListener("click", removeHighlight); // Удалить обработчик
                document.removeEventListener("touchstart", removeHighlight); // Для мобильных
            };

            document.addEventListener("click", removeHighlight);
            document.addEventListener("touchstart", removeHighlight);
        }
    }
});






