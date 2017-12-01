/*
 * @author: Yiming Cai, Tianhui
 */

import firebase from 'firebase';
import {add_event_to_profile} from "../dao/ProfileManager";
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import './ReactBigCalendar.css';
import Dialog from 'react-dialog';

// import ReactDom from 'react-dom';
// import Popup from 'react-popup';



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
//
// If you want to be able to do something with the Calendar when the user clicks on an event, modify the
//      prop "onSelectEvent={ some_function }, where you pass in a function that tells the program what to do.
//      For more, read the official documentation on the link provided above.
class Selectable extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            events : props.events,
            isNewEventDialogueOpen: false,

            // for new event dialog box only
            event_name: "",
            day: "",
            start_time: "00:00",
            end_time: "23:59",
            location: ""


        };
    }

    handle_add_event(){

        // Check for validity of the event entered
        if (this.state.event_name === "")
        {
            alert("Event Name is not entered!");
        }
        else if (this.state.day === "" )
        {
            alert("Event Day is not entered!");
        }
        else if (this.state.start_time === "")
        {
            alert("Start Time is not specified!");
        }
        else if (this.state.end_time === "")
        {
            alert("End Time is not specified!");
        }
        else if ( this.state.start_time > this.state.end_time )
        {
            alert("Start time must be greater than end time!");
        }
        else {
            add_event_to_profile(firebase.auth().currentUser.uid, this.state.event_name, this.state.day, this.state.start_time, this.state.end_time, this.state.location);
            alert("The event \""+ this.state.event_name + "\" was successfully added to your schedule!");
            this.setState( {event_name : "", day : "", start_time : "00:00", end_time : "23:59", location : ""} );
        }

    }

   // popup_event(){
   //      ReactDom.render(
   //          <Popup />,
   //          document.getElementById('popupContainer')
   //      Popup.create({
   //          title: 'add event',
   //          content: '',
   //          className: 'Popup',
   //          position: {x: 100, y: 200},
   //          /* customize button */
   //          buttons: {
   //             text: 'My button text',
   //              className: 'special-btn', // optional
   //              action: function (popup) {
   //                  // do stuff
   //                  popup.close();
   //              },
   //              left:['cancel'],
   //              right: ['save']
   //          },
   //          noOverlay: true,
   //          closeOnOutsideClick: true
   //      }),
   //    )
   //  }
   //

    handle_select_slot(slotInfo)
    {
        // Call this.setState over here, to render the dialogue box
        this.setState( );
    }

    handle_btn_add_event()
    {
        // do something with the fields entered by the user, and when the button is pressed, create a new event
        let event = {event_name : "", day : "", start_time : "00:00", end_time : "23:59", location : "" };

        // set the event to something...
        // ..............................


        // Check for validity of the event entered
        if (this.state.event_name.trim() === "")
        {
            alert("Event Name is not entered!");
        }
        else
        {
            // TODO: Uncomment following line out
            //add_event_to_profile(firebase.auth().currentUser.uid, this.state.event_name, this.state.day, this.state.start_time, this.state.end_time, this.state.location);
            alert("The event \""+ this.state.event_name + "\" was successfully added to your schedule!");

            // Reset the fields of the dialogue box
            this.setState();
        }
    }

    handle_onSelectEvent(event)
    {
        // Call this.setState over here, to render the dialogue box
        this.setState( );

        // Event object has these fields:
        // title
        // start
        // end
        // type (can be either "lecture" or "other")
        // event_id (if type === "other")
        console.log(event);
    }

    handle_btn_edit_event()
    {

    }

    render() {

        return (
            <div {...this.props}>
                <div className='instruction-calendar'>
                    Click an event to see more info, or
                    drag the mouse over the calendar to select a date/time range.
                </div>
                <br/>
                <BigCalendar
                    selectable = 'ignoreEvents'
                    events={this.events}
                    views={allViews}
                    step={60}
                    // By default this should return current date
                    defaultDate={new Date()}
                    defaultView={'week'}

                    onSelectEvent={ this.handle_onSelectEvent.bind(this) }
                    onSelectSlot={(slotInfo) => alert(
                        `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                        `\nend: ${slotInfo.end.toLocaleString()}` +
                        `\naction: ${slotInfo.action}`
                    )}
                    //  scrollToTime={new Date(1970, 1, 1, 6)}

                   // onSelectEvent={event => add_event()}
                   // onSelectEvent={ add_event()}
                   //    onSelectSlot={ (slotInfo) => {
                   //      console.log(slotInfo);
                        // this.setState({
                        //     isNewEventDialogueOpen: true,
                        //     event_name: "",
                        //     day: "",
                        //     start_time: "00:00",
                        //     end_time: "23:59",
                        //     location: ""
                        // });
                   // } }
                    />
                {/*<div>*/}
                    {/*<button className='add-button'*/}
                            {/*onClick={() => {*/}
                                {/*this.setState({course_id_to_add: entry.course_id}, () => {*/}
                                    {/*this.handle_add_course();*/}
                                {/*});*/}
                            {/*}}>Add this course*/}
                    {/*</button>*/}
                {/*</div>*/}

                <div>

                </div>
            </div>
        )
    }

}
export default Selectable;