import imageToBase64 from "image-to-base64";

class ImageCache {
  constructor(version = "v1") {
    this.cache = window.localStorage;
    this.version = version;
  }

  /**
   * Gets and image from the cache (LocalStorage)
   * @returns {String} base64URL
   */
  getImage(name) {
    const res = this.cache.getItem(`${this.version}/image/${name}`);
    return res;
  }

  /**
   * Convert base64 String to browser base64 Image
   * @param {String} base64URL The url to convert to a browser base64 Image
   * @returns {String} base64Image
   */
  toBase64Image(base64URL) {
    return `data:image/jpg;base64,${base64URL}`;
  }

  async fetchImage(url) {
    const res = await imageToBase64(url);

    if (res) {
      return res;
    } else {
      new Error(res);
    }
  }

  /**
   * Adds an Image to the Cache (Localstorage)
   * @returns {String} base64URL
   */
  async addImage(name, url) {
    const res = await this.fetchImage(url);

    this.cache.setItem(
      `${this.version}/image/${name}`,
      this.toBase64Image(res)
    );

    return this.toBase64Image(res);
  }
}

// const fetchImage = (url) => {
//   // TEST IF IN LOCAL STORAGE
//   let cache = window.localStorage;

//   if(cache.getItem())

// }

export { ImageCache };
