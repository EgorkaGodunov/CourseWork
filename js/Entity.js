class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key, type){
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }
}
class Player extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, "Player");
        this.setData("jump_hight",200);
    }
    moveUp() {
        this.body.velocity.y = -this.getData("jump_hight");
    }
    moveDown() {
        this.body.velocity.y = this.getData("jump_hight");
    }
    moveLeft() {
        this.body.velocity.x = -this.getData("jump_hight");
    }
    moveRight() {
        this.body.velocity.x = this.getData("jump_hight");
    }
    update(){
        this.body.setVelocity(0, 0);

        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
    }
}
class CommonPlatform extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, "CommonPlatform");
        this.body.setImmovable(true);
    }

    update(){
        this.body.velocity.x = 10
    }
    getData(){
        return {
            x: this.x,
            y: this.y,
            key: this.key
        }
    }
}