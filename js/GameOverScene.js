class GameOverScene extends Phaser.Scene
{
    constructor() {
        super({ key: "GameOverScene" });
      }
      randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      }
     
      init(data){
        this.maxScore = data.data;
      }
      preload(){
        this.load.image('again_light','assets/button_again_light.png')
        this.load.image('again_dark','assets/button_again_dark.png')

        this.load.image('background','assets/background.png')
        this.load.spritesheet('star','assets/star.png',{frameWidth: 9, frameheight: 9})


      }
      create() {
        
        this.text = this.add.text(this.game.config.width *0.5, this.game.config.height *0.5, `Highest score: ${this.maxScore}`, { font: '32px Courier', fill: '#00ff00' }).setOrigin(0.5, 0.5);

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
        this.againButton = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.20,'again_light').setScale(this.scale).setInteractive().on('pointerdown',function(){
          this.scene.start("MainScene")
        },this)
        this.input.on('gameobjectmove',function(pointer, gameObject){
          if(this.checker){
            if(gameObject.texture.key == 'again_light'){
              this.againButton.setTexture('again_dark')
            }
            this.checker = false

          }
        },this)

        this.input.on('gameobjectout',function(pointer, gameObject){
          this.checker = true
          if(gameObject.texture.key == 'again_dark'){
            this.againButton.setTexture('again_light')
          }
        },this)

      }
}