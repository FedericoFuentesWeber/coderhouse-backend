import { Product } from "../Product/Product.js";

test("Create a product", () => {
    const product = {
        title: "Producta prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };

    const newProduct = new Product(product);
    expect(newProduct).toEqual(product);
});