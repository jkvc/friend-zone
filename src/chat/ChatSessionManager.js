import firebase from 'firebase';
import md5 from 'md5';
import {create_portal, unread_portal, update_timestamp} from "./ChatPortalManager";

export function hash_session_id(participant_ids) {
    return md5(participant_ids.sort().join(''));
}

export function get_chat_pic_by_id(session_id, callback) {

    firebase.database().ref('ChatSession/' + session_id + '/session_pic').once('value').then((snapshot) => {
        if (snapshot.val() === null)
            callback({msg: "session not found"}, null);
        else
            callback(null, snapshot.val());
    })
}

export function get_chat_participant_by_id(session_id, callback) {

    firebase.database().ref('ChatSession/' + session_id + '/participant_ids').once('value').then((snapshot) => {
        if (snapshot.val() === null)
            callback({msg: "session not found"}, null);
        else
            callback(null, snapshot.val());
    })
}


/*callback a session id
* if the same session with the same people already existed, callback the id of existing session
* if not exist, make a new session and callback the new session id*/
export function create_chat_session(initializer_name, participant_ids, chat_title, callback) {

    var participant_id_obj = {};
    for (var i = 0; i < participant_ids.length; i += 1)
        participant_id_obj[participant_ids[i]] = true;

    var now_millis = Date.now();
    var session_id = hash_session_id(participant_ids);

    /*check whether the same session already exist*/
    firebase.database().ref('ChatSession').once('value').then((snapshot) => {

        if (snapshot.hasChild(session_id)) {
            return callback(session_id);
        }

        else {
            let chat_session = {
                session_id: session_id,
                title: chat_title,
                participant_ids: participant_id_obj,
                message: {}
            };
            chat_session.message[now_millis] = {
                time: now_millis,
                sender: initializer_name,
                sender_id: firebase.auth().currentUser.uid,
                msg: "Chat started at " + now_millis
            };

            firebase.database().ref('ChatSession').child(session_id).set(chat_session)
                .then(callback(session_id));

            participant_ids.forEach((user_id) => {
                create_portal(user_id, session_id, chat_title, participant_id_obj);
            })

        }

    })


}

export function add_message(session_id, sender_name, message) {
    var now_millis = Date.now();
    var message_obj = {
        time: now_millis,
        sender: sender_name,
        sender_id: firebase.auth().currentUser.uid,
        msg: message
    };

    firebase.database().ref('ChatSession/' + session_id + '/message')
        .child(now_millis).set(message_obj)

    /*set it to unread for all other participants*/
    firebase.database().ref('ChatSession/' + session_id).once('value').then((snapshot) => {
        var participant_ids = Object.keys(snapshot.val().participant_ids);
        var self_id = firebase.auth().currentUser.uid;

        /*set others portals to unread, update all portals timestamp*/
        participant_ids.forEach((participant_id) => {
            if (participant_id !== self_id) {
                unread_portal(participant_id, session_id);
            }
            update_timestamp(participant_id, session_id, now_millis);
        })
    })
}
