const mongoose = require("mongoose");

const invetarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:[true, "Por favor registra el nombre del producto"],
        trim:true,
        maxLength:[150,"El nombre del producto no debe exceder los 120 caracteres"]
    },
    precio:{
        type:Number,
        required:[true, "Por favor registra el precio del producto"],
        min: [0, "El precio no puede ser negativo"],
        maxLength:[8,"El precio del producto no puede superar los 99'999.999"],
        default: 0.0
    },

    categoria:{
        type:String,
        required:[true, "Por favor registra la categoria"],
        trim:true,
        maxLength:[150,"El nombre de la categoria no debe exceder los 120 caracteres"]
    },
    
    stock:{
        type:Number,
        required:[true, "Por favor registra el stock inicial del producto"],
        min: [0, "El stock actual del producto no puede ser negativo"],
        maxLength:[8,"El stock actual del producto no puede estar por encima de 99'999.999"],
        default: 0
    },
    stockMinimo:{
        type:Number,
        required:[true, "Por favor registra el stock minimo del producto"],
        min: [0, "El stock minimo del producto no puede ser negativo"],
        maxLength:[8,"El precio del producto no puede estar por encima de 99'999.999"],
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

module.exports = mongoose.model("productos" , invetarioSchema)