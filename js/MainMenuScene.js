class MainMenuScene extends Phaser.Scene
{
    constructor() {
        super({ key: "MainMenuScene" });
      }

      create() {

        this.scene.start("MainScene");

      }
}