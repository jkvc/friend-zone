import React, {Component} from 'react';
import {get_weekday_array} from './TimeHelper';
import BasicCalendar from './ReactBigCalendar';

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
        this.startT = null;     // startT indicates the earliest time found in all the events
        this.endT = null;       // endT indicates the latest time found in all the events

        // Initialize all the calendar days
        this.initialize(this.events);

        // this will be set after initialize() is called
        this.parsedEvents = null;
    }


    initialize(events)
    {
        let i =0;

        // Initialize 7 empty lists
        let dayArray = [ [], [], [], [], [], [], [] ];

        let start_time = "0000";
        let end_time = "2359";
        if (events.length > 0)
        {
            start_time = events[0].hours[0];
            end_time = events[0].hours[1];
        }

        // For each event
        for (i = 0; i < events.length; i++)
        {
            if ( parseInt(events[i].hours[0], 10) < start_time )
            {
                start_time = events[i].hours[0];
            }

            if (parseInt(events[i].hours[1], 10) > end_time)
            {
                end_time = events[i].hours[1];
            }

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

        this.startT = start_time;
        this.endT = end_time;

        for (i = 0; i < this.weekdays.length; i++)
        {
            this.calendardays.push( new CalendarDay( { "day":this.weekdays[i],
                                                 "events":dayArray[i],
                                                 "startT":this.startT,
                                                 "endT":this.endT,
                                                 "weekday":i} ) );
        }

    }

    get_all_events()
    {
        let all_events = [];
        for (let c in this.calendardays)
        {
            all_events.push(...this.calendardays[c].get_all_events() );

        }
        all_events.push(...this.other_events);
        return all_events;
    }

    render()
    {
        this.parsedEvents = this.get_all_events();
        if (this.parsedEvents !== null)
            return <div> <BasicCalendar events={this.parsedEvents}/>  </div>;
        else
            return <div> Loading... </div>;
        // Render each CalendarDay component in a table
        // return <div class="CalendarHelper">
        //     {this.calendardays[0]} {/* Sunday*/ }
        //     {this.calendardays[1]} {/* Monday*/ }
        //     {this.calendardays[2]} {/* Tuesday*/ }
        //     {this.calendardays[3]} {/* Wednesday*/ }
        //     {this.calendardays[4]} {/* Thursday*/ }
        //     {this.calendardays[5]} {/* Friday*/ }
        //     {this.calendardays[6]} {/* Saturday*/ }
        // </div>
    }
}

class CalendarDay
{
    constructor(props)
    {
        //super(props);
        this.title = "CalendarDay Class";
        this.day = props.day;
        this.events = props.events;
        this.startT = props.startT;
        this.endT = props.endT;
        this.weekday = props.weekday;

        // calendarEvents is the array of CalendarEvent components that will
        // be created after initialize() is called
        this.calendarEvents = [];

        // this.collisions is the array of collision(s) detected on this calendar day
        // It will be initialized after initialize(this.events) is called in render
        //
        // Each collision is defined as the an array of events, so this.collisions is
        //      an array of arrays.
        //
        // example: [ [A, B],
        //            [A, B, C],
        //            [B, C ] ]
        // ^^^ This happens if there's a time slot when Event A and B have a collision
        //      at some time slot, Event B and C has a collision at some other time slot,
        //      and all Event A, B and C have a collision in a common time slot
        //
        // col:-----------xyyyzz----------
        //  A: -----------||||------------
        //  B: --------|||||||||----------
        //  C: ------------||||||---------
        // [A,B] defined by x, [A,B,C] defined by y, [B,C] defined by z
        //
        // Note that a time slot is defined by a minute in a day, so there's 60*24 unique time slots
        // This means that the collision detection is accurate to the minutes unit
        // But only unique collisions (no duplicate) will be found in this.collisions
        this.collisions = null;

        this.initialize(this.events);
    }

    initialize(events)
    {
        // let time_collision = [];
        //
        // // let each minute be a unique collision slot
        // for (let t = 0; t < 24*60; t++)
        // {
        //     // push an empty array
        //     time_collision.push("");
        // }
        //
        // // for each event, hash each minute of the event time into its slot, separated by comma
        // for (let e = 0; e < events.length; e++)
        // {
        //     let t_start = parseInt(events[e].hours[0].substr(0,2),10)*60 + parseInt(events[e].hours[0].substr(2,4),10) ;
        //     let t_end = parseInt(events[e].hours[1].substr(0,2),10)*60 + parseInt(events[e].hours[0].substr(2,4),10) ;
        //     for (let u = t_start; u < t_end; u++)
        //     {
        //         time_collision[u] += e + ",";
        //     }
        // }
        //
        // // make a unique set of the hash collision slots
        // let unique_group = new Set(time_collision);
        //
        // // to store the collision
        // let collisions = [];
        //
        // // for each group of unique time slot
        // for (let g of unique_group)
        // {
        //     // trim off the last comma
        //     if (g.length > 0) g = g.substr(0, g.length-1);
        //
        //     // If the group has more than 1 event
        //     if (g.length > 1)
        //     {
        //         let groups = g.split(",");
        //
        //         // push each event into a new array in collisions
        //         collisions.push([]);
        //         for (let h = 0; h < groups.length; h++)
        //         {
        //             collisions[collisions.length-1].push( events[parseInt(groups[h], 10)] );
        //         }
        //     }
        // }
        //
        // // print out the collisions found onto the console, comment this out later
        // // for (let c = 0; c < collisions.length; c++)
        // // {
        // //     let print = "Collision detected on " + this.day + ": " ;
        // //     for (let ci = 0; ci < collisions[c].length; ci++) {
        // //         print += collisions[c][ci].title + "\t";
        // //     }
        // //     console.log(print);
        // // }
        //
        // this.collisions = collisions;

        let i = 0;
        for (i = 0; i < events.length; i++)
        {
            this.calendarEvents.push( new CalendarEvent( {"event":events[i], "weekday":this.weekday } ) );
        }
    }

    get_all_events()
    {
        let events = [];
        for (let c in this.calendarEvents)
        {
            let to_add = this.calendarEvents[c].get_all_events();
            events.push(...to_add);
        }
        return events;

    }

    // render()
    // {
    //
    //     /* This will render a list of CalendarEvent components within this calendar day*/
    //     return <div class="CalendarDay">
    //
    //         {this.day} starting {this.startT} to {this.endT}: {this.calendarEvents.map((Item,i) =>
    //             <div class="CalendarEvent" key={i}> {Item} </div >
    //         ) }
    //
    //     </div>
    // }
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
        this.startDate = new Date(2018,0,3);
        this.endDate = new Date(2018,2,16);


        // stores the ratio of time (between 0 and 1) of the event on the calendar
        //
        // Example: startT = 0800 and endT = 1600
        //       event.hours[0] = 1000 and event.hours[1] = 1200
        // then startRatio = (1000-0800)/(1600-0800) = 2/8 = 0.25
        //      endRatio = (1200-0800)/(1600-0800) = 4/8 = 0.5
        //
        // This can be used to determine which area of the CalendarDay row
        //      should be rendered. If the CalendarDay row position is
        //      ( x1 , y1, x2, y2 ), then the event should be rendered in position
        //      ( x1 + (x2-x1) * startRatio, y1, x1 + (x2-x1) * endRatio, y2 )
        // this.startRatio = null;
        // this.endRatio = null;

        // this.initialize();
    }

    // initialize()
    // {
    //     // Note that this can also be processed in the CalendarDay class if the values
    //     //  have to computed before the creation of this component
    //     this.startRatio = get_time_percentage(this.event.hours[0], this.startT, this.endT);
    //     this.endRatio = get_time_percentage(this.event.hours[1], this.startT, this.endT);
    // }

    // render()
    // {
    //
    //     return <div class="Event"> {this.event.hours[0]} to {this.event.hours[1]} in {this.event.title + "\t"} </div>
    //
    // }

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
                    "end": new Date(curr_day.getFullYear(), curr_day.getMonth(), curr_day.getDate(), end_hour, end_min )
                }
            );
            curr_day.setDate(curr_day.getDate() + 7);
        }
        return events;
    }
}

export default ClassScheduleHelper;