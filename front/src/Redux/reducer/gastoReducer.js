import { ALL_GASTOS_FAIL, ALL_GASTOS_REQUEST, ALL_GASTOS_SUCCESS, CLEAR_ERRORS, DELETE_GASTO_FAIL, DELETE_GASTO_REQUEST, DELETE_GASTO_RESET, DELETE_GASTO_SUCCESS, GASTO_DETAILS_FAIL, GASTO_DETAILS_REQUEST, GASTO_DETAILS_SUCCESS, NEW_GASTO_FAIL, NEW_GASTO_REQUEST, NEW_GASTO_RESET, NEW_GASTO_SUCCESS, UPDATE_GASTO_FAIL, UPDATE_GASTO_REQUEST, UPDATE_GASTO_RESET, UPDATE_GASTO_SUCCESS } from "../constants/gastoConstants";



// reducer all gastos
export const gastosReducer = (state = { gastos: [] }, action) => {
    switch (action.type) {
        case ALL_GASTOS_REQUEST :
            return {
                loading: true,
                gastos: [],
            };

        case ALL_GASTOS_SUCCESS:
            return {
                loading: false,
                gastos: action.payload.gastos,
                gastosTotales: action.payload.gastosTotales
            };

        case ALL_GASTOS_FAIL:
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


// reducer one gasto
export const gastoDetailsReducer = (state = { gasto: {} }, action) => {
    switch (action.type) {
        case GASTO_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GASTO_DETAILS_SUCCESS:
            return {
                loading: false,
                gasto: action.payload.gasto
            }
        case GASTO_DETAILS_FAIL:
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


// reducer new gasto
export const newGastoReducer = (state = { gasto: {} }, action) => {
    switch (action.type) {
        case NEW_GASTO_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_GASTO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                gasto: action.payload.gasto,
            };

        case NEW_GASTO_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_GASTO_RESET:
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


// reducer delete and update gasto
export const deleteGastoReducer = (state = { state: {} }, action) => {
    switch (action.type) {
        case DELETE_GASTO_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_GASTO_SUCCESS:
            return {
                ...state,
                loading: false,
                isDelected: action.payload,
            };

        case DELETE_GASTO_FAIL:
            return {
                ...state,
                error: action.payload,
            };


        case DELETE_GASTO_RESET:
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



export const updateGastoReducer = (state = { pedido: {} }, action) => {

    switch (action.type) {
        case UPDATE_GASTO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_GASTO_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_GASTO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_GASTO_RESET:
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