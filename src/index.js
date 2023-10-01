import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"

import mongoose from "mongoose"
import cartsRouter from "./router/carts.routes.js"
import messagesRouter from "./router/messages.routes.js"
import productsRouter from "./router/product.routes.js"
import uploadRouter from "./router/upload.routes.js"
import viewsRouter from "./router/views.routes.js"
import ProductManager from "./controllers/ProductManager.js"

const app = express ()
const PORT = 8080
const httpServer = app.listen(PORT,()=> console.log("Listen puerto 8080"))
const product = new ProductManager

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
app.use("/api/msg", messagesRouter)
app.use("/api/prod", productsRouter)


//Multer
app.use("/", uploadRouter)


//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.set("views", __dirname+"/views")
app.use("/", viewsRouter)





//static
app.use("/", express.static(__dirname + "/public"))

//Chat
app.get("/chat", (req, res)=> {
    res.render("chat", {
        title: "Chat con Mogoose"
    })
})





app.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
        title: "Express Avanzado / Handlebars",
        products : allProducts
    })
})

app.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let prod = await product.getProductsById(id)
    res.render("prod", {
        title: "Express Avanzado / Handlebars",
        products : prod
    })
})





//app.use("/api/products", ProductRouter)
//app.use("/api/cart", CartRouter)




//  by @Danarquio
//26:38
