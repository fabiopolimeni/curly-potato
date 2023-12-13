import { Animation } from "excalibur";

export interface AnimationClip {
  shots?: number;
  animation?: Animation;
}

export type AnimationSequence = Record<string, AnimationClip>;
