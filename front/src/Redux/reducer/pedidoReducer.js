import { ALL_PEDIDOS_CLIENTE_FAIL, ALL_PEDIDOS_CLIENTE_REQUEST, ALL_PEDIDOS_CLIENTE_SUCCESS, ALL_PEDIDOS_FAIL, ALL_PEDIDOS_REQUEST, ALL_PEDIDOS_SUCCESS, CLEAR_ERRORS, DELETE_PEDIDO_FAIL, DELETE_PEDIDO_REQUEST, DELETE_PEDIDO_RESET, DELETE_PEDIDO_SUCCESS, NEW_PEDIDO_FAIL, NEW_PEDIDO_REQUEST, NEW_PEDIDO_RESET, NEW_PEDIDO_SUCCESS, PEDIDO_DETAILS_FAIL, PEDIDO_DETAILS_REQUEST, PEDIDO_DETAILS_SUCCESS, UPDATE_PEDIDO_FAIL, UPDATE_PEDIDO_REQUEST, UPDATE_PEDIDO_RESET, UPDATE_PEDIDO_SUCCESS } from "../constants/pedidoConstants";

// reducer all pedidos and all pedidos for cliente
export const pedidosReducer = (state = { pedidos: [] }, action) => {
    switch (action.type) {
        case ALL_PEDIDOS_REQUEST :
        case ALL_PEDIDOS_CLIENTE_REQUEST:
            return {
                loading: true,
                pedidos: [],
            };

        case ALL_PEDIDOS_SUCCESS:
        case ALL_PEDIDOS_CLIENTE_SUCCESS:
            return {
                loading: false,
                pedidos: action.payload.pedidos
            };

        case ALL_PEDIDOS_FAIL:
        case ALL_PEDIDOS_CLIENTE_FAIL:
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


// reducer one pedido
export const pedidoDetailsReducer = (state = { pedido: {} }, action) => {
    switch (action.type) {
        case PEDIDO_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PEDIDO_DETAILS_SUCCESS:
            return {
                loading: false,
                pedido: action.payload
            }
        case PEDIDO_DETAILS_FAIL:
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


// reducer new pedido
export const newpedidoReducer = (state = { pedido: {} }, action) => {
    switch (action.type) {
        case NEW_PEDIDO_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_PEDIDO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                pedido: action.payload.pedido,
            };

        case NEW_PEDIDO_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_PEDIDO_RESET:
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


// reducer delete and update pedido
export const pedidoReducer = (state = { state: {} }, action) => {
    switch (action.type) {
        case DELETE_PEDIDO_REQUEST:
        
            return {
                ...state,
                loading: true,
            };

        case DELETE_PEDIDO_SUCCESS:
            return {
                ...state,
                loading: false,
                isDelected: action.payload,
            };



        case DELETE_PEDIDO_FAIL:

            return {
                ...state,
                error: action.payload,
            };



        case DELETE_PEDIDO_RESET:
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

export const updatePedidoReducer = (state = { pedido: {} }, action) => {

    switch (action.type) {
        case UPDATE_PEDIDO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PEDIDO_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_PEDIDO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_PEDIDO_RESET:
            return {
                ...state,
                isUpdated: false,
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

const initialState = {
    filter: '',
    // otros estados...
};

export const setPedidoFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PEDIDO_FILTER':
            return {
                ...state,
                filter: action.payload,
            };
        default:
            return state;
    }
};