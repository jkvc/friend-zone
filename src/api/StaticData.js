import firebase from 'firebase';
import {lookup_profile_by_user_id} from "../dao/ProfileManager";

var self_id = "";
var self_profile = null;
var other_profiles = {};

export function init_data(callback) {
    self_id = firebase.auth().currentUser.uid;

    lookup_profile_by_user_id(self_id, (err, profile) => {
        self_profile = profile;
        init_friend_profiles(() => {
            callback(self_profile);
        });
    });

    /*add listener for self profile change*/
    firebase.database().ref('Profile/' + self_id).on('child_changed', () => {
        lookup_profile_by_user_id(self_id, (err, profile) => {
            self_profile = profile;
            init_friend_profiles();
        });
    });
    firebase.database().ref('Profile/' + self_id).on('child_added', () => {
        lookup_profile_by_user_id(self_id, (err, profile) => {
            self_profile = profile;
            init_friend_profiles();
        });
    });
}

export function init_friend_profiles(callback) {

    /*when theres no self profile, of course you dont have friends*/
    if (!self_profile && !callback) return;
    if (!self_profile) return callback();

    var friend_ids = Object.keys(self_profile.friend_list);
    var profile_loaded = 0;

    /*callback immediately when you dont have friends*/
    if (friend_ids.length === 0) {
        if (callback) callback(self_profile);
        other_profiles = {};
    }

    friend_ids.forEach((friend_id) => {
        lookup_profile_by_user_id(friend_id, (err, friend_profile) => {

            if (err) return;
            other_profiles[friend_id] = friend_profile;

            profile_loaded += 1;
            if (profile_loaded === friend_ids.length && callback) callback();

            /*add listener for friend profile change*/
            firebase.database().ref('Profile/' + friend_id).on('child_changed', () => {
                lookup_profile_by_user_id(friend_id, (err, new_friend_profile) => {
                    other_profiles[friend_id] = new_friend_profile;
                });
            });
            firebase.database().ref('Profile/' + friend_id).on('child_added', () => {
                lookup_profile_by_user_id(friend_id, (err, new_friend_profile) => {
                    other_profiles[friend_id] = new_friend_profile;
                });
            });

        })
    })
}

export function get_friend_profiles() {
    return other_profiles;
}

export function get_self_profile() {
    return self_profile;
}

export function clear_profiles(){
    self_profile = null;
    other_profiles = {};
}