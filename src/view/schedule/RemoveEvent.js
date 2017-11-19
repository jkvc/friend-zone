import {remove_event_from_profile, lookup_profile_by_user_id} from "../../dao/ProfileManager";
import React, {Component} from 'react';
import firebase from 'firebase';


class RemoveEvent extends Component{

    constructor(props){
        super(props);
        this.title = "AddEvent.js";
        this.state = {
            //result: [],
            event_name_to_remove: "",
            events_list: []
        };
        //get full schedule of user
        lookup_profile_by_user_id(firebase.auth().currentUser.uid, function (err, profile) {
            this.setState({events_list: Object.getOwnPropertyNames(profile.upcoming_events)})
        }.bind(this))

    }

    handle_remove_event(){
        remove_event_from_profile(firebase.auth().currentUser.uid, this.state.event_name_to_remove);

        /*remove the item once clicked drop*/
        var new_event_list = this.state.events_list;
        new_event_list.splice(new_event_list.indexOf(this.state.event_name_to_remove),1);
        this.setState({
            courses_list: new_event_list,
            course_id_to_drop: ""
        })
    }
    render(){
        return(
            <div>

                <br/>

                <table>
                    <tr>
                        <th>Event Name</th>
                        <th></th>
                    </tr>
                    {   //print each class with drop button
                        this.state.events_list.map(function( entry){
                            return (
                                <tr key={"event-search-result"+entry}>

                                    <td> {entry} </td>
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
                </table>


                <br/>
                Raw JSON:
                <pre>{JSON.stringify(this.state.events_list,null,2)}</pre>

            </div>
        )
    }

}

export default  RemoveEvent;