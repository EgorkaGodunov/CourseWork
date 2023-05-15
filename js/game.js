var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  backgroundColor: "#222034",
  physics: {
    // default: 'matter',
    arcade: {
      debug: false,
      gravity: { y: 0,x: 0 }
    },
    matter: {
      gravity: {x:0,y:0},
      debug: false,
      
    },
  }, 
  scene: [
    MainMenuScene,
    MainScene,
    GameOverScene
  ],
  pixelArt: true,
  roundPixels: true
};
var game = new Phaser.Game(config);

  
