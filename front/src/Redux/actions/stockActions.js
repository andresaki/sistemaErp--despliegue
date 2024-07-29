import axios from 'axios'
import { ALL_MOVIMIENTO_STOCK_FAIL, ALL_MOVIMIENTO_STOCK_REQUEST, ALL_MOVIMIENTO_STOCK_SUCCESS, CLEAR_ERRORS, NEW_MOVIMIENTO_STOCK_FAIL, NEW_MOVIMIENTO_STOCK_REQUEST, NEW_MOVIMIENTO_STOCK_SUCCESS } from '../constants/stockConstants';


export const getMovimientos = () => async(dispatch) => {
    try {
        dispatch ({type: ALL_MOVIMIENTO_STOCK_REQUEST})

        const {data} = await axios.get('/api/movimientos'); 

        dispatch({
            type:ALL_MOVIMIENTO_STOCK_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_MOVIMIENTO_STOCK_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// nuevo producto

export const newMovimientoStock = (movimientoData) => async ( dispatch ) => {

    try{
        dispatch({type: NEW_MOVIMIENTO_STOCK_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.post(`/api/movimiento/nuevo`, movimientoData, config)

        dispatch({
            type: NEW_MOVIMIENTO_STOCK_SUCCESS,
            payload: data
        })
    }
    catch (error) { 
        dispatch({
            type:NEW_MOVIMIENTO_STOCK_FAIL,
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