import { vec, Engine } from "excalibur";
import { Islander } from "./islander";

export class Player extends Islander {
  constructor() {
    super({
      pos: vec(0, 0),
      anchor: vec(0.5, 0),
    });
  }

  onInitialize(engine: Engine) {
    this.pos = vec(
      this.spriteSheet.sprites[0].width / 2,
      engine.drawHeight - this.spriteSheet.sprites[0].height
    );
    super.onInitialize(engine);
  }
}
