const mongoose = require("mongoose");

const ingresoSchema = mongoose.Schema({

    categoria:{
        type:String,
        required:[true, "por favor ingresa la categoria que pertenece"],
        trim : true
    },
    descripcion:{
        type:String,
        required:[true, "por favor ingresa una breve descripcion"],
        trim : true
    },
    monto:{
        type: Number,
        required: [true, "ingresa un monto"],
        min: [1, "El monto no puede ser negativo"],
        default: 0
    },
    fechaCreacion:{
        type:Date,
        default:Date.now
    },
    fechaModificacion:{
        type:Date,
        default:Date.now
    },


    // relacion con un usuario  
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
    
})

module.exports = mongoose.model("ingresos" , ingresoSchema);
