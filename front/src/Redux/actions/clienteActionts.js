import axios from 'axios'
import { ALL_CLIENTES_FAIL, ALL_CLIENTES_REQUEST, ALL_CLIENTES_SUCCESS, CLEAR_ERRORS, CLIENTE_DETAILS_FAIL, CLIENTE_DETAILS_REQUEST, CLIENTE_DETAILS_SUCCESS, DELETE_CLIENTE_FAIL, DELETE_CLIENTE_REQUEST, DELETE_CLIENTE_SUCCESS, NEW_CLIENTE_FAIL, NEW_CLIENTE_REQUEST, NEW_CLIENTE_SUCCESS, UPDATE_CLIENTE_FAIL, UPDATE_CLIENTE_REQUEST, UPDATE_CLIENTE_SUCCESS } from '../constants/clienteConstants';



// all clientes
export const getClientes = () => async(dispatch) => {
    try {
        dispatch ({type: ALL_CLIENTES_REQUEST})

        const {data} = await axios.get('/api/clientes'); 

        dispatch({
            type:ALL_CLIENTES_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_CLIENTES_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// new cliente
export const newCliente = (clienteData) => async ( dispatch ) => {

    try{
        dispatch({type: NEW_CLIENTE_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.post(`/api/cliente/nuevo`, clienteData, config)

        dispatch({
            type: NEW_CLIENTE_SUCCESS,
            payload: data
        })
    }
    catch (error) { 
        dispatch({
            type: NEW_CLIENTE_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// delete clieente
export const deleteCliente = (id) => async ( dispatch ) => {

    try{
        dispatch({type: DELETE_CLIENTE_REQUEST})
        
        const {data} = await axios.delete(`/api/cliente/${id}`)

        dispatch({
            type: DELETE_CLIENTE_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: DELETE_CLIENTE_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// view details cliente
export const getClienteDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CLIENTE_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/cliente/${id}`)
        dispatch({
            type: CLIENTE_DETAILS_SUCCESS,
            payload: data.cliente
        })
    } catch (error) {
        dispatch({
            type: CLIENTE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// update 
export const updateCliente = (id, clienteData) => async ( dispatch ) => {

    try{
        dispatch({type: UPDATE_CLIENTE_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put(`/api/cliente/${id}`, clienteData, config)

        dispatch({
            type: UPDATE_CLIENTE_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_CLIENTE_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

