import express from 'express';
import { ProductManagerFileBased } from "./ProductManager/ProductManagerFileBased.js";

const app = express()
const filePath = "./resources/Products.json"

const productManager = new ProductManagerFileBased(filePath);


const endPoints = () => {
    app.get('/products', async(req, res) => {
        try {
            const products = await productManager.getProducts();
            const { limit } = req.query;
    
            if(!limit) {
                return res.status(200).send(products);
            } else {
                const selectedProducts = products.slice(0, limit);
                return res.status(200).send(selectedProducts);
            }
    
        } catch(error) {
            return res.status(400).send(error.message);
        }
    });
    
    app.get('/products/:pid', async(req, res) => {
        try {
            const { pid } = req.params;
            const productId = parseInt(pid, 10);
            const foundProduct = await productManager.getProductById(productId);
    
            return res.status(200).send(foundProduct);
    
        } catch(error) {
            return res.status(400).send(error.message);
        }
    });
}

const initializeApp = () => {
    app.listen(8000, () => {
        console.log('Escuchando en el puerto 8000')
    });

    endPoints();
}

initializeApp();

