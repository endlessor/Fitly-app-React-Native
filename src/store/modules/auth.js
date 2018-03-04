import firebase from 'firebase'
import editProfile from './profile/editProfile'
import gen from './gen'
import wishlist from './wishlist/wishlist'
import axios from 'axios'
import {Notification} from 'element-ui'

const state = {
  //email-pass
  email : '',
  password: '',
  //
  name: '', //signup
  //
  dob: '', //signup (optional)
  //
  phone: '',
  //
  user: {},
  isLoggedIn : false,
  //
  authLoader: true,
  showForgot:false,
  showAuthPopup:'',
  phoneNumber:'',
  refCode:'',
  showRefCode:false,
  showLoginPopup:false,
  showRegisterPopup:false,
  loginBtnLoader:false,
  resendEmail:false,
  isRefGiven:false,
  showRefField:false
}

const getters = {
  //
  email: state => state.email,
  password: state => state.password,
  //
  user : state => state.user,
  isLoggedIn: state => state.isLoggedIn,
  //
  authLoader : state => state.authLoader,
  showForgot : state => state.showForgot,
  showAuthPopup : state => state.showAuthPopup,
  showRefCode:state=>state.showRefCode,
  showLoginPopup:state=>state.showLoginPopup,
  showRegisterPopup:state=>state.showRegisterPopup,
  loginBtnLoader:state=>state.loginBtnLoader,
  resendEmail:state=>state.resendEmail,
  isRefGiven:state=>state.isRefGiven,
  showRefField:state=>state.showRefField

}

const mutations = {
  afterLogin_userDetail(state2, payload){ //phone and refCode
    //
    if(payload.refCode !== '' || payload.phone !== undefined ){
      gen.state.btnLoader = true
      //
      gen.state.firestore
        .collection("user").doc(state.user.uid)
        .set({
          refCode: payload.refCode, //para 1
          phone: payload.phone //para 2
        }, {merge: true}).then(()=>{
        //
        gen.state.btnLoader = false
        state.showRefCode=false
        state.showLoginPopup=false
        state.showRegisterPopup=false
        Notification.success('Details Saved !')
       // window.thisOfVueComp_2.$forceUpdate()
      })
    }else{
      Notification.error('Nothing To Save')
    }

  },

  //
  //LOGIN STATUS
  getLoginStatus(state2){
    console.log("firebase => ", firebase)
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       // //console.log("// User is signed in.", user.uid)
        //
        state.isLoggedIn = true
        state.user = user

        //
        //if(!state.isRefGiven){
         // state.showRefCode=true
        //}
       // //console.log("user => ", user)
        if(!wishlist.state.wishlistBool){
          wishlist.mutations.getWishlist(state)
        }
        //
        //
      } else {
        //console.log("// No user is signed in.")
        //
        state.isLoggedIn = false
        state.user = {}
        //
      }
      //
      //setTimeout(()=>{
        state.authLoader = false
      //},1000)
    });
  },
  //
  //GOOGLE - LOGIN
  googleP(state2, payload){ // p => provider
    state.showLoginPopup=false
    state.showRegisterPopup=false
    ////console.log(payload)
    //
    let provider = new firebase.auth.GoogleAuthProvider();
    //
    mutations.gotProvider_next(state, {
      provider,
      todo: payload.todo
    })
  },
  //
  //FB - LOGIN
  fbP(state2, payload){
    state.showLoginPopup=false
    state.showRegisterPopup=false
    ////console.log(payload)
    //
    let provider = new firebase.auth.FacebookAuthProvider();
    //
    mutations.gotProvider_next(state, {
      provider,
      todo: payload.todo
    })
  },
  //
  //TWITTER - Login
  twitterP(state2, payload){
    //console.log(payload)
    //
    let provider = new firebase.auth.TwitterAuthProvider();
    //
    mutations.gotProvider_next(state, {
      provider,
      todo: payload.todo
    })
  },
  //
  //gotProvider
  gotProvider_next(state2, payload){
    //
    if(payload.todo == 'login'){
      mutations.pLogin(state, {
        provider : payload.provider
      })
    }else if(payload.todo == 'linkAcc'){
      editProfile.mutations.linkAcc(state, {
        provider: payload.provider
      })
    }
  },
  //
  //
  pLogin(state2, payload){
    ////console.log("[provider] => ", payload)
    //
    let resUser = {}
    firebase.auth().signInWithPopup(payload.provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      //
      console.log(result.user)
      resUser=result.user
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      ////console.log(error)
      //
      //
      if(error.code == 'auth/account-exists-with-different-credential'){ //detailed error
        Notification.error('Error: This email address is already linked with google account, ' +
          'please login with google and link other auth providers to login with them !')
      }else{
       Notification.error(error.message)
      }
    }).then(function () {
        axios.get('https://us-central1-kult-2.cloudfunctions.net/loginTimestamp', {
          params: {
            uid:resUser.uid,
            email:resUser.email
          }
        }).then(function () {
            axios.get('https://us-central1-kult-2.cloudfunctions.net/getLoginCount', {
              params: {
                uid:resUser.uid,
                email:resUser.email
              }
            }).then(function (response) {
              console.log(response.data)
              if(response.data == 1){
                state.showRefField=true
              }else{
                state.showRefField=false
              }
            }).catch(function (err) {
              console.log(err)
            }).then(function () {
              actions.checkIfPhSaved(state, resUser).then(function (res) {
                if(state.isRefGiven == 'f'){
                  state.showLoginPopup=true
                  state.showRefCode=true
                  console.log('=========>>>>>', state.showRefCode)
                }
              })
            })
        })
    })
  },
  //
  //email & password => signup
  emailPasswordSignup(state2, payload){
    gen.state.btnLoader=true
    //console.log(payload)
    //
    firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
      .then(()=>{
        // displayName
        firebase.auth().currentUser.updateProfile({
          displayName: payload.name
        }).then(function() {
          console.log(state.user , '=====1')
          //console.log("// Display Name Updated successful.")
          //
          setTimeout(()=>{
            gen.state.firestore
              .collection("user").doc(state.user.uid)
              .set({
                dob: payload.dob,
             //   phone : payload.phone
              }).then(function () {
              axios.get('https://us-central1-kult-2.cloudfunctions.net/loginTimestamp', {
                params: {
                  uid:state.user.uid,
                  email:state.user.email
                }
              }).then(function () {
                axios.get('https://us-central1-kult-2.cloudfunctions.net/getLoginCount', {
                  params: {
                    uid:state.user.uid,
                    email:state.user.email
                  }
                }).then(function (response) {
                  console.log(response.data)
                  if(response.data == 1){
                    state.showRefField=true
                  }else{
                    state.showRefField=false
                  }
                }).catch(function (err) {
                  console.log(err)
                }).then(()=>{
                  console.log(state.user, '=======2')
                  state.showRefCode=true
                  console.log(window.thisOfAppComp)
                  window.thisOfAppComp.$forceUpdate()
                  // state.showRegisterPopup= false
                  //console.log("dob updated!")
                  gen.state.btnLoader=false
                  // state.showAuthPopup=false
                })
              })
            })
          },100)
          //
          //email verfication link
          mutations.sendVerLink(state)
          //
          window.thisOfVueComp_2.$forceUpdate() //to update display name
          //
        }).catch(function(error) {
          //console.log("// An error happened, update display name")
          //console.log(error)
          //
          gen.state.btnLoader=false
          Notification.error("Error: " + error.message)
        });
        //
      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      gen.state.btnLoader=false
      Notification.error("Error: " + error.message)

    });
  },
  //
  //
  emailPasswordLogin(state2, payload){
    state.loginBtnLoader=true
    let c = 0
    //console.log(payload)
    //
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(()=>{
        //
        //

      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      //
      // ...
      state.loginBtnLoader=false
     // No
      Notification.error("Error: " + error.message)
    }).then(function () {
      setTimeout(function () {
        console.log(state.user)
        if(state.isLoggedIn){
          actions.checkIfPhSaved(state,state.user).then(function (res) {
            if(res==='t'){
              state.showRefField=false
              state.showRefCode=false
              state.loginBtnLoader=false
              state.showLoginPopup=false
            }else{
              state.showRefCode=true
              state.loginBtnLoader=false
            }
          })
        }
      },100)
      /*
        console.log(state.user)

       */
    })
  },
  //
  // LOGOUT
  logout(state2){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      //
      location.reload()
      //
    }).catch(function(error) {
      // An error happened.
    });
  },
  //
  sendVerLink(state2){
    //
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email sent.
      Notification.info('A link to verify your account is sent to the registered email address, Please verify you account by clicking on the link !')
     // alert('A link to verify your account is sent to the registered email address, Please verify you account by clicking on the link !')
    }).catch(function(error) {
      // An error happened.
      //console.log(error)
    });
  },
  //
  forgotPassword(state2, payload){
    //
    //console.log(payload)
    //
    firebase.auth().sendPasswordResetEmail(payload.email).then(function() {
      // Email sent.
      Notification.success('Email to reset password has been sent !')
     // alert('Email to reset password has been sent !')
    }).catch(function(error) {
      // An error happened.
      Notification.error(error.message)
     // alert(error.message)
    });
  }
}

const actions = {
  checkIfPhSaved(state,user){
    return new Promise(function (resolve) {
     // console.log(state.user.uid)
      axios.get('https://us-central1-kult-2.cloudfunctions.net/isPhoneNumberSaved', {
        params: {
          uid:user.uid
        }
      }).then(function (response) {
        console.log(response.data)
        state.isRefGiven = response.data
        resolve('done')
      }).catch(function (err) {
        //console.log(err)
        resolve('done')
      })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

