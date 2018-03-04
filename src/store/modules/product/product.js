import gen from '../gen'
import axios from 'axios'
const state = {
  cProduct : 0, //count of queried product // to stop the loader // to make async
  //
  products : {},
  productsLoader : false,
  //
  lastQueried_product : {},
  //
  totalProds:0,
  loadMoreLoader:false
}

const getters = {
  products: state => state.products,
  productsLoader: state => state.productsLoader,
  totalProds:state=>state.totalProds,
  loadMoreLoader:state =>state.loadMoreLoader

}

const mutations = {
  //
  getProducts(state2, payload){
    ////console.log(payload)
    //
    //console.log(payload)
    state.productsLoader = true
    //
    console.log("[Firestore] in product_category =>", gen.state.firestore)
    //
    gen.state.firestore //Query 1
    //.collection("shopOption").doc(payload.shopOption)
    //.collection("category").doc(payload.category)
      .doc(payload.routePath)
      .collection("product")
      .orderBy("date")
      .limit(60)
      .get().then((queryproducts)=>{

      //
      console.log(queryproducts.size)
      if(queryproducts.size == 0){
        //turn loader off
        state.productsLoader = false
       // //console.log(this.selected)

      }

      state.cProduct = 0
      state.products = {}
      queryproducts.forEach((queryproductsDoc)=>{

        if(queryproductsDoc.exists){
          //
          //
          ////console.log(queryproductsDoc.id) //need only this => product id
          ////console.log(queryproductsDoc.data())
          //
          //get Product Details
          //
          mutations.getProductDetail(state, { //query product detail
            pId: queryproductsDoc.id,
            //cProduct: cCategoryProduct,
            cProductSize: queryproducts.size,
            //
          })

          //
          state.lastQueried_product = queryproducts.docs[queryproducts.docs.length-1];
          ////console.log("last queried product was =====> ", state.lastQueried_product);
          //////console.log(state.lastQueried_product.id)
        }
      })

    })
  },
  //
  loadMoreProducts(state2, payload){
    state.loadMoreLoader=true
    ////console.log(payload)
    //
    //state.productsLoader = true
    //
    ////console.log("[Firestore] in product_category =>", gen.state.firestore)
    //
    console.log("last queried product was [in Load More 1] =====> ", state.lastQueried_product);
    //
    gen.state.firestore //Query 1
    //.collection("shopOption").doc(payload.shopOption)
    //.collection("category").doc(payload.category)
      .doc(payload.routePath)
      .collection("product")
      .orderBy("date")
      .startAfter(state.lastQueried_product)
      .limit(60)
      .get().then((queryproducts)=>{

      //
      if(queryproducts.size == 0){
        //turn loader off
        //state.productsLoader = false
        //
        //$store.complete(); //infinte Loader
      }

      state.cProduct = 0
      queryproducts.forEach((queryproductsDoc)=>{

        if(queryproductsDoc.exists){
          //
          //
          ////console.log(queryproductsDoc.id) //need only this => product id
          ////console.log(queryproductsDoc.data())
          //
          //get Product Details
          //
          mutations.getProductDetail(state, {
            pId: queryproductsDoc.id,
            //cProduct: cCategoryProduct,
            cProductSize: queryproducts.size
          })

          //
          state.lastQueried_product = queryproducts.docs[queryproducts.docs.length-1];
          ////console.log("last queried product was [in Load More 2] =====> ", state.lastQueried_product);

          //
          //$store.loaded();  //infinite Loader
        }
      })

    })
  },
  //
  getLoadMoreCnt(state,path){
    axios.get('https://us-central1-kult-2.cloudfunctions.net/productCountInPage', {
      params: {
        routePath:path
      }
    }).then(function (response) {
      state.totalProds=response.data
      window.thisOfVueComp.$forceUpdate()
    }).catch(function (error) {
      //console.log(error)
    })
  },
  //
  getProductDetail(state2, payload){

    //
    ////console.log("Get Product Payload =>", payload)
    //
    gen.state.firestore //Query 2
      .collection("product").doc(payload.pId)
      .get().then((queryProductDetail)=>{

      state.cProduct++
      ////console.log("cCategoryProduct =>",state.cProduct)
      //
      if(queryProductDetail.exists){
        //
        ////console.log(queryProductDetail.id) //product id
        ////console.log(queryProductDetail.data()) //product detail

        //
        state.products[queryProductDetail.id] = {
          pBasicDetail : queryProductDetail.data().pBasicDetail,
          pOtherDetail: queryProductDetail.data().pOtherDetail,
          priceStartsFrom: queryProductDetail.data().priceStartsFrom
        }
      }

      console.log('cCategoryProduct => ' + state.cProduct + ' | ' + 'queryproducts.size => ' + payload.cProductSize)
      if(state.cProduct >= payload.cProductSize){
        //
        state.loadMoreLoader=false
        state.productsLoader = false
        //
        ////console.log("***** PRODUCT QUERIED *****")
        //
        console.log('[PRODUCT QUERIED FINAL]', state.products)
        window.thisOfVueComp.$forceUpdate()
      }

    })
    //
  },
}

const actions = {

}

export default {
  state,
  mutations,
  getters,
  actions
}
