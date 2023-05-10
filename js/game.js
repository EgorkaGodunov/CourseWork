var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  bachgroundColor: "Black",
  physics: {
    // default: 'matter',
    arcade: {
      debug: true,
      gravity: { y: 0,x: 0 }
    },
    matter: {
      gravity: {x:0,y:0},
      debug: true,
      plugins: {
        wrap: true
      },
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

  
