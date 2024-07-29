const express = require("express")
const router = express.Router()

const { isAuthenticatedUser } = require("../middleware/auth")
const { getAllGastos, getGasto, newGasto, updateGasto, deleteGasto } = require("../controller/gastosController")

router.route('/gastos').get(isAuthenticatedUser, getAllGastos)



router.route('/gasto/:id').get(isAuthenticatedUser,getGasto)
router.route('/gasto/nuevo').post(isAuthenticatedUser ,newGasto)
router.route('/gasto/:id').put(isAuthenticatedUser ,updateGasto)
router.route('/gasto/:id').delete(isAuthenticatedUser ,deleteGasto)


module.exports = router