import React, {Component} from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import StartNewChatView from "./StartNewChatView";

class ChatView extends Component{

    constructor(props){
        super(props);

        this.state = {
            portals: {},
            active_chat: null,
            session_obj: null
        }
    }

    /*happens before render*/
    componentWillMount(){
        let uid = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref('ChatPortal/'+uid );

        ref.on('child_changed', (snapshot)=>{
            this.setState({portals:snapshot.val()});
        });
        ref.once('value').then((snapshot)=>{
            this.setState({portals:snapshot.val()})
        });
    }

    goto_start_chat(){
        ReactDOM.render(<StartNewChatView />, document.getElementById('main-layout'));
    }

    render(){
        return(
            <div>

                <button onClick={this.goto_start_chat}> start new chat </button>

                <pre>{JSON.stringify(this.state,null,2)}</pre>
            </div>

        )
    }

}


export default ChatView;