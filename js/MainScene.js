class MainScene extends Phaser.Scene
{
  constructor() {
      super({ key: "MainScene" });
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
      this.player = this.matter.add.sprite(this.game.config.width *0.5,300,'sprite_player')
      this.player.setFixedRotation()
      this.player.setBounce(1)
      
      this.cameras.main.startFollow(this.player, true, 0.05, 0.05);


      this.checker = true
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);


      this.pointer
      
      // this.platforms = this.matter.add.group({
      //   key: 'ground',
      //   repeat: 9,
      //   immovable: true,
      //   setXY: { x: 0, y: 0, stepX: 60 },
      // })
      // this.platforms.children.each(function(child){
      //   child.setScale(2)
      //   child.setOrigin(0,0)
      //   child.refreshBody()
      // })
      this.player.setPosition(300,700)
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


      // this.physics.add.collider(this.player,this.platforms, this.platform_collision, null, this);
      this.text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);

    }
    
    platform_collision(a,b){
      let x = Math.random() * this.sys.canvas.width
      let y = Math.random() * this.sys.canvas.height
    }
    
    update(){
      // this.player.update();
      // && this.player.body.touching.down
      if (this.keyW.isDown) {
          this.player.setVelocityY(-10);
      }
      else if (this.keyS.isDown) {
        this.player.setVelocityY(10);
      }
      if (this.keyA.isDown) {
        this.player.setVelocityX(-10);
      }
      else if (this.keyD.isDown) {
        this.player.setVelocityX(10);
      }else{
          // this.player.body.setVelocityX(0);
      }
      if(this.keyE.isDown){
        this.player.setAngularVelocity(5)
      }
      if(this.keyZ.isDown){
        this.player.setVelocity(0,0)
        this.player.setPosition(this.game.config.width *0.5,700)
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