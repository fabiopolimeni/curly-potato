import { ImageSource } from "excalibur";

import Foam from "./assets/terrain/Water/Foam.png";
import Water from "./assets/terrain/Water/Water.png";
import Grass_Flat from "./assets/terrain/Ground/Grass_Flat.png";
import Bush_02 from "./assets/terrain/Decorations/Bush_02.png";
import Bush_03 from "./assets/terrain/Decorations/Bush_03.png";
import Bush_01 from "./assets/terrain/Decorations/Bush_01.png";
import Tree from "./assets/terrain/Decorations/Tree.png";
import Rocks_02 from "./assets/terrain/Decorations/Rocks_02.png";
import Rocks_03 from "./assets/terrain/Decorations/Rocks_03.png";
import Rocks_01 from "./assets/terrain/Decorations/Rocks_01.png";
import Rocks_04 from "./assets/terrain/Decorations/Rocks_04.png";
import Mushroom_03 from "./assets/terrain/Decorations/Mushroom_03.png";
import Mushroom_02 from "./assets/terrain/Decorations/Mushroom_02.png";
import Mushroom_01 from "./assets/terrain/Decorations/Mushroom_01.png";
import Goblin_House from "./assets/factions/Goblins/Goblin_House.png";
import Torch from "./assets/factions/Goblins/Torch.png";
import Knight_House from "./assets/factions/Knights/Knight_House.png";
import Warrior from "./assets/factions/Knights/Warrior.png";
import Dead from "./assets/effects/Dead.png";
import Islander from "./assets/islands/islander_.png";

let Resources = {
  foam: new ImageSource(Foam),
  water: new ImageSource(Water),
  grassFlat: new ImageSource(Grass_Flat),
  bush02: new ImageSource(Bush_02),
  bush03: new ImageSource(Bush_03),
  bush01: new ImageSource(Bush_01),
  tree: new ImageSource(Tree),
  rocks02: new ImageSource(Rocks_02),
  rocks03: new ImageSource(Rocks_03),
  rocks01: new ImageSource(Rocks_01),
  rocks04: new ImageSource(Rocks_04),
  mushroom03: new ImageSource(Mushroom_03),
  mushroom02: new ImageSource(Mushroom_02),
  mushroom01: new ImageSource(Mushroom_01),
  goblinHouse: new ImageSource(Goblin_House),
  torch: new ImageSource(Torch),
  knightHouse: new ImageSource(Knight_House),
  warrior: new ImageSource(Warrior),
  dead: new ImageSource(Dead),
  islander: new ImageSource(Islander),
};

export { Resources };
