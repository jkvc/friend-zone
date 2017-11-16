import firebase from 'firebase';

// https://firebase.google.com/docs/auth/web/facebook-login
export function handle_facebook_login(callback) {

    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().useDeviceLanguage();

    firebase.auth().signInWithRedirect(provider);
    // TODO need to seperate these two methods by moving getRedirectResult outside of hadnle_facebook_login
    firebase.auth().getRedirectResult().then(function(result) {

        // This gives you a Facebook access token. you can use it to access the facebook api.
        //var token = result.credential.accessToken; // result.credential is null

        // the signed-in user info.
        var user = result.user;
        callback(null, user);

    }.bind(this)).catch(function(error) {
        callback(error);
    });
}