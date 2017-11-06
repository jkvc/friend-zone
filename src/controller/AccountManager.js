import Account from "../dao/Account";
import firebase from 'firebase';
import md5 from 'md5';

class AccountManager {

    table; /* ref to Account table*/

    constructor(){
        this.table = firebase.database().ref('Account');
    }

    /* add account, return: todo: 0 success, 1 username already exists */
    add_account(username, password){

        if (this.lookup_by_username(username) !== null) return 1;

        var account = new Account(username,password);
        account.push(this.table);
        return 0;
    }

    /* todo DANDANDANDADNADNADAN return Account object if account exists, otherwise return null */
    lookup_by_id(user_id){
        return null; /*todo*/
    }

    /* return Account object if account exists, otherwise return null */
    lookup_by_username(username){
        return this.lookup_by_id(md5(username));
    }

}

export default AccountManager;