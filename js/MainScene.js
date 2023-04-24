class MainScene extends Phaser.Scene
{
    constructor() {
        super({ key: "MainScene" });
      }
      preload(){
        this.load.image('ground',"assets/platform.png");
        this.load.spritesheet('sprite_player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      }
      createPlatform(x, y, key){
        this.platforms.add(new CommonPlatform(this, x, y, key));
      }
      create() {
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.platforms = this.add.group();

        this.player = new Player(this, this.game.config.width *0.5,this.game.config.height * 0.5, "sprite_player");
       
        this.createPlatform(200, 200,'ground');
        this.createPlatform(200, 600,'ground');


        this.physics.add.collider(this.player, this.platforms);




      }
      update(){
        this.player.update();
        if (this.keyW.isDown) {
            this.player.moveUp();
        }
        else if (this.keyS.isDown) {
            this.player.moveDown();
        }
        if (this.keyA.isDown) {
            this.player.moveLeft();
        }
        else if (this.keyD.isDown) {
            this.player.moveRight();
        }
      }
}