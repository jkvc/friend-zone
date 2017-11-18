import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './ChatView.css'
import ChatPortalView from "./ChatPortalView";

class ChatView extends Component{

    constructor(props){
        super(props);
        this.title = "ChatView.js"
    }

    render(){
        return(
            <div className="chat_view_container">
                <div className="portal_container" id="portal-container">

                </div>

                <div className="session_container" id="session-container">

                </div>

            </div>
        )
    }


    componentDidMount(){
        ReactDOM.render(<ChatPortalView id='chat-portal-view'/>, document.getElementById('portal-container'));

    }

}

export default ChatView;