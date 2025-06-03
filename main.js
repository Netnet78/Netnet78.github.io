const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const playButton = document.getElementById('playButton');
const container = document.getElementById("container");
const canvasContainer = document.querySelector(".canvas-container");
const gameOverContainer = document.getElementById("gameOverContainer");
const gameOverMessage = document.getElementById("gameOverMessage");
const finalScore = document.getElementById("finalScore");
const changeButton = document.getElementById("changeButton");

// GAME SCALE
const SCALE = 1.5;

// Load audio
const bgMusic = document.getElementById("bgMusic");
const secondBgMusic = document.getElementById("secondBgMusic");
const thirdBgMusic = document.getElementById("thirdBgMusic");
const eatSound = new Audio('./sounds/yummy.mp3');
const damagedSound = new Audio('./sounds/damaged.mp3');
const gameOverSound = new Audio('./sounds/game_over.wav');

// Load cakes
const cakeImg = [];
for (let i = 0; i < 12; i++) {
    const img = new Image();
    img.src = `./images/Cakes/${i + 1}.png`;
    cakeImg.push(img);
}

// Load NOT cakes
const notCakeImg = [];
for (let i = 0; i < 2; i++) {
    const img = new Image();
    img.src = `./images/NotCakes/${i + 1}.png`;
    notCakeImg.push(img);
}

// Load player
const playerImgList = [
    "./images/Players/happy_plate.png", // Normal
    "./images/Players/unhappy_plate.png", // Damaged
];
const playerImg = [];
for (let i = 0; i < playerImgList.length; i++) {
    const img = new Image();
    img.src = playerImgList[i];
    playerImg.push(img);
}

let player = {
    x: canvas.width / 2 - 25,
    y: 550,
    width: 50 * SCALE,
    height: 20 * SCALE,
    lives:Math.max(Math.floor(Math.random() * 10), 3),
    danger:1, // Danger scale
    state: 0, // 0 = happy, 1 = damaged
};

let items = [];
let score = 0;
let gameOver = false;

function spawnItem() {
    const isCake = Math.random() < 0.7;
    const item = {
        x: Math.random() * (canvas.width - 20),
        y: 0,
        width: 32 * SCALE,
        height: 32 * SCALE,
        isCake,
        img: isCake
            ? cakeImg[Math.floor(Math.random() * cakeImg.length)]
            : notCakeImg[Math.floor(Math.random() * notCakeImg.length)]
    };
    items.push(item);
}

function drawPlayer() {
    context.drawImage(playerImg[player.state], player.x, player.y, player.width, player.height);
}

function drawItems() {
    items.forEach(item => {
        context.drawImage(item.img, item.x, item.y, item.width, item.height);
    });
}

function updateItems() {
    items.forEach(item => {
        item.y += player.danger;

        if (
            item.x < player.x + player.width &&
            item.x + item.width > player.x &&
            item.y < player.y + player.height &&
            item.y + item.height > player.y
        ) {
            if (item.isCake) {
                score += 10; 
                eatSound.play();
            } else {
                damagedSound.volume = 0.45;
                damagedSound.play();
                score -= 15;
                player.state = 1;
                player.lives -= 1;
                setTimeout(() => player.state = 0, 500);
            }
            item.y = canvas.height + 1; // Remove from screen
        }
    });

    items = items.filter(item => item.y < canvas.height);
}

let spawnRate = 800; // Initial spawn rate in ms
function spawnItemLoop() {
    if (gameOver) return;

    spawnItem();

    if (score >= 1000) {
        spawnRate = 200; // very fast
    } else if (score >= 400) {
        spawnRate = 400; // faster
    } else {
        spawnRate = 800; // default
    }

    setTimeout(spawnItemLoop, spawnRate);
}

function drawScore() {
    context.fillStyle = "#ffffff";
    context.font = "20px Kantumruy Pro, sans-serif";
    context.fillText(`Score: ${score}`, 10, 30);
}

// Play background music
function playMusic(song) {
    song.play().catch(error =>
        console.log("Autoplay blocked:", error)
    );
}

canvas.addEventListener('click', () => {
    console.log("User clicked!")
})

document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;
    player.x = Math.max(0, Math.min(canvas.width - player.width, mouseX - player.width / 2));
});

function gameLoop() {
    // Danger increment all time
    const dangerThreshold = 100;
    if (score >= dangerThreshold * (player.danger + 1)) {
        player.danger += 1;
    }

    if (score >= 400 && score < 1000) {
        bgMusic.pause();

        setTimeout(() => {
            secondBgMusic.play().catch(error => {
                console.warn("Error playing new track:", error)});
        }, 500);
    }

    if (score >= 1000) {
        secondBgMusic.pause();
        bgMusic.pause();

        setTimeout(() => {
            thirdBgMusic.play().catch(error => {
                console.warn("Error playing the third track: ", error);
            })
        }, 500);
    }

    // If the user has 0 lives or not
    if (player.lives <= 0) {
        thirdBgMusic.volume = 0.25;
        secondBgMusic.volume = 0.25;
        bgMusic.volume = 0.25;

        gameOver = true;
        let gameOverMessageIndex = Math.floor(Math.random() * 2);

        if (gameOverMessageIndex === 1) {
            gameOverMessage.textContent = "ចានរបស់អ្នកត្រូវបានគេបោះគ្រាប់បែក 💥 🍽️";
        } else {
            gameOverMessage.textContent = "ចានរបស់អ្នកប្រឡាក់អាចម៍ ស្អុយណាស់! 💩 🍽️";
        }

        gameOverSound.play();
        finalScore.textContent = score;

        canvasContainer.style.display = "none";
        gameOverContainer.style.display = "block";
        return;
    }

    if (gameOver) {
        return
    };

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawItems();
    updateItems();
    drawScore();

    requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player.y = canvas.height - player.height - 20;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Start game on button click
playButton.addEventListener('click', () => {
    container.style.display = "none";
    canvasContainer.style.display = "flex";
    canvasContainer.style.width = "auto";
    canvasContainer.style.visibility = "visible";
    resizeCanvas();

    bgMusic.loop = true;
    bgMusic.volume = 0.75;
    bgMusic.play().catch(error => {
        console.warn("BG Music was blocked: ", error);
    });

    spawnItemLoop();
    gameLoop();
});

// Navigate to the default window
changeButton.addEventListener('click', () => {
    window.open("./card_game","_self");
})
