const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 8080;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Rutas para productos
const productsRouter = express.Router();
const productsFile = 'productos.json';

// Listar todos los productos
productsRouter.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
  res.json(products);
});

// Obtener un producto por ID
productsRouter.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
  const product = products.find((p) => p.id === pid);
  if (!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    res.json(product);
  }
});

// Agregar un nuevo producto
productsRouter.post('/', (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    res.status(400).json({ message: 'Todos los campos son obligatorios' });
  } else {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9), // Generar un ID único
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails,
    };
    products.push(newProduct);
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
    res.json(newProduct);
  }
});

// Actualizar un producto por ID
productsRouter.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
  const productIndex = products.findIndex((p) => p.id === pid);
  if (productIndex === -1) {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    products[productIndex] = {
      ...products[productIndex],
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    };
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
    res.json(products[productIndex]);
  }
});

// Eliminar un producto por ID
productsRouter.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  let products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
  const productIndex = products.findIndex((p) => p.id === pid);
  if (productIndex === -1) {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    products = products.filter((p) => p.id !== pid);
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
    res.json({ message: 'Producto eliminado' });
  }
});

app.use('/api/products', productsRouter);

// Rutas para carritos
const cartsRouter = express.Router();
const cartsFile = 'carrito.json';

// Crear un nuevo carrito
cartsRouter.post('/', (req, res) => {
  const cart = {
    id: Math.random().toString(36).substr(2, 9), // Generar un ID único
    products: [],
  };
  const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
  carts.push(cart);
  fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
  res.json(cart);
});

// Listar los productos de un carrito por ID de carrito
cartsRouter.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
  const cart = carts.find((c) => c.id === cid);
  if (!cart) {
    res.status(404).json({ message: 'Carrito no encontrado' });
  } else {
    res.json(cart.products);
  }
});

// Agregar un producto a un carrito por ID de carrito y ID de producto
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
  const cartIndex = carts.findIndex((c) => c.id === cid);
  if (cartIndex === -1) {
    res.status(404).json({ message: 'Carrito no encontrado' });
  } else {
    const cart = carts[cartIndex];
    const existingProduct = cart.products.find((p) => p.id === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: pid, quantity });
    }
    fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
    res.json(cart.products);
  }
});

app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
