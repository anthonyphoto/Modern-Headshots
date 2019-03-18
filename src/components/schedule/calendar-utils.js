// get a date of Monay based on the week parameter: (current week = 0) and local timezone
export const getWeeklyDates = (week = 0, timeZone) => {
    const tz = {
        timeZone: timeZone
    }
    const currDt = new Date();
    const currDay = parseInt(currDt.toLocaleString('en-US', {...tz, ...{day: "2-digit"}}), 10);
    const weekDay = currDt.toLocaleString('en-US', {...tz, ...{weekday:"short"}});
    const weekDayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const offsetToMon = weekDayIndex.indexOf(weekDay);
    let startDt = new Date(currDt);
    startDt = new Date(startDt.setDate(currDt.getDate() + 7 * week - offsetToMon));
    const startMon = startDt.toLocaleString('en-US', {...tz, ...{month: "2-digit"}});
    const startDay = startDt.toLocaleString('en-US', {...tz, ...{day: "2-digit"}});
    const startYear = startDt.toLocaleString('en-US', {...tz, ...{year: "numeric"}});
    const shortTZ = startDt.toLocaleString('en-US', {...tz, ...{timeZoneName: "short"}}).slice(-3);

    /* get an array of  dates for the week */
    let tmpDt = new Date(startDt);
    let arrDates = [];
    for (let i = 0; i < 7; i++){
        tmpDt = new Date(tmpDt.setDate((startDt.getDate() + i)));
        // console.log(tmpDt);
        arrDates.push(parseInt(tmpDt.toLocaleString('en-US', {...tz, ...{day: "2-digit"}}), 10));
    }

    return {
        startYear,
        startMon,
        startDay,
        shortTZ,
        currDay,
        arrDates
    }

}

// define grid for calendar 7 weekdays * 24 timeslots
export const initGrid = () => {
    const grid = [];
    let tmpArr = [];
    const initEvent = {
        key: null,
        id: null,
        status: "Unavailable"
    }

    for (let i = 0; i < 7; i++){
        for (let j = 0; j < 24; j++) {
            const key = `${i}${j}`;
            initEvent['key'] = key;
            tmpArr.push(Object.assign({}, initEvent));
        }
        grid.push(tmpArr);
        tmpArr = [];
    }
    // console.log("initGrid", grid);
    return grid;
};

const getGridIndex = (dt, timeZone) => {
    const tz = { timeZone }
    const weekdayStr = dt.toLocaleString('en-US', {...tz, ...{weekday:"short"}});
    const weekdayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekday = weekdayIndex.indexOf(weekdayStr);
    const hour = dt.toLocaleString('en-US', {...tz, ...{
            hour: "2-digit", 
            hour12: false
        }});
    return { weekday, hour }

}

export const convertToLocal = (dt, timeZone) => {
    const tz = { timeZone };
    const year = dt.toLocaleString('en-US', {...tz, ...{year: "numeric"}});
    const month = dt.toLocaleString('en-US', {...tz, ...{month: "2-digit"}});
    const day = dt.toLocaleString('en-US', {...tz, ...{day: "2-digit"}});
    const hour = dt.toLocaleString('en-US', {...tz, 
        ...{ hour: "2-digit", hour12: false }});
    const shortTZ = dt.toLocaleString('en-US', {...tz, ...{timeZoneName: "short"}}).slice(-3);
    
    const options = {
        timeZone,
        timeZoneName: "short"

    }
    return dt.toLocaleString('en-US', options);
    // return { year, month, day, hour, shortTZ };
}

/* set updated event result to currEvent */
export const setResultToCurrEvent = (event, timeZone) => {
        const sessionDt = new Date(event.sessionDate);
        return {
            key: event._id,
            id: event._id,
            status: "result",
            eventTitle: event.eventTitle,
            eventPhone: event.eventPhone,
            specialNote: event.specialNote,
            sessionDate: convertToLocal(new Date(event.sessionDate), timeZone),
            shootType: event.shootType,
            updated: convertToLocal(new Date(event.updated), timeZone)
        }
}

export const getGrid = (events, timeZone, startWeek) => {
    let grid = initGrid();
    const {startYear, startMon, startDay, shortTZ} = getWeeklyDates(startWeek, timeZone)
    const startDt = new Date(`${startMon}/${startDay}/${startYear}, 00:00:00 ${shortTZ}`);
    const endDt = new Date(new Date(startDt).setDate(startDt.getDate() + 7));

    /* get events within the selected week */
    const weeklyEvents = events.filter(event => {
        const sessionDt = new Date(event.sessionDate);
        return (sessionDt >= startDt && sessionDt < endDt); 
    });

    weeklyEvents.forEach(event => {
        const sessionDt = new Date(event.sessionDate);
        const { weekday, hour } = getGridIndex(sessionDt, timeZone);
        const gridEvent = {
            key: `${weekday}${hour}`,
            id: event._id,
            status: event.status,
            sessionDate: convertToLocal(new Date(event.sessionDate), timeZone),
            shootType: event.shootType,
            submitter: `${event.submitter.firstName} ${event.submitter.lastName}`,
            userid: event.submitter._id,
            phone: event.submitter.phone,
            eventPhone: event.eventPhone,
            eventTitle: event.eventTitle,
            email: event.submitter.username,
            updated: convertToLocal(new Date(event.updated), timeZone)
        }
        grid[weekday][parseInt(hour, 10)] = gridEvent;
        
        // const {year, month, day, hour: hr, shortTZ} = gridEvent.sessionDate;
        // const newDt = new Date(`${month}/${day}/${year}, ${hr}:00:00 ${shortTZ}`);
    });
    return grid;
}


export const getPastEvents = events => {
    const now = new Date();
    return events.filter(event => 
        (now > new Date(event.sessionDate) && event.status !== "Cancelled"))
                .sort((a, b) => new Date(b.sessionDate) - new Date(a.sessionDate) );

}

export const getFutureEvents = events => {
    const now = new Date();
    return events.filter(event => 
        (now <= new Date(event.sessionDate) && event.status !== "Cancelled"))
                .sort((a, b) => new Date(a.sessionDate) - new Date(b.sessionDate) );


}


