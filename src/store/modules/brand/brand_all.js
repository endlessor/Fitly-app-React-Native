import gen from '../gen'

const state = {
  allBrands: {},
  brandWithKey:{},
  allBrandLoader : false
}

const getters = {
  allBrands : state => state.allBrands,
  allBrandLoader: state => state.allBrandLoader
}

const mutations = {
  //
  getAllBrands(state2, payload){
    //
    state.allBrandLoader = true
    //
    gen.state.firestore
      .collection("brandCat")
      .doc("A-Z Brands")
      .collection("brand")
      .get().then((queryAllBrand)=>{

      if(queryAllBrand.size == 0){
        //stop loader, noting to load
        //anyway stopping below, no nested query
      }

      //
      queryAllBrand.forEach((queryAllBrandDoc)=>{

        //
        if(queryAllBrandDoc.exists){

          //console.log(queryAllBrandDoc.id) // brand name
          //console.log(queryAllBrandDoc.data()) // not req // empty

          state.allBrands[queryAllBrandDoc.id] = {}
        }

      })

      //
      state.allBrandLoader = false
      //
      console.log("[ALL BRANDS]" ,state.allBrands)
      //
      window.thisOfVueComp.$forceUpdate()
    })
  }
}

const actions = {

}

export default {
  state,
  mutations,
  getters,
  actions
}
