import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import mongoose from "mongoose"
import passport from "passport"
import { createHash, isValidPassword } from "./utils.js"
import MongoStore from "connect-mongo"
import FileStore from "session-file-store"
import session from "express-session"
import initializePassword from "./config/passport.config.js"
import __dirname from "./utils.js"


import viewsRouter from "./router/views.routes.js"

import cartsRouter from "./router/carts.routes.js"
import productsRouter from "./router/product.routes.js"

import userRouter from "./router/user.routes.js"

//servidor
const app = express ()
const PORT = 8080
const httpServer = app.listen(PORT,()=> console.log("Listen puerto 8080"))



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
    resave: false,
    saveUninitialized: true
}))

//Passport
initializePassword()
app.use(passport.initialize())
app.use(passport.session())

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

//URLs al Front
app.use('/', viewsRouter);

//  by @Danarquio

