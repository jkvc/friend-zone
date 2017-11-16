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
        this.events = props.events;
        this.calendardays = [];
    }


    initialize(events)
    {
        var i =0, j = 0;

        // Initialize 7 empty lists
        var dayArray = [ [], [], [], [], [], [], [] ];

        // For each event
        for (i = 0; i < events.length; i++)
        {
            var s_days = events[i].days;

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

        for (i = 0; i < this.weekdays.length; i++)
        {
            this.calendardays.push( <CalendarDay day={this.weekdays[i]} events={dayArray[i]}/> );
        }

    }

    render()
    {
        this.initialize(this.events);
        return <div>
            <div> {this.calendardays[0]} </div>
            <div> {this.calendardays[1]} </div>
            <div> {this.calendardays[2]} </div>
            <div> {this.calendardays[3]} </div>
            <div> {this.calendardays[4]} </div>
            <div> {this.calendardays[5]} </div>
            <div> {this.calendardays[6]} </div>
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
    }

    initialize(events)
    {
        var i = 0;
        for (i = 0; i < events.length; i++)
        {
            this.calendarEvents.push( <CalendarEvent event={events[i]}/> );
            console.log(events[i].title);
        }
    }

    render()
    {
        this.initialize(this.events);

        return <div>
            <div> {this.day}: {this.calendarEvents.map((Item,i) =>
                <div key={i}> {Item} </div>
            ) } </div>
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

    render()
    {
        return <div> {this.event.hours[0]} to {this.event.hours[1]} in {this.event.title + "\t"} </div>

    }
}

export default CalendarHelper;