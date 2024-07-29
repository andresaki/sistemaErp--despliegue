import { ALL_MOVIMIENTO_STOCK_FAIL, ALL_MOVIMIENTO_STOCK_REQUEST, ALL_MOVIMIENTO_STOCK_SUCCESS, CLEAR_ERRORS, NEW_MOVIMIENTO_STOCK_FAIL, NEW_MOVIMIENTO_STOCK_REQUEST, NEW_MOVIMIENTO_STOCK_RESET, NEW_MOVIMIENTO_STOCK_SUCCESS } from "../constants/stockConstants";


export const movimientosStockReducer = (state = { movimientos: [] }, action) => {
    switch (action.type) {
        case ALL_MOVIMIENTO_STOCK_REQUEST:
            return {
                loading: true,
                movimientos: [],
            };

        case ALL_MOVIMIENTO_STOCK_SUCCESS:
            return {
                loading: false,
                movimientos: action.payload.movimientos,
            };

        case ALL_MOVIMIENTO_STOCK_FAIL:
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


export const newMovimientoStockReducer = (state = { movimiento: {} }, action) => {
    switch (action.type) {
        case NEW_MOVIMIENTO_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_MOVIMIENTO_STOCK_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                movimiento: action.payload.product,
            };

        case NEW_MOVIMIENTO_STOCK_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_MOVIMIENTO_STOCK_RESET:
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