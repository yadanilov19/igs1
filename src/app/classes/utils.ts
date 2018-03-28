export class Utils {
  private static componentToHex(c) {
    const hex = Math.trunc(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  static rgbToHex(r, g, b) {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }
}
