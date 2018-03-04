import firebase from 'firebase'
//
const state = {
  phoneNo : '',
  otp : '',
  //
  getOrResendOtp: 'Get OTP',
}

const getters = {
  phone : state => state.phoneNo,
  otp: state => state.otp,
  //
  getOrResendOtp: state => state.getOrResendOtp
}

const mutations = {
  //update phone no.
  getOtp(state2, payload){
    //
    //console.log(payload)
  },
  //
  updatePhoneNo(state2, payload){
    //
    //console.log(payload)
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
