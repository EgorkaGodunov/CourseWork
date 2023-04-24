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
  scene: [MainMenuScene,
          MainScene,
          GameOverScene]
};
var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.image('sky','assets/sky.png');
//     this.load.image('ground','assets/platform.png');
//     this.load.image('star','assets/star.png');
//     this.load.image('bomb','assets/bomb.png');
//     this.load.spritesheet('dude','assets/dude.png',{frameWidth: 32, frameHeight: 48})
    
    
// }

// var camera = create.camera;
// var platforms;
// var score = 0;
// var scoreText;
// var stack =[];

// function random_cell(array){
//     return array[Math.floor(Math.random() * (array.length))];
// }
// function loadFont(name, url) {
//     var newFont = new FontFace(name, `url(${url})`);
//     newFont.load().then(function (loaded) {
//         document.fonts.add(loaded);
//     }).catch(function (error) {
//         return error;
//     });
// }
// loadFont("Akshar-Regular", "assets/Akshar-Regular.ttf");
// function create ()
// {
//   this.add.image(400, 300, 'sky');
//   platforms = this.physics.add.staticGroup();
//   var keys = this.input.keyboard.addKeys('A,S,D,W');
//   keys.A.on('down',action);
//   scoreText = this.add.text(16, 16, 'scote', { fontSize: '16px', fill: '#000'});
// }
  


// function action(keys){
    
//     camera.setPosition(camera.x +10,camera.y);

// }

// function update ()
// {



// }