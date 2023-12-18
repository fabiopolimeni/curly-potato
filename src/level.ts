// A level class that holds Actor within layers and background tiled map
import {
  Engine,
  Actor,
  ImageSource,
  Scene,
  TileMap,
  SpriteSheet,
  SceneActivationContext,
  StrategyContainer,
  BoundingBox,
  Vector,
} from "excalibur";
import { MathUtils } from "./clamp";
import { Hero } from "./hero";

class Layer extends Array<Actor> {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export interface MapOptions {
  bgImage: ImageSource;
  tileSize: number;
}

export class Level extends Scene {
  public readonly name: string;
  protected bgTileMap?: TileMap;
  protected bgSpriteSheet?: SpriteSheet;
  protected actorLayers: Layer[] = [];
  protected hero?: Hero;

  constructor(name: string, mapOpts?: MapOptions) {
    super();

    this.name = name;

    if (mapOpts) {
      const bgImageRows = mapOpts.bgImage.height / mapOpts.tileSize;
      const bgImageCols = mapOpts.bgImage.width / mapOpts.tileSize;

      // Create a tile map from map options
      this.bgTileMap = new TileMap({
        rows: bgImageRows,
        columns: bgImageCols,
        tileWidth: mapOpts.tileSize,
        tileHeight: mapOpts.tileSize,
      });

      this.bgSpriteSheet = SpriteSheet.fromImageSource({
        image: mapOpts.bgImage,
        grid: {
          rows: bgImageRows,
          columns: bgImageCols,
          spriteWidth: mapOpts.tileSize,
          spriteHeight: mapOpts.tileSize,
        },
      });
    }

    // Always have at least one base layer
    this.addLayer("base");
  }

  onInitialize(engine: Engine) {
    super.onInitialize(engine);
  }

  onActivate(ctx: SceneActivationContext): void {
    super.onActivate(ctx);
    console.log(`Activated level ${this.name}`);

    if (this.bgTileMap) {
      // Loop through all tilemap's cells and add the sprite to its corresponding cell
      this.bgTileMap.tiles.forEach((cell) => {
        const sprite = this.bgSpriteSheet?.getSprite(cell.x, cell.y);
        if (sprite) {
          cell.addGraphic(sprite);
        }
      });

      this.add(this.bgTileMap);
    }

    if (this.hero) {
      const cameraFollowStrategy = new StrategyContainer(this.camera);
      cameraFollowStrategy.elasticToActor(this.hero, 0.1, 0.05);

      // If we don't have a tile map we don't know the bounds of our world
      if (this.bgTileMap) {
        const bottomRightCorner = new Vector(
          this.bgTileMap.tileWidth * this.bgTileMap.columns,
          this.bgTileMap.tileHeight * this.bgTileMap.rows
        );

        const cameraBBox = new BoundingBox(
          0,
          0,
          bottomRightCorner.x,
          bottomRightCorner.y
        );

        cameraFollowStrategy.limitCameraBounds(cameraBBox);
      }
    }
  }

  onDeactivate(_context: SceneActivationContext<undefined>): void {
    super.onDeactivate(_context);

    // Iterate through each layer and remove all actors from the scene
    for (const layer of this.actorLayers) {
      while (layer.length > 0) {
        const actor = layer.pop();
        if (actor) {
          this.remove(actor);
        }
      }
    }

    this.hero?.reset();

    console.log(`Deactivated level ${this.name}`);
  }

  onPostUpdate(_engine: Engine, _delta: number): void {
    // Make sure the player is always inside the world boundries
    if (this.hero && this.bgTileMap) {
      const bottomRightCorner = new Vector(
        this.bgTileMap.tileWidth * this.bgTileMap.columns,
        this.bgTileMap.tileHeight * this.bgTileMap.rows
      );

      this.hero.pos.x = MathUtils.clamp(
        this.hero.pos.x,
        8,
        bottomRightCorner.x - 8
      );
      this.hero.pos.y = MathUtils.clamp(
        this.hero.pos.y,
        16,
        bottomRightCorner.y - 16
      );
    }
  }

  setHero(hero: Hero) {
    if (this.hero) {
      this.remove(this.hero);
    }

    this.hero = hero;

    if (this.hero) {
      this.hero.z = 1;
      this.add(this.hero);
    }
  }

  addLayer(name: string): number {
    const layer = new Layer(name);
    return this.actorLayers.push(layer);
  }

  addActorToLayer(actor: Actor, layerIndex = 0) {
    if (layerIndex >= this.actorLayers.length) {
      throw new Error(
        `Layer index ${layerIndex} is out of bounds. There are only ${this.actorLayers.length} layers.`
      );
    }

    actor.z = layerIndex + 1;
    this.actorLayers[layerIndex].push(actor);

    this.add(actor);
  }

  // Remove an actor from all layers
  removeActorFromLayers(actorToRemove: Actor): boolean {
    // Loop through layers
    for (const layer of this.actorLayers) {
      // Find the index of the actor to remove
      const actorIndex = layer.findIndex((actor) => actor === actorToRemove);
      // If the actor is found, remove it from the layer
      if (actorIndex !== -1) {
        layer.splice(actorIndex, 1);
        this.remove(actorToRemove);
        return true;
      }
    }

    return false;
  }
}
