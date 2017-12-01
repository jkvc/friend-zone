/*
 * @author: Yiming Cai
 */


import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import './ReactBigCalendar.css'
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
        this.events = props.events;
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



    render() {

        return (
            <div {...this.props}>
                <div className='instruction-calendar'>
                    Click an event to see more info, or
                    drag the mouse over the calendar to select a date/time range.
                </div>
                <br/>
                <BigCalendar
                    selectable
                    events={this.events}
                    views={allViews}
                    step={60}
                    // Be default this should return current date
                    defaultDate={new Date()}
                    defaultView={'week'}
                    onSelectEvent={ (data)=>{
                        alert("Selected an event!");
                    }}
                    //  scrollToTime={new Date(1970, 1, 1, 6)}

                   // onSelectEvent={event => add_event()}
                   // onSelectEvent={ add_event()}
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
                    onSelectSlot={(slotInfo) => alert(
                        `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                        `\nend: ${slotInfo.end.toLocaleString()}` +
                        `\naction: ${slotInfo.action}`
                    )}
                </div>
            </div>
        )
    }

}
export default Selectable;