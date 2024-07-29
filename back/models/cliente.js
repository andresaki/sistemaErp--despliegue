const mongoose = require("mongoose")

const clienteSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: [true, "ingrese el nombre del cliente"]
    },
    telefono:{
        type:String,
        required: [true, "ingrese un telefono de contacto del cliente"]
    },
    telefono2:{
        type:String,
        default: ""
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }

})

module.exports = mongoose.model("Cliente", clienteSchema)