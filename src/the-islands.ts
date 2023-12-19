import { SceneActivationContext, Sprite, vec } from "excalibur";
import { Level } from "./level";
import { Resources } from "./resources";
import { Platform } from "./platform";
import { Tree } from "./tree";

export class TheIslands extends Level {
  constructor() {
    super("TheIslands", {
      bgImage: Resources.the_islands_bg,
      tileSize: 16,
    });
  }

  onActivate(ctx: SceneActivationContext): void {
    super.onActivate(ctx);

    // Position the player
    if (this.hero) {
      this.hero.pos = vec(16, ctx.engine.drawHeight - 16);
    }

    // Add a few platforms
    const pltfSprite = new Sprite({
      image: Resources.islands,
      sourceView: { x: 16, y: 80, width: 32, height: 16 },
    });

    this.addActorToLayer(
      new Platform("platform_1", vec(0 + 4, 128), vec(96, 128), 30, pltfSprite)
    );

    this.addActorToLayer(
      new Platform("platform_2", vec(128, 128), vec(128, 64), 50, pltfSprite)
    );

    const treeSprite = new Sprite({
      image: Resources.objects,
      sourceView: {
        x: 25,
        y: 70,
        width: 14,
        height: 26,
      },
    });

    this.addActorToLayer(new Tree(vec(48, 112), treeSprite));
  }
}
