import Account from "../dao/Account";
import firebase from 'firebase';

class AccountManager {

    table; /* ref to Account table*/

    constructor(){
        this.table = firebase.database().ref('Account');
    }

    /* add account, return: todo: 0 success, 1 username already exists */
    add_account(username, password){
        var account = new Account(username,password);
        account.push(this.table);
        return 0;
    }

    /* return Account object if account exists, otherwise return null */
    lookup_by_id(user_id){

        /*if not exist return false*/
        if (?){
            return null;
        }

        var account = new Account("","");
        account.user_id = user_id;
        // account.password = ?;
        // account.username = ?;
        return account;
    }

    /* return Account object if account exists, otherwise return null */
    lookup_by_username(username){

    }


}

export default AccountManager;