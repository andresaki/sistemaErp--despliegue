const Cliente = require("../models/cliente")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.newCliente = catchAsyncErrors(async(req, res, next)=>{
    
    req.body.user = req.user.id;
    const cliente = await Cliente.create(req.body);

    res.status(201).json({
        success:true,
        cliente
    })

})


exports.getCliente = catchAsyncErrors(async(req, res, next) =>{

    const cliente = await Cliente.findOne({_id: req.params.id , user: req.user.id})

    if(!cliente){
        return next(new ErrorHandler ("No se encontro o no se pudo obtener los datos del cliente" , 404))
    }

    res.status(200).json({
        success: true,
        cliente
    })

})

exports.allClientes = catchAsyncErrors(async(req, res, next) => {

    const clientes = await Cliente.find({user: req.user.id})

    if (!clientes){
        return next( new ErrorHandler("No se pudieron obtener los datos de los clientes"))
    }

    res.status(200).json({
        success: true,
        clientes
    })

})

exports.updateCliente = catchAsyncErrors(async(req, res, next) => {

    let cliente = await Cliente.findById(req.params.id)

    if(!cliente){
        return  next (new ErrorHandler("No se encontro o no se pudo obtener los datos del cliente", 404))
    }

    cliente = await Cliente.findByIdAndUpdate(req.params.id , req.body ,{
        new :true,
        runValidators: true
    });

    res.status(200).json({
        success:true,
        message: "Cliente actualizado correctamente",
        cliente
    })

})


exports.deleteCliente = catchAsyncErrors (async ( req, res, next) => {


    try{
        const cliente  = await Cliente.findById(req.params.id)
        
        if(!cliente){
            return next(new ErrorHandler(`Cliente con id ${req.params.id} no se encuentra en nuestra base de datos`))
        }

        await cliente.deleteOne({_id: cliente._id});
        
        res.status(200).json({
            success: true,
            message: "cliente eliminado correctamente"
        })


    }catch (error) {

        res.status(500).json({
            success: false,
            message: "Error al eliminar el registro del cliente"
        })
        
    }
})

