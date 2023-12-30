import { Router } from "express";
import { ProductManagerFileBased } from "../ProductManager/ProductManagerFileBased.js";
import { uploader } from "../../utils.js";

const router = Router();
const filePath = "./resources/Products.json";

const productManager = new ProductManagerFileBased(filePath);

router.get("/", async(req, res) => {
    try {
        const products = await productManager.getProducts();

        res.status(200).render("index", {
            title: "Productos",
            products: products
        });
    } catch(error) {
        return res.status(400).send({ status: "failed", description: error.message });
    }
});

router.get("/realtimeproducts", async(req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).render("realTimeProducts", {
            title: "Productos en tiempo real",
            products: products
        });
    } catch(error) {
        return res.status(400).render("index", {
            title: "Productos en tiempo real",
            errorMessage: error.message
        });
    }
});

router.get("/products", async(req, res) => {
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
        return res.status(400).send({ status: "failed", description: error.message });
    }
})

router.get("/:pid", async(req, res) => {
    try {
        const { pid } = req.params;
        const foundProduct = await productManager.getProductById( parseInt(pid, 10));

        return res.status(200).send(foundProduct);

    } catch(error) {
        return res.status(400).send({ status: "failed", description: error.message });
    }
});

router.put("/:pid", async(req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = req.body;
        await productManager.updateProduct(parseInt(pid, 10), updatedProduct);

        return res.status(200).send({ 
            status: "success", 
            descrition: `El producto con el ID ${pid} fue actualizado correctamente.`
        })
    } catch(error) {
        return res.status(400).send({ status: "failed", description: error.message });
    }
});

router.delete("/:pid", async(req, res) => {
    try {
        const { pid } = req.params;
        await productManager.deleteProduct(parseInt(pid, 10));

        return res.status(200).send({ 
            status: "success", 
            description: `El producto con el ID ${pid} fue eliminado correctamente.`
        })
    } catch(error) {
        return res.status(400).send({ status: "failed", description: error.message });
    }
});

router.post("/", uploader.array("thumbnail"), async(req, res) => {
    try {
        const newProduct = req.body;

        if(req.files && req.files.length >0) {
            const images = req.files.map((file) => {
                const fullPath = file.path;
                const imagesIndex = fullPath.indexOf("images");
                if(imagesIndex !== -1) {
                    const relativePath = fullPath.substring(imagesIndex -1);
                    return relativePath;
                } else {
                    console.log("No image directory")
                    return null;
                }
            });

            newProduct.thumbnail = images.filter((image) => image !== null);
        }


        await productManager.addProduct(newProduct);
        return res.status(201).send({ 
            status: "success", 
            newProduct
        })
    } catch(error) {
        return res.status(400).send({ status: "failed", description: error.message });
    }
});

export default router;