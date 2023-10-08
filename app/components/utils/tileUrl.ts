export class TileUrl {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  /**
   * This method is for converting tile url
   * @param z z coordination
   * @param x x coordination
   * @param y y coordination
   * @returns
   */
  getUrlFromPosition(z: number, x: number, y: number) {
    const fixedUrl = this.url.replace("{z}/{x}/{y}", `${z}/${x}/${y}`);
    return fixedUrl;
  }
}
