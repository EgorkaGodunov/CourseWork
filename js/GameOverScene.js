class GameOverScene extends Phaser.Scene
{
    constructor() {
        super({ key: "GameOverScene" });
      }
      randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      }
      preload(){
        this.load.image('start_light','assets/button_start_light.png')
        this.load.image('start_dark','assets/button_start_dark.png')

        this.load.image('background','assets/background.png')
        this.load.spritesheet('star','assets/star.png',{frameWidth: 9, frameheight: 9})


      }
      create() {
        const config = {
          key: 'blic',
          frames: this.anims.generateFrameNumbers('star'),
          frameRate: 3,
          repeat: -1
      };
  
        this.anim = this.anims.create(config);
        this.stars = this.add.group()
        for(let i = 0; i<40;i++){
          let x = this.randomInteger(20,580)
          let y = this.randomInteger(20,800)
  
          this.stars.create(x,y,'star')
          this.stars.getChildren().at(-1).play('blic')
        }
        this.checker = true
        this.scale = 3
        this.startButton = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.20,'start_light').setScale(this.scale).setInteractive().on('pointerdown',function(){
          this.scene.start("MainScene")
        },this)
        this.input.on('gameobjectmove',function(pointer, gameObject){
          if(this.checker){
            if(gameObject.texture.key == 'start_light'){
              this.startButton.setTexture('start_dark')
            }
            this.checker = false

          }
        },this)

        this.input.on('gameobjectout',function(pointer, gameObject){
          this.checker = true
          if(gameObject.texture.key == 'start_dark'){
            this.startButton.setTexture('start_light')
          }
        },this)

      }
}