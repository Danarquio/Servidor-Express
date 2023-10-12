import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"


import mongoose from "mongoose"
import cartsRouter from "./router/carts.routes.js"
import productsRouter from "./router/product.routes.js"
import ProductManager from "./controllers/ProductManager.js"
import CartManager from "./controllers/CartManager.js"

const app = express ()
const PORT = 8080
const httpServer = app.listen(PORT,()=> console.log("Listen puerto 8080"))
const product = new ProductManager
const cart = new CartManager

//Mongoose
mongoose.connect("mongodb+srv://pedrodanieldiaz:p1TXLJGKTpQDLe2f@cluster0.xtb0h9o.mongodb.net/dan?retryWrites=true&w=majority")
.then(()=> {
    console.log("Conectado a la base de datos")
})
.catch(error=>{
    console.error("Error al intentar conectarse a la base de datos", error)
})


app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Rutas CRUD con Postman
app.use("/api/carts", cartsRouter)
app.use("/api/prod", productsRouter)


//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.set("views", __dirname+"/views")





//static
app.use("/", express.static(__dirname + "/public"))

//Chat
app.get("/chat", (req, res)=> {
    res.render("chat", {
        title: "Chat con Mogoose"
    })
})





app.get("/products", async (req, res) => {
    let allProducts = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON())
    res.render("home", {
        title: "Dracarnis | Productos",
        products : allProducts
    })
})



app.get("/:title", async (req, res) => {
    try {
        const productTitle = req.params.title;
        console.log('Product Title:', productTitle);
        const productDetails = await product.getProductByTitle(productTitle); // Deberás implementar esta función
        res.render("prod", { product: productDetails });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});



//  by @Danarquio

