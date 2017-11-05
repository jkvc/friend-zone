import md5 from 'md5';

/* class contains an Account object, used to access data in the Account table */
class Account {

    user_id; /*md5(username)*/
    username;
    password; /*hashed*/

    constructor(username, password){
        this.username = username;
        this.user_id = md5(username);
        this.password = md5(password);
    }

    /* return true if a and b have same user_id */
    has_same_user_id(other){
        if (!(other instanceof Account)) return false;
        return this.user_id === other.user_id;
    }

    /* return true if a and b have same password */
    has_same_password(other){
        if (!(other instanceof Account)) return false;
        return this.password === other.password;
    }

    /* return true if equal */
    equals(other){
        if (!(other instanceof Account)) return false;
        return  this.user_id === other.user_id &&
                this.username === other.username &&
                this.password === other.password;
    }

    /* add self to table */
    push(table){
        table.child(this.user_id).set({
            user_id: this.user_id,
            username: this.username,
            password: this.password
        });
    }

}

export default Account;
