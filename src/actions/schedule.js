import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {loadAuthToken} from '../local-storage';

/* common AJAX request handling */
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const fetchRequest = () => ({
    type: FETCH_REQUEST,
});

/* common AJAX error handling */
export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = err => ({
    type: FETCH_ERROR,
    err
});

/* AJAX HANDLING START */
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const fetchEventsSuccess = events => ({
    type: FETCH_EVENTS_SUCCESS,
    events
});

export const FETCH_MY_EVENTS_SUCCESS = 'FETCH_MY_EVENTS_SUCCESS';
export const fetchMyEventsSuccess = events => ({
    type: FETCH_MY_EVENTS_SUCCESS,
    events
});

export const FETCH_EVENT_BY_ID_SUCCESS = 'FETCH_EVENT_BY_ID_SUCCESS';
export const fetchEventByIdSuccess = event => ({
    type: FETCH_EVENT_BY_ID_SUCCESS,
    event
});

export const BOOK_EVENT_SUCCESS = 'BOOK_EVENT_SUCCESS';
export const bookEventSuccess = event => ({
    type: BOOK_EVENT_SUCCESS,
    event
});

export const FETCH_CANCEL_SUCCESS = 'FETCH_CANCEL_SUCCESS';
export const fetchCancelSuccess = event => ({
    type: FETCH_CANCEL_SUCCESS,
    event
});

/* AJAX HANDLING END */

/* currWeek = 0 default */
export const UPDATE_START_WEEK = 'UPDATE_START_WEEK';
export const updateStartWeek = startWeek => ({
    type: UPDATE_START_WEEK,
    startWeek
});

export const CLICK_EVENT = 'SELECT_EVENT';
export const clickEvent = gridIndex => ({
    type: CLICK_EVENT,
    gridIndex
});

export const HOVER_EVENT = 'HOVER_EVENT';
export const hoverEvent = gridIndex => ({
    type: HOVER_EVENT,
    gridIndex
});

export const UPDATE_TIME_ZONE = 'UPDATE_TIME_ZONE';
export const updateTimeZone = timeZone => ({
    type: UPDATE_TIME_ZONE,
    timeZone

});

export const RESET_REDIRECT = 'RESET_REDIRECT';
export const resetRedirect = () => ({
    type: RESET_REDIRECT
});

export const RESET_EVENT_STATE = 'RESET_EVENT_STATE';
export const resetEventState = () => ({
    type: RESET_EVENT_STATE
});

export const fetchEvents = () => dispatch => {
    dispatch(fetchRequest());

    return fetch(`${API_BASE_URL}/events`)
        .then(res=>normalizeResponseErrors(res))
.then(res=>new Promise( (resolve) => setTimeout(()=> resolve(res), 500)))  //loading test
        .then(res => res.json())
        // .then(events => setTimeout(events, 2000))
        .then(events => dispatch(fetchEventsSuccess(events)))
        .catch(err => dispatch(fetchError(err)));
}

/* userid */
export const fetchMyEvents = (id) => (dispatch, getState) => {
    dispatch(fetchRequest());
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/events/user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            method: 'GET'
        })
        .then(res=>normalizeResponseErrors(res))
        .then(res=>new Promise( (resolve) => setTimeout(()=> resolve(res), 400)))  //loading test
        .then(res => res.json())
        .then(events => dispatch(fetchMyEventsSuccess(events)))
        .catch(err => dispatch(fetchError(err)));
}

/* event id */
export const fetchEventById = (id) => (dispatch, getState) => {
    dispatch(fetchRequest());
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/events/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            method: 'GET'
        })
        .then(res=>normalizeResponseErrors(res))
        .then(res=>new Promise( (resolve) => setTimeout(()=> resolve(res), 1000)))  //loading test
        .then(res => res.json())
        .then(event => dispatch(fetchEventByIdSuccess(event)))
        .catch(err => dispatch(fetchError(err)));
}

export const bookEvent = (eventId, event) => (dispatch, getState) => {
    dispatch(fetchRequest());
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/events/${eventId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        method: 'PUT',
        body: JSON.stringify(event)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(event => dispatch(bookEventSuccess(event)))
    .catch(err => dispatch(fetchError(err)));
}

export const fetchCancelEvent = (eventId) => (dispatch, getState) => {
    dispatch(fetchRequest());
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/events/${eventId}/status`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        method: 'PUT',
        body: JSON.stringify({
            status: "Available"
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(event => dispatch(fetchCancelSuccess(event)))
    .catch(err => dispatch(fetchError(err)));
}