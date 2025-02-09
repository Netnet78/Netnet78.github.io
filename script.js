document.addEventListener("DOMContentLoaded", function () {

    // Popup that ask the user to play
    const popup = document.getElementById('popup');
    const playButton = document.getElementById('playButton');

    playButton.addEventListener('click', () => {
        popup.style.display = 'none';
    })



    // Actual game codes
    const imageFolder = 'images'; // Folder containing your images
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    var hoverSound = new Audio("audio/hover-sound-click.mp3");
    
    // Fetch the list of images from the folder
    async function fetchImages() {
        try {
            const response = await fetch(imageFolder);
            const text = await response.text();
            const parser = new DOMParser();
            const html = parser.parseFromString(text, 'text/html');
            const links = html.querySelectorAll('a');
    
            // Filter out non-image files and create pairs
            const imageFiles = Array.from(links)
                .map(link => link.href)
                .filter(href => /\.(png|jpg|jpeg|gif)$/i.test(href))
                .map(href => href.split('/').pop()); // Extract file names
    
            // Create pairs for the memory game
            cards = [...imageFiles, ...imageFiles]; // Duplicate each image for pairs
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }
    
    // Shuffle the cards
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // Create the game board
    function createBoard() {
        const gameBoard = document.getElementById('game-board');
        shuffle(cards);
    
        cards.forEach((imageName, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = imageName; // Store the image name in a data attribute
            card.style.backgroundImage = `url('${imageFolder}/${imageName}')`; // Assign the image
            card.addEventListener('click', flipCard);
            card.addEventListener('mouseover', playSound);
            gameBoard.appendChild(card);
        });
    }
    
    // Flip a card
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);
    
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }
    
    // Play sound when user hovers
    function playSound() {
        hoverSound.play();
    }
    
    
    // Check if the flipped cards match
    function checkMatch() {
        const [card1, card2] = flippedCards;
    
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
    
            if (matchedCards.length === cards.length) {
                setTimeout(() => alert('You won! 🎉'), 500);
            }
        } else {
            // Hide the images again
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
    
        flippedCards = [];
    }
    
    // Initialize the game
    async function init() {
        await fetchImages(); // Fetch images first
        createBoard(); // Create the game board
    }
    
    init();
})