import { Actor } from "excalibur";

export class Player {
  constructor(private _hero: Actor) {
    this._hero = _hero;
  }

  get hero(): Actor {
    return this._hero;
  }
}
