import axios from 'axios'
import auth from '../auth'
import gen from '../gen'
import router from '@/router'
const state = {
  wishlistObj:{},
  wishlistBool :false,
  wishlistCnt:0
}
const getters = {
  wishlistObj:state=>state.wishlistObj,
  wishlistCnt:state=>state.wishlistCnt
}
const mutations = {
  addWishlist(state,payload){
    gen.state.btnLoader=true
    if(auth.state.isLoggedIn){
      axios.get('https://us-central1-kult-2.cloudfunctions.net/addWishlist', {
        params: {
          uid:auth.state.user.uid,
          pid:payload.pId
        }
      }).then(function (response) {
        ////console.log(response.data)
        state.wishlistCnt++
      }).catch(function (error) {
      //  //console.log(error)
      })
    }
  },
  removeWishlist(state,payload){
    if(auth.state.isLoggedIn){
      axios.get('https://us-central1-kult-2.cloudfunctions.net/removeWishlist', {
        params: {
          uid:auth.state.user.uid,
          pid:payload.pId
        }
      }).then(function (response) {
       // alert(response.data)
        state.wishlistCnt--
      }).catch(function (error) {
        //console.log(error)
      })
    }
  },
  getWishlist(){
    if(auth.state.isLoggedIn){
     // if(state.wishlistBool === false){
        axios.get('https://us-central1-kult-2.cloudfunctions.net/getWishlist', {
          params: {
            uid:auth.state.user.uid
          }
        }).then(function (response) {
          // //console.log(response.data)
          if(response.data!=='noProductAdded'){
            state.wishlistObj={}
              state.wishlistBool = true
              state.wishlistObj= response.data
              state.wishlistCnt=Object.keys(state.wishlistObj).length

            //   //console.log(state.wishlistObj)
          }else{
            state.wishlistBool = true
            state.wishlistObj={}
          }
        }).catch(function (error) {
          // //console.log(error)
        })
     // }
    }
  },
}
export default {
  mutations,
  state,
  getters
}
