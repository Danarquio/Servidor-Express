import express from 'express';
import { engine } from 'express-handlebars';
import * as path from 'path';
import passport from 'passport';
import initializePassword from './config/passport.config.js';
import __dirname from './utils.js';
import session from 'express-session';
import sessionConfig from './config/session.js';
import connectDB from './config/db.js';
import viewsRouter from './router/views.routes.js';
import cartsRouter from './router/carts.routes.js';
import productsRouter from './router/product.routes.js';
import userRouter from './router/user.routes.js';

// Configuración de .env
import dotenv from 'dotenv';
dotenv.config();

// Inicializar la aplicación de Express
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Conectar a la base de datos MongoDB
connectDB();

// Configuración de la sesión
app.use(session(sessionConfig));

// ---------------------------------------------

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


export default app;

