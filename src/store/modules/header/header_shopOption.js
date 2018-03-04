import gen from '../gen'

const state = {
  shopOptions : {},
  shopOptionLoader : false
}

const getters = {
  shopOptions: state => state.shopOptions,
  shopOptionLoader: state => state.shopOptionLoader
}

const mutations = {
  //
  getShopOptions(state2){
    //
    state.shopOptionLoader = true
    //
    ////console.log("firestore [shopOptions] => ", gen.state.firestore)

    gen.state.firestore
      .collection("shopOption")
      .get().then((queryShopOptions)=>{
      ////console.log("shopOption => ",queryShopOptions)
      //
      if(queryShopOptions.size == 0){
        //turn loader false if required
        state.shopOptionLoader = false
      }
      //

      let cShopOption = 0
      queryShopOptions.forEach((queryShopOptionDoc)=>{

        if(queryShopOptionDoc.exists){
          cShopOption++
          //
          ////console.log("shopOption Id =>", queryShopOptionDoc.id) // we need only id here i.e => makeup, men etc
          ////console.log("shopOption Data =>",queryShopOptionDoc.data())
          //
          //
          state.shopOptions[queryShopOptionDoc.id] = {}
          //
          //getCategories of shopOptions
          mutations.getCategories(state, {
            shopOption: queryShopOptionDoc.id,
            //
            cShopOptionSize: queryShopOptions.size,
            cShopOption
          })
        }

      })

    })
  },
  //
  getCategories(state2, payload){
    ////console.log("getCategories =>", payload)
    ////console.log("Get Categories of shop Option => " ,payload.shopOption)
    //
    gen.state.firestore
      .collection("shopOption").doc(payload.shopOption)
      .collection("category")
      .get().then((queryCategories)=>{

      if(queryCategories.size == 0){
        //turn loader off if required
        state.shopOptionLoader = false
      }

      let cCategory = 0
      queryCategories.forEach((queryCategoryDoc)=>{

        if(queryCategoryDoc.exists){
          cCategory ++
          //
          ////console.log("categories id =>", queryCategoryDoc.id) //we need only this i.e => face etc
          ////console.log("categories data =>",queryCategoryDoc.data())
          //
          state.shopOptions[payload.shopOption][queryCategoryDoc.id] = {}
          //
          //get Sub Categories of shop Option
          mutations.getSubCategories(state, {
            shopOption: payload.shopOption,
            category: queryCategoryDoc.id,
            //
            cShopOptionSize: payload.cShopOptionSize,
            cShopOption: payload.cShopOption,
            //
            cCategorySize : queryCategories.size,
            cCategory
          })
        }

      })
    })
  },
  //
  getSubCategories(state2, payload){
    ////console.log("getSubCategories =>", payload)
    ////console.log("Get Sub-Categories of Categories => " + payload.category + " of Shop Option => " +  payload.shopOption)
    //
    gen.state.firestore
      .collection("shopOption").doc(payload.shopOption)
      .collection("category").doc(payload.category)
      .collection("sub")
      .get().then((querySubCategories)=>{

      if(querySubCategories.size == 0){
        //turn loader off if required
        state.shopOptionLoader = false
      }

      let cSubCategory = 0
      querySubCategories.forEach((querySubCategoryDoc)=>{

        if(querySubCategoryDoc.exists){
          cSubCategory ++
          //
          ////console.log("sub-category id =>",querySubCategoryDoc.id) //we need only this i.e => foundation etc
          ////console.log("sub-category data =>",querySubCategoryDoc.data())
          //
          state.shopOptions[payload.shopOption][payload.category][querySubCategoryDoc.id] = {}
          //
          //
          if(payload.cShopOptionSize == payload.cShopOption &&
            payload.cCategorySize == payload.cCategory &&
            querySubCategories.size == cSubCategory
          ){
            //console.log("ShopOptions [Final] ==>", state.shopOptions)
            window.thisOfVueComp_2.$forceUpdate()
            window.thisOfAppNav.$forceUpdate()
            if( Object.keys(window).indexOf('thisOfVueComp_3') != -1 ){
              window.thisOfVueComp_3.$forceUpdate()
            }
            //
            ////console.log("*******SHOP OPTION QUERY COMPLETE !*******")
            //
            state.shopOptionLoader = false
          }
        }
      })

    })
  }
  //
}

const actions = {

}

export default {
  state,
  mutations,
  getters,
  actions
}
