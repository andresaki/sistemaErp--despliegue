// Importar el módulo 'app' desde el archivo app.js
const app = require("./app");
const connectDatabase = require("./config/database");
 
// Importar el módulo 'dotenv' para cargar variables de entorno desde un archivo .env
const dotenv = require("dotenv");

// Importar y configurar el módulo dotenv. dotenv es una librería utilizada para cargar variables de entorno desde un archivo llamado .env
// Configurar 'dotenv' para cargar variables desde el archivo config.env ubicado en la carpeta back/config
dotenv.config({path: "config/config.env"});


connectDatabase();

// Crear un servidor HTTP que escuche en el puerto especificado en la variable de entorno 'PORT'
const server = app.listen(process.env.PORT, () => {   
    //  Imprimir un mensaje en la consola indicando en qué puerto está escuchando el servidor y en qué modo de entorno se encuentra
    console.log(`Servidor inicializado en el puerto ${process.env.PORT} en modo ${process.env.NODE_ENV}`);
})