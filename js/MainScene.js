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
      this.add.image(0,100,'sky').setOrigin(0)
      this.cameras.main.setBounds(0, 0, 600, 1800)
      this.matter.world.setBounds(0, 0, 600, 1800)

      this.player = this.physics.add.image(this.game.config.width *0.5,300,'sprite_player').setScale(3)
      this.player.setBounce(0.2)
      this.player.setPosition(300,0)
      this.player.setFrictionX(0)

      this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
      this.cameras.main.followOffset.set(0, 130);


      this.checker = true
      this.height = 100
      this.score = 0
      this.maxScore = 0
      this.playerHeight = this.player.displayHeight
      this.gameWidth, this.gameHeiht = this.sys.game.canvas
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      this.pointer = this.input.activePointer;
      this.pointerX1
      this.pointerY1
      console.log(this.player)
      this.slipperyPlatforms = this.physics.add.staticGroup()
      this.platforms = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 19,
        setXY: { x: 15, y: 28, stepX: 30 },
      })
      
      for(let x =0;x<20;x++){
        this.platform_create(1,'common')

      }
      
      this.input.on('pointerdown',function(){
        this.pointerX1 = this.pointer.x
        this.pointerY1 = this.pointer.y
      },this)
      this.input.on('pointerup',function(){
        let angle = Math.round(Math.atan( (this.pointer.y-this.pointerY1) / (this.pointer.x-this.pointerX1) ) * 180 / Math.PI)
        if(!isNaN(angle) && this.player.body.touching.down){
          if(this.pointer.x<=this.pointerX1 && this.pointerY1 >=this.pointer.y){
            angle = 180+angle
            this.physics.velocityFromAngle(angle, 400, this.player.body.velocity);
          }else if(this.pointer.x >= this.pointerX1 && this.pointerY1 >=this.pointer.y){
            angle = 360+angle
            this.physics.velocityFromAngle(angle, 400, this.player.body.velocity);

          }
        }
        this.checker = true

      },this)


        
      

      this.physics.add.collider(this.player,this.platforms, function(player,platform){
        // Friction ----
        this.player.setDragX(1000);
        // ----
       this.onceCreator(platform)
        
      }, null, this);
      this.physics.add.collider(this.player,this.slipperyPlatforms,function(player,platform){
        // Friction ----
        this.player.setDragX(20);
        // ----

        this.onceCreator(platform)

      },null, this)

      this.text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);

    }
    onceCreator(platform){
      let chance =  Math.floor(Math.random() * 10)
      if(chance<=5){
        if(platform.getData('counter')>0){
          this.platform_create(2,'slippery')
          platform.setData('counter',0)
        }
      }else{
        if(platform.getData('counter')>0){
          this.platform_create(2,'common')
          platform.setData('counter',0)
        }
        
      }

      if(this.checker){
        console.log(11)
        this.checker = false
      }
    }
    platform_create(number,group){
      for(let j = 0;j<number;j+=1){

        let x = Math.random() * this.sys.canvas.width
        if(group=='common'){

          this.platforms.create(x,0-this.height,'ground')
          this.platforms.getChildren().at(-1).body.checkCollision.down = false
          this.platforms.getChildren().at(-1).body.checkCollision.left = false
          this.platforms.getChildren().at(-1).body.checkCollision.right = false
          this.platforms.getChildren().at(-1).setData('counter',1)
          this.platforms.getChildren().at(-1).setScale(6,1).refreshBody()
        }else if(group == 'slippery'){
          this.slipperyPlatforms.create(x,0-this.height,'ground')
          this.slipperyPlatforms.getChildren().at(-1).body.checkCollision.down = false
          this.slipperyPlatforms.getChildren().at(-1).body.checkCollision.left = false
          this.slipperyPlatforms.getChildren().at(-1).body.checkCollision.right = false
          this.slipperyPlatforms.getChildren().at(-1).setData('counter',1)
          this.slipperyPlatforms.getChildren().at(-1).setTint(0x0000ff)
          this.slipperyPlatforms.getChildren().at(-1).setScale(6,1).refreshBody()
        }
        
        
        this.height += 100
        console.log("created")
      }
    }
    
    update(){
      // wrap -----
      if(this.player.x <= 0 - this.player.width){
        this.player.setPosition( 600 + this.player.width - 1 ,this.player.y)
      }else if(this.player.x >= 600 + this.player.width){
        this.player.setPosition(0 - this.player.width + 1 ,this.player.y)
      }
      // -----
      if(!this.player.body.touching.down){
        this.player.setDragX(0)


      }
      if(this.keyE.isDown){
        console.log(this.platforms.getChildren().length)
      }
      if(this.keyR.isDown){
        this.scene.restart("MainScene")
      }
      this.cameras.main.setBounds(0, this.player.y-400, 600, 1200)
      this.matter.world.setBounds(0, this.player.y+800, 600, 1800)
      this.score = -Math.round(this.player.y)
      if(this.score>this.maxScore){
        this.maxScore = this.score
      }
      this.text.setText([
        
        `Score: ${this.score}`,
        `Highest score: ${this.maxScore}`

    ]);
    
    }
    
}
