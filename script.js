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

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;                                                        
let yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
                                                    
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/* most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            currentIndex = (currentIndex + 1) % characters.length;
            updateCarousel();
        } else {
            /* right swipe */
            currentIndex = (currentIndex - 1 + characters.length) % characters.length;
            updateCarousel();
        }                       
    } 
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
