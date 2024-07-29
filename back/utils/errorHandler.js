// Definición de la clase ErrorHandler que extiende de la clase base Error
class ErrorHandler extends Error{
    constructor (message, statusCode){
        // Llama al constructor de la clase base Error con el mensaje de error
        super(message);
        // Asigna el código de estado HTTP a una propiedad de la instancia
        this.statusCode = statusCode; 

        // Captura la traza de la pila (stack trace) excluyendo el constructor de ErrorHandler
        Error.captureStackTrace(this, this.constructor)
    }

    


}

module.exports= ErrorHandler
