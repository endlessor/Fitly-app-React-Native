import axios from 'axios'
const state = {
  homeGlobalProd:{},
  homeJustArrived:{}
}

const getters = {
  homeGlobalProd:state=>state.homeGlobalProd,
  homeJustArrived:state=>state.homeJustArrived
}

const mutations = {
  getGlobalBestSellersOnHomePage(){
      let arr=["603","2270","1155","1113"]
    actions.getProdFromArr(state,arr).then(function (res) {
            state.homeGlobalProd=res
    })
  },
  getJustArrivedOnHomePage(){
    let arr=["544","910","541","803"]
    actions.getProdFromArr(state,arr).then(function (res) {
      state.homeJustArrived=res
    })
  }
}
const actions = {
  getProdFromArr(state,arr){
  return new Promise(function (resolve) {
    //console.log(arr)
    axios.get('https://us-central1-kult-2.cloudfunctions.net/getProductDetailByPid?pIds='+ JSON.stringify(arr)).then(function (response) {
      //console.log(response.data)
      resolve(response.data)
    }).catch(function (err) {
      //console.log(err)
    })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

