class MainScene extends Phaser.Scene
{
  constructor() {
      super({ key: "MainScene" });
    }
    preload(){
      this.load.image('ground',"assets/platform.png");
      this.load.spritesheet('sprite_player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    
   
    
    
    create() {

      function addPlatform(x, y, key, group){
        group.create(x,y,key)
      }

      function platform_collision(a,b){
      let x = Math.random() * this.sys.canvas.width
      let y = Math.random() * this.sys.canvas.height
      addPlatform(x,y,'ground', this.platforms)
    }
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.pointer = this.input.activePointer
      this.player = new Player(this, this.game.config.width *0.5,this.game.config.height * 0.5, "sprite_player");
      
      this.platforms = this.physics.add.group({
        key: 'ground',
        immovable: true,
        quantity: 1
      })


      this.physics.add.collider(this.player,this.platforms, platform_collision, null, this);
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
      if(this.pointer.isDown){
        console.log('mouse')
      }
    }
    
}