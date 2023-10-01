# 5to Desafio
## Pactica de Integracion Express con Node, Handlebars y MongoDB

Este proyecto es una aplicación en Node.js que gestiona productos y carritos de compras. Permite agregar, actualizar, eliminar y consultar productos y carritos de compra. Además, utiliza WebSockets para proporcionar una experiencia en tiempo real y Handlebars para renderizar las vistas.

## Instalación

1. Clona este repositorio en tu máquina local.

2. Asegúrate de tener Node.js y npm instalados en tu sistema.

3. Abre una terminal en la ubicación del proyecto y ejecuta los siguientes comandos para instalar las dependencias:



```bash
    npm install
    npm i express
    npm i express-handlebars
    npm i MongoDB
    npm i Mongoose
```


## Uso

1. Inicia la aplicación ejecutando el siguiente comando:

```bash
    npm start
```
La aplicación estará disponible en:
### `http://localhost:8080`

- ### PRODUCTOS:
2. Puedes utilizar las siguientes rutas para interactuar con la aplicación desde POSTMAN:

- GET `/api/prod`: Obtiene la lista de productos.
- GET `/api/prod/:id`: Obtiene un producto por su ID.
- POST `/api/prod`: Agrega un nuevo producto.
- PUT `/api/prod/:id:` Actualiza un producto existente por su ID.
- DELETE `/api/prod/:id`: Elimina un producto por su ID.

- ### Estructura del Objeto: 
- Los valores necesarios para poder agregar un nuevo producto son: ` description, price, stock`


```json
{
    "description": "Soy un producto ",
    "image": "URL de la imagen ",
    "price": 1000,
    "stock": 500
}
```


- ### CARRITOS
- POST `/api/carts`: Agrega un nuevo carrito.
- GET `/api/carts`: Obtiene la lista de carritos
- GET `/api/carst/:id`: Obtiene un carrito por su ID.
- DELETE `/api/carts/:id`: Elimina carrito por su ID.


- ### Estructura del Objeto: 
- Los valores necesarios para poder agregar un nuevo producto son: ` description, quantity, total`


```json
{
    "description": "Hola soy un carrito",
    "quantity": 20,
    "total": 50000
}
```



3. Puedes utilizar las siguientes rutas para interactuar con la aplicación desde el navegador web:

- `/`: Obtiene la lista renderizada de todos los productos.
- `/:id`: Obtiene el producto renderizado por su ID.
- `/chat`: Te muestra un formulario para enviar un mensaje junto a tu usuario a la base de datos de Mongo Atlas
- `/chat`:Puedes utilizar tambien esta ruta para enviar el mensaje desde POSTMAN seleccionando POST

```json
{
    "user": "Nombre",
    "message": "Esto es un mensaje"
}
```

## Estructura del Proyecto
```
Integracion/
├── src/
│   ├── controllers/
│   │   ├── CartManager.js
│   │   ├── multer.js
│   │   └── ProductManager.js
│   ├── models/
│   │   ├── carts.json
│   │   ├── carts.model.js
│   │   ├── messages.model.js
│   │   ├── products.json
│   │   └── products.model.js
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── files/
│   ├── routes/
│   │   ├── carts.routes.js
│   │   ├── messages.routes.js
│   │   ├── product.routes.js
│   │   ├── upload.routes.js
│   │   └── views.routes.js
│   ├── views/
│   ├── index.js
│   └── utils.js
├── package.json
└── README.md
```



## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB 
- Handlebars 
- Mongoose 



## Capturas de Pantalla

![Captura de Pantalla 1](/src/public/files/Capturadepantalla1.png)
![Captura de Pantalla 2](/src/public/files/Capturadepantalla2.png)
![Captura de Pantalla 3](/src/public/files/Capturadepantalla3.png)
![Captura de Pantalla 4](/src/public/files/Capturadepantalla4.png)
![Captura de Pantalla 5](/src/public/files/Capturadepantalla5.png)