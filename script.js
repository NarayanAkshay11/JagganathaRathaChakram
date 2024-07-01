// script.js
$(document).ready(function() {
    const sheetId = '1eCh6XM0azDp5XvM2DPLIjlnnwMQu3WuGOk26H5tkAng';
    const sheetName = 'Sheet1';
    const apiKey = 'AIzaSyB1dC_3xQF7lBU9AyQXoZt3IBw2IUsH8Es';
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

    let currentIndex = 0;

    function fetchData() {
        $.getJSON(apiUrl, function(data) {
            const values = data.values.slice(1); // Exclude header row
            createCarousel(values);
        });
    }

    function createCarousel(data) {
        const carousel = $('.carousel');
        carousel.empty();

        data.forEach((item, index) => {
            const [imageUrl, title, paragraph] = item;
            const carouselItem = $('<div>').addClass('carousel-item');
            const img = $('<img>').attr('src', imageUrl);
            const content = $('<div>').addClass('carousel-content');
            const titleEl = $('<h2>').text(title);
            const paragraphEl = $('<p>').text(paragraph);

            content.append(titleEl, paragraphEl);
            carouselItem.append(img, content);
            carousel.append(carouselItem);
        });

        updateCarousel();
    }

    function updateCarousel() {
        const items = $('.carousel-item');
        const totalItems = items.length;

        items.removeClass('active');
        $(items[currentIndex]).addClass('active');

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
    setInterval(fetchData, 60000); // Fetch data every minute
});
