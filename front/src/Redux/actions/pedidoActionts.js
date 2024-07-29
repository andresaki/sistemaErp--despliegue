import axios from 'axios'
import { ALL_PEDIDOS_CLIENTE_FAIL, ALL_PEDIDOS_CLIENTE_REQUEST, ALL_PEDIDOS_CLIENTE_SUCCESS, ALL_PEDIDOS_FAIL, ALL_PEDIDOS_REQUEST, ALL_PEDIDOS_SUCCESS, CLEAR_ERRORS, DELETE_PEDIDO_FAIL, DELETE_PEDIDO_REQUEST, DELETE_PEDIDO_SUCCESS, NEW_PEDIDO_FAIL, NEW_PEDIDO_REQUEST, NEW_PEDIDO_SUCCESS, PEDIDO_DETAILS_FAIL, PEDIDO_DETAILS_REQUEST, PEDIDO_DETAILS_SUCCESS, UPDATE_PEDIDO_FAIL, UPDATE_PEDIDO_REQUEST, UPDATE_PEDIDO_SUCCESS } from '../constants/pedidoConstants';


// all pedidos
export const getPedidos = () => async(dispatch) => {
    try {
        dispatch ({type: ALL_PEDIDOS_REQUEST})

        const {data} = await axios.get('/api/pedidos'); 

        dispatch({
            type:ALL_PEDIDOS_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_PEDIDOS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// all pedidos
export const getPedidosCliente = (id) => async(dispatch) => {
    try {
        dispatch ({type: ALL_PEDIDOS_CLIENTE_REQUEST})

        const {data} = await axios.get(`/api/pedidosCliente/${id}`); 

        dispatch({
            type:ALL_PEDIDOS_CLIENTE_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_PEDIDOS_CLIENTE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}




// new pedido
export const newPedido = (pedidoData) => async ( dispatch ) => {

    try{
        dispatch({type: NEW_PEDIDO_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.post(`/api/pedido/nuevo`, pedidoData, config)

        dispatch({
            type: NEW_PEDIDO_SUCCESS,
            payload: data
        })
    }
    catch (error) { 
        dispatch({
            type: NEW_PEDIDO_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// delete pedido
export const deletePedido = (id) => async ( dispatch ) => {

    try{
        dispatch({type: DELETE_PEDIDO_REQUEST})
        
        const {data} = await axios.delete(`/api/pedido/${id}`)

        dispatch({
            type: DELETE_PEDIDO_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: DELETE_PEDIDO_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// view details pedido
export const getPedidoDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PEDIDO_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/pedido/${id}`)
        dispatch({
            type: PEDIDO_DETAILS_SUCCESS,
            payload: data.pedido
        })
    } catch (error) {
        dispatch({
            type: PEDIDO_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// update producto
export const updatePedido = (id, pedidoData) => async ( dispatch ) => {

    try{
        dispatch({type: UPDATE_PEDIDO_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put(`/api/pedido/${id}`, pedidoData, config)

        dispatch({
            type: UPDATE_PEDIDO_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_PEDIDO_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const setPedidoFilter = (filter) => ({
    type: 'SET_PEDIDO_FILTER',
    payload: filter,
});






export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

