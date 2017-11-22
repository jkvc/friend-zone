import firebase from 'firebase';

export function create_portal(self_id, session_id, chat_title, participant_id_obj) {

    var now_millis = Date.now();

    let portal_obj = {
        session_id: session_id,
        title: chat_title,
        unread: false,
        time: now_millis,
        participant_ids: participant_id_obj
    };

    firebase.database().ref('ChatPortal/' + self_id).child(session_id).set(portal_obj)
}

export function get_portal_by_ids(user_id, session_id, callback) {
    firebase.database().ref('ChatPortal/' + user_id + '/' + session_id).once('value').then((snapshot) => {
        if (snapshot.val())
            callback(null, snapshot.val())
        else
            callback({msg: 'portal not found'}, null)
    })
}

export function update_portal_pic(user_id, session_id, image_url) {
    firebase.database().ref('ChatPortal/' + user_id + '/' + session_id).child('portal_pic').set(image_url);
}

export function read_portal(self_id, session_id) {
    firebase.database().ref('ChatPortal/' + self_id + '/' + session_id).child('unread').set(false);
}

export function unread_portal(self_id, session_id) {
    firebase.database().ref('ChatPortal/' + self_id + '/' + session_id).child('unread').set(true);
}

export function update_timestamp(self_id, session_id, timestamp) {
    firebase.database().ref('ChatPortal/' + self_id + '/' + session_id).child('time').set(timestamp);
}

export function sort_portal_by_time(a, b) {
    if (a.time > b.time) return -1;
    if (a.time < b.time) return 1;
    return 0;
}