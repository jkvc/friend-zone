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

        /*todo figure out how to use exist()*/
        this.exist = this.table.once("value")
            .then(function(snapshot) {
                this.exist = snapshot.child("14c4b06b824ec593239362517f538b29").exist();
            });
        alert(this.exist);

        account.push(this.table);
        return 0;
    }

    /* return Account object if account exists, otherwise return null */
    lookup_by_id(user_id){

    }

}

export default AccountManager;