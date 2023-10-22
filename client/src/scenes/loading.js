import Phaser from "phaser";
import TilesTown from "../assets/tilesets/tuxmon-sample-32px-extruded.png";
import TownJSON from "../assets/tilemaps/town";

import AtlasPNG from "../assets/atlas/atlas.png";
import AtlasJSON from "../assets/atlas/atlas";

export default class Loading extends Phaser.Scene {
    constructor() {
        super("loading");
    }

    preload() {
        console.log("loading assets")
        // Load Town
        this.load.image("TilesTown", TilesTown);
        this.load.tilemapTiledJSON("town", TownJSON);

        // Load Route1
        // this.load.tilemapTiledJSON("route1", Route1JSON);

        // Load atlas
        this.load.atlas("player", AtlasPNG, AtlasJSON);
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        // TODO
        this.scene.start("test", { map: 'town', playerTexturePosition: 'front' });

        // 创建动画
        this.anims.create({
            key: "player-left-walk",
            frames: this.anims.generateFrameNames("player", {
                prefix: "misa-left-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "player-right-walk",
            frames: this.anims.generateFrameNames("player", {
                prefix: "misa-right-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "player-front-walk",
            frames: this.anims.generateFrameNames("player", {
                prefix: "misa-front-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "player-back-walk",
            frames: this.anims.generateFrameNames("player", {
                prefix: "misa-back-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    }
}