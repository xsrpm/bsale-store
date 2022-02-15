export class Product {
  /**
   * Create a new product object with the given id, name, url_image, price, discount, and category
   * @param id {integer}- The unique identifier for the product.
   * @param name {string} - The name of the product.
   * @param url_image {string}- The URL of the image of the product.
   * @param price {float}- The price of the product.
   * @param discount {integer}- The discount of the product.
   * @param category {integer} - The category of the product.
   */
  constructor(id, name, url_image, price, discount, category) {
    this.id = id
    this.name = name
    this.url_image = url_image
    this.price = price
    this.discount = discount
    this.category = category
  }
}
