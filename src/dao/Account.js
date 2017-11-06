import md5 from 'md5';
import firebase from 'firebase';

/* class contains an Account object, used to access data in the Account table */
class Account {

    username;
    password; /*hashed*/

    constructor(username, password){
        this.username = username;
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
        return  this.username === other.username &&
                this.password === other.password;
    }

    /* add self to table */
    push(table){
        firebase.database().ref('Account').child(this.username).set({
            username: this.username,
            password: this.password
        });
    }

}

export default Account;
