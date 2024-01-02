import Phaser from "phaser";


export default class Danmu extends Phaser.GameObjects.Text {
    constructor(config) {
        super(config.scene, config.x, config.y, config.textconfig.style);

        // this.scene.add.existing(this);
        // this.scene.physics.world.enableBody(this);
        // this.scene.physics.add.collider(this, config.worldLayer);


        let x = this.scene.cameras.main.worldView.x
        let y = this.scene.cameras.main.worldView.y
        let width = this.scene.cameras.main.worldView.width
        let height = this.scene.cameras.main.worldView.height

        this.scene.tweens.add({
            targets: this.text,
            x: config.targetX,
            y: config.targetY,
            duration: config.duration,
            ease: 'Linear',
            repeat: 0, // 如果要循环移动，可以设置为-1
            yoyo: false // 如果要往返移动，可以设置为true
        });
    }

    setPlayer(player) {
        this.config.scene.physics.world.enable([player, this]);
        this.config.scene.physics.add.collider(player, this, function () {
            console.log('碰撞发生了！');
        })
    }
}