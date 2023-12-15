import {
  Actor,
  ActorArgs,
  Animation,
  Frame,
  Engine,
  SpriteSheet,
  Sprite,
  Keys,
  Vector,
  CollisionType,
} from "excalibur";
import { Resources } from "./resources";
import { AnimationSequence } from "./animation-sequence";

export class Islander extends Actor {
  protected spriteSheet: SpriteSheet;
  private animSequence: AnimationSequence = {
    idle: {
      shots: 4,
    },
    walk: {
      shots: 8,
    },
    jump: {
      shots: 6,
    },
  };

  private speed: number;
  private isJumping: boolean = false;
  private jumpSpeed: number = -250; // Adjust as necessary for the jump strength
  private gravity: number = 1500; // Adjust as necessary for the gravity strength
  private groundY: number = 0;

  constructor(args: ActorArgs) {
    super({
      ...args,
    });

    // Define the sprite sheet
    this.spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.islander,
      grid: {
        rows: 6, // Number of animations (1 per row)
        columns: 8, // Max number of frames per animation
        spriteWidth: 16, // pixels
        spriteHeight: 16, // pixels
      },
    });

    this.speed = 100;

    // Active collision means the actor is physically simulated
    this.body.collisionType = CollisionType.Active;
  }

  onInitialize(engine: Engine) {
    super.onInitialize(engine);

    // Initialise the animations
    Object.keys(this.animSequence).forEach((key, i) => {
      let clip = this.animSequence[key];
      let frames: Frame[] = [];
      const columns = clip.shots ?? this.spriteSheet.columns;
      for (let j = 0; j < columns; j++) {
        frames.push({
          graphic: this.spriteSheet.getSprite(j, i) as Sprite,
        });
      }
      clip.animation = new Animation({
        frames: frames,
      });

      console.log(`Clip ${key}, with ${columns} frames added to graphics`);
      this.graphics.add(key, clip.animation);
    });

    // Set the initial ground level
    this.groundY = this.pos.y;
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPostUpdate(engine, delta);

    const isOnGround = this.pos.y >= this.groundY;

    // Reset jumping flag when on the ground
    if (isOnGround) {
      this.isJumping = false;
      this.vel.y = 0;
      this.pos.y = this.groundY;
    }

    // Apply gravity
    if (!isOnGround || this.isJumping) {
      this.acc = new Vector(0, this.gravity);
    } else {
      this.acc = Vector.Zero;
    }

    // Handle input and play animations
    if (engine.input.keyboard.isHeld(Keys.Left)) {
      // Apply a negative velocity to move left
      this.vel.x = -this.speed;
      // Flip the sprite on the y-axis (actually flipping on the x-axis)
      this.scale.setTo(-1, 1);
      // Use the walking animation
      this.graphics.use("walk");
    } else if (engine.input.keyboard.isHeld(Keys.Right)) {
      // Apply a positive velocity to move right
      this.vel.x = this.speed;
      // Ensure the sprite is not flipped when moving right
      this.scale.setTo(1, 1);
      // Use the walking animation
      this.graphics.use("walk");
    } else if (!this.isJumping) {
      // No keys are pressed for horizontal movement, stop horizontal movement
      this.vel.x = 0;
      // Use the idle animation when not moving
      this.graphics.use("idle"); // Assuming 'idle' is the first clip
    }

    if (engine.input.keyboard.wasPressed(Keys.Up) && isOnGround) {
      this.vel.y = this.jumpSpeed;
      this.isJumping = true;
      this.graphics.use("jump");
    }
  }
}
