import { Actor } from "excalibur";

export abstract class Hero extends Actor {
  // Define abstract reset method to be implemented by subclasses
  public abstract reset(): void;
}
