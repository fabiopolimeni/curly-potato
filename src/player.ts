import { Hero } from "./hero";

export class Player {
  constructor(private _hero: Hero) {
    this._hero = _hero;
  }

  get hero(): Hero {
    return this._hero;
  }
}
