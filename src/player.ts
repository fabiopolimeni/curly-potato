import { vec, Engine } from "excalibur";
import { Islander } from "./islander";

export class Player extends Islander {
  constructor() {
    super({
      anchor: vec(0.5, 1),
    });
  }

  onInitialize(engine: Engine) {
    this.pos = engine.currentScene.camera.pos;
    super.onInitialize(engine);
  }
}
