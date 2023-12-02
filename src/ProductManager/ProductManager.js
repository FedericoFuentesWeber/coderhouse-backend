import { Product } from "../Product/Product.js";

export class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct = (product) => {
        try {
            const codeId = (aProduct) => aProduct.code === product.code;
            if(this.products.some(codeId)) {
                throw new Error(`El producto con código ${codeId} ya existe.`)
            }

            const newProduct = () => {
                const id = this.products.length+1;

                return new Product({
                    id, ...product
                })
            }
            this.products.push(newProduct);
        } catch(error) {
            console.error(error.message);
        }
    }

    getProducts = () => this.products;
}