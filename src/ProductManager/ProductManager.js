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

    addProduct = (product) => {
        try {
            const codeId = (aProduct) => aProduct.code === product.code;

            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                throw new Error("Hay parámetros sin completar.")
            }

            if(this.products.some(codeId)) {
                throw new Error(`El producto con código ${codeId} ya existe.`)
            }

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
        }
    };
}