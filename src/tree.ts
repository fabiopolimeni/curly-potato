import { Actor, Vector, Sprite, vec, CollisionType } from "excalibur";

export class Tree extends Actor {
  constructor(pos: Vector, sprite: Sprite) {
    super({
      pos: pos, // Position where the tree should be placed in the scene
      width: sprite.width,
      height: sprite.height,
      anchor: vec(0.5, 1), // Anchor in the middle at the base of the sprite
      collisionType: CollisionType.PreventCollision,
    });

    this.graphics.use(sprite);
  }
}
