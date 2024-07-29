const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Gasto = require("../models/gastos")
const ErrorHandler = require("../utils/errorHandler")


// ver lista de gastos
exports.getAllGastos= catchAsyncErrors(async(req,res, next)=>{

    const gastos = await Gasto.find({user: req.user.id});

    let i = 0,

    gastosTotales = gastos.forEach(gasto => {
        i+= gasto.monto
    });


    res.status(200).json({
        success:true,
        gastosTotales: i,
        gastos
    })
})

// ver gasto por id (usuario logueado)
exports.getGasto = catchAsyncErrors (async (req, res ,next) => {

    const gasto = await Gasto.findOne({_id: req.params.id , user : req.user.id })

    if(!gasto){
        return next(new ErrorHandler("El registro de este gasto no esta en nuestra base de datos", 404))
    }

    res.status(200).json({
        success: true,
        gasto
    })
})


// crear un nuevo gasto
exports.newGasto = catchAsyncErrors( async (req, res, next) => {
    
    req.body.user = req.user.id

    const gasto = await Gasto.create(req.body);


    res.status(201).json({
        success:true,
        gasto
    })
})


// actualizar gasto
exports.updateGasto = catchAsyncErrors ( async( req, res, next ) => {


    let gasto = await Gasto.findById(req.params.id);

    if(!gasto){
        return res.status(404).json({
            success: false,
            message: "No se encontro o no se pudo obtener este registro"
        })
    }

    req.body.fechaModificacion = Date.now()

    gasto = await Gasto.findByIdAndUpdate(req.params.id , req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "gasto actualizado correctamente",
        gasto
    })
})



// Eliminar gasto
exports.deleteGasto = catchAsyncErrors (async ( req, res, next) => {


    try{
        const gasto  = await Gasto.findById(req.params.id)
        
        if(!gasto){
            return next(new ErrorHandler(`Gasto con id ${req.params.id} no se encuentra en nuestra base de datos`))
        }

        await gasto.deleteOne({_id: gasto._id});
        
        res.status(200).json({
            success: true,
            message: "Gasto eliminado correctamente"
        })


    }catch (error) {

        res.status(500).json({
            success: false,
            message: "Error al eliminar el registro de gasto"
        })
        
    }
})

