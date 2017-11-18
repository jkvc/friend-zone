import React, {Component} from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import StartNewChatView from "./StartNewChatView";
import ChatSessionView from "./ChatSessionView";
import "./ChatPortalView.css"

class ChatPortalView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            portals: [],
            active_chat: null,
            session_obj: null
        };
    }

    /*happens before render*/
    componentWillMount() {
        let uid = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref('ChatPortal/' + uid);

        ref.on('child_changed', (snapshot) => {
            this.get_portal_list(snapshot)
        });
        ref.once('value').then((snapshot) => {
            this.get_portal_list(snapshot)
        });
    }

    get_portal_list(snapshot) {
        var portals_obj = snapshot.val();
        var portal_keys = Object.keys(portals_obj);
        var portals_list = [];
        for (var i = 0; i < portal_keys.length; i += 1) {
            portals_list.push(portals_obj[portal_keys[i]])
        }
        this.setState({portals: portals_list});
    }

    goto_start_chat() {
        ReactDOM.render(<StartNewChatView/>, document.getElementById('main-layout'));
    }

    goto_chat_session(session_id) {
        ReactDOM.render(<ChatSessionView session_id={session_id}/>, document.getElementById('session-container'));
    }

    render() {


        return (
            <div>

                <div className="chat_portal_inner">

                    <div className="search_box_new_chat_bar">

                        <input type="text" className="portal-search-box"
                               placeholder=" Search chat"/>

                        <button className="portal-new-chat-button"> New chat</button>

                    </div>


                    <div className="below_search_chat_bar">
                        {
                            this.state.portals.map((portal, index) => {
                                return (

                                    <div className="portal_entry"
                                         key={"portal-" + index} onClick={() => {
                                        this.goto_chat_session(portal.session_id)
                                    }}>
                                        ChatTitle: {portal.title}

                                    </div>

                                )
                            })
                        }
                    </div>

                </div>


                {/*<pre>{JSON.stringify(this.state,null,2)}</pre>*/}
            </div>

        )
    }

}


export default ChatPortalView;