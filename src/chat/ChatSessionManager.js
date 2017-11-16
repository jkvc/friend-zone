import firebase from 'firebase';
import md5 from 'md5';
import {create_portal} from "./PortalManager";

export function create_chat_session(initializer_name, participant_ids, participant_names){

    var participant_id_obj = {};
    for (var i=0; i<participant_ids.length; i+=1)
        participant_id_obj[participant_ids[i]] = true;

    var participant_name_obj = {};
    for (var j=0; j<participant_names.length; j+=1)
        participant_name_obj[participant_names[j]] = true;


    var now_millis = Date.now();
    var session_id = md5(participant_ids.sort().join(''));

    let chat_session = {
        session_id: session_id,
        participant_ids: participant_id_obj,
        participant_names: participant_name_obj,
        message: {}
    };
    chat_session.message[now_millis] = {
        sender: initializer_name,
        msg: "Chat started at " + now_millis
    }

    firebase.database().ref('ChatSession').child(session_id).set(chat_session);

    participant_ids.forEach((user_id)=>{
        create_portal(user_id, session_id, participant_names);
    })
}

