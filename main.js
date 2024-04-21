class Game extends Phaser.Scene
{
    preload ()
    {
        this.load.image('sky', 'imgs/space.jpg')
        this.load.image('logo', 'imgs/dbslogo_PNG(1).png');
        this.load.image('particle', 'imgs/pngwing.com(1).png');
    };

    create ()
    {
        this.add.image(0,0, 'sky').setOrigin(0); // Make the image fit to the browser window
        // Adding Particle to the game
        const particles = this.add.particles(0, 0, 'particle', { // Adding particle to the game
            speed: 150,
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN'
        });
        // Adding Logo to the game
        const logo = this.physics.add.image(100, 100, 'logo'); // Adding logo plus with the physics function

        logo.setVelocity(400, 400); // Speed of the logo
        logo.setBounce(1, 1); // Make it bounce on the screen
        logo.setCollideWorldBounds(true); // Make sure that the logo doesn't goes off the screen
        particles.startFollow(logo); // Make the particle starts to follow the first logo

        var button = this.add.text(50,50, 'Click to clear', {fontSize: '10px', fill: '#fff'}); // This button will remove everything
        button.setOrigin(0.5);
        button.setInteractive(); // Make the button clickable
        button.on('pointerdown', () => {
            const numOfExecute = 10;
            for (let i = 0; i < numOfExecute; i++) {
                this.clearScene();
            }
        }, this);

        var addButton = this.add.text(75,10, 'Click to add more logo', { fontSize: '10px', fill: '#fff' }); // Adding button to make more logo
        addButton.setOrigin(0.5);
        addButton.setInteractive();
        addButton.setDepth(1);
        addButton.setScrollFactor(0);
        addButton.on('pointerdown', () => {
            this.addLogo();
        }, this);
    };

    addLogo() 
    {
        const effect = this.add.particles(0, 0, 'particle', { // This constant variable is set to make particle 
            speed: 150,
            scale: {start: 0.3, end: 0},
            blendMode: 'SCREEN'
        });
        // blendMode is to make an object blend into each other
        const logo1 = this.physics.add.image(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 'logo');
        logo1.setVelocity(Phaser.Math.Between(400, 600), Phaser.Math.Between(400, 600));
        logo1.setBounce(1, 1);
        logo1.setCollideWorldBounds(true);
        effect.startFollow(logo1);
        // Clone logos and duplicate them with the particle following each one of them
    };
    clearScene() { // Clear scene function to remove logo and particle
        this.children.each(child => {
            if (child.texture && (child.texture.key === 'logo' || child.texture.key === 'particle')) {
                child.destroy();
            }
        });
    };
    
};

var config = { // Configuration for the game
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE, // These settings will make the game run inside the window only
        parent: 'scene', // with the parent of scene
        autoCenter: Phaser.Scale.CENTER_BOTH, // Auto center objects
        width: '100%', // Width of 100% of your browser tab window
        height: '100%' // Height of 100% of your browser tab window
    },
    scene: Game, // Start the scene in the canvas
    physics: { // Physics for the game
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Change the gravity of each axis
        },
    },
};

const game = new Phaser.Game(config); // Variable to start the game
