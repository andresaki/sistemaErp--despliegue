import axios from 'axios';
import { ALL_GASTOS_FAIL, ALL_GASTOS_REQUEST, ALL_GASTOS_SUCCESS, CLEAR_ERRORS, DELETE_GASTO_FAIL, DELETE_GASTO_REQUEST, DELETE_GASTO_SUCCESS, GASTO_DETAILS_FAIL, GASTO_DETAILS_REQUEST, GASTO_DETAILS_SUCCESS, NEW_GASTO_FAIL, NEW_GASTO_REQUEST, NEW_GASTO_SUCCESS, UPDATE_GASTO_FAIL, UPDATE_GASTO_REQUEST, UPDATE_GASTO_SUCCESS } from '../constants/gastoConstants';


// all gastos
export const getGastos = () => async(dispatch) => {
    try {
        dispatch ({type: ALL_GASTOS_REQUEST})

        const {data} = await axios.get('/api/gastos'); 

        dispatch({
            type:ALL_GASTOS_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_GASTOS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// new gasto
export const newGasto = (gastoData) => async ( dispatch ) => {

    try{
        dispatch({type: NEW_GASTO_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.post(`/api/gasto/nuevo`, gastoData, config)

        dispatch({
            type: NEW_GASTO_SUCCESS,
            payload: data
        })
    }
    catch (error) { 
        dispatch({
            type: NEW_GASTO_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// delete clieente
export const deleteGasto = (id) => async ( dispatch ) => {

    try{
        dispatch({type: DELETE_GASTO_REQUEST})
        
        const {data} = await axios.delete(`/api/gasto/${id}`)

        dispatch({
            type: DELETE_GASTO_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: DELETE_GASTO_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// view details gasto
export const getGastoDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GASTO_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/gasto/${id}`)
        dispatch({
            type: GASTO_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GASTO_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// update producto
export const updateGasto = (id, gastoData) => async ( dispatch ) => {

    try{
        dispatch({type: UPDATE_GASTO_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put(`/api/gasto/${id}`, gastoData, config)

        dispatch({
            type: UPDATE_GASTO_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_GASTO_FAIL,
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
