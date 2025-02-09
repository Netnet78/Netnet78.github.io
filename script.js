document.addEventListener("DOMContentLoaded", function () {

    // Popup that ask the user to play
    const popup = document.getElementById('popup');
    const playButton = document.getElementById('playButton');
    let userName = '';

    playButton.addEventListener('click', () => {
        const userInput = document.getElementById('nameInput').value;

        if (userInput === "") {
            alert("Pleae input your name first!");
            return
        };

        userName = userInput;
        document.getElementById('greeting').textContent = `Hello, ${userName}! 🎉`;
        popup.style.display = 'none';
    });


    const imageFolder = 'images'; // Folder containing your images
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let bgMusic = document.getElementById("bgMusic");
    let hoverSound = new Audio("audio/beep.wav");
    let clickSound = new Audio("audio/hover-sound-click.mp3");
    let successSound = new Audio("audio/success.mp3");
    let victorySound = new Audio("audio/audience-clapping.mp3")
    let victoryMessage = document.getElementById("completed-popup");
    let victoryUser = document.getElementById("winner");
    
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
            card.addEventListener('click',flipCard);
            card.addEventListener('click',() => {
                playSound(clickSound,1);
            });
            card.addEventListener('mouseover', () => {
                playSound(hoverSound,1);
            });
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
    function playSound(sound,volume) {
        sound.volume = volume;
        sound.play();
    }


    // Play background music
    function playMusic() {
        bgMusic.play().catch(error =>
            console.log("Autoplay blocked:", error)
        );
    }
    bgMusic.addEventListener("ended", () => {
        bgMusic.currentTime = 0;
        bgMusic.play()
    });
    
    
    // Check if the flipped cards match
    function checkMatch() {
        const [card1, card2] = flippedCards;
    
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
            playSound(successSound,1)
    
            if (matchedCards.length === cards.length) {
                setTimeout(() => playSound(victorySound, 1), 500);
                let victoryMessage = document.getElementById("completed-popup");
                let victoryUser = document.getElementById("winner");
                victoryMessage.style.display = "flex"
                victoryUser.textContent = `អបអរសាទរ ${userName}! 🎉🎉🎉`
            }
        } else {
            // Hide the images again
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
    
        flippedCards = [];
    }


    // Show victory screen
    function showVictory() {
        setTimeout(() => playSound(victorySound, 1), 500);
        victoryMessage.style.display = "flex";
        victoryUser.textContent = `អបអរសាទរ ${userName}! 🎉🎉🎉`;
    }

    // Instant win function
    function instantWin() {
        const allCards = document.querySelectorAll('.card');
        const cardPairs = {};

        // Group cards by their image
        allCards.forEach(card => {
            const image = card.dataset.image;
            if (!cardPairs[image]) {
                cardPairs[image] = [];
            }
            cardPairs[image].push(card);
        });

        // Match all pairs instantly
        Object.values(cardPairs).forEach(pair => {
            pair.forEach(card => {
                card.classList.add('flipped', 'matched');
                matchedCards.push(card);
            });
            playSound(successSound, 1);
        });

        // Show victory screen
        showVictory();
    }

    // Hidden secret, DO NOT TOUCH
    let cheatCode = '';
    let cheatTimer;
    
    document.addEventListener('keydown', (event) => {
        cheatCode += event.key;
        clearTimeout(cheatTimer);
        cheatTimer = setTimeout(() => {
            cheatCode = ''; // Reset the cheat code after 3 seconds
        }, 3000);
    
        if (cheatCode.toLowerCase() === 'owner') {
            instantWin();
            cheatCode = ''; // Reset the cheat code after triggering
        }
    });
    
    // Initialize the game
    async function init() {
        await fetchImages(); // Fetch images first
        createBoard(); // Create the game board
    }
    document.addEventListener("click",playMusic,{once:true});
    
    init();
})