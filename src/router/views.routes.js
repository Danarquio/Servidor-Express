import { Router } from "express";
const router = Router()

import ProductManager from "../controllers/ProductManager.js"
import CartManager from "../controllers/CartManager.js"

const product = new ProductManager
const cart = new CartManager

//Pagina inicial
router.get("/", (req, res)=> {
    res.render("home", {
        title: "Dracarnis Home"
    })
})

//Chat
router.get("/chat", (req, res)=> {
    res.render("chat", {
        title: "Chat con Mogoose"
    })
})

//Renderizado de productos
router.get("/products", async (req, res) => {
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
router.get("/products/:id", async (req, res) => {
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
router.get("/cart/:cid", async (req, res) => {
    let id = req.params.cid;
    let cartWithProducts = await cart.getCartWithProducts(id);
    res.render("cart", {
        title: "Vista Carro",
        products: cartWithProducts.products, 
    });
});

//Login
router.get("/login", async (req, res) => {
    res.render("login", {
        title: "Vista Login",
    });
    
})

//register
router.get("/register", async (req, res) => { 
    res.render("register", {
        title: "Vista Register",
    });
})

//profile
router.get("/profile", async (req, res) => { 
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






export default router