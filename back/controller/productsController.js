const catchAsyncErrors  = require("../middleware/catchAsyncErrors");
const producto = require("../models/productos");
const  ErrorHandler  = require("../utils/errorHandler");


//ver lista de productos
exports.getProducts = async (req , res , next) => {
     
    const allProductos = await producto.find({"user" : req.user.id});

    if(!allProductos){
        return res.status(404).json({
            success:false,
            error: true
        })

    }

    res.status(200).json({
        success: true,
        cantidad: allProductos.length,
        allProductos
    })
} 

//ver producto por id 
exports.getProductbyId = catchAsyncErrors( async (req ,res ,next) => {
    const product = await producto.findOne({_id: req.params.id , user : req.user.id });
    if(!product){
        return next(new ErrorHandler("Producto no encontrado" , 404))
    }

    res.status(200).json({
        success: true,
        product
    })

})


// crear nuevo producto 
exports.newProduct= catchAsyncErrors( async(req,res,next)=>{

    req.body.user = req.user.id

    const product= await producto.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

//actualizar producto
exports.updateProduct = async (req, res, next) => {
    let product = await producto.findById(req.params.id);
    
    if(!product){
        return res.status(404).json({
            success:false,
            message: "No se encontro o no se pudo obtener"
        })
    }

    product = await producto.findByIdAndUpdate(req.params.id , req.body ,{
        new :true,
        runValidators: true
    });

    res.status(200).json({
        success:true,
        message: "producto actualizado correctamente",
        product
    })

}

exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
    try {
      const product = await producto.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("Producto no encontrado" , 404))
      }
      console.log(product)
      await product.deleteOne({ _id: product._id });
      res.status(200).json({
        success: true,
        message: "Producto eliminado exitosamente",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error eliminando producto",
      });
    }
})