document.addEventListener("DOMContentLoaded", function () {
    // Popup that ask the user to play
    const popup = document.getElementById('popup');
    const playButton = document.getElementById('playButton');
    let userName = '';

    playButton.addEventListener('click', () => {
        const userInput = document.getElementById('nameInput').value;

        if (userInput === "") {
            alert("Please input your name first!");
            return;
        }

        userName = userInput;
        document.getElementById('greeting').textContent = `Hello, ${userName}! 🎉`;
        popup.style.display = 'none';
    });

    // Mode selection menu popup that ask the user to change a specific mode
    const selection_popup = document.getElementById('mode-selection-menu');
    const selection_popup_toggle = document.getElementById('mode-toggle');
    const back_btn = document.getElementById('back-btn');
    const gen_13_btn = document.getElementById('gen-13');
    const gen_14_btn = document.getElementById('gen-14');
    const gen_15_btn = document.getElementById('gen-15');
    const sp = selection_popup;
    const spt = selection_popup_toggle;

    spt.addEventListener('click', ()=> {
        sp.style.display = 'flex';
        sp.style.visibility = 'visible';
    });

    back_btn.addEventListener('click', () => {
        sp.style.display = 'none';
        sp.style.visibility = 'hidden';
    });

    gen_13_btn.addEventListener('click', () => {
        window.open('../gen13',"_self")
    });
    gen_14_btn.addEventListener('click', () => {
        window.open('../gen14',"_self");
    });
    gen_15_btn.addEventListener('click', () => {
        window.open("../gen15", "_self");
    });

    // Define image names directly instead of trying to fetch them
    const imageNames = [];
    for (let i = 1; i <= 27; i++) {
        imageNames.push(`photo_${i}_2025-02-09_15-01-53`);
    }
    
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let bgMusic = document.getElementById("bgMusic");
    let hoverSound = new Audio("../audio/beep.wav");
    let clickSound = new Audio("../audio/hover-sound-click.mp3");
    let successSound = new Audio("../audio/success.mp3");
    let victorySound = new Audio("../audio/audience-clapping.mp3");
    let victoryMessage = document.getElementById("completed-popup");
    let victoryUser = document.getElementById("winner");
    
    // Create pairs from the image names
    function createCardPairs() {
        // Select a subset of images if you want fewer cards
        const selectedImages = imageNames.slice(0, 28);
        cards = [...selectedImages, ...selectedImages]; // Duplicate for pairs
        shuffle(cards);
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
        gameBoard.innerHTML = ''; // Clear existing cards
        
        cards.forEach((imageName) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = imageName;
            
            // Set the background image directly on the card
            card.style.backgroundImage = `url('../images/GEN14/${imageName}.jpg')`;
            
            card.addEventListener('click', flipCard);
            card.addEventListener('click', () => {
                playSound(clickSound, 1);
            });
            card.addEventListener('mouseover', () => {
                playSound(hoverSound, 1);
            });
            
            gameBoard.appendChild(card);
        });
    }
    
    // Flip a card
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
            this.classList.add('flipped');
            flippedCards.push(this);
    
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }
    
    // Play sound when user hovers
    function playSound(sound, volume) {
        sound.volume = volume;
        sound.play().catch(error => console.log("Sound play error:", error));
    }

    // Play background music
    function playMusic() {
        bgMusic.play().catch(error =>
            console.log("Autoplay blocked:", error)
        );
    }
    
    bgMusic.addEventListener("ended", () => {
        bgMusic.currentTime = 0;
        bgMusic.play().catch(error => console.log("Music replay error:", error));
    });
    
    // Check if the flipped cards match
    function checkMatch() {
        const [card1, card2] = flippedCards;
    
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
            playSound(successSound, 1);
    
            if (matchedCards.length === cards.length) {
                showVictory();
            }
        } else {
            // Hide the images again
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 500);
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

        allCards.forEach(card => {
            const image = card.dataset.image;
            if (!cardPairs[image]) {
                cardPairs[image] = [];
            }
            cardPairs[image].push(card);
        });

        Object.values(cardPairs).forEach(pair => {
            pair.forEach(card => {
                card.classList.add('flipped', 'matched');
                matchedCards.push(card);
            });
            playSound(successSound, 1);
        });

        showVictory();
    }

    // Hidden secret
    let cheatCode = '';
    let cheatTimer;
    
    document.addEventListener('keydown', (event) => {
        cheatCode += event.key;
        clearTimeout(cheatTimer);
        cheatTimer = setTimeout(() => {
            cheatCode = '';
        }, 3000);
    
        if (cheatCode.toLowerCase() === 'owner') {
            instantWin();
            cheatCode = '';
        }
    });
    
    // Initialize the game
    function init() {
        createCardPairs();
        createBoard();
    }
    
    document.addEventListener("click", playMusic, {once: true});
    
    init();
});