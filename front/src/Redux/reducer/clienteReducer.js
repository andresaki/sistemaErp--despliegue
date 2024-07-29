import { ALL_CLIENTES_FAIL, ALL_CLIENTES_REQUEST, ALL_CLIENTES_SUCCESS, CLEAR_ERRORS, CLIENTE_DETAILS_FAIL, CLIENTE_DETAILS_REQUEST, CLIENTE_DETAILS_SUCCESS, DELETE_CLIENTE_FAIL, DELETE_CLIENTE_REQUEST, DELETE_CLIENTE_RESET, DELETE_CLIENTE_SUCCESS, NEW_CLIENTE_FAIL, NEW_CLIENTE_REQUEST, NEW_CLIENTE_RESET, NEW_CLIENTE_SUCCESS, UPDATE_CLIENTE_FAIL, UPDATE_CLIENTE_REQUEST, UPDATE_CLIENTE_RESET, UPDATE_CLIENTE_SUCCESS } from "../constants/clienteConstants";


// reducer all clientes
export const clientesReducer = (state = { clientes: [] }, action) => {
    switch (action.type) {
        case ALL_CLIENTES_REQUEST :
            return {
                loading: true,
                clientes: [],
            };

        case ALL_CLIENTES_SUCCESS:
            return {
                loading: false,
                clientes: action.payload.clientes,
            };

        case ALL_CLIENTES_FAIL:
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


// reducer one cliente
export const clienteDetailsReducer = (state = { cliente: {} }, action) => {
    switch (action.type) {
        case CLIENTE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CLIENTE_DETAILS_SUCCESS:
            return {
                loading: false,
                cliente: action.payload
            }
        case CLIENTE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


// reducer new cliente
export const newclienteReducer = (state = { cliente: {} }, action) => {
    switch (action.type) {
        case NEW_CLIENTE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_CLIENTE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                cliente: action.payload.cliente,
            };

        case NEW_CLIENTE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_CLIENTE_RESET:
            return {
                ...state,
                success: false,
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


// reducer delete and update cliente
export const clienteReducer = (state = { state: {} }, action) => {
    switch (action.type) {
        case DELETE_CLIENTE_REQUEST:
        case UPDATE_CLIENTE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_CLIENTE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDelected: action.payload,
            };

        case UPDATE_CLIENTE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_CLIENTE_FAIL:
        case UPDATE_CLIENTE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_CLIENTE_RESET:
            return {
                ...state,
                isUpdated: false
            };


        case DELETE_CLIENTE_RESET:
            return {
                ...state,
                isDelected: false,
                success: false
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