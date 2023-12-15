export namespace MathUtils {
  /**
   * Polyfill for Math.clamp()
   * @param value - Target value to be clamped
   * @param min - Lowest possible allowed value
   * @param max - Highest possible allowed value
   * @returns A number that is guaranteed to fall between min and max
   */
  export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
