import React, {Component} from 'react';
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
        this.weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        // The events passed in, in the form of a list of dictionaries
        this.events = props.events;

        // These variables will be initialized only after initialize(this.events) is called.
        this.calendardays = []; // calendarDays is the array of CalendarDay objects. There will be 7 of them
        this.startT = null;     // startT indicates the earliest time found in all the events
        this.endT = null;       // endT indicates the latest time found in all the events
    }


    initialize(events)
    {
        let i =0, j = 0;

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
            if ( parseInt(events[i].hours[0]) < start_time )
            {
                start_time = events[i].hours[0];
            }

            if (parseInt(events[i].hours[1]) > end_time)
            {
                end_time = events[i].hours[1];
            }

            let s_days = events[i].days;

            // For each letter in the days string
            for (j=0; j < s_days.length; j++)
            {
                if (s_days[j] === 'M')
                {
                    dayArray[0].push(events[i]);
                }
                else if (s_days[j] === 'T')
                {
                    j++;
                    if (s_days[j] === 'u')
                    {
                        dayArray[1].push(events[i]);
                    }
                    else if (s_days[j] === 'h')
                    {
                        dayArray[3].push(events[i]);
                    }
                }
                else if (s_days[j] === 'W')
                {
                    dayArray[2].push(events[i]);
                }
                else if (s_days[j] === 'F')
                {
                    dayArray[4].push(events[i]);
                }
                else if (s_days[j] === 'S')
                {
                    j++;
                    if (s_days[j] === 'a')
                    {
                        dayArray[5].push(events[i]);
                    }
                    else if (s_days[j] === 'u')
                    {
                        dayArray[6].push(events[i]);
                    }
                }
            }
        }

        this.startT = start_time;
        this.endT = end_time;

        for (i = 0; i < this.weekdays.length; i++)
        {
            this.calendardays.push( <CalendarDay day={this.weekdays[i]} events={dayArray[i]} startT={this.startT} endT={this.endT}/> );
        }

    }

    render()
    {
        this.initialize(this.events);
        return <div>
            <table>
                <tr> {this.calendardays[0]} </tr> {/* Monday*/ }
                <tr> {this.calendardays[1]} </tr> {/* Tuesday*/ }
                <tr> {this.calendardays[2]} </tr> {/* Wednesday*/ }
                <tr> {this.calendardays[3]} </tr> {/* Thursday*/ }
                <tr> {this.calendardays[4]} </tr> {/* Friday*/ }
                <tr> {this.calendardays[5]} </tr> {/* Saturday*/ }
                <tr> {this.calendardays[6]} </tr> {/* Sunday*/ }
            </table>
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
        this.calendarEvents = [];
        this.startT = props.startT;
        this.endT = props.endT;
    }

    initialize(events)
    {
        let i = 0;
        for (i = 0; i < events.length; i++)
        {
            this.calendarEvents.push( <CalendarEvent event={events[i]}/> );
            console.log(events[i].title);
        }
    }

    render()
    {
        this.initialize(this.events);

        /* This will render a list of CalendarEvent components within this calendar day*/
        return <div>

            {this.day} starting {this.startT} to {this.endT}: {this.calendarEvents.map((Item,i) =>
                <div key={i}> {Item} </div >
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
    }

    initialize()
    {

    }

    render()
    {
        return <div> {this.event.hours[0]} to {this.event.hours[1]} in {this.event.title + "\t"} </div>

    }
}

export default CalendarHelper;