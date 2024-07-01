$(document).ready(function() {
    let currentIndex = 0;
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    function fetchData() {
        $.getJSON(apiUrl, function(data) {
            createCarousel(data.slice(0, 5)); // Get first 5 items
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data:', textStatus, errorThrown);
        });
    }

    function createCarousel(data) {
        const carousel = $('.carousel');
        carousel.empty();

        data.forEach((item) => {
            const carouselItem = $('<div>').addClass('carousel-item');
            const title = $('<h2>').text(item.title);
            const body = $('<p>').text(item.body);

            carouselItem.append(title, body);
            carousel.append(carouselItem);
        });

        updateCarousel();
    }

    function updateCarousel() {
        const items = $('.carousel-item');
        const translateX = -currentIndex * 100;
        $('.carousel').css('transform', `translateX(${translateX}%)`);
    }

    $('.nav-button.prev').click(function() {
        currentIndex = (currentIndex - 1 + $('.carousel-item').length) % $('.carousel-item').length;
        updateCarousel();
    });

    $('.nav-button.next').click(function() {
        currentIndex = (currentIndex + 1) % $('.carousel-item').length;
        updateCarousel();
    });

    fetchData();
});
