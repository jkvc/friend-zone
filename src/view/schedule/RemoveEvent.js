import {remove_event_from_profile, lookup_profile_by_user_id} from "../../dao/ProfileManager";
import React, {Component} from 'react';
import firebase from 'firebase';


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
            <div>

                <br/>


                <table>
                    <tbody>
                        <tr>
                            <th>Event Name</th>
                            <th></th>
                        </tr>
                        {   //print each class with drop button
                            Object.keys(this.state.events_list).map(function(entry, index){
                                return (
                                    <tr key={"event-search-result"+entry}>

                                        <td> {this.state.events_list[entry].event_name} </td>
                                        <td>
                                            <button onClick={()=> {
                                                this.setState({event_name_to_remove: entry}, ()=>{
                                                    this.handle_remove_event();
                                                })

                                            }} >Drop this Event</button>
                                        </td>

                                    </tr>
                                )
                            }.bind(this))}
                    </tbody>
                </table>

                <br/>
                Raw JSON:
                <pre>{JSON.stringify(this.state.events_list,null,2)}</pre>

            </div>
        )
    }

}

export default  RemoveEvent;