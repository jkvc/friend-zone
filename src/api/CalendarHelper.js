import React, {Component} from 'react';
import {get_weekday_array} from './TimeHelper';
import Selectable from './ReactBigCalendar';

/*
 * @author: Yiming Cai
 */

// If you found any errors in this code, make sure to run:
//      npm install react-big-calendar --save
//      npm install moment --save
// at the root directory (friend-zone). Let me (Yiming) know if the problem persists

// This class is intended to serve as a prototype to create and render a calendar object
// This component will require 'events' to be passed in
// The list object should contain a list of 'Event' Object
// A valid 'Event' Object is one that contains the following keys
//  1. hours (pairs of 5letter strings) i.e. ["1030", "1130" ]
//  2. days (A single concatenated string) i.e. "MWF" or "TTh" or "SaSu"
//  3. title (A short string for description of the event) i.e. "CSE110 LE"

// --------------------------------------------------------------------------------------------------------------------
// Example:
// let events = [ {"title":"CSE110_A00", "hours":["1030", "1130"], "days":"SuMTWThFSa" },
//                  {"title":"CSE11_B00", "hours":["1130", "1230"], "days":"MWF" } ];
// ReactDOM.render( <ClassScheduleHelper events={events} />, document.getElementByID(???) );
// --------------------------------------------------------------------------------------------------------------------

// NOTE that all items in 'events' will be treated as weekly events DURING the quarter (Winter 2018)
//
// Also, you may optionally pass in 'other_events', which will be any non-weekly events. This state
//      will be in a different format compared to 'events', as shown in the example below:

// --------------------------------------------------------------------------------------------------------------------
// Example:
// let events = [ ]; // Note that events must be passed in, otherwise it may break the app
// let other_events = [ { 'title': 'Late Night Event',
//                          'start':new Date(2017, 11, 21, 19, 30, 0),
//                          'end': new Date(2017, 11, 21, 22, 0, 0) },
//                      { 'title': 'Another party',
//                           'start': new Date(2017, 11, 21, 20, 0, 0),
//                           'end': new Date(2017, 11, 21, 23, 0, 0) } ];
// ReactDOM.render( <ClassScheduleHelper events={events} other_events={other_events}/>, document.getElementByID(???) );
// --------------------------------------------------------------------------------------------------------------------

// IMPORTANT NOTE: the startDate and endDate values of CalendarEvent has to be changed accordingly with the class
//      schedule of each quarter, as published by UCSD. There is probably no way to bypass this unless
//      we can do a web-crawling to retrieve these data. Also, this calendar do not account for public holidays
//      and final exam schedule on week 11. Feel free to find a way to bypass these limitations if you'ld like.
//
// Please direct any other suggestions/questions to me (Yiming).
class ClassScheduleHelper extends Component
{
    constructor(props)
    {
        super(props);
        this.title = "ClassScheduleHelper Class";
        this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // The events passed in, in the form of a list of dictionaries
        this.events = props.events;

        if ("other_events" in props) {
            this.other_events = props.other_events;
        }
        else
        {
            this.other_events = [];
        }

        // These variables will be initialized only after initialize(this.events) is called.
        this.calendardays = []; // calendarDays is the array of CalendarDay objects. There will be 7 of them

        this.state = {
            parsedEvents : []
        };

        // Initialize all the calendar days
        this.initialize(this.events);

    }


    initialize(events)
    {
        let i =0;

        // Initialize 7 empty lists
        let dayArray = [ [], [], [], [], [], [], [] ];

        // For each event
        for (i = 0; i < events.length; i++)
        {

            // Find the days in which the event should be added
            let s_days = events[i].days;
            let v_days = get_weekday_array(s_days);

            for (let j = 0; j < v_days.length; j++)
            {
                if (v_days[j]) {
                    dayArray[j].push(events[i]);
                }
            }
        }

        for (i = 0; i < this.weekdays.length; i++)
        {
            this.calendardays.push( new CalendarDay( { "day":this.weekdays[i],
                                                 "events":dayArray[i],
                                                 "weekday":i} ) );
        }
    }

    async set_all_events()
    {
        let all_events = [];
        for (let c in this.calendardays)
        {
            all_events.push(...this.calendardays[c].get_all_events() );
            this.setState( {parsedEvents: all_events} );
        }
        all_events.push(...this.other_events);
        this.setState( {parsedEvents: all_events} );
    }

    componentWillMount()
    {
        this.set_all_events();
    }

    render()
    {
        return <div> <Selectable events={this.state.parsedEvents} key={this.state.parsedEvents.length}/>  </div>;
    }
}

class CalendarDay {
    constructor(props) {
        //super(props);
        this.title = "CalendarDay Class";
        this.day = props.day;
        this.events = props.events;
        this.weekday = props.weekday;

        this.calendarEvents = [];

        this.collisions = null;

        this.initialize(this.events);
    }

    initialize(events) {

        let i = 0;
        for (i = 0; i < events.length; i++) {
            this.calendarEvents.push(new CalendarEvent({"event": events[i], "weekday": this.weekday}));
        }
    }

    get_all_events() {
        let events = [];
        for (let c in this.calendarEvents) {
            let to_add = this.calendarEvents[c].get_all_events();
            events.push(...to_add);
        }
        return events;

    }
}

class CalendarEvent
{
    constructor(props)
    {
        //super(props);
        this.title = "CalendarEvent Class";
        // this.key = props.key;
        this.event = props.event;
        this.weekday = props.weekday;

        // Note that the month is 0-indexed while the day is not
        this.startDate = new Date(2018,0,8);
        this.endDate = new Date(2018,2,16);
    }

    get_all_events()
    {
        let events = [];
        let curr_day = new Date(this.startDate.getTime());
        curr_day.setDate( curr_day.getDate() + (this.weekday - curr_day.getDay()) );

        let start_hour = parseInt( this.event.hours[0].substr(0,2), 10 );
        let end_hour = parseInt( this.event.hours[1].substr(0,2), 10 );
        let start_min = parseInt( this.event.hours[0].substr(2,4), 10 );
        let end_min = parseInt( this.event.hours[1].substr(2,4), 10 );

        while (curr_day <= this.endDate)
        {
            // Please note that this assumes that a class starts and ends on the same day
            events.push(
                {
                    "title":this.event.title,
                    "start": new Date(curr_day.getFullYear(), curr_day.getMonth(), curr_day.getDate(), start_hour, start_min ),
                    "end": new Date(curr_day.getFullYear(), curr_day.getMonth(), curr_day.getDate(), end_hour, end_min ),
                    "type": "lecture",
                    "event_obj": this.event.event_obj
                }
            );
            curr_day.setDate(curr_day.getDate() + 7);
        }
        return events;
    }
}

export default ClassScheduleHelper;