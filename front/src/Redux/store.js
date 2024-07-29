import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import { newProductReducer, productDetailsReducer, productosReducer, productReducer } from './reducer/productoReducer';
import { allUserReducer, authReducer, deleteUserReducer, forgotPasswordReducer, userReducer } from './reducer/userReducer';
import { movimientosStockReducer, newMovimientoStockReducer } from './reducer/stockReducer';
import { clienteDetailsReducer, clienteReducer, clientesReducer, newclienteReducer } from './reducer/clienteReducer';
import { newpedidoReducer, pedidoDetailsReducer, pedidoReducer, pedidosReducer, setPedidoFilterReducer, updatePedidoReducer } from './reducer/pedidoReducer';
import { deleteGastoReducer, gastoDetailsReducer,  gastosReducer, newGastoReducer, updateGastoReducer } from './reducer/gastoReducer';
import { deleteIngresoReducer, ingresoDetailsReducer,  ingresosReducer, newIngresoReducer, updateIngresoReducer } from './reducer/ingresoReducer';


let reducer = combineReducers({

    // products
    products: productosReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productDetails: productDetailsReducer,

    // user
    auth: authReducer, 
    user: userReducer,
    forgotPassword : forgotPasswordReducer,
    users : allUserReducer,
    deleteUser : deleteUserReducer,


    // stock
    movimientosStock : movimientosStockReducer,
    newMovimientoStock : newMovimientoStockReducer ,

    // clientes
    clientes : clientesReducer,
    newCliente: newclienteReducer,
    clienteDetails: clienteDetailsReducer,
    cliente: clienteReducer,

    // pedido
    pedidos : pedidosReducer,
    newPedido: newpedidoReducer,
    pedidoDetails: pedidoDetailsReducer,
    pedido: pedidoReducer,
    updatePedido: updatePedidoReducer,
    PedidoFilter: setPedidoFilterReducer,

    // gasto
    gastos : gastosReducer,
    newGasto: newGastoReducer,
    gastoDetails: gastoDetailsReducer,
    deleteGasto: deleteGastoReducer,
    updateGasto :updateGastoReducer,



    // ingreso
    ingresos : ingresosReducer,
    newIngreso: newIngresoReducer,
    ingresoDetails: ingresoDetailsReducer,
    deleteIngreso: deleteIngresoReducer,
    updateIngreso : updateIngresoReducer
    

});

let initialState = {}

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    preloadedState: initialState,
})

export default store; 