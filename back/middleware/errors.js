const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Error en el servidor";

    // Manejo específico para errores de tipo CastError
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        err.statusCode = 400;
        err.message = `Recurso no encontrado. ID inválido: ${err.value}`;
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });

    // Error de clave duplicada em mongoose
    if (err.code === 11000){
        const message = `Clave duplicada ${Object.keys(err.keyValue)}`
        error = new ErrorHandler(message, 400)
    }

    // Error en jwt token
    if (err.name === "JsonWebTokenError"){
        const message = "Token de Json web es invalido, intentalo de nuevo"
        error = new ErrorHandler(message, 400)
    }

    // jwt token expirado
    if (err.name === "TokenExpiredError"){
        const message = "El token de jwt es vencido. ya expiro. intentalo de nuevo"
        error = new ErrorHandler(message, 400)
    }
};
