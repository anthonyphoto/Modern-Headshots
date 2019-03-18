import scheduleReducer from '../../reducers/schedule';
import {initGrid} from '../schedule/calendar-utils';

import {updateStartWeek, clickEvent, updateTimeZone, resetRedirect, resetEventState, fetchRequest, fetchError, fetchEventsSuccess} from '../../actions/schedule';

describe('scheduleReducer', () => {
    // Set up some dummy data
    const sampleState = {
        events: [],
        pastEvents: [],
        futureEvents: [],
        grid: initGrid(),
        startWeek: 0,
        currEvent: null,
        timeZone: 'America/New_York',
        redirect: null,
        loading: false,
        error: null
    }

    it('Should set the initial state when nothing is passed in', () => {
        const state = scheduleReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual({
            events: [],
            pastEvents: [],
            futureEvents: [],
            grid: initGrid(),
            startWeek: 0,
            currEvent: null,
            timeZone: 'America/New_York',
            redirect: null,
            loading: false,
            error: null
        });
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = scheduleReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('fetchRequest', () => {
        it('Should set loading flag on', () => {
            let state;
            state = scheduleReducer(state, fetchRequest());
            expect(state.loading).toEqual(true);
            expect(state.error).toEqual(null);
        });
    });

    describe('fetchError', () => {
        it('Should set loading flag on', () => {
            let state;
            state = scheduleReducer(state, fetchError({ message: "Test Error"}));
            expect(state.error).toEqual({ message: "Test Error"});
            expect(state.loading).toEqual(false);
        });
    });

    describe('fetchEventsSuccess', () => {
        it('Should update the state upon receiving data', () => {
            let state;
            const events = [{
                "_id": "5c7bfbb298c4d063d6745954",
                "sessionDate": "2019-03-04T14:00:00.000Z",
                "shootType": "Headshots",
                "eventTitle": "Diane's Headshots2",
                "price": 52,
                "status": "Booked",
            }]
            state = scheduleReducer(state, fetchEventsSuccess(events));
            expect(state.events).toEqual(events);
            expect(state.loading).toEqual(false);
            expect(state.error).toEqual(null);
        });
    });

    describe('updateStartWeek', () => {
        it('Should update the starting week', () => {
            let state;
            state = scheduleReducer(state, updateStartWeek(5));
            const {startWeek} = state;
            expect(startWeek).toEqual(5);
        });
    });

    describe('clickEvent', () => {
        it('Should update the redirect link upon click event', () => {
            let state;
            state = scheduleReducer(state, clickEvent([3,5]));
            const {redirect} = state;
            expect(redirect).toEqual('/book');
        });
    });

    describe('updateTimeZone', () => {
        it('Should update the time zone', () => {
            let state;
            state = scheduleReducer(state, updateTimeZone('America/Chicago'));
            const {timeZone} = state;
            expect(timeZone).toEqual('America/Chicago');
        });
    });

    describe('resetRedirect', () => {
        it('Should reset the Redirect link', () => {
            let state;
            state = scheduleReducer(state, resetRedirect('America/Chicago'));
            // const {timeZone} = state;
            expect(state.redirect).toEqual(null);
        });
    });

    describe('resetEventState', () => {
        it('Should reset the Redirect link', () => {
            let state;
            state = scheduleReducer(state, resetEventState('America/Chicago'));
            // const {timeZone} = state;
            expect(state).toEqual({            
                events: [],
                pastEvents: [],
                futureEvents: [],
                grid: initGrid(),
                startWeek: 0,
                currEvent: null,
                timeZone: 'America/New_York',
                redirect: null,
                loading: false,
                error: null});
        });
    });



});