import { ImageSource } from "excalibur";

import islander_ from "./assets/islands/islander_.png";
import objects_ from "./assets/islands/objects_.png";
import sky_ from "./assets/islands/sky_.png";
import waterfalls_1_0_ from "./assets/islands/waterfalls_1_0.png";
import islands_ from "./assets/islands/islands_1.png";
import waterfalls_1_1_ from "./assets/islands/waterfalls_1_1.png";
import mushroom_ from "./assets/islands/mushroom_.png";
import snail_ from "./assets/islands/snail_.png";

let Resources = {
  islander: new ImageSource(islander_),
  objects: new ImageSource(objects_),
  sky: new ImageSource(sky_),
  waterfalls_1_0: new ImageSource(waterfalls_1_0_),
  waterfalls_1_1: new ImageSource(waterfalls_1_1_),
  islands: new ImageSource(islands_),
  mushroom: new ImageSource(mushroom_),
  snail: new ImageSource(snail_),
};

export { Resources };
