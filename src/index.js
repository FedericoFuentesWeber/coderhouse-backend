import { ProductManager } from "./ProductManager/ProductManager.js";

const execution = () => {
    const product = {
        title: "Test product",
        description: "A product use for testing",
        price: 50,
        thumbnail: "No image",
        code: "123456",
        stock: 10
    };

    const productManager = new ProductManager();

    console.log(productManager.getProducts());

    productManager.addProduct(product);

    console.log(productManager.getProducts());
}

execution();