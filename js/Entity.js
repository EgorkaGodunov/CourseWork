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
        this.setData("angle",{x1:0,x2:0,y1:0,y2:0})
        this.body.setBounce(0.3)

        this.setPosition(this.scene.game.config.width/2,700)
        
        // let x = 100 * Math.sin(angle)
        // let y = 100 * Math.cos(angle)
        // console.log(x,y)

        // this.body.setVelocity(x,y)
        // .on('dragstart', function(pointer, dragX, dragY){
        //     // console.log(pointer, dragX, dragY)

        // })
        // .on('drag', function(pointer, dragX, dragY){
        //     // gameObject.setPosition(dragX, dragY);
        // })
    }
    moveUp() {
        this.body.setVelocityY(-this.getData("jump_hight"));
    }
    moveDown() {
        this.body.setVelocityY(this.getData("jump_hight"));
    }
    moveLeft() {
        this.body.setVelocityX(-this.getData("jump_hight"));
    }
    moveRight() {
        this.body.setVelocityX(this.getData("jump_hight"));
    }
    update(){
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