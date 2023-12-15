import { vec, Engine } from "excalibur";
import { Islander } from "./islander";

export class Player extends Islander {
  constructor() {
    super({
      anchor: vec(0.5, 1),
      width: 16,
      height: 16,
    });
  }

  onInitialize(engine: Engine) {
    this.pos = vec(engine.halfDrawWidth, engine.drawHeight - 16);
    super.onInitialize(engine);
  }
}
