import axios from 'axios';
import { ALL_PRODUCTS_REQUEST ,ALL_PRODUCTS_FAIL, ALL_PRODUCTS_SUCCESS , CLEAR_ERRORS, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from '../constants/productoConstants';

//  all products
export const getProducts = () => async(dispatch) => {
    try {
        dispatch ({type: ALL_PRODUCTS_REQUEST})

        const {data} = await axios.get('/api/productos'); 

        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// nuevo producto

export const newProduct = (productData) => async ( dispatch ) => {

    try{
        dispatch({type: NEW_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.post(`/api/producto/nuevo`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
    }
    catch (error) { 
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }


}


// eliminr producto
export const deleteProduct = (id) => async ( dispatch ) => {

    try{
        dispatch({type: DELETE_PRODUCT_REQUEST})
        
        const {data} = await axios.delete(`/api/producto/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data
        })
    }
    catch (error) { 
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }


}


//VER DETALLE DEL PRODUCTO
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/producto/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// update producto
export const updateProduct = (id, dataProduct) => async ( dispatch ) => {

    try{
        dispatch({type: UPDATE_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put(`/api/producto/${id}`, dataProduct, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
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