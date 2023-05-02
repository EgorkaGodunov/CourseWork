var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  bachgroundColor: "Black",
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y:200, x:0},
        debug: true
    }
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

