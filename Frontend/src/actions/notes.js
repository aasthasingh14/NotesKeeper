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
} from "./../actionTypes/notes";
import { api_url } from "./../config";
import axios from 'axios';

export function createNotes(data, history) {
    return (dispatch) => {
        dispatch({ type: CREATE_NOTES_REQUEST });
        axios
            .post(`${api_url}/api/notes`, data)
            .then(function (res) {
                console.log("res=>", res.data);
                setTimeout(() => {
                    dispatch({
                        type: CREATE_NOTES_SUCCESS,
                        payload: res.data,
                    });
                    history.push("/");
                }, 1000);
            })
            .catch(function (error) {
                const { response } = error;
                console.log("err", response);
                if (response !== undefined) {
                    dispatch({
                        type: CREATE_NOTES_FAILURE,
                        payload: response.data,
                    });
                    alert(response.data?.message);
                }
            });
    };
}

export function getNotes() {
    return (dispatch) => {
        dispatch({ type: GET_NOTES_REQUEST });
        axios
            .get(`${api_url}/api/notes`)
            .then(function (res) {
                console.log("res =>", res.data);
                dispatch({
                    type: GET_NOTES_SUCCESS,
                    payload: res.data,
                });
            })
            .catch(function (error) {
                const { response } = error;
                console.log("err", response);
                if (response !== undefined) {
                    dispatch({
                        type: GET_NOTES_FAILURE,
                        payload: response?.data,
                    });
                }
            });
    };
}

export function getNotesById(id) {
    return (dispatch) => {
        dispatch({ type: GET_NOTES_BYID_REQUEST });
        axios
            .get(`${api_url}/api/notes/${id}`)
            .then(function (res) {
                console.log("res =>", res.data);
                dispatch({
                    type: GET_NOTES_BYID_SUCCESS,
                    payload: res.data,
                });
            })
            .catch(function (error) {
                const { response } = error;
                console.log("err", response);
                if (response !== undefined) {
                    dispatch({
                        type: GET_NOTES_BYID_FAILURE,
                        payload: response.data,
                    });
                }
            });
    };
}

export function updateNotesById(id, data, history) {
    return (dispatch) => {
        dispatch({ type: UPDATE_NOTES_BYID_REQUEST });
        axios
            .put(`${api_url}/api/notes/${id}`, data)
            .then(function (res) {
                console.log("res=>", res.data);
                setTimeout(() => {
                    dispatch({
                        type: UPDATE_NOTES_BYID_SUCCESS,
                        payload: res.data,
                    });
                    history.push("/");
                }, 1000);
            })
            .catch(function (error) {
                const { response } = error;
                console.log("err", response);
                if (response !== undefined) {
                    dispatch({
                        type: UPDATE_NOTES_BYID_FAILURE,
                        payload: response.data,
                    });
                    alert(response.data?.message);
                }
            });
    };
}

export function deleteNotesById(id) {
    return (dispatch) => {
        dispatch({ type: DELETE_NOTES_BYID_REQUEST });
        axios
            .delete(`${api_url}/api/notes/${id}`)
            .then(function (res) {
                console.log("res =>", res.data);
                dispatch({
                    type: DELETE_NOTES_BYID_SUCCESS,
                    payload: id,
                });
            })
            .catch(function (error) {
                const { response } = error;
                console.log("err", response);
                if (response !== undefined) {
                    dispatch({
                        type: DELETE_NOTES_BYID_FAILURE,
                        payload: response.data,
                    });
                    alert(response.data?.message);
                }
            });
    };
}
