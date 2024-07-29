import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_COMPANY_RESET,
    UPDATE_COMPANY_FAIL,
    UPDATE_COMPANY_REQUEST,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    UPDATE_COLOR_REQUEST,
    UPDATE_COLOR_SUCCESS,
    UPDATE_COLOR_RESET,
    UPDATE_COLOR_FAIL,
    ALL_USER_SUCCESS,
    ALL_USER_REQUEST,
    ALL_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
} from "../constants/userConstants";

// Cambios y reducer sobre autenticacion
export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };


        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null

            }

        case LOGOUT_FAIL:
            return{
                ...state,
                error: action.payload
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


// REgistrar nuevo usuario
export const authNewReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            };

        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};




// Actualizar usuario, actualizar contraseña
export const  userReducer = ( state = {} ,  action ) => {

    switch ( action.type){

        case UPDATE_PROFILE_REQUEST:
        case UPDATE_COMPANY_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_COLOR_REQUEST:
        case USER_UPDATE_REQUEST:
            return {
                ...state,
                loading:true
            }

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_COMPANY_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_COLOR_SUCCESS:
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated : action.payload
            }

        case UPDATE_PROFILE_RESET:
        case UPDATE_COMPANY_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_COLOR_RESET:
        case USER_UPDATE_RESET:
        
            return {
                ...state,
                isUpdated: false
            }

        case UPDATE_PROFILE_FAIL:
        case UPDATE_COMPANY_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_COLOR_FAIL:
        case USER_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default : 
            return state    
    }
}




export const forgotPasswordReducer = (state = {}, action)  => {


    switch (action.type){

        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return  {
                ...state,
                loading: true,
                error:null
            }

        case NEW_PASSWORD_SUCCESS:
            return{
                ...state,
                success: action.payload
            }


        case FORGOT_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                message: action.payload
            }

        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
                message:null
            }

        default: 
            return state

    }

}

// reducer all pedidos and all pedidos for cliente
export const   allUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USER_REQUEST :
            return {
                loading: true,
                users: [],
            };

        case ALL_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload.users
            };

        case ALL_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


// reducer delete and update user
export const deleteUserReducer = (state = { state: {} }, action) => {
    switch (action.type) {


        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDelected: action.payload,
            };
        case DELETE_USER_FAIL:
            return {
                ...state,
                error: action.payload,

            };

        case DELETE_USER_RESET:
            return {
                ...state,
                isDelected: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};