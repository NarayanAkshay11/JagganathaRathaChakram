// script.js

const imageWheel = document.getElementById('image-wheel');
const detailView = document.getElementById('detail-view');
const zoomedImage = document.getElementById('zoomed-image');
const titleElement = document.getElementById('title');
const descriptionElement = document.getElementById('description');
const backButton = document.getElementById('back-button');

// Function to fetch data from GitHub
async function fetchData() {
    const response = await fetch('https://api.github.com/repos/NarayanAkshay11/JagganathaRathaChakram/contents/characters.md');
    const data = await response.json();
    const content = atob(data.content);
    return parseMarkdown(content);
}

// Function to parse Markdown content
function parseMarkdown(markdown) {
    const lines = markdown.split('\n');
    const deities = [];
    let currentDeity = {};

    lines.forEach(line => {
        if (line.startsWith('# ')) {
            if (Object.keys(currentDeity).length > 0) {
                deities.push(currentDeity);
            }
            currentDeity = { name: line.substring(2).trim() };
        } else if (line.startsWith('![')) {
            const match = line.match(/\((.*?)\)/);
            if (match) {
                currentDeity.image = match[1];
            }
        } else if (line.trim() !== '') {
            currentDeity.description = (currentDeity.description || '') + line.trim() + ' ';
        }
    });

    if (Object.keys(currentDeity).length > 0) {
        deities.push(currentDeity);
    }

    return deities.map((deity, index) => ({
        id: index + 1,
        ...deity,
        description: deity.description.trim()
    }));
}

// Populate the image wheel
async function populateImageWheel() {
    const deities = await fetchData();
    const wheelWidth = deities.length * 300; // 250px image width + 50px margin
    imageWheel.style.width = `${wheelWidth}px`;

    deities.forEach(deity => {
        const img = document.createElement('img');
        img.src = deity.image;
        img.alt = deity.name;
        img.classList.add('wheel-image');
        img.dataset.id = deity.id;
        img.addEventListener('click', () => showDetail(deity.id));
        imageWheel.appendChild(img);
    });

    // Clone images for continuous loop
    const clonedImages = imageWheel.cloneNode(true);
    clonedImages.childNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            node.addEventListener('click', () => showDetail(node.dataset.id));
        }
    });
    imageWheel.appendChild(clonedImages);
}

// Show detail view
async function showDetail(id) {
    const deities = await fetchData();
    const deity = deities.find(d => d.id === parseInt(id));
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

// Add chariot and horses to the sun animation
function addChariotAndHorses() {
    const chariot = document.querySelector('.chariot');
    for (let i = 0; i < 7; i++) {
        const horse = document.createElement('div');
        horse.classList.add('horse');
        chariot.appendChild(horse);
    }
}

// Initialize the page
populateImageWheel();
addChariotAndHorses();
