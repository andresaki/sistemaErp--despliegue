// Importamos el módulo 'express'
const express = require("express");   
const  errorMiddleware = require("./middleware/errors")  
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const cors = require('cors');


// Creamos una instancia de express y la almacenamos en la variable 'app'
const app =  express();                                  //copia del objeto express

// Este middleware permite a nuestra aplicación manejar solicitudes con formato JSON.
// Analiza el cuerpo de las solicitudes entrantes como JSON y expone el objeto resultante en 'req.body'.
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

dotenv.config({path: "config/config.env"});
// Configura CORS usando la variable de entorno
app.use(cors({
    origin: process.env.FRONTEND_URL, // Usa la variable de entorno para la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


// importar rutas
const productos = require("./routes/products")
const usuarios = require("./routes/auth")
const ingresos = require("./routes/ingresos")
const gastos = require("./routes/gastos")
const movimientoStock = require("./routes/movimientosStock")
const clientes = require("./routes/clientes")
const pedidos = require("./routes/pedidos")

app.use('/api' , productos)
app.use('/api' , usuarios)
app.use('/api' , ingresos)
app.use('/api' , gastos)
app.use('/api' , movimientoStock)
app.use('/api' , clientes)
app.use('/api' , pedidos)



// Middlewares para manejar errores
app.use(errorMiddleware)

// Exportamos la instancia de la aplicación Express para que pueda ser utilizada en otros archivos
module.exports = app; 