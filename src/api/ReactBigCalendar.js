/*
 * @author: Yiming Cai, Tianhui
 */

import firebase from 'firebase';
import {add_event_to_profile, edit_existing_event} from "../dao/ProfileManager";
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import './ReactBigCalendar.css';
import Dialog from 'react-dialog';
import '../dao/ProfileManager.js';
import '../view/schedule/AddEvent.js';
import '../view/schedule/AddEvent.css';
import '../dao/ProfileManager.js'
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
            isNewEventDialogOpen: false,
            isEditEventDialogOpen: false,

            // for new event dialog box only
            event_id: "",
            event_name: "",
            day: "",
            start_time: "00:00",
            end_time: "23:59",
            location: "",
            event: null
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
            this.setState( {event_name : this.state.event_name, day : this.state.day, start_time : this.state.start_time, end_time : this.state.end_time, location : this.state.location} );
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
        // events.push(
        //     {
        //         "title":this.event.title,
        //         "start": new Date(curr_day.getFullYear(), curr_day.getMonth(), curr_day.getDate(), start_hour, start_min ),
        //         "end": new Date(curr_day.getFullYear(), curr_day.getMonth(), curr_day.getDate(), end_hour, end_min ),
        //         "type": "lecture"
        //     }
        // );

        //Call this.setState over here, to render the dialogue box
        console.log(slotInfo);

        let start_hour = slotInfo.start.getHours().toString();
        if (start_hour.length < 2) start_hour = '0' + start_hour;
        let start_minute = slotInfo.start.getMinutes().toString();
        if (start_minute.length < 2) start_minute = '0' + start_minute;

        let end_hour = slotInfo.end.getHours().toString();
        if (end_hour.length < 2) end_hour = '0' + end_hour;
        let end_minute = slotInfo.end.getMinutes().toString();
        if (end_minute.length < 2) end_minute = '0' + end_minute;

        let month = (slotInfo.start.getMonth()+1).toString();
        if (month.length < 2) month = '0' + month;
        let day = slotInfo.start.getDate().toString();
        if (day.length < 2) day = '0' + day;

        console.log(slotInfo.start.getFullYear().toString() + "-" + slotInfo.start.getMonth().toString() + "-" + slotInfo.start.getDate().toString());

        if (!this.state.isEditEventDialogOpen) {
            this.setState({
                isNewEventDialogOpen: true,
                start_time: start_hour + ":" + start_minute,
                end_time: end_hour + ":" + end_minute,
                day: slotInfo.start.getFullYear().toString() + "-" + month + "-" + day
            });
        }
    }

    //openDialog = () => this.setState({ isEditEventDialogOpen: true })
    handleClose() {
        this.setState({ isNewEventDialogOpen: false });
    }

    handle_btn_add_event(event)
    {
        // do something with the fields entered by the user, and when the button is pressed, create a new event
        //let event = {event_name : "", day : "", start_time : "00:00", end_time : "23:59", location : "" };

        // set the event to something...
        // ..............................


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

            // Reset the fields of the dialogue box
            let temp = this.state.events;
            temp.push({
                day: this.state.day,
                end_time: this.state.end_time,
                event_name: this.state.event_name,
                location:this.state.location,
                start_time: this.state.start_time
            });

            this.setState({ events : temp, isNewEventDialogOpen: false });
        }
        console.log(event);

    }

    // edit, only when user want to edit it will click on an existing event
    handle_onSelectEvent(event)
    {
        if (this.state.isNewEventDialogOpen) return;

        // handle if event type is other
        if (event.type === "other")
        {
            let event_obj = event.event_obj;
            if (!this.state.isNewEventDialogOpen) {
                // Call this.setState over here, to render the dialogue box
                this.setState({
                    isEditEventDialogOpen: true,
                    day: event_obj.day,
                    start_time: event_obj.start_time,
                    end_time: event_obj.end_time,
                    event_name :event_obj.event_name,
                    event_id:event.event_id,
                    location:event_obj.location,
                    event : event
                });
            }
        }
        // hand if event type is lecture
        else if (event.type === 'lecture')
        {
            console.log(event);
        }

        // Event object has these fields:
        // title
        // start
        // end
        // type (can be either "lecture" or "other")
        // event_id (if type === "other")
        // event_obj
        console.log(event);
    }

     handle_btn_edit_event()
     {
         edit_existing_event(
             firebase.auth().currentUser.uid,
             this.state.event_id,
             this.state.event_name,
             this.state.day,
             this.state.start_time,
             this.state.end_time,
             this.state.location
         );
         this.setState({isEditEventDialogOpen:false})
     }

     handle_edit_event_close()
     {
         this.setState({isEditEventDialogOpen:false})
     }


    handle_keyPress(event)
    {
        if (event.key === 'Enter')
        {
            this.handle_btn_add_event(event);
        }
    }

    componentDidMount()
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

                <div id={'react-big-calendar-container'}>
                    <BigCalendar
                        selectable = 'ignoreEvents'
                        events={this.state.events}
                        views={allViews}
                        step={60}
                        // By default this should return current date
                        defaultDate={new Date()}
                        defaultView={'week'}
                        onSelectEvent={ this.handle_onSelectEvent.bind(this) }
                        onSelectSlot={ this.handle_select_slot.bind(this) }
                    />
                </div>

                {this.state.isNewEventDialogOpen &&
                    <div className='dialogue-box'>
                        <Dialog className=''
                            title="Add Event"
                            modal={true}
                            isDraggable={true}
                            buttons={
                                [{
                                    text: "Add this event",
                                    onClick: () => this.handle_btn_add_event()
                                },
                                {
                                    text:"Cancel",
                                    onClick: () => this.handleClose()
                                }]
                        }>

                        <h2> Input Event Details </h2>

                        <br/>
                        <form onKeyPress={this.handle_keyPress.bind(this)}>
                            <label>Event Name:</label>
                            <input className="addEventInputField" type="text" value={this.state.event_name}
                                   onChange={function (e) {
                                       this.setState({event_name: e.target.value});
                                   }.bind(this)}/>

                            <br/>

                            <label>Day:</label>
                            <input className="addEventInputField" type="date" value={this.state.day}
                                   onChange={function (e) {
                                       this.setState({day: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label>Start Time:</label>
                            <input className="addEventInputField" type="time" value={this.state.start_time}
                                   onChange={function (e) {
                                       this.setState({start_time: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label>End Time:</label>
                            <input className="addEventInputField" type="time" value={this.state.end_time}
                                   onChange={function (e) {
                                       this.setState({end_time: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label>Location</label>
                            <input className="addEventInputField" value={this.state.location}
                                   onChange={function (e) {
                                       this.setState({location: e.target.value})
                                   }.bind(this)}/>
                            <br/>
                        </form>

                        </Dialog>
                    </div>
                }

                {this.state.isEditEventDialogOpen &&
                <div className='dialogue-box'>
                    <Dialog className=''
                            title="Edit Event"
                            modal={true}
                            isDraggable={true}
                            buttons={
                                [{
                                    text: "Edit this event",
                                    onClick: () => this.handle_btn_edit_event()
                                },
                                    {
                                        text:"Cancel",
                                        onClick: () => this.handle_edit_event_close()
                                    }]
                            }>

                        <h2> Change Event Details </h2>

                        <br/>
                        <form onKeyPress={this.handle_keyPress.bind(this)}>
                            <label>Event Name:</label>
                            <input className="addEventInputField" type="text" value={this.state.event_name}
                                   onChange={function (e) {
                                       this.setState({event_name: e.target.value});
                                   }.bind(this)}/>

                            <br/>

                            <label>Day:</label>
                            <input className="addEventInputField" type="date" value={this.state.day}
                                   onChange={function (e) {
                                       this.setState({day: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label>Start Time:</label>
                            <input className="addEventInputField" type="time" value={this.state.start_time}
                                   onChange={function (e) {
                                       this.setState({start_time: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label>End Time:</label>
                            <input className="addEventInputField" type="time" value={this.state.end_time}
                                   onChange={function (e) {
                                       this.setState({end_time: e.target.value})
                                   }.bind(this)}/>

                            <br/>

                            <label>Location</label>
                            <input className="addEventInputField" value={this.state.location}
                                   onChange={function (e) {
                                       this.setState({location: e.target.value})
                                   }.bind(this)}/>
                            <br/>
                        </form>

                    </Dialog>
                </div>
                }

                {/*<div>*/}
                    {/*{JSON.stringify(this.state)}*/}
                {/*</div>*/}
            </div>

        )
    }

}
export default Selectable;