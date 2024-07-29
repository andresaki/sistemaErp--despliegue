const express = require("express");
const router = express.Router();  


const { newProduct ,getProducts, getProductbyId, updateProduct, deleteProduct } = require("../controller/productsController");
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");


router.route('/productos').get( isAuthenticatedUser,getProducts);
router.route('/producto/nuevo').post(isAuthenticatedUser, newProduct);
router.route('/producto/:id').get(isAuthenticatedUser, getProductbyId);
router.route('/producto/:id').put(isAuthenticatedUser, updateProduct);
router.route('/producto/:id').delete(isAuthenticatedUser, deleteProduct);

module.exports = router; 