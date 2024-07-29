const express = require("express")
const router = express.Router()

const { getAllIngresos, getIngreso, newIngreso, updateIngreso, deleteIngreso } = require("../controller/ingresosController")
const { isAuthenticatedUser } = require("../middleware/auth")

router.route('/ingresos').get(isAuthenticatedUser, getAllIngresos)
router.route('/ingreso/:id').get(isAuthenticatedUser,getIngreso)
router.route('/ingreso/nuevo').post(isAuthenticatedUser ,newIngreso)
router.route('/ingreso/:id').put(isAuthenticatedUser ,updateIngreso)
router.route('/ingreso/:id').delete(isAuthenticatedUser ,deleteIngreso)


module.exports = router
