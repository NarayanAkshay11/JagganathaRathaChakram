$(document).ready(function() {
    const sheetId = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your actual Google Sheet ID
    const sheetName = 'Sheet1'; // Replace with your sheet name if different
    const apiKey = 'YOUR_GOOGLE_SHEETS_API_KEY'; // Replace with your actual API key
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

    let currentIndex = 0;

    console.log('Script initialized');

    function fetchData() {
        console.log('Fetching data from Google Sheets...');
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log('Data received:', data);
                if (data && data.values && data.values.length > 1) {
                    const values = data.values.slice(1); // Exclude header row
                    console.log('Processed values:', values);
                    createCarousel(values);
                } else {
                    console.error('No data or insufficient data in the sheet');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data:', textStatus, errorThrown);
            }
        });
    }

    function createCarousel(data) {
        console.log('Creating carousel with data:', data);
        const carousel = $('.carousel');
        carousel.empty();

        if (data.length === 0) {
            console.log('No data to display in carousel');
            return;
        }

        data.forEach((item, index) => {
            const imageUrl = item[0];
            const title = item[1];
            const description = item[2];

            console.log(`Creating carousel item ${index}:`, {imageUrl, title, description});

            const carouselItem = $('<div>').addClass('carousel-item');
            const img = $('<img>').attr('src', imageUrl);
            const content = $('<div>').addClass('carousel-content');
            const titleEl = $('<h2>').text(title);
            const descriptionEl = $('<p>').text(description);

            content.append(titleEl, descriptionEl);
            carouselItem.append(img, content);
            carousel.append(carouselItem);
        });

        console.log('Carousel created, updating display');
        updateCarousel();
    }

    function updateCarousel() {
        console.log('Updating carousel display');
        const items = $('.carousel-item');
        const totalItems = items.length;

        if (totalItems === 0) {
            console.log('No items to display in carousel');
            return;
        }

        items.removeClass('active');
        $(items[currentIndex]).addClass('active');

        const translateX = -currentIndex * 100;
        $('.carousel').css('transform', `translateX(${translateX}%)`);
        console.log(`Carousel updated: current index ${currentIndex}, translateX ${translateX}%`);
    }

    $('.nav-button.prev').click(function() {
        console.log('Previous button clicked');
        currentIndex = (currentIndex - 1 + $('.carousel-item').length) % $('.carousel-item').length;
        updateCarousel();
    });

    $('.nav-button.next').click(function() {
        console.log('Next button clicked');
        currentIndex = (currentIndex + 1) % $('.carousel-item').length;
        updateCarousel();
    });

    // Function to test carousel with hardcoded data
    function testCarousel() {
        console.log('Testing carousel with hardcoded data');
        const testData = [
            ['https://i.pinimg.com/originals/88/80/5c/88805cff803400d8857a86215bd3e467.jpg', 'Test Title 1', 'Test Description 1'],
            ['https://github.com/NarayanAkshay11/JagPics/blob/main/hanuman.png', 'Test Title 2', 'Test Description 2'],
            ['https://i.pinimg.com/originals/b5/10/ad/b510ad9942a9329d5f8ce58a205ac1c3.jpg', 'Test Title 3', 'Test Description 3']
        ];
        createCarousel(testData);
    }

    // Uncomment the next line to test with hardcoded data instead of fetching from Google Sheets
    // testCarousel();

    // Comment out the next line if you're using testCarousel()
    fetchData();

    // Fetch data every minute (60000 milliseconds)
    setInterval(fetchData, 60000);
});
