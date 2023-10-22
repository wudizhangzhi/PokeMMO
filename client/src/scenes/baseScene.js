import Phaser from "phaser";
import Player from "../characters/Player";

export default class BaseScene extends Phaser.Scene {
    constructor() {
        super("base");
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
    }

    update(time, delta) {
        this.player.update(time, delta);

    }

    debugGraphics() {
        // Debug graphics
        this.input.keyboard.once("keydown_D", event => {
            console.log(event)
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