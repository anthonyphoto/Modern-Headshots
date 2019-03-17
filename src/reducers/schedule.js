import * as actions from '../actions/schedule';
import {getStartDt, initGrid, getGrid, setResultToCurrEvent, getPastEvents, getFutureEvents} from '../components/schedule/calendar-utils';


const initialState = {
    events: [],
    pastEvents: [],
    futureEvents: [],
    grid: initGrid(),
    startWeek: 0,
    currEvent: null,
    timeZone: 'America/New_York',
    redirect: null,
    click: false,
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {
    // console.log("from Reducer: " , getStartDt(state.startWeek));
    switch(action.type) {

        case actions.FETCH_REQUEST: 
            return Object.assign({}, state, {
              loading: true,
              error: null  
            });

        case actions.FETCH_ERROR: 
            return Object.assign({}, state, {
              error: action.err,
              loading: false
            });

        case actions.FETCH_EVENTS_SUCCESS: 
            return Object.assign({}, state, {
              events: action.events,
              grid: getGrid(action.events, state.timeZone, state.startWeek),
              loading:  false,
              error: null
            });

        case actions.FETCH_MY_EVENTS_SUCCESS: 
            return Object.assign({}, state, {
              pastEvents: getPastEvents(action.events),
              futureEvents: getFutureEvents(action.events),
              loading:  false,
              error: null
            });

        case actions.FETCH_EVENT_BY_ID_SUCCESS: 
            return Object.assign({}, state, {
              currEvent: action.event,
              loading:  false,
              error: null
            });

        case actions.BOOK_EVENT_SUCCESS: 
            // console.log("from reducer - event", action.event);
            return Object.assign({}, state, {
              currEvent: setResultToCurrEvent(action.event, state.timeZone),
              loading:  false,
              error: null
            });

        case actions.FETCH_CANCEL_SUCCESS: 
            console.log("from reducer - event", action.event);
            console.log("from reducer - state.events", state.futureEvents);
            return Object.assign({}, state, {
              futureEvents: state.futureEvents.filter(event => event._id !== action.event._id),
              loading:  false,
              error: null
            });

        case actions.UPDATE_START_WEEK:
            return Object.assign({}, state, {
              startWeek: action.startWeek,
              grid: getGrid(state.events, state.timeZone, action.startWeek)
            });

        case actions.CLICK_EVENT:
          return Object.assign({}, state, {
              currEvent: action.gridIndex?
                state.grid[action.gridIndex[0]][action.gridIndex[1]]:
                null,
              redirect: "/book"
        });
        
        case actions.HOVER_EVENT:
          // console.log("gridIndex", action.gridIndex[0], action.gridIndex[1]);
          return Object.assign({}, state, {
              currEvent: action.gridIndex?
                state.grid[action.gridIndex[0]][action.gridIndex[1]]:
                null
          });

        case actions.UPDATE_TIME_ZONE:
          return Object.assign({}, state, {
              timeZone: action.timeZone,
              grid: getGrid(state.events, action.timeZone, state.startWeek)
            });
        
        case actions.RESET_REDIRECT:
          return Object.assign({}, state, {
              redirect: null
          });
          case actions.RESET_REDIRECT:
          return Object.assign({}, state, {
              redirect: null
          });

        case actions.RESET_EVENT_STATE:
          // return state; // testing purpose for error handling
          // return initialState;   
          return Object.assign({}, initialState, {
            loading: state.loading,
            error: state.error
          });

        default: 
            return state;
    }
}

// state.grid[action.gridInex[0]][action.gridIndex[1]]:
