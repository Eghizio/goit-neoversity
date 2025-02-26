import products from "../data/products.json";

export class ProductsApi {
  getProducts(category = null) {
    return !category
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
  }

  getProductById(productId) {
    return products.find((p) => p.id === Number.parseInt(productId, 10));
  }
}
