const express = require("express")
const router = express.Router()

const { isAuthenticatedUser } = require("../middleware/auth")
const { allClientes, getCliente, newCliente, updateCliente, deleteCliente } = require("../controller/clientesController")


router.route('/clientes').get(isAuthenticatedUser, allClientes)
router.route('/cliente/:id').get(isAuthenticatedUser,getCliente)
router.route('/cliente/nuevo').post(isAuthenticatedUser , newCliente)
router.route('/cliente/:id').put(isAuthenticatedUser ,updateCliente)
router.route('/cliente/:id').delete(isAuthenticatedUser ,deleteCliente)


module.exports = router