let characters = [];
let currentIndex = 0;

fetch('characters.md')
    .then(response => response.text())
    .then(data => {
        characters = parseMarkdownTable(data);
        updateCarousel();
    });

function parseMarkdownTable(markdown) {
    const lines = markdown.split('\n').slice(2); // Skip header rows
    return lines.map(line => {
        const [name, image, description] = line.split('|').slice(1, -1).map(cell => cell.trim());
        return { name, image, description };
    });
}

function updateCarousel() {
    const character = characters[currentIndex];
    document.querySelector('.character-image').style.backgroundImage = `url(${character.image})`;
    document.querySelector('.name').textContent = character.name;
    document.querySelector('.description').textContent = character.description;
}

document.querySelector('.prev').addEventListener('click', showPreviousCharacter);
document.querySelector('.next').addEventListener('click', showNextCharacter);

function showPreviousCharacter() {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateCarousel();
}

function showNextCharacter() {
    currentIndex = (currentIndex + 1) % characters.length;
    updateCarousel();
}
