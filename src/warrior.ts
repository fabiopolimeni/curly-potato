import {
  Actor,
  ActorArgs,
  Animation,
  Frame,
  Engine,
  SpriteSheet,
  Sprite,
} from "excalibur";
import { Resources } from "./resources";
import { AnimationSequence } from "./animation-sequence";

export class Warrior extends Actor {
  private spriteSheet: SpriteSheet;
  private animSequence: AnimationSequence = {
    clips: [
      {
        name: "idle",
      },
      {
        name: "walk",
      },
      {
        name: "attack",
      },
    ],
  };

  constructor(args: ActorArgs) {
    super(args);
    // Define the sprite sheet
    this.spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.warrior,
      grid: {
        rows: 3, // Number of animations (1 per row)
        columns: 6, // Number of frames per animation
        spriteWidth: 192, // pixels
        spriteHeight: 192, // pixels
      },
    });
  }

  onInitialize(engine: Engine) {
    super.onInitialize(engine);

    // Initialise the animations
    for (let i = 0; i < this.spriteSheet.rows; i++) {
      let frames: Frame[] = [];
      for (let j = 0; j < this.spriteSheet.columns; j++) {
        frames.push({
          graphic: this.spriteSheet.getSprite(j, i) as Sprite,
        });
      }
      let clip = this.animSequence.clips[i];
      clip.animation = new Animation({
        frames: frames,
      });

      console.log(`Clip ${clip.name} added to graphics`);
      this.graphics.add(clip.name, clip.animation);
    }

    // Set the initial animation to idle
    //this.animSequence.clips[0].animation!.play();
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    // Play idle animation
    this.graphics.use(this.animSequence.clips[0].name);
    // console.log(`Warrior onPreUpdate`, this.pos);
  }
}
