const express = require("express");
const router = express.Router();  

const { registroUsuario, loginUser, logOut, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserDetails, updateUserAdmin, deleteUser, updateEmpresa, updatePrimaryColor } = require("../controller/authController");
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");


router.route('/usuario/login').post(loginUser)
router.route('/usuario/logout').get( isAuthenticatedUser ,logOut) //solo el que este logiado puede cerrar secion
router.route('/usuario/forgotPassword').post( forgotPassword) //solo el que este logiado puede cerrar secion
router.route('/resetPassword/:token').post(resetPassword)
router.route('/usuario/profile').get(isAuthenticatedUser, getUserProfile)
router.route('/usuario/updatePassword').put(isAuthenticatedUser, updatePassword)
router.route('/usuario/updateProfile').put(isAuthenticatedUser, updateProfile)
router.route('/usuario/updateEmpresa').put(isAuthenticatedUser, updateEmpresa)
router.route('/usuario/updatePrimaryColor').put(isAuthenticatedUser, updatePrimaryColor)


// Rutas admin 
router.route('/admin/allUsers').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route('/admin/registro').post(isAuthenticatedUser, authorizeRoles("admin"), registroUsuario)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route('/admin/updateUserAdmin/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateUserAdmin)
router.route('/admin/deleteUser/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router