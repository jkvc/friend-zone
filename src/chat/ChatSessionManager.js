import firebase from 'firebase';
import md5 from 'md5';
import {create_portal} from "./ChatPortalManager";

/*callback a session_id*/
export function create_chat_session(initializer_name, participant_ids, chat_title, callback){

    var participant_id_obj = {};
    for (var i=0; i<participant_ids.length; i+=1)
        participant_id_obj[participant_ids[i]] = true;

    var now_millis = Date.now();
    var session_id = md5(participant_ids.sort().join(''));

    let chat_session = {
        session_id: session_id,
        title: chat_title,
        participant_ids: participant_id_obj,
        message: {}
    };
    chat_session.message[now_millis] = {
        time: now_millis,
        sender: initializer_name,
        msg: "Chat started at " + now_millis
    };

    firebase.database().ref('ChatSession').child(session_id).set(chat_session)
        .then(callback(session_id));

    participant_ids.forEach((user_id)=>{
        create_portal(user_id, session_id, chat_title);
    })
}

export function add_message(session_id, sender_name, message){
    var now_millis = Date.now();
    var message_obj = {
        time: now_millis,
        sender: sender_name,
        msg: message
    };

    firebase.database().ref('ChatSession/'+session_id+'/message')
        .child(now_millis).set(message_obj);

}
