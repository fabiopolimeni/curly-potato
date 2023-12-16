import { Actor, Vector, Sprite, Engine, CollisionType, vec } from "excalibur";

export class Platform extends Actor {
  private startPoint: Vector;
  private endPoint: Vector;
  private speed: number;
  private sprite: Sprite;

  constructor(
    name: string,
    startPoint: Vector,
    endPoint: Vector,
    speed: number,
    sprite: Sprite
  ) {
    super({
      pos: startPoint.clone(),
      collisionType: CollisionType.Fixed,
      width: sprite.width,
      height: sprite.height,
      name: name,
      anchor: vec(0, 0),
    });
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.speed = speed;
    this.sprite = sprite;
  }

  public onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.graphics.use(this.sprite);

    this.actions.repeat((ctx) => {
      ctx.moveTo(this.endPoint, this.speed).moveTo(this.startPoint, this.speed);
    });
  }
}
