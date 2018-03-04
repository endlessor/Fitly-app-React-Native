import firebase from 'firebase'
import gen from '../gen'
import auth from '../auth'
import {Notification} from 'element-ui'

const state = {
  uEmail : '', // u=> user
  uDob: '',
  uName: '',
  //
  uPhone: '',
  uRefcode:'',
  //
  uDetLoader : false,
  //
  reAuthPassword: '',
  //
  showReAuth: false
}

const getters = {
  uDetLoader: state => state.uDetLoader,
  //
  uEmail : state => state.uEmail,
  uDob: state => state.uDob,
  uName: state => state.uName,
  uPhone: state => state.uPhone
}

const mutations = {
  //
  linkAcc(state2, payload){
    //
    //console.log(payload)
    //
    firebase.auth().currentUser.linkWithPopup(payload.provider).then(function(result) {
      ////console.log("// Accounts successfully linked.")
      var credential = result.credential;
      var user = result.user;
      //
      Notification.success("Accounts successfully linked.")
     // alert("Accounts successfully linked.")
      // ...
    }).catch(function(error) {
      //console.log(error)
      //
      Notification.error("Error: " + error.message)
     // alert("Error: " + error.message)
      // ...
    });
  },
  //
  getUserDet(state2){
    //
    state.uDetLoader = true
    //
    state.uEmail = auth.state.user.email //email
    state.uName = auth.state.user.displayName //name
    //
    gen.state.firestore
      .collection("user").doc(auth.state.user.uid)
      .get().then((queryUserDet)=>{

      if(queryUserDet.exists){
        //
        //console.log(queryUserDet.data()) // .dob
        state.uDob = queryUserDet.data().dob //dob
        state.uPhone = queryUserDet.data().phone //phone
        state.uRefcode=queryUserDet.data().refCode
      }
      //
      //console.log(state.uEmail + " | " + state.uName + " | " +  state.uDob)
      state.uDetLoader = false
      //
      window.thisOfVueComp.$forceUpdate()
    })
  },
  //
  reAuth(state2, payload){
    //
    //console.log(payload)
    //
    let credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      payload.password
    );
    //
    firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function() {
      //
      //console.log("// User re-authenticated.")
      //
      state.showReAuth = false
      //
    }).catch(function(error) {
      // An error happened.
      //console.log(error)
      //
      Notification.error("Error: " + error.message)
    });
  },
  //
  updateUserDet(state2, payload){
    //
    gen.state.btnLoader = true
    //
    //console.log(payload)
    //
    firebase.auth().currentUser.updateEmail(payload.email).then(function() {
      //console.log('//Email Update successful.')
      //display Name update
      firebase.auth().currentUser.updateProfile({
        displayName: payload.name
      }).then(()=>{
        //console.log("//name updated")
        //
        let tmpObj = {}
        //if(payload.phone){
          tmpObj = {
            dob: payload.dob,
            phone: payload.phone,
            refCode:payload.refCode
          }
       // }else{
         // tmpObj = {
          //  dob: payload.dob
         // }
       // }
        //
        gen.state.firestore
          .collection("user").doc(auth.state.user.uid)
          .set(tmpObj, {merge: true}).then(()=>{
          //
          //console.log("//dob updated")
          //
          gen.state.btnLoader = false
          Notification.success("Profile Updated")
        })
        //
      }).catch((error)=>{
        gen.state.btnLoader = false
        Notification.error('Error: Name not updated' + error.message)
       // alert('Error: Name not updated' + error.message)
      })
      //
    }).catch(function(error) {
      // An error happened.
      //console.log(error)
      //
      if(error.code == 'auth/requires-recent-login'){
        state.showReAuth = true //popup to login in first
      }
      gen.state.btnLoader = false
    });
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
