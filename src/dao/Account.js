import md5 from 'md5';
import firebase from 'firebase';

/* class contains an Account object, used to access data in the Account table */
class Account {

    user_email;
    password; /*hashed*/

    constructor(username, password){
        this.user_email = username;
        this.password = md5(password);
    }


    /* return true if a and b have same password */
    has_same_password(other){
        if (!(other instanceof Account)) return false;
        return this.password === other.password;
    }

    /* return true if equal */
    equals(other){
        if (!(other instanceof Account)) return false;
        return  this.user_email === other.user_email &&
                this.password === other.password;
    }

    /* add self to table */
    push(){
        firebase.database().ref('Account').child(this.user_email).set({
            username: this.user_email,
            password: this.password
        });
    }

}

export default Account;
