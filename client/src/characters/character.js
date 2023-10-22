import Phaser from "phaser";


export default class Character extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);

        this.key = config.key;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);
        this.scene.physics.add.collider(this, config.worldLayer);

        // Player Offset
        // this.body.setOffset(0, 24);

        // Player can't go out of the world
        this.body.setCollideWorldBounds(true)

        // Player speed
        this.speed = config.speed || 150;

        // Player nickname text
        this.playerNickname = this.scene.add.text((this.x - this.width * 1), (this.y - (this.height / 2)), config.nickname);
    }

    update(time, delta) {
        this.showPlayerNickname();
    }

    showPlayerNickname() {
        this.playerNickname.x = this.x - (this.playerNickname.width / 2);
        this.playerNickname.y = this.y - (this.height / 2);
    }


}