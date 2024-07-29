const express = require("express")
const router = express.Router()

const { isAuthenticatedUser } = require("../middleware/auth")
const { getMovimientos, newMovimiento } = require("../controller/movimientosStock")

router.route('/movimientos').get(isAuthenticatedUser, getMovimientos)
router.route('/movimiento/nuevo').post(isAuthenticatedUser ,newMovimiento)


module.exports = router