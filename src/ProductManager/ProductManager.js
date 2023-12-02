import { Product } from "../Product/Product.js";

export class ProductManager {
    constructor() {
        this.products = [];
    }


    createNewProduct = ({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }) => {
        const id = this.products.length+1;
    
            return new Product({
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            })
        
    }

    assertCodeIsNotUsed = (aCode) => {
        const codeId = (aProduct) => aProduct.code === aCode;
        if(this.products.some(codeId)) {
            const errorMessage = `El producto con código ${aCode} ya existe.`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    };

    addProduct = (product) => {
        try {
            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                throw new Error("Hay parámetros sin completar.")
            }

            this.assertCodeIsNotUsed(product.code);
            const newProduct = this.createNewProduct(product);

            this.products.push(newProduct);
        } catch(error) {
            console.error(error.message);
        }
    }

    getProducts = () => this.products;

    getProductById = (productId) => {
        try {
            if(!this.products.length) {
                throw new Error("No hay ningún producto.")
            }

            const product = this.products.find((product) => product.id === productId);

            if(!product) {
                throw new Error(`El producto con el id ${productId} no se encuentra en la lista.`)
            }

            return product;
        } catch(error) {
            console.error(error.message);
            return null;
        }
    };
}