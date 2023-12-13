import { Engine, DisplayMode, Color } from "excalibur";
import { Player } from "./player";
import { Resources } from "./resources";
import { CustomLoader } from "./custom-loader";

class Game extends Engine {
  constructor() {
    super({
      width: 256, // Initial width
      height: 256, // Initial height
      displayMode: DisplayMode.FitScreen, // Adjust display mode
      snapToPixel: true,
      antialiasing: false,
    });

    this.backgroundColor = Color.DarkGray;
  }

  onInitialize() {
    const player = new Player();
    this.add(player);
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
