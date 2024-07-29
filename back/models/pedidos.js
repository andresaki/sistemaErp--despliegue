const mongoose = require("mongoose");
const { default: isBoolean } = require("validator/lib/isBoolean");

const pedidosSchema = mongoose.Schema({

    nombre:{
        type: String,
        required : [true, "por favor ingresa un nombre para identificarlo"]
    },
    
    descripcion:{
        type: String,
        required : [true, "por favor ingresa un nombre para identificarlo"],
        default:""
    },

    expecificacionesCliente:{
        type: String,
        default:""
    },
    
    terminado:{
        type: Boolean,
        default:false
        
    },
    
    entregado:{
        type: Boolean,
        required : [true, "entregado: true  , no entregado: false"],
        default: false
    },
    
    pagado:{
        type: Boolean,
        validator: isBoolean,
        required : [true, "Pagado: true  , No pagado: false"],
        default: false
    },
    
    costoTotal:{
        type: Number,
        required : [true, "por favor ingresa el costo total del pedido"],
        min: [0, "El precio no puede ser negativo"],
        maxLength:[9,"El precio del producto no puede superar los 999'999.999"],
        default: 0.0
    },

    fechaCreacion:{
        type: Date,
        default: Date.now,
    },

    fechaEstimadaEntrega:{
        type: Date,
        required : [true, "porfavor una fecha valida para la entrega del pedido"],
        default: function() {
            let date = new Date();
            date.setDate(date.getDate() + 10);
            return date;
        }

    },

    // relacion con un usuario  
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },


    // relacion con un producto  
    cliente:{
        type: mongoose.Schema.ObjectId,
        ref: 'Cliente',
        required: true
    }

})

module.exports = mongoose.model("Pedido" , pedidosSchema)