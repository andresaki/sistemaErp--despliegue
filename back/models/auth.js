const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: [true, "Por favor ingrese el nombre"],
        maxlength: [120, "El nombre no puede exceder los 120 caracteres"],
    },
    email: {
        type: String,
        require: [true, "Por favor ingrese el correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Por favor ingrese un email valido"],
    },
    password: {
        type: String,
        require: [true, "Por favor ingrese el correo electronico"],
        minlength: [6, "Tu contraseña no puede terner menos de 6 caracteres"],
        select: false
    },
    telefono: {
        type: String,
        default: "",
        minlength: [10, "El telefono no tiene no esta completo"],
    },
    role: {
        type: String,
        default: "user",
    },
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
    nombreEmpresa: {
        type:String,
        default: "Sistema Erp"
    },
    correoEmpresa:{
        type: String,
        validate: [validator.isEmail, "Por favor ingrese un email valido"],
        default: "correo@servicio.com"
    },
    colorPrimario:{
        type:String,
        validate: [validator.isHexColor ,"por favor ingresa un color hexadecimal valido"],
        default:"#0256A4"
    },
    direccion:{
        type:String,
        default:""
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


// Encriptar contraseña antes de guardarla
usuarioSchema.pre("save", async function (next) {
    // verifica si el campo password a sido modificado, si no sigue normal
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


// Decodificar o desincriptar contraseña y comparamos
usuarioSchema.methods.comparePassword = async function (pass){
    // retorna un booleano
    return await bcrypt.compare(pass, this.password)
}


// Retornar un JWT token
usuarioSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};




//Generar un token para reset de contraseña
usuarioSchema.methods.genResetPasswordToken = function () {

    const resetToken= crypto.randomBytes(20).toString('hex')

    //Hashear y setear resetToken
    this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest('hex')

    //Setear fecha de expiracion del token
    this.resetPasswordExpire= Date.now() + 30*60*1000 //el token dura solo 30 min

    return resetToken
}


module.exports = mongoose.model("auth", usuarioSchema);



