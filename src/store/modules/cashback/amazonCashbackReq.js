import gen from '../gen'
import auth from '../auth'
import axios from 'axios'
import {Notification}  from 'element-ui'


const state = {
  amazonCashbackReq_orderNo: '',
  amazonCashbackReq_orderPrice: '',
  amazonCashbackReq_orderDesc: '',
  //
  amazonCashbackRec : {},
  amazonCashbackRecLoader: false
}

const getters = {
  amazonCashbackRec: state => state.amazonCashbackRec,
  amazonCashbackRecLoader: state => state.amazonCashbackRecLoader
}

const mutations = {
  //
  sendAmazonCashbackReq(state2, payload){
    //
    //console.log(payload)
    //console.log(gen.state.pObj)
    //
    gen.actions.isEmpty(state, payload.orderNo).then((res_1)=>{
      if(!res_1){
        gen.actions.isEmpty(state, payload.orderPrice).then((res_2)=>{
          if(!res_2){
            gen.actions.isEmpty(state, payload.orderDesc).then((res_3)=>{
              if(!res_3){
                //
                //console.log(payload.orderNo)
                //console.log(payload.orderPrice)
                //console.log(payload.orderDesc)
                //
                if( Object.keys(gen.state.pObj).length != 0 ){
                  //
                  gen.state.btnLoader = true
                  //
                  gen.actions.saveImgInStorage(state, {
                    //
                    pBlob: gen.state.pObj.pBlob,
                    pUrl: gen.state.pObj.pUrl
                    //
                  }).then((imgUrl)=>{
                    //
                    //axios
                    //
                    axios.get('https://us-central1-kult-2.cloudfunctions.net/sendAmazonCashbackReq', {
                      //
                      params: {
                        order_no: payload.orderNo,
                        order_price: payload.orderPrice,
                        order_desc: payload.orderDesc,
                        order_img: imgUrl,
                        order_email: auth.state.user.email
                      }
                      //
                    }).then(function (response) {
                      //console.log(response);
                      //
                      //
                      gen.state.btnLoader = false
                      //
                      gen.state.pObj = {}
                      state.amazonCashbackReq_orderNo = ''
                      state.amazonCashbackReq_orderPrice = ''
                      state.amazonCashbackReq_orderDesc = ''
                      //
                      Notification.info('Request Sent')
                     // alert('Request Sent !')
                      //
                      mutations.getAmazonCashbackRec()
                      $('#reqModal').modal('hide')
                      //
                    }).catch(function (error) {
                      //console.log(error);
                    })
                    //
                  })
                  //
                }else{
                  Notification.info('Upload Image')
                }
                //
              }
            })
          }
        })
      }
    })
  },
  //
  getAmazonCashbackRec(state2){
    //
    state.amazonCashbackRecLoader = true
    //
    axios.get('https://us-central1-kult-2.cloudfunctions.net/getAmazonCashbackStatus', {
      //
      params: {
        email: auth.state.user.email
      }
      //
    }).then(function (response) {
      //console.log(response.data);
      //
      if(response.data != 'noRecord'){
        state.amazonCashbackRec = response.data
      }
      //
      state.amazonCashbackRecLoader = false
      //
    }).catch(function (error) {
      //console.log(error);
    })
    //
  }
}

const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
