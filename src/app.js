import express from 'express';
import productRouter from "./routers/products.routers.js";
import handlebars from 'express-handlebars';
import { Server as ServerIO } from 'socket.io';
import __dirname from '../utils.js';

const app = express();

const initializeApp = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname+'/public'));

    app.engine('hbs', handlebars.engine({
        extname: ".hbs",
        helpers: {
            json: (anObject) => {
                return JSON.stringify(anObject);
            }
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', __dirname+'/views');

    app.use("/", productRouter);

    const httpServer = app.listen(8080, () => {
        console.log('Escuchando en el puerto 8080')
    });

    //socket del lado del server
    const io = new ServerIO(httpServer);

    io.on('connection', socket => {
        console.log('Client connected');

        socket.on("addProductEvent", (data) => {
            console.log(data);

            fetch("http://localhost:8080/products", {
                method: "GET"
            })
                .then((response) => response.json())
                .then((products) => {
                    socket.emit("updateProductsEvent", products);
                })
                .catch((error) => console.log(error));
        });

        socket.on("deleteProductEvent", (productId) => {
            fetch(`http://localhost:8080/${parseInt(productId, 10)}`, {
                method: "DELETE"
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    fetch("http://localhost:8080/products", {
                        method: "GET"
                    })
                        .then((response) => response.json())
                        .then((products) => {
                            socket.emit("updateProductsEvent", products);
                        })
                        .catch((error) => console.log(error));
                })
                .catch((err) => console.log(err));
        });
    });
}

initializeApp();

