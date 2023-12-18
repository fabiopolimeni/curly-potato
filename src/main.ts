import { Engine, DisplayMode, Color, Physics, Keys } from "excalibur";
import { Player } from "./player";
import { Resources } from "./resources";
import { CustomLoader } from "./custom-loader";
import { TheIslands } from "./the-islands";
import { Islander } from "./islander";
import { Level } from "./level";

class Game extends Engine {
  constructor() {
    super({
      width: 128, // Initial width
      height: 128, // Initial height
      displayMode: DisplayMode.FitScreenAndZoom, // Adjust display mode
      snapToPixel: false,
      antialiasing: false,
    });

    this.backgroundColor = Color.DarkGray;

    // set global acceleration simulating gravity pointing down
    Physics.acc.setTo(0, 1000);
  }

  onInitialize() {
    const player = new Player(new Islander());

    const the_islands = new TheIslands();
    the_islands.setHero(player.hero);

    const the_limbo = new Level("Limbo");
    this.addScene(the_limbo.name, the_limbo);

    this.addScene(the_islands.name, the_islands);
    this.goToScene(the_islands.name);

    this.on("preupdate", () => {
      if (this.input.keyboard.wasPressed(Keys.R)) {
        const currentScene = this.currentScene;

        if (currentScene instanceof Level) {
          const currentLevel = currentScene as Level;
          this.goToScene(currentLevel.name);
          console.log(`Level ${currentLevel.name} reloaded`);
        }
      }
    });
    this.on;
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
