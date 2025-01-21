class Game extends Phaser.Scene {
    constructor() {
        super();
        this.activeRainDrops = 0;
        this.maxRainDrops = 50;
    }

    preload() {
        this.load.spritesheet('background', 'imgs/hbd.png', {
            frameWidth: 480,  // Set this to your GIF's frame width
            frameHeight: 480 // Set this to your GIF's frame height
        });
        this.load.image('sky', 'imgs/space.jpg');
        this.load.image('bd_background', 'imgs/birthday-gift.jpg');
        this.load.image('logo', 'imgs/ms_teach.png');
        this.load.image('star', 'imgs/pngwing.com(1).png');
        this.load.image('confetti', 'imgs/confetti.png');
        this.load.image('birthday_emoji', 'imgs/birthday_emoji.png');
        this.load.image('confetti_emoji', 'imgs/confetti_emoji.png');
        this.load.image('gift', 'imgs/gift.png');
        this.load.image('yellow_star', 'imgs/yellow_star.png');
        this.load.audio('bgMusic', 'sfx/hbd_song.mp3');
    }

    create() {
        // Get game dimensions
        const game_width = this.scale.width;
        const game_height = this.scale.height;

        // Create the animated background sprite
        const background = this.add.sprite(game_width / 2, game_height / 2, 'background');
        
        // Create the animation configuration
        this.anims.create({
            key: 'background_animation',
            frames: this.anims.generateFrameNumbers('background', {
                start: 0,
                end: 11  // Replace with (number of frames - 1) in your sprite sheet
            }),
            frameRate: 10,  // Adjust this value to control animation speed
            repeat: -1      // -1 means loop forever
        });
        
        // Play the animation
        background.play('background_animation');
        
        // Function to handle background scaling and positioning
        const resizeBackground = () => {
            const newWidth = this.scale.width;
            const newHeight = this.scale.height;
            
            // Calculate scale factors to cover the screen while maintaining aspect ratio
            const scaleX = newWidth / background.width;
            const scaleY = newHeight / background.height;
            const scale = (scaleX * 0.5) * (scaleY * 0.5);
            
            background.setScale(scale);
            
            // Center the background
            background.x = newWidth / 2;
            background.y = newHeight / 2;
        };

        const centerBackground = () => {
            const newWidth = this.scale.width;
            const newHeight = this.scale.height;
            
            // Center the background without scaling
            background.x = newWidth / 2;
            background.y = newHeight / 2;
        };
        resizeBackground();
        // Listen for game resize events
        this.scale.on('resize', resizeBackground);

        // Initial centering
        centerBackground();
        
        // Listen for game resize events
        this.scale.on('resize', centerBackground);
        
        // Ensure background is behind other elements
        background.setDepth(-1);


        // // this.add.image(0, 0, 'sky').setOrigin(0);
        // this.add.image(0,0, 'bd_background').setScale(0.5).setOrigin(0);

        // Raining presents
        this.time.addEvent({
            delay: 200,
            callback: this.createRainingImage,
            callbackScope: this,
            loop: true
        });
        
        // Confetti particle system - following at bottom left
        const confetti = this.add.particles(0, 0, 'confetti', {
            speed: 80,
            scale: { start: 0.25, end: 0 },
            blendMode: 'SCREEN',
            rotate: { min: 0, max: 360 },
            frequency: 100, // Emit particles less frequently
            follow: {
                x: -20,  // Offset to bottom left
                y: 20
            },
            lifespan: 800 // Shorter lifespan
        });

        // Birthday emoji particle system - following at top right
        const birthday_emoji = this.add.particles(0, 0, 'birthday_emoji', {
            speed: 90,
            scale: { start: 0.08, end: 0 },
            blendMode: 'SCREEN',
            rotate: { min: 0, max: 360 },
            frequency: 120,
            follow: {
                x: 20,  // Offset to top right
                y: -20
            },
            lifespan: 1000
        });

        // Confetti emoji particle system - following at bottom right
        const confetti_emoji = this.add.particles(0, 0, 'confetti_emoji', {
            speed: 70,
            scale: { start: 0.1, end: 0 },
            blendMode: 'SCREEN',
            rotate: { min: 0, max: 360 },
            frequency: 110,
            follow: {
                x: 20,  // Offset to bottom right
                y: 20
            },
            lifespan: 900
        });

        // Adding Logo to the game
        const logo = this.physics.add.image(100, 100, 'logo');
        logo.setScale(0.5);
        logo.setVelocity(400, 400);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        
        // Make particle systems follow the logo with their respective offsets
        confetti.startFollow(logo);
        birthday_emoji.startFollow(logo);
        confetti_emoji.startFollow(logo);

        var addButton = this.add.text(50, 10, 'Click to add more logo', { fontSize: '10px', fill: '#fff' });
        addButton.setOrigin(0.5);
        addButton.setInteractive();
        addButton.setDepth(1);
        addButton.setScrollFactor(0);
        addButton.on('pointerdown', () => {
            this.addLogo();
        }, this);

        var button = this.add.text(50, 50, 'Click to clear', { fontSize: '10px', fill: '#fff' });
        button.setOrigin(0.85);
        button.setInteractive();
        button.setDepth(1);
        button.setScrollFactor(0);
        button.on('pointerdown', () => {
            const numOfExecute = 10;
            for (let i = 0; i < numOfExecute; i++) {
                this.clearScene();
            }
        }, this);

        var credit_label = this.add.text(50, 100, 'Thanks to "Rany" for this image!', { fontSize: '10px', fill: '#fff' });
        credit_label.setOrigin(0.35);
        credit_label.setDepth(1);
        credit_label.setScrollFactor(0);

        var play_music_button = this.add.text(50, 150, 'Click to play music', { fontSize: '10px', fill: '#fff' });
        play_music_button.setOrigin(0.6);
        play_music_button.setInteractive();
        play_music_button.setDepth(1);
        play_music_button.setScrollFactor(0);
        play_music_button.on('pointerdown', () => {
            music.play();
            });


        // Added background music
        const music = this.sound.add('bgMusic', {
            loop: true,
        });

    }

    addLogo() {
        // Confetti effect - bottom left
        const effect1 = this.add.particles(0, 0, 'confetti', {
            speed: 80,
            scale: { start: 0.08, end: 0 },
            blendMode: 'SCREEN',
            rotate: { min: 0, max: 360 },
            frequency: 100,
            follow: {
                x: -20,
                y: 20
            },
            lifespan: 800
        });

        // Birthday emoji effect - top right
        const effect2 = this.add.particles(0, 0, 'birthday_emoji', {
            speed: 90,
            scale: { start: 0.08, end: 0 },
            blendMode: 'SCREEN',
            rotate: { min: 0, max: 360 },
            frequency: 120,
            follow: {
                x: 20,
                y: -20
            },
            lifespan: 1000
        });

        // Confetti emoji effect - bottom right
        const effect3 = this.add.particles(0, 0, 'confetti_emoji', {
            speed: 70,
            scale: { start: 0.08, end: 0 },
            blendMode: 'SCREEN',
            rotate: { min: 0, max: 360 },
            frequency: 110,
            follow: {
                x: 20,
                y: 20
            },
            lifespan: 1200
        });

        const logo1 = this.physics.add.image(
            Phaser.Math.Between(0, 800),
            Phaser.Math.Between(0, 600),
            'logo'
        );
        logo1.setScale(0.5);
        logo1.setVelocity(
            Phaser.Math.Between(400, 600),
            Phaser.Math.Between(400, 600)
        );
        logo1.setBounce(1, 1);
        logo1.setCollideWorldBounds(true);
        
        // Make effects follow the new logo
        effect1.startFollow(logo1);
        effect2.startFollow(logo1);
        effect3.startFollow(logo1);
    }

    clearScene() {
        this.children.each(child => {
            if (child.texture && (
                child.texture.key === 'logo' || 
                child.texture.key === 'confetti' || 
                child.texture.key === 'birthday_emoji' || 
                child.texture.key === 'confetti_emoji'
            )) {
                child.destroy();
            }
        });
    }

    createRainingImage() {
        if (this.activeRainDrops >= this.maxRainDrops) {
            return;
        }

        const x = Phaser.Math.Between(0, this.scale.width);
        const gift = this.physics.add.image(x, -50, 'gift');
        const confetti = this.physics.add.image(x, -50, 'confetti');
        const star = this.physics.add.image(x, -50, 'yellow_star');
        
        this.activeRainDrops++;
        
        function update(parameter) {
            parameter.setScale(0.1);
            parameter.setVelocity(
                Phaser.Math.Between(-50, 50),
                Phaser.Math.Between(100, 200)
            );
            parameter.setAngularVelocity(Phaser.Math.Between(-180, 180));
        }

        update(gift);
        update(confetti);
        update(star);
        
        // Destroy gift when it goes off screen
        this.time.delayedCall(8000, () => {
            this.activeRainDrops--;
            gift.destroy();
            confetti.destroy();
            star.destroy();
        });
    }
}

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