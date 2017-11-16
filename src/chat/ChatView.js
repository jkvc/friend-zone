import React, {Component} from 'react';
import firebase from 'firebase';
import {create_chat_session} from "./ChatSessionManager";

class ChatView extends Component{

    constructor(props){
        super(props);

        this.state = {
            portals: {},
            active_chat: null,
            session_obj: null
        }


        create_chat_session("Kevin", ['4F0IzZeylLWCmYu9EnWXdqXdAjh2','AGH08qnNRiebegZRwxvwZb2BI5u1'],
            ["kevin","cabin"])

    }

    componentWillMount(){
        let uid = firebase.auth().currentUser.uid;
        var table = firebase.database().ref('ChatPortal/'+uid )
            .on('child_changed', (snapshot)=>{
                this.setState({portals:snapshot.val()});
        })
    }

    render(){
        return(

            <div>
                <pre>{JSON.stringify(this.state,null,2)}</pre>
            </div>

        )
    }

}


export default ChatView;