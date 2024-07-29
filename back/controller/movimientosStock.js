const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Movimiento = require("../models/movimientosStock")
const producto = require("../models/productos");
const ErrorHandler = require("../utils/errorHandler");

// ver todos lo movimientos de stock del usuario 
exports.getMovimientos = catchAsyncErrors(async(req, res, next) => {
    const movimientos = await Movimiento.find({user: req.user.id});

    res.status(200).json({
        success: true,
        movimientos
    })
})


// crear un nuevo movimiento
exports.newMovimiento = catchAsyncErrors( async (req, res, next) => {
    
    // verificamo si el tipo de movimiento es el correcto
    if (req.body.tipo !== "entrada" && req.body.tipo !== "salida"){
        next(new ErrorHandler("El tipo de movimiento no es aceptado" , 401))
    }


    // verificamos si esta presente ese producto
    let product = await producto.findById(req.body.producto);
    if(!product){
        return next(new ErrorHandler("No se pudo obtener el producto o ya no existe en nuestra base de datos" , 404)) 
        
    }


    // miramos que tipo de movimiento se va a hacer y se calcula
    if (req.body.tipo === "entrada"){
        product.stock += Number(req.body.cantidad);
    }
    else if (req.body.tipo === "salida"){
        
        // Verificar si hay suficiente stock para la salida
        if (product.stock < req.body.cantidad) {
            return next(new ErrorHandler("No hay suficiente stock disponible", 400));
        }
        product.stock -= Number(req.body.cantidad);
    }

    
    // Actualizamos el producto
    await product.save()


    //Creamos el registro de movimiento 
    req.body.user = req.user.id
    const movimiento = await Movimiento.create(req.body);



    res.status(200).json({
        success:true,
        message: "Movimiento de stock exitoso y producto actualizado",
        product,
        movimiento
    })

})




