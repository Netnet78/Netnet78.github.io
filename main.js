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
        this.add.image(0,0, 'sky').setOrigin(0);
        // Adding Particle to the game
        const particles = this.add.particles(0, 0, 'particle', {
            speed: 150,
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN'
        });
        // Adding Logo to the game
        const logo = this.physics.add.image(100, 100, 'logo');

        logo.setVelocity(400, 400);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        particles.startFollow(logo);

        var button = this.add.text(50,50, 'Click to clear', {fontSize: '10px', fill: '#fff'});
        button.setOrigin(0.5);
        button.setInteractive();
        button.on('pointerdown', () => {
            const numOfExecute = 10;
            for (let i = 0; i < numOfExecute; i++) {
                this.clearScene();
            }
        }, this);

        var addButton = this.add.text(75,10, 'Click to add more logo', { fontSize: '10px', fill: '#fff' });
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
        const effect = this.add.particles(0, 0, 'particle', {
            speed: 150,
            scale: {start: 0.3, end: 0},
            blendMode: 'SCREEN'
        });

        const logo1 = this.physics.add.image(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 'logo');
        logo1.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
        logo1.setBounce(1, 1);
        logo1.setCollideWorldBounds(true);
        effect.startFollow(logo1);

    };
    clearScene() {
        this.children.each(child => {
            if (child.texture && (child.texture.key === 'logo' || child.texture.key === 'particle')) {
                child.destroy();
            }
        });
    };
    
};

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'scene',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%'
    },
    scene: Game,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        },
    },
};

const game = new Phaser.Game(config);
