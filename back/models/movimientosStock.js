const mongoose = require("mongoose")

const movimientoStockSchema = mongoose.Schema({

    tipo:{
        type:String,
        required:[true, "Por favor ingrese el tipo de movimiento que va ahacer"],
        trim:true
    },
    cantidad:{
        type: Number,
        default: 0,
        min: [0, "La cantidad del movimiento no puede ser negativa"],
    },
    fechaCreacion:{
        type:Date,
        default:Date.now
    },

    // relacion con un usuario  
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },


    // relacion con un producto  
    producto:{
        type: mongoose.Schema.ObjectId,
        ref: 'Producto',
        required: true
    },

    nombreproducto:{
        type:String,
        required:[true],
        trim:true
    }

})

module.exports = mongoose.model("Movimiento" , movimientoStockSchema)

