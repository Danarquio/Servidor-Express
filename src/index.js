import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import session from "express-session"
import FileStore from "session-file-store"

import cartsRouter from "./router/carts.routes.js"
import productsRouter from "./router/product.routes.js"
import ProductManager from "./controllers/ProductManager.js"
import CartManager from "./controllers/CartManager.js"
import userRouter from "./router/user.routes.js"

const app = express ()
const PORT = 8080
const httpServer = app.listen(PORT,()=> console.log("Listen puerto 8080"))
const product = new ProductManager
const cart = new CartManager
const fileStorage = FileStore(session)

//Conexion a MongoDB
mongoose.connect("mongodb+srv://pedrodanieldiaz:p1TXLJGKTpQDLe2f@cluster0.xtb0h9o.mongodb.net/dan?retryWrites=true&w=majority")
.then(()=> {
    console.log("Conectado a la base de datos")
})
.catch(error=>{
    console.error("Error al intentar conectarse a la base de datos", error)
})


app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Session en MongoDB
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://pedrodanieldiaz:p1TXLJGKTpQDLe2f@cluster0.xtb0h9o.mongodb.net/dan?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
        ttl:3600
    }),
    secret:"ClaveSecreta",
    resave: true,
    saveUninitialized: true
}))

//Rutas CRUD con Postman
app.use("/api/carts", cartsRouter)
app.use("/api/prod", productsRouter)
app.use("/api/sessions", userRouter)


//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.set("views", __dirname+"/views")


//Css static
app.use("/", express.static(__dirname + "/public"))


//Pagina inicial
app.get("/", (req, res)=> {
    res.render("home", {
        title: "Dracarnis Home"
    })
})

//Chat
app.get("/chat", (req, res)=> {
    res.render("chat", {
        title: "Chat con Mogoose"
    })
})

//Renderizado de productos
app.get("/products", async (req, res) => {
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
    let allProducts = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON())
    res.render("productos", {
        title: "Dracarnis | Productos",
        products : allProducts
    })
})

//Renderizado de detalle de productos
app.get("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const productDetails = await product.getProductById(productId);
        if (productDetails) {
            // Verifica que los valores sean números antes de la conversión
            const price = typeof productDetails.price === 'number' ? productDetails.price : 0;
            const stock = typeof productDetails.stock === 'number' ? productDetails.stock : 0;
            const minimo = typeof productDetails.minimo === 'number' ? productDetails.minimo : 0;

            const cleanedProduct = {
                title: productDetails.title,
                description: productDetails.description,
                price: price,
                stock: stock,
                minimo: minimo,
                category: productDetails.category,
                thumbnails: productDetails.thumbnails,
                // Agrega otras propiedades aquí si es necesario
            };
            
            res.render("detail", { product: cleanedProduct });
        } else {
            // Manejo de producto no encontrado
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

//renderizado de productos en carrito
app.get("/cart/:cid", async (req, res) => {
    let id = req.params.cid;
    let cartWithProducts = await cart.getCartWithProducts(id);
    res.render("cart", {
        title: "Vista Carro",
        products: cartWithProducts.products, 
    });
});

//Login
app.get("/login", async (req, res) => {
    res.render("login", {
        title: "Vista Login",
    });
    
})

//register
app.get("/register", async (req, res) => { 
    res.render("register", {
        title: "Vista Register",
    });
})

//profile
app.get("/profile", async (req, res) => { 
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
    res.render("profile", {
        title: "Vista Profile Admin",
        first_name: req.session.nomUsuario,
        last_name: req.session.apeUsuario,
        email: req.session.emailUsuario,
        rol: req.session.rolUsuario,

    });
})


//  by @Danarquio

