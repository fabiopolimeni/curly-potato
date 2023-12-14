// A level class that holds Actor within layers and background tiled map
import {
  Engine,
  Actor,
  ImageSource,
  Scene,
  TileMap,
  SpriteSheet,
} from "excalibur";

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
  private bgTileMap: TileMap;
  private bgSpriteSheet: SpriteSheet;
  private actorLayers: Layer[] = [];

  constructor(name: string, mapOpts: MapOptions) {
    super();

    this.name = name;

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

    // Always have at least one base layer
    this.addLayer("base");
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);

    // Loop through all tilemap's cells and add the sprite to its corresponding cell
    this.bgTileMap.tiles.forEach((cell) => {
      const sprite = this.bgSpriteSheet.getSprite(cell.x, cell.y);
      if (sprite) {
        cell.addGraphic(sprite);
      }
    });

    this.add(this.bgTileMap);
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

    this.actorLayers[layerIndex].push(actor);
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
        return true;
      }
    }

    return false;
  }
}
