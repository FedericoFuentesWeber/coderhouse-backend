import { ProductManager } from "./ProductManager/ProductManager.js";
import { ProductManagerFileBased } from "./ProductManager/ProductManagerFileBased.js";
import { promises as fs } from "node:fs";

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

    console.log(productManager.getProductById(1));

    productManager.getProductById(29);
}

const fileBasedExecution = async() => {

    const filePath = "./resources/Products.json";

    const product = {
        title: "Test product",
        description: "A product use for testing",
        price: 50,
        thumbnail: "No image",
        code: "123",
        stock: 10
    };

    const product2 = {
        title: "Test product 2",
        description: "A product use for testing",
        price: 50,
        thumbnail: "No image",
        code: "1234",
        stock: 10
    };

    const updatedProduct = {
        title: "Test product updated",
        description: "A product use for testing",
        price: 50,
        thumbnail: "No image",
        code: "456",
        stock: 10
    };

    const productManager = new ProductManagerFileBased(filePath);

    let products = await productManager.getProducts();
    console.log(products);

    await productManager.addProduct(product);
    await productManager.addProduct(product2);
    products = await productManager.getProducts();
    console.log(products);

    let foundProduct = await productManager.getProductById(1);
    console.log(foundProduct);

    await productManager.updateProduct(1, updatedProduct);
    foundProduct = await productManager.getProductById(1);
    console.log(foundProduct);

    await productManager.deleteProduct(1);
    products = await productManager.getProducts();
    console.log(products);

    await fs.writeFile(filePath, [], "utf-8");
}

//execution();
fileBasedExecution();