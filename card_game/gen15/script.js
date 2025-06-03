document.addEventListener("DOMContentLoaded", function () {
    // Popup that ask the user to play
    const startup_popup = document.getElementById('startup-popup');
    const playButton = document.getElementById('playButton');
    const changeGameButton = document.getElementById("changeGameButton");
    let userName = '';

    playButton.addEventListener('click', () => {
        const userInput = document.getElementById('nameInput').value;

        if (userInput === "") {
            alert("Please input your name first!");
            return;
        }

        userName = userInput;
        document.getElementById('greeting').textContent = `Hello, ${userName}! 🎉`;
        startup_popup.style.display = 'none';
    });

    // Victory popup
    const back_btn_victory = document.getElementById('back-btn-victory');
    const victory_popup = document.getElementById('completed-popup');
    function close_popup(popup) {
        popup.style.display = 'none'
    }
    back_btn_victory.addEventListener('click', () => {
        close_popup(victory_popup);
    });

    // Mode selection menu popup that ask the user to change a specific mode
    const selection_popup = document.getElementById('mode-selection-menu');
    const selection_popup_toggle = document.getElementById('mode-toggle');
    const back_btn = document.querySelector('#back-btn');
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
        window.open('../',"_self");
    });
    gen_15_btn.addEventListener('click', () => {
        window.open("../gen15", "_self");
    });

    // Define image names directly instead of trying to fetch them
    const imageNames = [];
    for (let i = 1; i <= 27; i++) {
        imageNames.push(`photo_${i}`);
    }


    // Function to fade out the music
    function fadeOutMusic(audioElement, duration = 1000) {
        return new Promise((resolve) => {
            const fadeOutInterval = 50; // Interval in milliseconds
            const steps = duration / fadeOutInterval;
            const stepSize = audioElement.volume / steps;

            const fadeOut = setInterval(() => {
                if (audioElement.volume > 0) {
                    audioElement.volume = Math.max(0, audioElement.volume - stepSize);
                } else {
                    clearInterval(fadeOut);
                    audioElement.pause(); // Pause the audio after fading out
                    resolve();
                }
            }, fadeOutInterval);
        });
    }

    // Function to fade in the music
    function fadeInMusic(audioElement, duration = 1000) {
        return new Promise((resolve) => {
            const fadeInInterval = 50; // Interval in milliseconds
            const steps = duration / fadeInInterval;
            const stepSize = 1 / steps;

            audioElement.volume = 0; // Start from 0 volume
            audioElement.play(); // Start playing the music

            const fadeIn = setInterval(() => {
                if (audioElement.volume < 1) {
                    audioElement.volume = Math.min(1, audioElement.volume + stepSize);
                } else {
                    clearInterval(fadeIn);
                    resolve();
                }
            }, fadeInInterval);
        });
    }


    // Add the analyzeAudio function
    function analyzeAudio(audioElement) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
    
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
    
        function checkBeat() {
            analyser.getByteFrequencyData(dataArray);
    
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const average = sum / bufferLength;
    
            // Threshold for detecting a beat
            if (average > 99) { // Adjust this threshold based on your audio
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.classList.add('glow-effect');
                    document.body.classList.add('glow-effect');
                    setTimeout(() => {
                        card.classList.remove('glow-effect');
                        document.body.classList.remove('glow-effect');
                    }, 1500); // Duration of the glow effect
                });
            }
    
            requestAnimationFrame(checkBeat);
        }
    
        checkBeat();
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
            card.style.backgroundImage = `url('../images/GEN15/${imageName}.jpg')`;
            
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
        const bgMusic = document.getElementById("bgMusic");
        fadeInMusic(bgMusic, 1000).catch(error => {
            console.log("Autoplay blocked:", error);
        });
    }
    
    bgMusic.addEventListener("ended", () => {
        fadeOutMusic(bgMusic, 2500).then(() => {
            bgMusic.currentTime = 0;
            fadeInMusic(bgMusic, 1000).catch(error => {
                console.log("Music replay error:", error);
            });
        });
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

    // Function to create star falling effect
    function createStarFall() {
        const starFallContainer = document.createElement('div');
        starFallContainer.style.position = 'fixed';
        starFallContainer.style.top = '0';
        starFallContainer.style.left = '0';
        starFallContainer.style.width = '100%';
        starFallContainer.style.height = '100%';
        starFallContainer.style.pointerEvents = 'none';
        starFallContainer.style.zIndex = '9999';
        document.body.appendChild(starFallContainer);

        const numberOfStarsFall = 50;
        const starImages = ['url("../images/star.png")', 'url("../images/purple-star.png")'];

        for (let i = 0; i < numberOfStarsFall; i++) {
            const starFall = document.createElement('div');
            starFall.classList.add('starfall');
            starFall.style.left = `${Math.random() * 100}vw`;
            starFall.style.animationDuration = `${Math.random() * 5 + 5}s`;
            starFall.style.opacity = Math.random();
            starFall.style.width = `${Math.random() * 20 + 10}px`;
            starFall.style.height = starFall.style.width;
            starFall.style.backgroundImage = starImages[Math.floor(Math.random() * starImages.length)];
            starFallContainer.appendChild(starFall);
        }
    }
    
    // Initialize the game
    function init() {
        createCardPairs();
        createBoard();
        createStarFall();
        // analyzeAudio(bgMusic);
    }
    
    document.addEventListener("click", playMusic, {once: true});

    changeGameButton.addEventListener("click", ()=> {
        window.open('../../.', '_self');
    })
    
    init();
});