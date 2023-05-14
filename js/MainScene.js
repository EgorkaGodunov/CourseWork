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
        }
    } });
    }
    randomInteger(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }
    preload(){
      this.load.image('ground',"assets/ground.png");
      this.load.image('sprite_player', 'assets/slime.png');
      this.load.image('background','assets/background.png')
      this.load.image('deadzone','assets/deadzone.png')
      this.load.spritesheet('star','assets/star.png',{frameWidth: 9, frameheight: 9})

    }
    
    createStar(x,y){
      this.stars.create(x,y,'star')
      this.stars.getChildren().at(-1).play('blic')
    }
    
    create() {
      const config = {
        key: 'blic',
        frames: this.anims.generateFrameNumbers('star'),
        frameRate: 3,
        repeat: -1
    };

      this.anim = this.anims.create(config);
   
      this.stars = this.physics.add.staticGroup()
      
      this.cameras.main.setBounds(0, 0, 600, 1800)
      this.matter.world.setBounds(0, 0, 600, 1800)
      
      this.player = this.physics.add.image(this.game.config.width *0.5,300,'sprite_player').setScale(3)
      this.player.setBounce(0.2)
      .setPosition(300,0)
      .setFrictionX(0)

      this.player.depth = 10
      
      this.deadzone = this.physics.add.image(0,this.player.y+700,'deadzone').setDepth(11).setScale(10,1).setOrigin(0)
      this.deadzone.body.allowGravity = false
      this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
      this.cameras.main.followOffset.set(0, 130);


      this.checker = true
      this.checker2 = false
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
      this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

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
      for(let i = 0; i<20;i++){
        let x = this.randomInteger(20,580)
        let y = this.randomInteger(this.player.y+100,this.player.y-2000)

        this.stars.create(x,y,'star')
        this.stars.getChildren().at(-1).setDepth(0).play('blic')
      }
      
      this.input.on('pointerdown',function(){
        this.pointerX1 = this.pointer.x
        this.pointerY1 = this.pointer.y
        this.checker2 = true
      },this)
      this.input.on('pointerup',function(){
        let angle = Math.round(Math.atan( (this.pointer.y-this.pointerY1) / (this.pointer.x-this.pointerX1) ) * 180 / Math.PI)
        if(!isNaN(angle) && this.player.body.touching.down && this.checker2 == true){
          this.checker2 = false
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
      this.physics.add.overlap(this.deadzone,this.stars,function(deadzone,star){
        star.destroy()
      },null,this)
      this.physics.add.overlap(this.deadzone,this.player,function(deadzone,player){
        
        // player.destroy()
        
        this.scene.start('GameOverScene',{data: this.maxScore});


      },null,this)
      this.physics.add.overlap(this.deadzone,this.platforms,function(deadzone,platform){
        platform.destroy()

      },null,this)

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
        this.checker = false
      }
    }
    platform_create(number,group){
      for(let j = 0;j<number;j+=1){

        let x = Math.random() * this.sys.canvas.width
        if(group=='common'){

          this.platforms.create(x,0-this.height,'ground')
          .setDepth(1)
          .setData('counter',1)
          .setScale(6,1)
          .refreshBody()
          this.platforms.getChildren().at(-1).body.checkCollision.down = false
          this.platforms.getChildren().at(-1).body.checkCollision.left = false
          this.platforms.getChildren().at(-1).body.checkCollision.right = false
      

          this.createStar(this.randomInteger(20,580),this.randomInteger(-this.height-50,-this.height+50))

        }else if(group == 'slippery'){
          this.slipperyPlatforms.create(x,0-this.height,'ground')
          .setDepth(1)
          .setData('counter',1)
          .setTint(0x0000ff)
          .setScale(6,1)
          .refreshBody()
          this.slipperyPlatforms.getChildren().at(-1).body.checkCollision.down = false
          this.slipperyPlatforms.getChildren().at(-1).body.checkCollision.left = false
          this.slipperyPlatforms.getChildren().at(-1).body.checkCollision.right = false
   
          this.createStar(this.randomInteger(20,580),this.randomInteger(-this.height-50,-this.height+50))

        }
        
        
        this.height += 100
      }
    }
    
    update(){
      // stars ----
      if(this.player.body.velocity.y>1){
        this.stars.children.each(function(stars){
          stars.y -=this.player.body.velocity.y*0.001
          stars.refreshBody().setDepth(0)
        },this)
      }else if(this.player.body.velocity.y<-1){
        this.stars.children.each(function(stars){
          stars.y -=this.player.body.velocity.y*0.001
          stars.refreshBody().setDepth(0)

        },this)
      }
      this.stars.children.each(function(stars){
        if(stars.y<this.player.y+1000){
          stars
        }
      },this)
      // ----
      // deadzone ----
      // ----
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
      if(this.keyESC.isDown){
        this.scene.start('MainMenuScene');
        
      }
      this.cameras.main.setBounds(0, this.player.y-600, 600, 1200)
      this.matter.world.setBounds(0, this.player.y+800, 600, 1800)

      this.score = -Math.round(this.player.y)
      if(this.score>this.maxScore){
        this.maxScore = this.score
        
        this.deadzone.setPosition(0,-this.maxScore+700)
      }
      this.text.setText([
        
        `Score: ${this.score}`,
        `Highest score: ${this.maxScore}`

    ]);
    
    }
    
}
