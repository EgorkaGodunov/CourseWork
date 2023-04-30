var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  bachgroundColor: "Black",
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y:0, x:0},
        debug: false
    }
  }, 
  scene: [
    MainMenuScene,
    MainScene,
    GameOverScene
  ]
};
var game = new Phaser.Game(config);

