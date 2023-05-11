class MainScene extends Phaser.Scene
{
  constructor() {
      super({ key: "MainScene",
      physics: {
        arcade: {
            debug: true,
            gravity: { y: 300 }
        },
        matter: {
            debug: true,
            // gravity: { y: 0.5 }
        }
    } });
    }
    preload(){
      this.load.image('ground',"assets/ground.png");
      this.load.image('sprite_player', 'assets/slime.png');
      this.load.image('sky',"assets/sky.png")
    }
    
   
    
    create() {
      this.add.image(0,0,'sky').setOrigin(0)
      this.cameras.main.setBounds(0, 0, 600, 1800)
      this.matter.world.setBounds(0, 0, 600, 1800)

      this.player = this.physics.add.image(this.game.config.width *0.5,300,'sprite_player').setScale(3)
      this.player.setBounce(0.3)
      this.player.setPosition(300,700)
      this.player.setFrictionX(0)

      this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
      this.cameras.main.followOffset.set(0, 130);


      this.checker = true
      this.height = 500
      this.playerHeight = this.player.displayHeight
      this.gameWidth, this.gameHeiht = this.sys.game.canvas
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
      this.pointer = this.input.activePointer;
      this.pointerX1
      this.pointerY1
      console.log(this.player)

      this.platforms = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 19,
        setXY: { x: 15, y: 800, stepX: 30 },
      })
      // this.platforms.children.each(function(child){
      //   child.setScale(2)
      //   child.setOrigin(0,0)
      //   child.refreshBody()
      // })
      for(let x =0;x<20;x++){
        this.platform_create()

      }
      
      this.input.on('pointerdown',function(){
        this.pointerX1 = this.pointer.x
        this.pointerY1 = this.pointer.y
      },this)
      this.input.on('pointerup',function(){
        console.log(this.pointerX1,this.pointerY1,this.pointer.x,this.pointer.y)
        let angle = Math.round(Math.atan( (this.pointer.y-this.pointerY1) / (this.pointer.x-this.pointerX1) ) * 180 / Math.PI)
        if(!isNaN(angle) && this.player.body.touching.down){
          if(this.pointer.x<=this.pointerX1 && this.pointerY1 >=this.pointer.y){
            angle = 180+angle
            console.log(angle)
            this.physics.velocityFromAngle(angle, 400, this.player.body.velocity);
            
          }else if(this.pointer.x >= this.pointerX1 && this.pointerY1 >=this.pointer.y){
            angle = 360+angle
            console.log(angle)
            this.physics.velocityFromAngle(angle, 400, this.player.body.velocity);

          }
        }

      },this)


        
        

      this.physics.add.collider(this.player,this.platforms, this.platform_collision, null, this);
      this.text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);

    }
    platform_collision(){
      if(this.checker){
        this.player.setDragX(1000);
        console.log(this.checker)
      }
    }
    platform_create(){
      let x = Math.random() * this.sys.canvas.width
      this.platforms.create(x,200+this.height,'ground')
      this.platforms.getChildren().at(-1).body.checkCollision.down = false
      this.platforms.getChildren().at(-1).body.checkCollision.left = false
      this.platforms.getChildren().at(-1).body.checkCollision.right = false
      this.platforms.getChildren().at(-1).setScale(6,1).refreshBody()


      this.height -= 100
    }
    
    update(){
      // wrap -----
      if(this.player.x <= 0 - this.player.width){
        this.player.setPosition( 600 + this.player.width - 1 ,this.player.y)
      }else if(this.player.x >= 600 + this.player.width){
        this.player.setPosition(0 - this.player.width + 1 ,this.player.y)
      }
      // -----
      // Friction ----
      if(!this.player.body.touching.down){
        this.player.setDragX(0)

      }
      // ----
      if(this.keyE.isDown){
      }
      if(this.keyZ.isDown){
        this.player.setVelocity(0,0)
        console.log(this.player.x,this.player.y)
      }
      this.cameras.main.setBounds(0, this.player.y-400, 600, 1200)
      this.matter.world.setBounds(0, this.player.y+800, 600, 1800)

      this.text.setText([
        `screen x: ${this.input.x}`,
        `screen y: ${this.input.y}`,
        `world x: ${this.input.mousePointer.worldX}`,
        `world y: ${this.input.mousePointer.worldY}`
    ]);
    
    }
    
}
