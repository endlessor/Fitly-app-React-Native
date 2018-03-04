import gen from '../gen'
import router from '../../../router'
import product from '../product/product'

const state = {
  howToCat : {},
  howToCatLoader : {},
  //
  howToVid : {},
  howToVidLoader : {}
}

const getters = {
  howToCat: state => state.howToCat,
  howToCatLoader: state => state.howToCatLoader,
  //
  howToVid: state => state.howToVid,
  howToVidLoader : state => state.howToCatLoader
}

const mutations = {
  //
  getHowToCat(state2){
    let temp = {}
    //
    state.howToCatLoader = true
    //
    gen.state.firestore
      .collection("howToCat")
      .get().then((queryHowToCat)=>{

      if(queryHowToCat.size == 0){
        ////console.log("//if there is no cat to show, hence no vid to show, turn loader cat off")
        state.howToCatLoader = false
      }else{
        //
        queryHowToCat.forEach((queryHowToCatDoc)=>{

          //
          ////console.log(queryHowToCatDoc.id) // cat
          ////console.log(queryHowToCatDoc.data()) // empty
          //
          if(queryHowToCatDoc.id==='KULT TV'){
            state.howToCat[queryHowToCatDoc.id] = {}
          }else{
            temp[queryHowToCatDoc.id]={}
          }

          //
        })


      }
    }).then(function () {
      for(let i in temp){
        state.howToCat[i]={}
      }
    }).then(function () {
      //if any vid category is not selected => it's in query (route), in that case sel 1st one by default
      if( Object.keys(router.currentRoute.query).length == 0 ){
        ////console.log("1")
        //
        mutations.getHowToCatVid(state, {
          howToCat: Object.keys(state.howToCat)[0]
        })
      }else { //if there is already some cat selected, on refresh load that only
        ////console.log("2")
        //
        mutations.getHowToCatVid(state, {
          howToCat: router.currentRoute.query.selVidCat
        })
      }

      //
      state.howToCatLoader = false
      //
      window.thisOfVueComp.$forceUpdate()
    })
  },
  //
  //
  getHowToCatVid(state2, payload){
    ////console.log(payload.howToCat)
    //
    state.howToVidLoader = true
    //
    gen.state.firestore
      .collection('howToCat').doc(payload.howToCat)
      .collection('vid')
      .get()
      .then((queryHowToCatVid)=>{

        //
        if(queryHowToCatVid.size == 0){
          //stop loader, no video in this category
          state.howToVidLoader = false
        }

        state.howToVid = {}
        queryHowToCatVid.forEach((queryHowToCatVidDoc)=>{

          //
          ////console.log(queryHowToCatVidDoc.id) // vid name
          ////console.log(queryHowToCatVidDoc.data()) // link
          //
          state.howToVid[queryHowToCatVidDoc.id] = { // Id by video name
            videoLink: queryHowToCatVidDoc.data().howToCatVidLink,
            //added later
            videoImgUrl: queryHowToCatVidDoc.data().howToCatVidImgUrl,
            //
            //videoShopNowLink: queryHowToCatVidDoc.data().howToCatVidShopNowLink,
            //videoSubTitle: queryHowToCatVidDoc.data().howToCatVidSubTitle,
            //videoSubTitleTag: queryHowToCatVidDoc.data().howToCatVidSubTitleTag,
            //videoSubTitleTagLink: queryHowToCatVidDoc.data().howToCatVidSubTitleTagLink,
            //
            //videoProductTitle: queryHowToCatVidDoc.data().howToCatVidProductTitle,
          }
        })

        //
        //console.log("[QUERIED VIDEOS OF CAT]", state.howToVid)
        //
        router.push({ path:'/howTo' , query: { selVidCat: payload.howToCat  } }) //use here(current route), only when sure
        //this cant be called outside component
        //
        setTimeout(()=>{
          state.howToVidLoader = false
        },3000)
        window.thisOfVueComp.$forceUpdate()
      })
  },
  //
  //
  getCatVidProduct(state2, payload){
    ////console.log(payload)
    state.productsLoader = true
    //
    gen.state.firestore
      .collection("howToCat").doc(payload.vidCat)
      .collection("vid").doc(payload.vidName)
      .collection("product")
      .get()
      .then((queryVidProduct)=>{

        //
        if(queryVidProduct.size == 0){
          //stop preloader, if there isnt any product
          state.productsLoader = false
        }
        //
        product.state.products = {}
        //
        queryVidProduct.forEach((queryVidProductDoc)=>{
          //
          ////console.log(queryVidProductDoc.id) // product id // got product id
          ////console.log(queryVidProductDoc.data()) //empty
          //
          product.state.cProduct = 0
          // now => get product detail
          product.mutations.getProductDetail(state2, {
            pId: queryVidProductDoc.id,
            cProductSize: queryVidProduct.size
          })
          //
        })
        window.thisOfVueComp7.$forceUpdate()
      })
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
