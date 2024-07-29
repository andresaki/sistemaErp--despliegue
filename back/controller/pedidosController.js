const Pedido = require("../models/pedidos")
const Ingreso = require("../models/ingresos")
const catchAsyncErrors  = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

//  crear nuevo pedido
exports.newPedido = catchAsyncErrors ( async( req, res, next) => {
    
    req.body.user = req.user.id

    const pedido= await Pedido.create(req.body);

    if (req.body.pagado === true) {

        // Crear un nuevo registro en la colección de ingresos
        const ingreso = new Ingreso({
            categoria: "Pedido",
            descripcion: req.body.nombre,
            monto: req.body.costoTotal,
            user: req.user.id
        });

        await ingreso.save();
    }

    res.status(201).json({
        success:true,
        pedido
    })

})

// ver un pedido
exports.getPedido = catchAsyncErrors (async (req, res, next) => {

    const pedido = await Pedido.findOne({_id: req.params.id, user: req.user.id})

    if(!pedido){
        return next( new ErrorHandler ("pedido no encontrado"))
    }

    res.status(200).json({
        sucess: true,
        pedido
    })

})

// ver todos los pedidos
exports.AllPedidos = catchAsyncErrors( async(req, res, next) => {

    const pedidos = await Pedido.find({user: req.user.id})

    if(!pedidos){
        return next( new ErrorHandler ("No se pudieron obtener los pedidos"))
    }

    res.status(200).json({
        sucess: true,
        pedidos
    })

})

// ver todos los pedidos de un cliente

exports.AllPedidosCliente = catchAsyncErrors( async(req, res, next) => {

    const pedidos = await Pedido.find({user: req.user.id , cliente: req.params.id})

    if(!pedidos){
        return next( new ErrorHandler (`No se pudieron obtener los pedidos del cliente: ${req.params.cliente} `))
    }

    res.status(200).json({
        sucess: true,
        pedidos
    })

})



// actualizar un pedido
exports.updatePedido = catchAsyncErrors(async(req, res, next)=> {
    const newData = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        expecificacionesCliente: req.body.expecificacionesCliente,
        terminado: req.body.terminado,
        entregado: req.body.entregado,
        pagado: req.body.pagado,
        costoTotal: req.body.costoTotal,
        fechaEstimadaEntrega: req.body.fechaEstimadaEntrega,
        cliente: req.body.cliente
    };

    let pedido = await Pedido.findById(req.params.id);
    
    
    // verificar si el pedido ya estaba pagado
    if (pedido.pagado === true && req.body.pagado === true) {  } 
    
    else if (pedido.pagado === false && req.body.pagado === true) {

        // Crear un nuevo registro en la colección de ingresos
        const ingreso = new Ingreso({
            categoria: "Pedido",
            descripcion: pedido.nombre,
            monto: pedido.costoTotal,
            user: req.user.id
        });

        await ingreso.save();
    }

    else if(pedido.pagado == true && req.body.pagado == false){
        return next( new ErrorHandler("El pedido ya se encuentra pagado, no se permite cambiar el valor"))
    }




    // Actualizar el pedido
    pedido = await Pedido.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: "Pedido actualizado correctamente",
        pedido
    });
})


// eliminar un pedido
exports.deletePedido = catchAsyncErrors (async ( req, res, next) => {


    try{
        const pedido  = await Pedido.findById(req.params.id)
        
        if(!pedido){
            return next(new ErrorHandler(`Pedido con id ${req.params.id} no se encuentra en nuestra base de datos`))
        }

        await pedido.deleteOne({_id: pedido._id});
        
        res.status(200).json({
            success: true,
            message: "Pedido eliminado correctamente"
        })


    }catch (error) {

        res.status(500).json({
            success: false,
            message: "Error al eliminar el registro del pedido"
        })
        
    }
})

