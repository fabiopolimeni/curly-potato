import { Engine, DisplayMode, Color } from "excalibur";
import { Player } from "./player";
import { Resources } from "./resources";
import { CustomLoader } from "./custom-loader";
import { Level } from "./level";

class Game extends Engine {
  constructor() {
    super({
      width: 128, // Initial width
      height: 128, // Initial height
      displayMode: DisplayMode.FitScreenAndZoom, // Adjust display mode
      snapToPixel: true,
      antialiasing: false,
    });

    this.backgroundColor = Color.DarkGray;
  }

  onInitialize() {
    const the_islands = new Level("The Islands", {
      bgImage: Resources.the_islands_bg,
      tileSize: 16,
    });

    const player = new Player();
    player.z = 100;

    the_islands.setPlayer(player);

    this.addScene(the_islands.name, the_islands);
    this.goToScene(the_islands.name);
  }

  initialize() {
    // Create a Loader and pass in the resources to load
    const loader = new CustomLoader(Object.values(Resources));
    // Suppress the "Start Game" button on the loading screen
    loader.suppressPlayButton = true;
    // Start the game and pass in the loader
    this.start(loader);
  }
}

export const game = new Game();
game.initialize();
