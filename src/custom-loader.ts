import { Loader, Color, Loadable } from "excalibur";

export class CustomLoader extends Loader {
  constructor(loadables?: Loadable<any>[]) {
    super(loadables);
    // Set the background color of the loading screen
    this.backgroundColor = Color.Vermilion.toString();
  }

  // Override the draw method to remove the loading bar
  public draw(ctx: CanvasRenderingContext2D) {
    // Clear the screen with the background color
    ctx.fillStyle = this.backgroundColor.toString();
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Optionally, add custom drawing code here if you want to display anything else
  }
}
