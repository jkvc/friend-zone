import firebase from 'firebase';

export function create_portal(user_id, session_id, chat_title){

    var now_millis = Date.now();

    let portal_obj = {
        session_id: session_id,
        title: chat_title,
        unread: false,
        most_recent: now_millis
    };

    firebase.database().ref('ChatPortal/'+user_id ).child(session_id).set(portal_obj)
}