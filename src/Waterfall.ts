import {
  Actor,
  Engine,
  SpriteSheet,
  Animation,
  Vector,
  SpriteSheetSparseOptions,
  range,
  AnimationStrategy,
} from "excalibur";

import { Resources } from "./resources";
import { AnimationSequence } from "./animation-sequence";

interface WaterfallSection {
  x: number;
  y: number;
  w: number;
  h: number;
  repeat?: number; // Optional, used for the bottom section
}

interface WaterfallArgs {
  top: WaterfallSection;
  bottom: WaterfallSection;
  duration?: number; // Frame duration in ms
}

export class Waterfall extends Actor {
  private topSection: WaterfallSection;
  private bottomSection: WaterfallSection;
  private spriteSheet: SpriteSheet;
  private fallSequence: AnimationSequence = {
    top: {
      shots: 3,
    },
    bottom: {
      shots: 3,
    },
  };

  private duration: number;

  constructor(args: WaterfallArgs) {
    super();
    this.topSection = args.top;
    this.bottomSection = args.bottom;
    this.duration = args.duration || 100;

    // Define the sprite sheet for the waterfall using the WaterfallSection data with views
    const spriteSheetSparseOptions: SpriteSheetSparseOptions = {
      image: Resources.waterfalls_1_0,
      sourceViews: [
        {
          x: this.topSection.x,
          y: this.topSection.y,
          width: this.topSection.w,
          height: this.topSection.h,
        },
        {
          x: this.bottomSection.x,
          y: this.bottomSection.y,
          width: this.bottomSection.w,
          height: this.bottomSection.h,
        },
      ],
    };

    this.spriteSheet = SpriteSheet.fromImageSourceWithSourceViews(
      spriteSheetSparseOptions
    );
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    // Initialise the animations from fallSequences
    this.initAnimations();

    // Use the 'top' animation by default
    this.graphics.use("top");

    // If the bottom section should be repeated, create and position additional actors for each repeat
    for (let i = 0; i < (this.topSection.repeat ?? 0); i++) {
      const bottomActor = new Actor({
        pos: new Vector(
          this.pos.x,
          this.pos.y + this.topSection.h + i * this.bottomSection.h
        ),
        width: this.bottomSection.w,
        height: this.bottomSection.h,
      });
      bottomActor.graphics.use("bottom");
      engine.add(bottomActor);
    }
  }

  private initAnimations(): void {
    Object.keys(this.fallSequence).forEach((key, _) => {
      let clip = this.fallSequence[key];
      const indices = clip.shots ?? 0;
      clip.animation = Animation.fromSpriteSheet(
        this.spriteSheet,
        range(0, indices),
        this.duration,
        AnimationStrategy.Loop
      );

      console.log(
        `Clip ${key}, with ${indices} frames added to Waterfall graphics`
      );
      this.graphics.add(key, clip.animation);
    });
  }
}
