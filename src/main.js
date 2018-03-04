// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import Slick from 'vue-slick'
//store
import {store} from './store'
//firebase
import firebase from 'firebase'
import {config} from './firebase/config'
//vuetify
import Vuetify from 'vuetify'
import Element from 'element-ui'
import axios from 'axios'
//import '../node_modules/vuetify/dist/vuetify.min.css'
//import './assets/cssLib/googleFont.css'
//import '../node_modules/vuetify/src/stylus/main.styl'
//
//import './css/bootstrap.min.css'
//import './css/slick.css'
//import './css/slick-theme.css'
//import './css/style.css'
//
import './js/jquery.min.js'
//import './js/bootstrap.min.js'
//import './js/slick.min.js'
//
//
import {Notification} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created(){
    this.$store.state.auth.firebaseApp = firebase.initializeApp(config)

    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(!iOS){

      var messaging = firebase.messaging()
      messaging.requestPermission().then(function () {
        //console.log('have permission')
        return messaging.getToken()
      }).then(function (token) {
        //console.log(token)
        axios.get('https://us-central1-kult-2.cloudfunctions.net/newsletter_saveDeviceToken', {
          params: {
            token
          }
        }).then(function (response) {
          //console.log(response)
          messaging.onMessage(function(payload) {
            //console.log("Message received. ", payload);
//agr koi not send krta h toh yha //console.log hoga
          })
        })
//axios request to token link
        //link is ->  jo b initial  link tha //function name is -> newsletter_saveDeviceToken
        //link para is -> token

      }).catch(function (e) {
        //console.log(e)
      })

    }
    this.$store.commit('defineDbDef')
  }
})
