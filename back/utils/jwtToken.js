// crear y enviar un token guardado en una cookie

const sendToken = (user , statusCode, res) => {

    // creamos el token
    const token = user.getJwtToken();
 
    // Configuracion del token
    const Configuracion = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 ),   //convertir dia a milisegundos
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token , Configuracion).json({
        success: true ,
        token: token,
        user
    })
}

module.exports = sendToken