import axios from 'axios'
import router from '../../../router'
//
import gen from '../gen'
import product from '../product/product'

const state = {
  filter : {},
  filterLoader : false,
  //
  //selectedFilters : {},
}

const getters = {
  filter: state => state.filter,
  filterLoader : state => state.filterLoader,
  //
  //selectedFilters:state => state.selectedFilters,
}

const mutations ={
  //
  getFilters(state2, payload){
    state.filter = {}
    let temp = []
    ////console.log(payload)
    //
    state.filterLoader = true
    //
    gen.state.firestore
    //.collection("shopOption").doc(payload.shopOption)
    //.collection("category").doc(payload.category)
      .doc(payload.routePath)
      .collection("filter")
      .get().then((queryfilter)=>{

      if(queryfilter.size == 0){
        state.filterLoader = false
      }

      let cQueryfilter = 0
      queryfilter.forEach((queryfilterDoc)=>{

        if(queryfilterDoc.exists){
          //
          //
          ////console.log(queryfilterDoc.id) // we need this => age, brand etc
          ////console.log(queryfilterDoc.data())
          //
          state.filter[queryfilterDoc.id] = {
            //
          }
          //
          gen.state.firestore
          //.collection("shopOption").doc(payload.shopOption)
          //.collection("category").doc(payload.category)
          //.collection("filter").doc(queryfilterDoc.id)
            .doc(payload.routePath + '/filter/' + queryfilterDoc.id)
            .collection("para")
            .get().then((queryfilterPara)=>{

            if(queryfilterPara.size == 0){
              state.filterLoader = false
            }
            //
            cQueryfilter++
            //

            let cQueryfilterPara = 0
            queryfilterPara.forEach((queryfilterParaDoc)=>{


              if(queryfilterParaDoc.exists){
                //
                cQueryfilterPara++
                //
                ////console.log(queryfilterParaDoc.id) // we need this => 20s, 30s etc
                ////console.log(queryfilterParaDoc.data())
                //
                //
                if(queryfilterDoc.id !=='priceRange'){
                  state.filter[queryfilterDoc.id][queryfilterParaDoc.id] = {
                    //
                  }
                }else{
                  if(queryfilterParaDoc.id==='500-999' || queryfilterParaDoc.id==='0-499'){
                    state.filter[queryfilterDoc.id][queryfilterParaDoc.id] = {
                      //
                    }
                  }else{
                    temp.push(queryfilterParaDoc.id)
                  }
                }
                //
                if(queryfilter.size == cQueryfilter && queryfilterPara.size == cQueryfilterPara){
                  let cnt=0
                  for(let i in temp){
                    cnt++
                    state.filter['priceRange'][temp[i]]={}
                    if(cnt === temp.length){
                      console.log("[Filter Queried Final] => ", state.filter)
                    }
                  }
                  //console.log(temp)
                  state.filterLoader = false
                  //

                  //
                  gen.state.thisOfVueComp.$forceUpdate()
                  //
                  ////console.log("queryfilter.size => " + queryfilter.size + " | " + "cqueryfilter => " + cQueryfilter)
                  ////console.log("queryfilterPara.size =>" + queryfilterPara.size + " | " + "cqueryfilterPara => " + cQueryfilterPara)
                  //
                }
              }

            })

          })
        }
      })

    })
  },
  //
  send_SelFilter_toCloud_toGetProducts_accordingToFilter_2(state, payload){
    //
    ////console.log("[AXIOS FILTER CATEGORY]",payload)
    ////console.log(payload.sel_setOfFilters)
    ////console.log(payload.routePath)
    //
    state.filterLoader = true //also turn on filter loader :P
    product.state.productsLoader = true // will load product, on basis of changed filter
    //
    gen.state.thisOfVueComp.$forceUpdate() //update dom => the tick on filter
    //
    state.selectedFilters = payload.sel_setOfFilters // if this func is called directly from => comp on basis of filter in url.
    //
    axios.get('https://us-central1-kult-2.cloudfunctions.net/productFilter', {
      params: {
        sel_setOfFilters: payload.sel_setOfFilters,
        routePath: payload.routePath
      }
    }).then(function (response) {
      ////console.log(response);
      ////console.log(response.data)
      //
      product.state.products = {}
      //
      product.state.products = response.data // update products according to filter.
      //console.log("[FILTER APPLIED] [UPDATE PRODUCTS]", product.state.products)
      //
      state.filterLoader = false //filter loader stops
      product.state.productsLoader = false
      //
      //
    }).catch(function (error) {
      //console.log(error);
      //alert(error.data)
      //
      state.filterLoader = false // :P
      product.state.productsLoader = false
    });
  }
  //
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
