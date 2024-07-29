const User = require("../models/auth");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")



// Registrar un nuevo usuario /api/usuario/registro
exports.registroUsuario = catchAsyncErrors(async (req , res , next) => {

    const {nombre , email, password} = req.body;

    const user = await User.create({
        nombre,
        email,
        password
    })

    res.status(201).json({
        success: true,
        user
    })
})


// Iniciar secion - login
exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    const {email , password} = req.body;

    // verificamos si los campos tienen valores
    if (!email || !password){
        return next(new ErrorHandler("Por favor ingrese email y contraseña" , 400))
    }

    // verificamos si el usuario esta en la base de datos
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Usuario no existe" , 401))
    }

    // validamos la contraseña con la contrasela de bd 
    const contraseñaOk = await user.comparePassword(password);

    if (!contraseñaOk) {
        return next(new ErrorHandler("Contraseña incorrecta" , 401))
    }

    sendToken(user, 200, res)

})


// Cerrar secion

exports.logOut = catchAsyncErrors(async(req, res, next) => {
    res.cookie("token", null , { expires: new Date(Date.now()) , httpOnly: true})

    res.status(200).json({
        success: true,
        message: "cerro secion correctamente"
    })
})


// Olvidar contrasela, recuperar contraseña
exports.forgotPassword = catchAsyncErrors ( async (req, res, next) => {
    

    // buscar si existe el usuario mediante en email
    const user = await User.findOne({email: req.body.email})

    if (!user){
        return next(new ErrorHandler("Este usuario no se encuentra registrado"))
    }

    const resetToken = user.genResetPasswordToken();

    await user.save({validateBeforeSave: false})


    // crear una url para hacer el reseteo de la contraseña
    const resetUrl = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`

    // const mensaje = `Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no has solicitado un cambio de contraseña, por favor ignora este correo electrónico. \n Para restablecer tu contraseña, simplemente haz clic en el siguiente enlace: \n\n  ${resetUrl} \n\n  Por motivos de seguridad, este enlace es válido solo durante los próximos 30 minutos. Si el enlace expira, deberás solicitar un nuevo restablecimiento de contraseña. \n Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos a través de nuestro servicio de atención al cliente.\n Gracias por utilizar nuestros servicios.\n Atentamente,\n Sistema Erp `

    const mensaje = `
        <div style="font-family: Arial, sans-serif;">

            <h4>Hola!</h4>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no has solicitado un cambio de contraseña, por favor ignora este correo electrónico.</p>
            <p>Para restablecer tu contraseña, simplemente haz clic en el siguiente botón:</p> <br>
            <div style="text-align: center;">
            <a href="${resetUrl}" style="background-color: #0256A4; color: white; padding: 15px 23px; text-decoration: none; font-weight: 600; border-radius: 5px; display: inline-block;">Restablecer Contraseña</a>
            </div><br><br>
            <p>Por motivos de seguridad,<strong> este enlace es válido solo durante los próximos 30 minutos</strong>. Si el enlace expira, deberás solicitar un nuevo restablecimiento de contraseña.</p>

            <p>Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos a través de nuestro servicio de atención al cliente.</p><br>

            <p>Gracias por utilizar nuestros servicios.</p>

            <br>
            <strong>
            <p>Atentamente: Sistema Erp</p>
            </strong>
            
        </div>
    `;


    try{
        await sendEmail({
            email: user.email,
            subject: "Restablecimiento de contraseña - Sistema Erp",
            mensaje
        })
        res.status(200).json({
            success:true,
            message : `Correo enviado, Revisa tu bandeja`
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message, 500))
    }
})


// Resetear contraseña
exports.resetPassword = catchAsyncErrors( async (req, res, next) => {    

    // Hash el token que llego en la url del correo
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex')

    // buscar al usuario al que se le va a resetear la contraseña
    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: {$gt: Date.now()}
    })

    if (!user){
        return next(new ErrorHandler("El token es invalido o ya expiro" , 400))
    }


    // verificamos si se deligencio  la contraseña nueva 
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("La contraseña no es igual" , 406))
    }

    // Setear la nueva contraeña
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Guardar cambios
    await user.save();
    sendToken(user, 200, res)

})

// Ver perfil de usuario
exports.getUserProfile = catchAsyncErrors ( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})


// Update contraseña (usuario logueado)
exports.updatePassword = catchAsyncErrors( async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    // verificamos de la contraseña actual es igual a la nueva
    const sonIguales = await user.comparePassword(req.body.currentPassword)

    if (!sonIguales){
        return next(new ErrorHandler("La contraseña actual no es correcta" , 401))
    }

    // verificamos si se deligencio  la contraseña nueva 
    if(req.body.newPassword !== req.body.confirmNewPassword){
        return next(new ErrorHandler("La contraseña no es igual" , 406))
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res)


    // variables que tiene que llegar en el req.body->  currentPassword , newPassword , confirmNewPassword
})

// Update perfil de usuario (logueado)
exports.updateProfile = catchAsyncErrors(async(req, res, next)=> {

    const newData = {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
    }

    
    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new:true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(200).json({
        success:true,
        user
    })

})

// Update color primario (logueado)
exports.updatePrimaryColor = catchAsyncErrors(async(req, res, next)=> {

    const newData = {
        colorPrimario: req.body.colorPrimario
    }

    
    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new:true,
        runValidators: true,
    })


    res.status(200).json({
        success:true,
        user
    })

})

// Update perfil de usuario (logueado)
exports.updateEmpresa = catchAsyncErrors(async(req, res, next)=> {

    const newData = {
        nombreEmpresa: req.body.nombreEmpresa,
        correoEmpresa: req.body.correoEmpresa,
        direccion: req.body.direccion,
    }

    
    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new:true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(200).json({
        success:true,
        user
    })

})




// metodos ADMIN

// Ver todos los usuarios
exports.getAllUsers = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})


// Ver informacion de un usuario
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user){
        return next(new ErrorHandler(`No se encontro ningun usuario con el id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Actualizar perfil de un usuario
exports.updateUserAdmin = catchAsyncErrors ( async (req, res , next) => {

    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    user.nombre = req.body.nombre || user.nombre;
    user.email = req.body.email || user.email;

    // Si hay una nueva contraseña, se actualizará y se encriptará en el middleware pre-save
    if (req.body.password) {
        user.password = req.body.password;
    }


    // Guardar el usuario actualizado
    await user.save();

    res.status(200).json({
        success: true,
        user,
    });

})


// Eliminar usuario admin
exports.deleteUser = catchAsyncErrors( async( req, res, next) => {
    

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`Usuario con id: ${req.params.id} no se encuentra en nuestra base de datos`))
    }

    await user.deleteOne({_id : user._id});

    res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente" 
    })

})

