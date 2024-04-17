import {
    CREATE_NOTES_REQUEST,
    CREATE_NOTES_SUCCESS,
    CREATE_NOTES_FAILURE,
    GET_NOTES_REQUEST,
    GET_NOTES_SUCCESS,
    GET_NOTES_FAILURE,
    GET_NOTES_BYID_REQUEST,
    GET_NOTES_BYID_SUCCESS,
    GET_NOTES_BYID_FAILURE,
    UPDATE_NOTES_BYID_REQUEST,
    UPDATE_NOTES_BYID_SUCCESS,
    UPDATE_NOTES_BYID_FAILURE,
    DELETE_NOTES_BYID_REQUEST,
    DELETE_NOTES_BYID_SUCCESS,
    DELETE_NOTES_BYID_FAILURE,
} from "../actionTypes/notes";
const initialState = {
    loading: false,
    item: "",
    items: [],
    error: "",
};
export function notes(state = initialState, action) {
    switch (action.type) {
        case CREATE_NOTES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case CREATE_NOTES_FAILURE:
            return {
                ...state,
                loading: false,
            };

        case GET_NOTES_REQUEST:
            return {
                ...state,
            };
        case GET_NOTES_SUCCESS:
            return {
                ...state,
                items: action.payload?.response,
            };
        case GET_NOTES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        case GET_NOTES_BYID_REQUEST:
            return {
                ...state,
            };
        case GET_NOTES_BYID_SUCCESS:
            return {
                ...state,
                item: action.payload?.response,
            };
        case GET_NOTES_BYID_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_NOTES_BYID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_NOTES_BYID_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case UPDATE_NOTES_BYID_FAILURE:
            return {
                ...state,
                loading: false,
            };

        case DELETE_NOTES_BYID_REQUEST:
            return {
                ...state,
                items: state.items.map((res) =>
                    res._id === action.payload ? { ...res, loading: true } : res
                ),
                loading: true,
            };
        case DELETE_NOTES_BYID_SUCCESS:
            return {
                ...state,
                items: state.items.filter((res) => res._id !== action.payload),
                loading: false,
            };
        case DELETE_NOTES_BYID_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default:
            return state;
    }
}
