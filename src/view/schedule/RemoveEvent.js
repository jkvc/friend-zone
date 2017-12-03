import {remove_event_from_profile, lookup_profile_by_user_id} from "../../dao/ProfileManager";
import React, {Component} from 'react';
import firebase from 'firebase';
import PageTitle from "../components/PageTitle";
import "./RemoveEvent.css";
class RemoveEvent extends Component{

    constructor(props){
        super(props);
        this.title = "RemoveEvent.js";
        this.state = {
            //result: [],
            event_name_to_remove: "",
            events_list: []
        };
        //get full schedule of user
        lookup_profile_by_user_id(firebase.auth().currentUser.uid, function (err, profile) {

            // Create a copy of the upcoming events
            let list = {};
            for (let id in profile.upcoming_events)
            {
                list[id] = profile.upcoming_events[id];
            }
            this.setState({events_list: list})
        }.bind(this))

    }

    handle_remove_event(){
        remove_event_from_profile(firebase.auth().currentUser.uid, this.state.event_name_to_remove);
        /*remove the item once clicked drop*/
        var new_event_list = this.state.events_list;
        window.alert("The event \"" + this.state.events_list[this.state.event_name_to_remove].event_name+ "\" was successfully removed to your schedule!")
        delete new_event_list[this.state.event_name_to_remove];
        this.setState({
            courses_list: new_event_list,
            course_id_to_drop: ""
        })
    }
    render(){
        // This basically uses a table to represent the list
        // The first row contains the table header
        // and the second row onwards contain the event name and a button
        return(
            <div align="center">

                <PageTitle title="Remove Event"/>

                <table className="table1">
                    <tbody className="table1">
                        <tr>
                            <th className= "th1">Event Name</th>
                            <th className= "th1">Start Time</th>
                            <th className= "th1">End Time </th>
                            <th className= "th1">Event Date </th>
                            <th className= "th1"> Action </th>
                            <th></th>
                        </tr>
                        {   //print each class with drop button
                            Object.keys(this.state.events_list).map(function(entry, index){
                                return (
                                    <tr key={"event-search-result"+entry}>

                                        <td className= "td1"> {this.state.events_list[entry].event_name} </td>
                                        <td className= "td1"> {this.state.events_list[entry].start_time} </td>
                                        <td className= "td1">{this.state.events_list[entry].end_time} </td>
                                        <td className= "td1"> {this.state.events_list[entry].day} </td>
                                        <td className= "td1">
                                            <button className="removerButton" onClick={()=> {
                                                this.setState({event_name_to_remove: entry}, ()=>{
                                                    this.handle_remove_event();
                                                })

                                            }} >Remove this Event</button>
                                        </td>

                                    </tr>
                                )
                            }.bind(this))}
                    </tbody>
                </table>

                <br/>

            </div>
        )
    }

}

export default  RemoveEvent;