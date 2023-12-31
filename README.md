# Preentrega 1
## Servidor Express con Node

Este proyecto es una aplicación en Node.js que gestiona productos y carritos de compras. Permite agregar, actualizar, eliminar y consultar productos y productos dentro los carritos creados.

## Instalación

1. Clona este repositorio en tu máquina local.

2. Asegúrate de tener Node.js y npm instalados en tu sistema.

3. Abre una terminal en la ubicación del proyecto y ejecuta el siguiente comando para instalar las dependencias:



```bash
    npm install
```


## Uso

1. Inicia la aplicación ejecutando el siguiente comando:

```bash
    npm start
```
La aplicación estará disponible en:
### `http://localhost:8080`


2. Puedes utilizar las siguientes rutas para interactuar con la aplicación:

- ### Productos:
- GET `/api/products`: Obtiene la lista de productos.
- GET `/api/products/:id`: Obtiene un producto por su ID.
- POST `/api/products`: Agrega un nuevo producto.
- PUT `/api/products/:id:` Actualiza un producto existente por su ID.
- DELETE `/api/products/:id`: Elimina un producto por su ID.

- ### Estructura del Objeto: 
- Los valores necesarios para poder agregar un nuevo producto son: `title , description, code, price, status, stock, category `


```json
{ "title": "Bondiola Curada", 
"description": "El jamón curado es una excelente entrada, puede ser servido como tapa en una tabla acompañado con pan tostado logrando una increíble mezcla de sabores.", 
"code": "abc100", 
"price": 3100, 
"status": true, 
"category": "Curados" , 
"thumbnails": "https://danarquio.github.io/Shop-Dracarnis/Imagenes/bondiola.png"}
```

- ### Carritos
- POST `/api/cart`: Agrega un nuevo carrito.
- GET `/api/cart`: Obtiene la lista de carritos
- GET `/api/cart/:id`: Obtiene un carrito por su ID.
- POST `/api/cart/:cid/products/:pid`: Agrega un producto a un carrito existente por sus IDs.


## Estructura del Proyecto

- index.js: Punto de entrada de la aplicación.
- ProductManager.js: Clase que gestiona los productos.
- product.routes.js: Rutas para productos.
- CartManager.js: Clase que gestiona los carritos.
- carts.routes.js: Rutas para carritos.




