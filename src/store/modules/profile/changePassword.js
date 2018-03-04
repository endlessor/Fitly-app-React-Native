import firebase from 'firebase'
import {Notification} from 'element-ui'

const state = {
  newPassword: '',
  oldPassword: '',
  //
  showReAuth_2 : false,
  //
  firstTimePassword: '',
  setPass:true
}

const getters = {
  showReAuth_2: state => state.showReAuth_2,
  setPass:state=>state.setPass
}

const mutations = {
  //
  changePassword(state2, payload){
    //
    //console.log(payload) //old, new password
    //
    let credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      payload.oldPassword
    );
    //
    //reauth user
    firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function() {
      //console.log("// User re-authenticated.")
      //
      //change password
      firebase.auth().currentUser.updatePassword(payload.newPassword).then(function() {
        //console.log("//password updated")
        Notification.success("Password Updated !")
        //alert("Password Updated !")
        //
        //clear fields
        state.oldPassword = ''
        state.newPassword = ''
        //
      }).catch(function(error) {
        // An error happened.
        //console.log(error)
        Notification.error(error.message)
      });
      //
    }).catch(function(error) {
      // An error happened.
      //console.log(error)
      Notification.error(error.message)
    });
  },
  //
  setPassword(state2, payload){
    //console.log(payload)
    //
    //console.log(firebase.auth().currentUser.providerData)
    //
    let f = false //flag for checking, if password is provider
    for(let i in firebase.auth().currentUser.providerData){
      //console.log("//provider => ", firebase.auth().currentUser.providerData[i].providerId)
      //
      if(firebase.auth().currentUser.providerData[i].providerId == 'password'){
        f = true
        break
      }
    }
    //
    if(f){
      Notification.warning('This Account have already a password, You can change the password by entering old & new password below !')
   //   alert('This Account have already a password, You can change the password by entering old & new password below !')
    }else{
      //
      //set password
      firebase.auth().currentUser.updatePassword(payload.password).then(function() {
        //console.log("//password set")
       Notification.success("Password Set")
        //
        //clear fields
        state.firstTimePassword = ''
        //
      }).catch(function(error) {
        // An error happened.
        //
        //console.log(error)
        //
        if(error.code == 'auth/requires-recent-login'){
          state.showReAuth_2 = true
        }
      });
    }
  }
}

const actions = {

}

export default {
  state,
  getters ,
  mutations,
  actions
}
