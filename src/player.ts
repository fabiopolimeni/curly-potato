import { Actor, vec } from "excalibur";

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150),
      width: 100,
      height: 100,
    });
  }

  onInitialize() {}
}
