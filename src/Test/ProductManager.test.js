import { ProductManager } from "../ProductManager/ProductManager";
import { jest } from "@jest/globals"

test("Create a ProductManager", () => {
    const productManager = new ProductManager();
    expect(productManager.getProducts()).toEqual([]);
});

test("Add a product to the ProductManager", () => {
    const productManager = new ProductManager();
    expect(productManager.getProducts()).toEqual([]);

    const product = {
        title: "Producta prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };

    productManager.addProduct(product);
    expect(productManager.getProducts().length).toEqual(1);
});

test("When adding a product with the same code and error should be raised", () => {
    const errorConsoleSpy = jest.spyOn(global.console, "error");
    const productManager = new ProductManager();
    expect(productManager.getProducts()).toEqual([]);

    const product = {
        title: "Producta prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };

    productManager.addProduct(product);
    expect(productManager.getProducts().length).toEqual(1);

    productManager.addProduct(product);
    expect(errorConsoleSpy).toHaveBeenCalledWith(
        "El producto con código abc123 ya existe."
    );

});

test("Get product by ID", () => {
    const productManager = new ProductManager();
    expect(productManager.getProducts()).toEqual([]);

    const product = {
        title: "Producta prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };

    productManager.addProduct(product);
    

    product.id = 1;
    expect(productManager.getProductById(1)).toEqual(product)
});

test("When product not found should raise an error", () => {
    const errorConsoleSpy = jest.spyOn(global.console, "error");
    const productManager = new ProductManager();
    expect(productManager.getProducts()).toEqual([]);

    const product = {
        title: "Producta prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };

    productManager.getProductById(1);
    expect(errorConsoleSpy).toHaveBeenCalledWith("No hay ningún producto.");

    productManager.addProduct(product);
    expect(productManager.getProducts().length).toEqual(1);

    productManager.getProductById(10);
    expect(errorConsoleSpy).toHaveBeenCalledWith(
        "El producto con el id 10 no se encuentra en la lista."
    );
});