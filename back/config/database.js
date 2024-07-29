// Importamos el paquete mongoose que nos permitirá interactuar con la base de datos MongoDB
const mongoose  = require("mongoose");

// Definimos una función llamada connectDatabase que se encargará de establecer la conexión con la base de datos
const connectDatabase = () => {
    // Utilizamos el método connect de mongoose para conectarnos a la base de datos
    // Utilizamos el valor almacenado en la variable de entorno DB_LOCAL_URI como la URL de la base de datos a la que nos conectaremos
    // También configuramos algunas opciones, como useNewUrlParser y useUnifiedTopology, para evitar advertencias de deprecación
    // Utilizamos una promesa para manejar la conexión exitosa y mostrar un mensaje de éxito en la consola
    mongoose.connect(process.env.DB_URI ).then(con => {
        console.log(`Base de datos conectada con el servidor: ${con.connection.host}`);
    }).catch(err => {
        console.error(`Error al conectar a la base de datos: ${err}`); 
    });
};

// Exportamos la función connectDatabase para que pueda ser utilizada en otros archivos
module.exports = connectDatabase; 