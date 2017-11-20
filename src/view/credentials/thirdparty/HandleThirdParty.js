import firebase from 'firebase';

// https://firebase.google.com/docs/auth/web/facebook-login

// return the user on callback for login/signup pages to deal with
export function handle_third_party_auth(authProvider, callback) {

    var provider;
    switch (authProvider) {
        case "facebook":
            provider = new firebase.auth.FacebookAuthProvider();
            break;
        case "google":
            provider = new firebase.auth.GoogleAuthProvider();
            break;
        default:
            var error = 1;
            error.message = "Invalid Auth Provider" + authProvider + "passed in to function";
            callback(error);
    }

    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider).then(() => {

        // TODO need to separate these two methods by moving getRedirectResult outside of handle_facebook_login
        firebase.auth().getRedirectResult().then(function (result) {

            // the signed-in user info.
            var user = result.user;
            callback(null, user);

        });
    });
}