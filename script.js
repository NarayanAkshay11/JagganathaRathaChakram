// script.js

const imageWheel = document.getElementById('image-wheel');
const detailView = document.getElementById('detail-view');
const zoomedImage = document.getElementById('zoomed-image');
const titleElement = document.getElementById('title');
const descriptionElement = document.getElementById('description');
const backButton = document.getElementById('back-button');

// Sample data (replace with your actual data)
const deities = [
    { id: 1, name: 'Hanuman', image: 'images/hanuman.png', description: 'The elephant-headed god of wisdom and new beginnings.' },
    { id: 2, name: 'Panchajanya (Shankh)', image: 'images/panchajanya.png', description: 'The divine hero of the Bhagavad Gita and avatar of Vishnu.' },
    { id: 3, name: 'Sudharshan Chakra', image: 'images/sudharshan.png', description: 'The destroyer and transformer among the Trimurti.' },
];

// Populate the image wheel
function populateImageWheel() {
    deities.forEach(deity => {
        const img = document.createElement('img');
        img.src = deity.image;
        img.alt = deity.name;
        img.classList.add('wheel-image');
        img.dataset.id = deity.id;
        img.addEventListener('click', () => showDetail(deity.id));
        imageWheel.appendChild(img);
    });
}

// Show detail view
function showDetail(id) {
    const deity = deities.find(d => d.id === id);
    if (deity) {
        zoomedImage.innerHTML = `<img src="${deity.image}" alt="${deity.name}">`;
        titleElement.textContent = deity.name;
        descriptionElement.textContent = deity.description;
        imageWheel.classList.add('hidden');
        detailView.classList.remove('hidden');
    }
}

// Back to gallery
backButton.addEventListener('click', () => {
    detailView.classList.add('hidden');
    imageWheel.classList.remove('hidden');
});

// Initialize the page
populateImageWheel();
