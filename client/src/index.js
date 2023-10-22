import Phaser from "phaser";
import SceneTest from "./scenes/testScene";
import Loading from "./scenes/loading";


const Config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    parent: "game-container",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        },
        debug: true,
    },
    scene: [Loading, SceneTest],
};

export default new Phaser.Game(Config);