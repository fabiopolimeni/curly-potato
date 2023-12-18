import {
  Animation,
  Frame,
  Engine,
  SpriteSheet,
  Sprite,
  vec,
  Keys,
  CollisionStartEvent,
  CollisionType,
  CollisionEndEvent,
} from "excalibur";
import { Resources } from "./resources";
import { AnimationSequence } from "./animation-sequence";
import { Platform } from "./platform";
import { Hero } from "./hero";

export class Islander extends Hero {
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

  private speed: number = 100;
  private isOnGround: boolean = false;
  private isJumping: boolean = false;
  private jumpSpeed: number = -300; // Adjust as necessary for the jump strength
  private gravity: number = 1000; // Adjust as necessary for the gravity strength
  private currentPlatform: Platform | null = null;

  constructor() {
    super({
      anchor: vec(0.5, 1),
      width: 16,
      height: 16,
      collisionType: CollisionType.Active,
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

    this.reset();

    this.on("collisionstart", (event: CollisionStartEvent) => {
      this.onCollisionStart(event);
    });

    this.on("collisionend", (event: CollisionEndEvent) => {
      this.onCollisionEnd(event);
    });
  }

  public reset(): void {
    this.isOnGround = false;
    this.isJumping = false;
    this.vel.setTo(0, 0);
    this.currentPlatform = null;
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

    this.graphics.use("idle");
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPostUpdate(engine, delta);

    // Reset jumping flag when on the ground
    if (this.isOnGround) {
      this.isJumping = false;
      this.vel.y = 0;
    }

    // Move horizontally only while the user is pressing the kyes
    this.vel.x = 0;

    // Apply gravity
    if (!this.isOnGround) {
      this.acc.setTo(0, this.gravity);
    } else {
      this.acc.setTo(0, 0);
    }

    // Handle input and play animations
    if (engine.input.keyboard.isHeld(Keys.Left)) {
      // Apply a negative velocity to move left
      this.vel.x = -this.speed;
      // Flip the sprite on the y-axis (actually flipping on the x-axis)
      this.graphics.flipHorizontal = true;
      // Use the walking animation
      this.graphics.use("walk");
    } else if (engine.input.keyboard.isHeld(Keys.Right)) {
      // Apply a positive velocity to move right
      this.vel.x = this.speed;
      // Ensure the sprite is not flipped when moving right
      this.graphics.flipHorizontal = false;
      // Use the walking animation
      this.graphics.use("walk");
    }

    if (engine.input.keyboard.wasPressed(Keys.Up) && !this.isJumping) {
      this.vel.y = this.jumpSpeed;
      this.isJumping = true;
      this.graphics.use("jump");
    }

    if (this.vel.squareDistance() < 0.01) {
      this.graphics.use("idle");

      if (this.currentPlatform) this.vel = this.currentPlatform.vel;
    }
  }

  public onCollisionStart(event: CollisionStartEvent): void {
    // Check if the collision is with a Platform
    if (event.other instanceof Platform) {
      // Check if the collision normal is pointing up, indicating a collision from above
      if (event.contact.normal.y > 0) {
        this.isOnGround = true;
        this.currentPlatform = event.other as Platform;
      }
    }
  }

  public onCollisionEnd(event: CollisionEndEvent): void {
    // If we did exit a platform collider then we are no longer on the ground
    if (event.other instanceof Platform) {
      this.isOnGround = false;
      this.currentPlatform = null;
    }
  }
}
