import { ALL_INGRESOS_FAIL, ALL_INGRESOS_REQUEST, ALL_INGRESOS_SUCCESS, CLEAR_ERRORS, DELETE_INGRESO_FAIL, DELETE_INGRESO_REQUEST, DELETE_INGRESO_RESET, DELETE_INGRESO_SUCCESS, INGRESO_DETAILS_FAIL, INGRESO_DETAILS_REQUEST, INGRESO_DETAILS_SUCCESS, NEW_INGRESO_FAIL, NEW_INGRESO_REQUEST, NEW_INGRESO_RESET, NEW_INGRESO_SUCCESS, UPDATE_INGRESO_FAIL, UPDATE_INGRESO_REQUEST, UPDATE_INGRESO_RESET, UPDATE_INGRESO_SUCCESS } from "../constants/ingresoConstants";

// reducer all ingresos
export const ingresosReducer = (state = { ingresos: [] }, action) => {
    switch (action.type) {
        case ALL_INGRESOS_REQUEST :
            return {
                loading: true,
                ingresos: [],
            };

        case ALL_INGRESOS_SUCCESS:
            return {
                loading: false,
                ingresos: action.payload.ingresos,
                ingresosTotales: action.payload.ingresosTotales
            };

        case ALL_INGRESOS_FAIL:
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


// reducer one ingreso
export const ingresoDetailsReducer = (state = { ingreso: {} }, action) => {
    switch (action.type) {
        case INGRESO_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case INGRESO_DETAILS_SUCCESS:
            return {
                loading: false,
                ingreso: action.payload.ingreso
            }
        case INGRESO_DETAILS_FAIL:
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


// reducer new ingreso
export const newIngresoReducer = (state = { ingreso: {} }, action) => {
    switch (action.type) {
        case NEW_INGRESO_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_INGRESO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                ingreso: action.payload.ingreso,
            };

        case NEW_INGRESO_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_INGRESO_RESET:
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


// reducer delete and update ingreso
export const deleteIngresoReducer = (state = { state: {} }, action) => {
    switch (action.type) {


        case DELETE_INGRESO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_INGRESO_SUCCESS:
            return {
                ...state,
                loading: false,
                isDelected: action.payload,
            };
        case DELETE_INGRESO_FAIL:
            return {
                ...state,
                error: action.payload,

            };

        case DELETE_INGRESO_RESET:
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


export const updateIngresoReducer = (state = { state: {} }, action) => {

    switch (action.type) {
        case UPDATE_INGRESO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_INGRESO_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_INGRESO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_INGRESO_RESET:
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