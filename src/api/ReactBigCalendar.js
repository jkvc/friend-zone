/*
 * @author: Yiming Cai
 */


import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

// To use this: make sure you have installed react-big-calendar and moment in the work directory
// You can do this by running:
//      npm install react-big-calendar --save
//      npm install moment --save
// at the root directory of the project (inside friend-zone)
//
// In order to react the calendar, simply use a ReactDOM.render( <BasicCalendar />, document.getElementById(... ) );
// The styles of the calendar are found in "friend-zone/node-module/react-big-calendar/lib/css/react-big-calendar.css"
// For more information, go to http://intljusticemission.github.io/react-big-calendar/examples/index.html
//      and scroll down to find the official documentations
// For source code example, go to https://github.com/intljusticemission/react-big-calendar
class BasicCalendar extends Component{

    constructor(props)
    {
        super(props);
        this.events = props.events;
    }

    render(){
        return (
            <BigCalendar
                {...this.props}
                events={this.events}
                views={allViews}
                step={60}
                // Be default this should return current date
                defaultDate={new Date()}
            />
        )
    }
}

export default BasicCalendar;