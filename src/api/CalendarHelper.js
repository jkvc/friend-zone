import React, {Component} from 'react';
import {get_time_percentage, get_weekday_array} from './TimeHelper';
/*
 * @author: Yiming Cai
 */

// This class is intended to serve as a prototype to create and render a calendar object
// This component will require 'events' to be passed in
// The list object should contain a list of 'Event' Object
// A valid 'Event' Object is one that contains the following keys
//  1. hours (pairs of 5letter strings) i.e. ["10:30", "11:30" ]
//  2. days (A single concatenated string) i.e. "MWF" or "TuTh" or "SaSu"
//  3. title (A short string for description of the event) i.e. "CSE110 LE"
//  4. (optional) description (A short to medium string providing additional information) i.e. "G.Gillspie"
class CalendarHelper extends Component
{
    constructor(props)
    {
        super(props);
        this.title = "CalendarHelper Class";
        this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // The events passed in, in the form of a list of dictionaries
        this.events = props.events;

        // These variables will be initialized only after initialize(this.events) is called.
        this.calendardays = []; // calendarDays is the array of CalendarDay objects. There will be 7 of them
        this.startT = null;     // startT indicates the earliest time found in all the events
        this.endT = null;       // endT indicates the latest time found in all the events
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
            this.calendardays.push( <CalendarDay day={this.weekdays[i]}
                                                 events={dayArray[i]}
                                                 startT={this.startT}
                                                 endT={this.endT}/> );
        }

    }

    render()
    {
        // Initialize all the calendar days
        this.initialize(this.events);

        // Render each CalendarDay component in a table
        return <div class="CalendarHelper">
            {this.calendardays[0]} {/* Sunday*/ }
            {this.calendardays[1]} {/* Monday*/ }
            {this.calendardays[2]} {/* Tuesday*/ }
            {this.calendardays[3]} {/* Wednesday*/ }
            {this.calendardays[4]} {/* Thursday*/ }
            {this.calendardays[5]} {/* Friday*/ }
            {this.calendardays[6]} {/* Saturday*/ }
        </div>
    }
}

class CalendarDay extends Component
{
    constructor(props)
    {
        super(props);
        this.title = "CalendarDay Class";
        this.day = props.day;
        this.events = props.events;
        this.startT = props.startT;
        this.endT = props.endT;

        this.calendarEvents = [];

    }

    initialize(events)
    {
        let time_collision = [];

        for (let t = 0; t < 24*60; t++)
        {
            // push an empty array
            time_collision.push("");
        }

        for (let e = 0; e < events.length; e++)
        {
            let t_start = parseInt(events[e].hours[0].substr(0,2),10)*60 + parseInt(events[e].hours[0].substr(2,4),10) ;
            let t_end = parseInt(events[e].hours[1].substr(0,2),10)*60 + parseInt(events[e].hours[0].substr(2,4),10) ;
            for (let u = t_start; u < t_end; u++)
            {
                time_collision[u] += e + ",";
            }
        }

        let unique_group = new Set(time_collision);
        let collisions = [];
        for (let g of unique_group)
        {
            g = g.substr(0, g.length-1);
            if (g.length > 1)
            {
                let groups = g.split(",");
                collisions.push([])
                for (let h = 0; h < groups.length; h++)
                {
                    collisions[collisions.length-1].push( events[parseInt(groups[h], 10)] );
                }
            }
        }

        for (let c = 0; c < collisions.length; c++)
        {
            let print = "Collision detected on " + this.day + ": " ;
            for (let ci = 0; ci < collisions[c].length; ci++) {
                print += collisions[c][ci].title + "\t";
            }
            console.log(print);
        }

        let i = 0;
        for (i = 0; i < events.length; i++)
        {
            this.calendarEvents.push( <CalendarEvent event={events[i]} startT={this.startT} endT={this.endT}/> );
        }
    }

    render()
    {
        this.initialize(this.events);

        /* This will render a list of CalendarEvent components within this calendar day*/
        return <div class="CalendarDay">

            {this.day} starting {this.startT} to {this.endT}: {this.calendarEvents.map((Item,i) =>
                <div class="CalendarEvent" key={i}> {Item} </div >
            ) }

        </div>
    }
}

class CalendarEvent extends Component
{
    constructor(props)
    {
        super(props);
        this.title = "CalendarEvent Class";
        this.key = props.key;
        this.event = props.event;
        this.startT = props.startT;
        this.endT = props.endT;

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
        this.startRatio = null;
        this.endRatio = null;

    }

    initialize()
    {
        // Note that this can also be processed in the CalendarDay class if the values
        //  have to computed before the creation of this component
        this.startRatio = get_time_percentage(this.event.hours[0], this.startT, this.endT);
        this.endRatio = get_time_percentage(this.event.hours[1], this.startT, this.endT);
    }

    render()
    {
        this.initialize();

        return <div class="Event"> {this.event.hours[0]} to {this.event.hours[1]} in {this.event.title + "\t"} </div>

    }
}

export default CalendarHelper;