import { Engine, Sprite, vec } from "excalibur";
import { Level } from "./level";
import { Resources } from "./resources";
import { Platform } from "./platform";

export class TheIslands extends Level {
  constructor() {
    super("TheIslands", {
      bgImage: Resources.the_islands_bg,
      tileSize: 16,
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    // Position the player
    if (this.hero) {
      this.hero.pos = vec(16, engine.drawHeight - 16);
    }

    // Add a few platforms
    const pltfSprite = new Sprite({
      image: Resources.islands,
      sourceView: { x: 16, y: 80, width: 32, height: 16 },
    });

    this.addActorToLayer(
      new Platform(
        "platform1",
        vec(0 + 16, 128),
        vec(0 + 16, 64),
        30,
        pltfSprite
      )
    );
  }
}
