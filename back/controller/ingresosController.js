const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Ingreso = require("../models/ingresos")
const ErrorHandler = require("../utils/errorHandler")


// ver lista de ingresos
exports.getAllIngresos= catchAsyncErrors(async(req,res, next)=>{

    const ingresos = await Ingreso.find({user: req.user.id});

    let i = 0,

    ingresosTotales = ingresos.forEach(ingreso => {
        i+= ingreso.monto
    });


    res.status(200).json({
        success:true,
        ingresosTotales: i,
        ingresos
    })
})

// ver ingreso por id (usuario logueado)
exports.getIngreso = catchAsyncErrors (async (req, res ,next) => {

    const ingreso = await Ingreso.findOne({_id: req.params.id , user : req.user.id })

    if(!ingreso){
        return next(new ErrorHandler("El registro de este ingreso no esta en nuestra base de datos", 404))
    }

    res.status(200).json({
        success: true,
        ingreso
    })
})


// crear un nuevo ingreso
exports.newIngreso = catchAsyncErrors( async (req, res, next) => {
    
    req.body.user = req.user.id

    const ingreso = await Ingreso.create(req.body);


    res.status(201).json({
        success:true,
        ingreso
    })
})


// actualizar ingreso
exports.updateIngreso = catchAsyncErrors ( async( req, res, next ) => {


    let ingreso = await Ingreso.findById(req.params.id);

    if(!ingreso){
        return res.status(404).json({
            success: false,
            message: "No se encontro o no se pudo obtener este registro"
        })
    }

    req.body.fechaModificacion = Date.now()

    ingreso = await Ingreso.findByIdAndUpdate(req.params.id , req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "ingreso actualizado correctamente",
        ingreso
    })
})



// Eliminar ingreso
exports.deleteIngreso = catchAsyncErrors (async ( req, res, next) => {


    try{
        const ingreso  = await Ingreso.findById(req.params.id)
        
        if(!ingreso){
            return next(new ErrorHandler(`Ingreso con id ${req.params.id} no se encuentra en nuestra base de datos`))
        }

        await ingreso.deleteOne({_id: ingreso._id});
        
        res.status(200).json({
            success: true,
            message: "Ingreso eliminado correctamente"
        })


    }catch (error) {

        res.status(500).json({
            success: false,
            message: "Error al eliminar el registro de ingreso"
        })
        
    }
})

