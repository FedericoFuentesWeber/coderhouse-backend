import { Product } from "../Product/Product";
import { ProductManagerFileBased } from "../ProductManager/ProductManagerFileBased";
import { jest } from "@jest/globals";
import { promises as fs } from "node:fs";

const filePath = "./Products.json";

afterEach(async () => {
    await fs.writeFile(filePath, [], "utf-8");
})

test("Create a ProductManager", async () => {
    try {
        const productManager = new ProductManagerFileBased();
        expect(await productManager.getProducts()).toEqual([]);
    } catch(error) {}
});

test("Add a product to the ProductManager", async () => {
    try {
        const productManager = new ProductManagerFileBased(filePath);
        expect(await productManager.getProducts()).toEqual([]);

        const product = {
            title: "Producta prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };

        await productManager.addProduct(product);
        let products = await productManager.getProducts();
        expect(products.length).toEqual(1);
    } catch(error) {}
});

test("When adding a product with the same code and error should be raised", async() => {
    try {
        const errorConsoleSpy = jest.spyOn(global.console, "error");
        const productManager = new ProductManagerFileBased(filePath);
        expect(await productManager.getProducts()).toEqual([]);

        const product = {
            title: "Producta prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };

        await productManager.addProduct(product);
        let products = await productManager.getProducts();
        expect(products.length).toEqual(1);

        await productManager.addProduct(product);
        expect(errorConsoleSpy).toHaveBeenCalledWith(
            "El producto con código abc123 ya existe."
        );
    } catch(error) {}
});

test("Get product by ID", async () => {
    try {
        const productManager = new ProductManagerFileBased(filePath);
        expect(await productManager.getProducts()).toEqual([]);

        const product = {
            title: "Producta prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };

        await productManager.addProduct(product);
        
        product.id = 1;
        expect(await productManager.getProductById(1)).toEqual(product);
    } catch(error) {}
});

test("When product not found should raise an error", async() => {
    try {
        const errorConsoleSpy = jest.spyOn(global.console, "error");
        const productManager = new ProductManagerFileBased(filePath);
        expect(await productManager.getProducts()).toEqual([]);

        const product = {
            title: "Producta prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };

        await productManager.getProductById(1);
        expect(errorConsoleSpy).toHaveBeenCalledWith("No hay ningún producto.");

        await productManager.addProduct(product);
        let products = await productManager.getProducts();
        expect(products.length).toEqual(1);

        await productManager.getProductById(10);
        expect(errorConsoleSpy).toHaveBeenCalledWith(
            "El producto con el id 10 no se encuentra en la lista."
        );
    } catch(error) {}
});

test("Delete product", async() => {
    try {
        const productManager = new ProductManagerFileBased(filePath);
        let products = await productManager.getProducts();
        expect(products).toEqual([]);

        const product = {
            title: "Producta prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };
        
        await productManager.addProduct(product);
        products = await productManager.getProducts();
        expect(products.length).toEqual(1);

        await productManager.deleteProduct(1);
        products = await productManager.getProducts();
        expect(products.length).toEqual([]);

    } catch(error) {}
});

test("Update product", async() => {
    try {
        const productManager = new ProductManagerFileBased(filePath);
        let products = await productManager.getProducts();
        expect(products).toEqual([]);

        const product = {
            title: "Producta prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };

        const updatedProduct = {
            title: "Producta prueba actualizado",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "123abc",
            stock: 25
        };
        
        await productManager.addProduct(product);
        products = await productManager.getProducts();
        expect(products.length).toEqual(1);

        await productManager.updateProduct(1, updatedProduct);
        let foundProduct = await productManager.getProductById(1);
        products = await productManager.getProducts();
        expect(products).toEqual([updatedProduct]);

    } catch(error) {}
});