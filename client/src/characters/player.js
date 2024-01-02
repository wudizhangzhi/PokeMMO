import Phaser from "phaser";
import Character from "./character"


export default class Player extends Character {
    constructor(config) {
        super(config);

        // Register cursors for player movement
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        this.showPlayerNickname();

        this.listenKeyboard();
    }

    showPlayerNickname() {
        this.playerNickname.x = this.x - (this.playerNickname.width / 2);
        this.playerNickname.y = this.y - (this.height / 2);
    }

    listenKeyboard() {
        // Stop any previous movement from the last frame
        this.body.setVelocity(0);

        // Player movement
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        } else if (this.cursors.up.isDown) {
            this.body.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(this.speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.body.velocity.normalize().scale(this.speed);

        // animation
        if (this.cursors.left.isDown) {
            this.anims.play(this.key + '-left-walk', true);
        } else if (this.cursors.right.isDown) {
            this.anims.play(this.key + '-right-walk', true);
        } else if (this.cursors.up.isDown) {
            this.anims.play(this.key + '-back-walk', true);
        } else if (this.cursors.down.isDown) {
            this.anims.play(this.key + '-front-walk', true);
        } else {
            this.anims.stop();
        }
        // console.log("角色位置: ", this.x, this.y)
    }


}