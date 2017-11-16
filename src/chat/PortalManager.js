import firebase from 'firebase';

export function create_portal(user_id, session_id, participant_names){

    var participant_name_obj = {};
    for (var j=0; j<participant_names.length; j+=1)
        participant_name_obj[participant_names[j]] = true;

    var now_millis = Date.now();

    let portal_obj = {
        session_id: session_id,
        participant_names: participant_name_obj,
        unread: false,
        most_recent: now_millis
    };

    firebase.database().ref('ChatPortal/'+user_id ).child(session_id).set(portal_obj)
}