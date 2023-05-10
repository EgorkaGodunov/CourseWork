class MainScene extends Phaser.Scene
{
  constructor() {
      super({ key: "MainScene",
      physics: {
        arcade: {
            debug: true,
            gravity: { y: 50 }
        },
        matter: {
            debug: true,
            gravity: { y: 0.5 }
        }
    } });
    }
    preload(){
      this.load.image('ground',"assets/ground.png");
      this.load.image('sprite_player', 'assets/slime.png');
      this.load.image('sky',"assets/sky.png")
    }
    
   
    
    create() {
      const wrapBounds = {
        wrap: {
            min: { x: 0},
            max: { x: 600}
        }
    };
      this.add.image(0,0,'sky').setOrigin(0)
      this.cameras.main.setBounds(0, 0, 600, 1800)
      this.matter.world.setBounds(0, 0, 600, 1800)
      // this.player.setCollideWorldBounds(true);
      // this.player.onWorldBounds = true;
      this.player = this.physics.add.image(this.game.config.width *0.5,300,'sprite_player').setScale(3)
      // this.player.setFixedRotation()
      this.player.setBounce(0.1)
      
      this.cameras.main.startFollow(this.player, true, 0.05, 0.05);


      this.checker = true
      this.height = 500
      this.playerHeight = this.player.displayHeight
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
      this.pointer
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
      this.player.setPosition(300,700)
      this.player.setInteractive({ draggable: true })
      .on('dragend', function(pointer, dragX, dragY, dropped){
          let angle = Math.round(Math.atan( (dragY-6) / (dragX-0) ) * 180 / Math.PI)
          if(dragX<=0 && dragY <=0){
              angle = 180+angle
              this.physics.velocityFromAngle(angle, 100, this.player.body.velocity);
            
          }else if(dragX>=0 && dragY <=0){
              angle = 360+angle
              this.physics.velocityFromAngle(angle, 100, this.player.body.velocity);

          }
        });
        for(let x =0;x<20;x++){
          this.platform_create()

        }

      this.physics.add.collider(this.player,this.platforms, this.platform_collision, null, this);
      this.text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);

    }
    
    platform_create(){
      let x = Math.random() * this.sys.canvas.width
      let platform = this.matter.add.sprite(x,400+this.height,'ground').setStatic(true)
      platform.width = 900
      this.height -= 100
    }
    
    update(){
      // && this.player.body.touching.down
      if (this.keyW.isDown) {
        this.player.setVelocityY(-50);
      }
      else if (this.keyS.isDown) {
        this.player.setVelocityY(50);
      }
      if (this.keyA.isDown) {
        this.player.setVelocityX(-50);
      }
      else if (this.keyD.isDown) {
        this.player.setVelocityX(50);
      }else{
          // this.player.body.setVelocityX(0);
      }
      if(this.keyE.isDown){
        
      }
      if(this.keyZ.isDown){
        this.player.setVelocity(0,0)
        console.log(this.player.x,this.player.y)
        // this.player.setPosition(this.game.config.width *0.5, 700)
      }
      this.cameras.main.setBounds(0, this.player.y-400, 600, 1200)
      this.matter.world.setBounds(0, this.player.y+800, 600, 1200)

      this.text.setText([
        `screen x: ${this.input.x}`,
        `screen y: ${this.input.y}`,
        `world x: ${this.input.mousePointer.worldX}`,
        `world y: ${this.input.mousePointer.worldY}`
    ]);
    
    }
    
}
