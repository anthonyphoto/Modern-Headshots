import * as actions from '../../actions/schedule';

describe('fetchRequest', () => {
    it('Should return the action, fetchRequest', () => {
        const action = actions.fetchRequest();
        expect(action.type).toEqual(actions.FETCH_REQUEST);
    });
});

describe('fetchError', () => {
    it('Should return the action, fetchError', () => {
        const action = actions.fetchError({ message: "Test Error" });
        expect(action.type).toEqual(actions.FETCH_ERROR);
        expect(action.err).toEqual({ message: "Test Error" });
    });
});

describe('fetchEventsSuccess', () => {
    it('Should return the action, fetchEvetnsSuccess', () => {
        const events = [{
            "_id": "5c7bfbb298c4d063d6745954",
            "sessionDate": "2019-03-04T14:00:00.000Z",
            "shootType": "Headshots",
            "eventTitle": "Diane's Headshots2",
            "price": 52,
            "status": "Booked"
        }];
        const action = actions.fetchEventsSuccess(events);
        expect(action.type).toEqual(actions.FETCH_EVENTS_SUCCESS);
        expect(action.events).toEqual(events);
    });
});

describe('updateStartWeek', () => {
    it('Should return the action, updateStartWeek', () => {
        const action = actions.updateStartWeek(5);
        expect(action.type).toEqual(actions.UPDATE_START_WEEK);
        expect(action.startWeek).toEqual(5);
    });
});

describe('clickEvent', () => {
    it('Should return the action, clickEvent', () => {
        const action = actions.clickEvent([3,3]);
        expect(action.type).toEqual(actions.CLICK_EVENT);
        expect(action.gridIndex).toEqual([3,3]);
    });
});

describe('hoverEvent', () => {
    it('Should return the action, hoverEvent', () => {
        const action = actions.hoverEvent([4,4]);
        expect(action.type).toEqual(actions.HOVER_EVENT);
        expect(action.gridIndex).toEqual([4,4]);
    });
});

describe('resetRedirect', () => {
    it('Should return the action, resetRedirect', () => {
        const action = actions.resetRedirect();
        expect(action.type).toEqual(actions.RESET_REDIRECT);
    });
});

describe('updateTimeZone', () => {
    it('Should return the action, updateTimeZone', () => {
        const action = actions.updateTimeZone('America/Chicago');
        expect(action.type).toEqual(actions.UPDATE_TIME_ZONE);
        expect(action.timeZone).toEqual('America/Chicago');
    });
});

describe('fetchEvents', () => {
    it('Should dispatch fetchEventsSuccess', () => {
        const events = [{
            "_id": "5c7bfbb298c4d063d6745954",
            "sessionDate": "2019-03-04T14:00:00.000Z",
            "shootType": "Headshots",
            "eventTitle": "Diane's Headshots2",
            "price": 52,
            "status": "Booked"
        }];

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return events;
                }
            })
        );

        const dispatch = jest.fn();
        return actions.fetchEvents()(dispatch).then(() => {
            // expect(fetch).toHaveBeenCalledWith('/board');
            expect(dispatch).toHaveBeenCalledWith(actions.fetchEventsSuccess(events));
        });
    });
});