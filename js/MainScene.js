class MainScene extends Phaser.Scene
{
  constructor() {
      super({ key: "MainScene" });
    }
    preload(){
      this.load.image('ground',"assets/ground.png");
      this.load.image('sprite_player', 'assets/slime.png');
    }
    
   
    
    create() {
      this.checker = true
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.pointer
      this.player = new Player(this, this.game.config.width *0.5,this.game.config.height * 0.5, "sprite_player").setScale(2);
      
      this.platforms = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 10,
        immovable: true,
        setXY: { x: 0, y: 770, stepX: 60 },
      })
      this.platforms.children.each(function(child){
        child.setScale(2)
        child.setOrigin(0,0)
        child.refreshBody()
      })
      this.player.setPosition(300,700).setAngle(45)
      this.player.setInteractive({ draggable: true })
      .on('dragend', function(pointer, dragX, dragY, dropped){
          let angle = Math.atan( (dragY-0) / (dragX-0) ) * 180 / Math.PI
          // if(dragX<=0 && dragY <=0){
          //     angle = 270+angle
          //     console.log(angle)
          //     this.physics.velocityFromAngle(angle, 300, this.player.body.velocity);
          // }else if(dragX>=0 && dragY <=0){
          //     angle = 90+angle
          //     console.log(angle)
          //     this.physics.velocityFromAngle(angle, 300, this.player.body.velocity);
          // }
          console.log(angle)
          
      });
      // this.player.setInteractive({ draggable: true })
      //   .on('dragstart', function(pointer, dragX, dragY){
      //       console.log(pointer, dragX, dragY)
      //   })
      //   .on('drag', function(pointer, dragX, dragY){
      //       // gameObject.setPosition(dragX, dragY);
      //   })
      //   .on('dragend', function(pointer, dragX, dragY, dropped){
      //       console.log(pointer, dragX, dragY)
      //     this.player.body.setVelocity(dragX, dragY)
      //   });
      

      this.physics.add.collider(this.player,this.platforms, this.platform_collision, null, this);
    }
    
    platform_collision(a,b){
      let x = Math.random() * this.sys.canvas.width
      let y = Math.random() * this.sys.canvas.height
      // console.log(1)
    }
    
    update(){
      this.player.update();
      if (this.keyW.isDown && this.player.body.touching.down) {
          this.player.moveUp();
      }
      else if (this.keyS.isDown) {
          this.player.body.setVelocity(0,0)
      }
      if (this.keyA.isDown) {
          this.player.moveLeft();
      }
      else if (this.keyD.isDown) {
          this.player.moveRight();
      }else{
          // this.player.body.setVelocityX(0);
      }
    }
    
}