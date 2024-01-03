import Phaser from "phaser";
import Player from "../characters/player";


export default class SceneTest extends Phaser.Scene {
    constructor() {
        super("test");
    }

    preload() {
    }

    init(data) {
        // Map data
        this.mapName = data.map;

        // Player Texture starter position
        this.playerTexturePosition = data.playerTexturePosition;

        // Set container
        this.container = [];
        this.danmu_pools = [];
    }

    create() {
        // this.add.text(20, 20, "Loading game...");

        this.map = this.make.tilemap({ key: "town" });

        // Set current map Bounds
        this.scene.scene.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "TilesTown");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        this.belowLayer = this.map.createLayer("Below Player", tileset, 0, 0);
        this.worldLayer = this.map.createLayer("World", tileset, 0, 0);
        this.grassLayer = this.map.createLayer("Grass", tileset, 0, 0);
        this.aboveLayer = this.map.createLayer("Above Player", tileset, 0, 0);

        this.worldLayer.setCollisionByProperty({ collides: true });

        // By default, everything gets depth sorted on the screen in the order we created things. Here, we
        // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
        // Higher depths will sit on top of lower depth objects.
        this.aboveLayer.setDepth(10);

        // Get spawn point from tiled map
        const spawnPoint = this.map.findObject("SpawnPoints", obj => obj.name === "Spawn Point");
        console.log("spawnPoint", spawnPoint)

        // Set player
        this.player = new Player({
            scene: this,
            worldLayer: this.worldLayer,
            key: 'player',
            x: spawnPoint.x,
            y: spawnPoint.y,
            nickname: "测试角色"
        });

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.debugGraphics();

        this.game.config.width
        this.game.config.height
        // TODO 测试添加文字
        // spawnPoint.x, spawnPoint.y 352 1216
        this.text = this.add.text(spawnPoint.x, spawnPoint.y, '你的文字', { fontSize: '32px', fill: '#ffffff' });
        this.tweens.add({
            targets: this.text,
            x: 0,
            y: 0,
            duration: 3000,
            ease: 'Linear',
            repeat: 0, // 如果要循环移动，可以设置为-1
            yoyo: false // 如果要往返移动，可以设置为true
        });

        this.input.keyboard.on("keydown-W", event => {

        });

        var timeEvent = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: function () {
                let x = this.cameras.main.worldView.x
                let y = this.cameras.main.worldView.y
                let width = this.cameras.main.worldView.width
                let height = this.cameras.main.worldView.height
                console.log("worldView: ", x, y, width, height)
                // 10种颜色
                let colorList = [
                    '#FF5733', // 炫彩橙色
                    '#C70039', // 炫彩红色
                    '#900C3F', // 炫彩紫红色
                    '#581845', // 炫彩深紫色
                    '#1C2833', // 炫彩深蓝色
                    '#17202A', // 炫彩深灰色
                    '#28B463', // 炫彩绿色
                    '#F4D03F', // 炫彩黄色
                    '#F1948A', // 炫彩粉色
                    '#85C1E9'  // 炫彩天蓝色
                ];
                for (let i = 0; i < 10; i++) {
                    let content = "这是字符串-" + Math.floor(Math.random() * (100 + 1));
                    let text = this.add.text(
                        Math.floor(Math.random() * (x + width - x + 1)) + x,   // TODO 需要计算到视野边界
                        Math.floor(Math.random() * (y + height - 10 + 1)) + y, // 需要计算到视野边界
                        content,
                        {
                            fontSize: Math.floor(Math.random() * (32 - 10 + 1)) + 10 + 'px',
                            fill: colorList[i]
                        }
                    )
                    // this.danmu_pools.push(text)
                    this.physics.world.enable([this.player, text]);
                    this.physics.add.collider(this.player, text, function (object1, object2) {
                        console.log('碰撞发生了！', object1, object2,);
                        object2.destroy(); // 销毁弹幕
                        timeEvent.remove(); // 停止定时任务
                        // 隐藏游戏结束弹窗
                    });
                    this.add.text(text)
                    let targetX = this.player.x;
                    let targetY = this.player.y;
                    let duation = 3000; // 需要根据距离算动态
                    this.tweens.add({
                        targets: text,
                        x: targetX,
                        y: targetY,
                        duration: duation,
                        ease: 'Linear',
                        repeat: 0, // 如果要循环移动，可以设置为-1
                        yoyo: false, // 如果要往返移动，可以设置为true
                        persist: false,
                        onComplete: function () {
                            console.log("动画结束")
                            text.destroy(); // 在动画结束后销毁精灵对象
                        },
                        onStart: function () {

                        }
                    });
                }

                console.log("弹幕池长度: ", this.danmu_pools.length)
            },
            callbackScope: this,
        });

    }

    update(time, delta) {
        this.player.update(time, delta);
        // for (var i = 0; i < this.danmu_pools.length; i++) {
        //     var currentItem = this.danmu_pools[i];

        //     this.add.text(currentItem)
        //     let targetX = this.player.x;
        //     let targetY = this.player.y;
        //     let duation = 3000; // 需要根据距离算动态
        //     this.tweens.add({
        //         targets: currentItem,
        //         x: targetX,
        //         y: targetY,
        //         duration: duation,
        //         ease: 'Linear',
        //         repeat: 0, // 如果要循环移动，可以设置为-1
        //         yoyo: false, // 如果要往返移动，可以设置为true
        //         persist: false,
        //         onComplete: function () {
        //             console.log("动画结束")
        //             currentItem.destroy(); // 在动画结束后销毁精灵对象
        //         },
        //         onStart: function () {

        //         }
        //     });
        //     this.danmu_pools.splice(i, 1);
        // }

    }

    debugGraphics() {
        // Debug graphics
        this.input.keyboard.once("keydown-D", event => {
            // Turn on physics debugging to show player's hitbox
            this.physics.world.createDebugGraphic();

            // Create worldLayer collision graphic above the player, but below the help text
            const graphics = this.add
                .graphics()
                .setAlpha(0.75)
                .setDepth(20);
            this.worldLayer.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        });
    }
}