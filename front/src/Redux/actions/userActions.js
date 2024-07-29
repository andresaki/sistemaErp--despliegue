import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
    REGISTER_USER_REQUEST , REGISTER_USER_SUCCESS , REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_COMPANY_REQUEST,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_COMPANY_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    UPDATE_COLOR_REQUEST,
    UPDATE_COLOR_SUCCESS,
    UPDATE_COLOR_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL

 } from "../constants/userConstants";


// delete user
export const deleteUser = (id) => async ( dispatch ) => {

    try{
        dispatch({type: DELETE_USER_REQUEST})
        
        const {data} = await axios.delete(`/api/admin/deleteUser/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: DELETE_USER_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}



// all pedidos
export const getUsers = () => async(dispatch) => {
    try {
        dispatch ({type: ALL_USER_REQUEST})

        const {data} = await axios.get('/api/admin/allUsers'); 

        dispatch({
            type:ALL_USER_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}



// Login
export const login = ( email, password ) => async ( dispatch ) => {

    try{
        dispatch({type: LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/usuario/login', { email, password } , config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    }
    catch ( error ) {

        dispatch({
            type:LOGIN_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


//REGISTRAR USUARIO
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.post('/api/admin/registro', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: REGISTER_USER_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// Cargar el usuario (LOAD_USER)
export const loadUser= () => async (dispatch) => {
    try{
        dispatch({type: LOAD_USER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const {data} = await axios.get("/api/usuario/profile" , config)


        dispatch ({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    }
    catch (error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}



//actualizar  USUARIO loageador user
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put('/api/usuario/updateProfile', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

//actualizar  colorprimario loageador user
export const updateColor= (colorData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COLOR_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put('/api/usuario/updatePrimaryColor', colorData, config)

        dispatch({
            type: UPDATE_COLOR_SUCCESS,
            payload: data
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_COLOR_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


//actualizar  Company loageador user
export const updateCompany = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COMPANY_REQUEST })


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put('/api/usuario/updateEmpresa', userData, config)

        dispatch({
            type: UPDATE_COMPANY_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_COMPANY_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


//actualizar  contraseña loageador user
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put('/api/usuario/updatePassword', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}




// cerrar secion - logut user
export const logout = () => async (dispatch) => {
    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const {data} = await axios.get("/api/usuario/logout", config)
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }


}

// update user
export const updateUserAdmin = (id, userdata) => async ( dispatch ) => {

    try{
        dispatch({type: USER_UPDATE_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.put(`/api/admin/updateUserAdmin/${id}`, userdata, config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data.success
        })
    }
    catch (error) { 
        dispatch({
            type: USER_UPDATE_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// olvide mi contraseña

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.post('/api/usuario/forgotPassword', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    }
    catch (error) { 
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}



// reset password, nueva contraseña
export const resetPassword = (token , passwords) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST })


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const {data} = await axios.post(`/api/resetPassword/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload : error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





