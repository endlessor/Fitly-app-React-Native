import gen from '../gen'
import auth from '../auth'
import axios from 'axios'

const state = {
  //
  myOrders: {},
  myOrderLoader: false
}

const getters = {
  //
  myOrders : state => state.myOrders,
  myOrderLoader: state => state.myOrderLoader
}

const mutations = {
  //
  getMyOrders(state2) {
    //
    state.myOrderLoader = true
    //
    axios.get('https://us-central1-kult-2.cloudfunctions.net/getCashbackRecord', {
      //
      params: {
        email: auth.state.user.email
      }
      //
    }).then(function (response) {
      //console.log(response);
      //
      state.myOrders = response.data
      state.myOrderLoader = false
      //
    }).catch(function (error) {
      //console.log(error);
    })
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
