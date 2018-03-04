import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
//
import router from '../../router'
//
import header_shopOption from './header/header_shopOption'
import header_brand from './header/header_brand'
//
import { Notification } from 'element-ui';
import auth from './auth'


const state = {
  searchList:{},
  storage: {},
  firestore: {},
  //
  dbRefLoader: true,
  //
  thisOfVueComp : {},
  //
  btnLoader: false,
  //
  newsLetterEmail:'',
  showNewsletterInput:true,
  searchInput:'',

  //
  pObj: {},
  isEmailVerified:false,
  alertMsg:'',
  //
  screenW : ''

}

const getters = {
  dbRefLoader: state => state.dbRefLoader,
  btnLoader: state => state.btnLoader,
  showNewsletterInput:state=>state.showNewsletterInput,
  searchList:state=>state.searchList,
  isEmailVerified:state=>state.isEmailVerified,
  alertMag:state=>state.alertMsg,
  //
  screenW  : state => state.screenW
}

const mutations = {
  newsletter_saveEmail(){
    actions.validateEmail(state,state.newsLetterEmail).then(function (valid) {
     if(valid){
       state.showNewsletterInput=false
       axios.get('https://us-central1-kult-2.cloudfunctions.net/newsletter_saveEmail', {
         params: {
           email:state.newsLetterEmail,
         }
       }).then(function (response) {
         Notification.info('You Subscribed to Newsletter')
         //state.alertMsg= "You Subscribed to Newsletter"
         //mutations.open()
         state.showNewsletterInput=true
       }).catch(function (error) {
        // alert(error.data)
         state.showNewsletterInput=true
       })
     }else{
       Notification.error("Not valid cresentials")
     }
    })
  },
  //go to => route function
  goTo(state,path){
    router.push(path)
  },
  //
  //define refernces of the database
  defineDbDef(state2){
    //
    ////console.log("firebase", firebase)
    //
    state.storage = firebase.storage() //got storage ref
    ////console.log("storgae => ", state.storage)
    //
    firebase.firestore().enablePersistence()
      .then(function() {
        ////console.log('// Initialize Cloud Firestore through firebase')
        //
        state.firestore = firebase.firestore(); //got firestore ref
        ////console.log("firestore =>", state.firestore)
        //
        mutations.getHeaderContent(state)
        //
        state.dbRefLoader = false
      })
      .catch(function(err) {
        if (err.code == 'failed-precondition') {
          ////console.log('// Multiple tabs open, persistence can only be enabled // in one tab at a a time.')
          //
          state.firestore = firebase.firestore();  //got firestore ref
          ////console.log("firestore =>", state.firestore)
          //
          mutations.getHeaderContent(state)
          // ...
          state.dbRefLoader = false
          //
        } else if (err.code == 'unimplemented') {
          ////console.log(' // The current browser does not support all of the // features required to enable persistence')
          state.firestore = firebase.firestore();  //got firestore ref
          ////console.log("firestore =>", state.firestore)
          // ...
          //
          mutations.getHeaderContent(state)
          //
          state.dbRefLoader = false
          //
        }
      });
  },
  //
  // get header contents (dropdown values)
  getHeaderContent(state2){
    //
    header_shopOption.mutations.getShopOptions(state) // get shop dropdown content
    header_brand.mutations.getBrandCat(state) // brand dropdown content
      //}
    },
    //
 // },
  //
  profile_checkIfLoggedIn(state2){
    //
    if(!auth.state.isLoggedIn){ //if not logged in
      //
      router.push({
        path: '/'
      })
    }
  },
  getEmailVerStatus(){
    if(auth.state.isLoggedIn) {

      if(auth.state.user.emailVerified)
        state.isEmailVerified = true
      else
        state.isEmailVerified = false
    }else{
      state.isEmailVerified=false
    }
  },
  //get details of selected search
  getSearchDet(state,payload){
    //console.log(payload.key)
    axios.get('https://us-central1-kult-2.cloudfunctions.net/getParticularProductDetailByPid', {
      params: {
        pid:payload.key,
      }
    }).then(function (response) {
      //console.log(response.data)
      router.push({path:`/particularProduct/${payload.key}`,query:{prodDet:JSON.stringify(response.data)}})
    }).catch(function (error) {
      //console.log(error)
    })
  },
 /* search(){

    axios.get('https://us-central1-kult-2.cloudfunctions.net/searchProduct', {
      params: {
        qStr:state.searchInput
      }
    }).then(function (response) {
      //console.log(response.data)
      state.searchList={}
      state.searchList = response.data
      //console.log(Object.keys(response.data).length)
    }).catch(function (error) {
      //console.log(error)
    })
  },*/
  //
  uploadImg(state2, payload){
    //
    let pUrl = URL.createObjectURL(payload.event.target.files[0])
    let pKey = pUrl.slice(pUrl.lastIndexOf('/') + 1)
    //
    let pBlob = payload.event.target.files[0]
    //
    state.pObj = {}
    //
    //if(!payload.mulImg){ // if not multiple image clear obj
      //state.pObj = {}
    //}
    //
    state.pObj = {
      pBlob,
      pUrl
    }
    //
    //console.log(state.pObj)
    //
    //window.tag.$forceUpdate() //no need not showing pic
  },
  //

}

const actions = {
  //
  validateEmail({commit}, email) {
    return new Promise(function(resolve){
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      resolve(re.test(email))
    })
  },
  //
  isEmpty(state, payload){
    return new Promise((res)=>{
      let re = /([^\s])/
      if(!re.test(payload)){
        res(true)
        //
       Notification.error('Empty Field')
        state.showSnackBar = true
      }else{
        res(false)
      }
    })
  },
  //
  saveImgInStorage(state2, payload){

    let pKey =   payload.pUrl.slice(payload.pUrl.lastIndexOf('/')+1)

    //console.log("2 => ",state.storage)
    //
    //console.log(payload)
    //console.log(pKey)
    //console.log(payload.pBlob)
    //
    return new Promise((res)=>{
      //
      let uploadTask = state.storage.ref('amazonCashback/' + pKey).put(payload.pBlob)

      //
      uploadTask.on('state_changed', function(snapshot) {

      }, function(error){
        //
        //console.log(error)
        //
      },function() {
        //console.log(uploadTask.snapshot.downloadURL)
        //
        res(uploadTask.snapshot.downloadURL)
      })
    })
  },
  //
  axiosReq(state2, payload){
    //console.log(payload)
    //
    return new Promise((res)=>{
      //
      axios.get('https://us-central1-kult-2.cloudfunctions.net/' + payload.funcName, {
        params: payload.params
      }).then(function (response) {
        //console.log(response);
        //
        res(response.data)
        //
      }).catch(function (error) {
        //console.log(error);
      });
      //
    })
 }
}

export default {
 state,
 getters,
 mutations,
 actions
}

