import axios from 'axios';
import { ALL_INGRESOS_FAIL, ALL_INGRESOS_REQUEST, ALL_INGRESOS_SUCCESS,  CLEAR_ERRORS,  DELETE_INGRESO_FAIL, DELETE_INGRESO_REQUEST, DELETE_INGRESO_SUCCESS, INGRESO_DETAILS_FAIL, INGRESO_DETAILS_REQUEST, INGRESO_DETAILS_SUCCESS, NEW_INGRESO_FAIL, NEW_INGRESO_REQUEST, NEW_INGRESO_SUCCESS,  UPDATE_INGRESO_FAIL, UPDATE_INGRESO_REQUEST, UPDATE_INGRESO_SUCCESS } from '../constants/ingresoConstants';


// all ingresos
export const getIngresos = () => async(dispatch) => {
    try {
        dispatch ({type: ALL_INGRESOS_REQUEST})

        const {data} = await axios.get('/api/ingresos'); 

        dispatch({
            type:ALL_INGRESOS_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_INGRESOS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// new ingreso
export const newIngreso = (ingresoData) => async ( dispatch ) => {

    try{
        dispatch({type: NEW_INGRESO_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.post(`/api/ingreso/nuevo`, ingresoData, config)

        dispatch({
            type: NEW_INGRESO_SUCCESS,
            payload: data
        })
    }
    catch (error) { 
        dispatch({
            type: NEW_INGRESO_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// delete ingreso
export const deleteIngreso = (id) => async ( dispatch ) => {

    try{
        dispatch({type: DELETE_INGRESO_REQUEST})
        
        const {data} = await axios.delete(`/api/ingreso/${id}`)

        dispatch({
            type: DELETE_INGRESO_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: DELETE_INGRESO_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// view details ingreso
export const getIngresoDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: INGRESO_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/ingreso/${id}`)
        dispatch({
            type: INGRESO_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: INGRESO_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// update producto
export const updateIngreso = (id, ingresoData) => async ( dispatch ) => {

    try{
        dispatch({type: UPDATE_INGRESO_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put(`/api/ingreso/${id}`, ingresoData, config)

        dispatch({
            type: UPDATE_INGRESO_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_INGRESO_FAIL,
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
