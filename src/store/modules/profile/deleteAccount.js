import firebase from 'firebase'
import {Notification} from 'element-ui'
//
//
const state = {
  passwordDelAcc: ''
}

const getters = {

}

const mutations = {
  //
  deleteAccount(state2, payload){
    //
    let credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      payload.password
    );
    //
    //reauth user
    firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function() {
      //console.log("// User re-authenticated.")
      //
      //delete account
      firebase.auth().currentUser.delete().then(function() {
        //console.log("// User deleted.")
      }).catch(function(error) {
        // An error happened.
        Notification.error("Error: " + error.message)
       // alert("Error: " + error.message)
      });
      //
    }).catch(function(error) {
      // An error happened.
      //console.log(error)
      Notification.error("Error: " + error.message)
    });
  },
  //
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
