import gen from '../gen'
import product from './product'
import axios from 'axios'
import router from '@/router'

const state = {
  pTypes: {},
  pTypeLoader : false,
  prodArr:[],
  selected:{},
  selectedLink:'',
  emailVerified:false,
  amazonLoader:false,
  //
  amazonLinkPrice: '',
  recProducts:{},
  recLoader:false
}

const getters = {
  //
  pTypes : state => state.pTypes,
  pTypeLoader: state => state.pTypeLoader,
  prodArr: state => state.prodArr,
  selected: state => state.selected,
  selectedLink:state=>state.selectedLink,
  amazonLoader:state=>state.amazonLoader,
  //
  amazonLinkPrice: state => state.amazonLinkPrice,
  recProducts:state=>state.recProducts,
  recLoader:state=>state.recLoader
}

const mutations = {
  //
  getTypeNLinkOfThisProduct(state2, payload) {
    state.pTypes={}
    //console.log(payload) // product id, get from url
    //
    state.pTypeLoader = true
    state.recLoader=true
    //
    //
    gen.state.firestore
      .collection("product").doc(payload.pId)
      .collection("type")
      .get().then((queryPType)=>{

      //
      //
      if(queryPType.size == 0){
        state.pTypeLoader = false // stop loader
      }
      //
      let c1 = 0
      //
      queryPType.forEach((queryPTypeDoc)=>{
        //
        //
        //console.log(queryPTypeDoc.id) //pType
        //console.log(queryPTypeDoc.data()) //images, swatchImages
        //
        state.pTypes[queryPTypeDoc.id] = {
          swatchImgUrl :queryPTypeDoc.data().pTypeColor,
          pTypeImgUrl: queryPTypeDoc.data().pTypeImgLink
        }
        //

        gen.state.firestore
          .collection("product").doc(payload.pId)
          .collection("type").doc(queryPTypeDoc.id)
          .collection("link")
          .get().then((queryPTypeLink)=>{

          c1++
          //
          if(queryPTypeLink.size == 0){
            if(c1 == queryPType.size){
              state.pTypeLoader = false //stop loader

            }
          }

          queryPTypeLink.forEach((queryPTypeLinkDoc)=>{

            //
            //console.log(queryPTypeLinkDoc.id) // linkDomainName
            //console.log(queryPTypeLinkDoc.data()) // affliateLink (link)
            //
            if( Object.keys(state.pTypes[queryPTypeDoc.id]).indexOf('affliateDomains') == -1 ){
              state.pTypes[queryPTypeDoc.id]['affliateDomains'] = {
                //
              }
            }
            state.pTypes[queryPTypeDoc.id]['affliateDomains'][queryPTypeLinkDoc.id] = {
              link: queryPTypeLinkDoc.data().link,
              price: queryPTypeLinkDoc.data().price
            }
          })
          //
          if(c1 == queryPType.size){
            //
            console.log("[PARTICULAR PRODUCT DETAIL FINAL]", state.pTypes)
            //force update dom
            window.thisOfVueComp.$forceUpdate()
            actions.getProd().then(function (snap) {
              if(router.currentRoute.query.varient == 'notSelected'){
                state.selected = state.prodArr[0]
              }else{
                for(let i in state.prodArr){
                  if(state.prodArr[i].key == router.currentRoute.query.varient){
                    state.selected=state.prodArr[i]
                  }
                }
              }
              console.log("[selected] => ", state.selected)
            }).then(function () {
              state.pTypeLoader = false //stop loader
            })
            //
            /*mutations.fetchAmazonPrice(state,{
              selected: state.selected,
              prodArr: state.prodArr,
              pid: payload.pId
            })*/
          }
          //
        })
      })
    })
  },
  //
  getRecProducts(){
    state.recLoader=true
    axios.get('https://us-central1-kult-2.cloudfunctions.net/recommendedProducts').then(function (response) {
      console.log(response.data)
      state.recProducts=response.data
       state.recLoader=false
     //state.pTypeLoader=false
    }).catch(function (error) {
     // console.log(error)
      state.recLoader=false
     // state.pTypeLoader=false
    })
  },
  fetchAmazonPrice(state2, payload){
    let vm = this
    //
    console.log("[fetchAmazonPrice]", payload)
    //
    state.amazonLoader = true
    //
    console.log("[prodArrLen] => ", state.prodArr.length)
    //
    let x
    //
    if(state.prodArr.length == 1){  //condition 1 => if one pTYpe => use prodArr
      x = payload.prodArr[0]
    } else {  //condition 2 => if more than 1 pType => use selected
      x = payload.selected
    }
    //
    console.log("[x] => ", x)
    //

    if( Object.keys(x.det.affliateDomains).indexOf('amazon') != -1 ){ //amazon is their
      let url = x.det.affliateDomains.amazon.link
      let pId = payload.pid
      let pType = x.key
      //
      //
      console.log("[pid] => ", pId)
      console.log("[pType] => ", pType)
      console.log("[url] => ", url)
      //
      //
      gen.actions.axiosReq(state, {
        params: {
          pId, //fill **
          pType //fill**
        },
        funcName: 'getAmazonPriceFromDb'
      }).then((result_1)=>{
        console.log("1 => ", result_1)
        if(result_1 == '-1' || result_1 == '999999999'){ //not in db / or out of stock etc ...
          gen.actions.axiosReq(state, {
            params: {
              url //amazon lik url , fill**
            },
            funcName: 'getAmazonPriceFromAPI'
          }).then((result_2)=>{
            //
            console.log("2 => ", result_2)
            if(result_2 == '-1'){
              state.amazonLinkPrice = 'Failed to fetch Price !'
              state.amazonLoader = false
              window.thisOfVueComp.$forceUpdate()
              //failed to fetch price, show accordingly(message) on dom
            }else if(result_2 == '999999999'){
              state.amazonLinkPrice = 'Out Of Stock'
              state.amazonLoader = false
              window.thisOfVueComp.$forceUpdate()
              //show out of stock on dom
            }else{
              console.log("[save] => ",result_2)  // show result on dom //this is price of amazon link
              state.amazonLinkPrice = result_2
              //
              gen.actions.axiosReq(state, {
                params: {
                  pId, // fill**,
                  pType, // fill**
                  price: result_2
                },
                funcName: 'saveAmazonPriceToDb'
              })
              //
            }
            //*turn loader off*
            state.amazonLoader = false
            window.thisOfVueComp.$forceUpdate()
            //
          })
        } else {
          console.log(result_1) // show result on dom //this is price of amazon link
          state.amazonLinkPrice = result_1
          //*turn loader off*
          state.amazonLoader = false
          window.thisOfVueComp.$forceUpdate()
        }
      })
      //
      //
    }else{
      //do nothing
      state.amazonLoader = false  //stop loader
    }
    //
  }
}

const actions = {
  getProd(){
    return new Promise(function (resolve) {
      state.prodArr=[]
      let cnt = 0
      for(let i in state.pTypes){
        cnt++
        let temp = {
          key:i,
          det:state.pTypes[i]
        }
        state.prodArr.push(temp)
        if(cnt === Object.keys(state.pTypes).length){
          resolve('done')
        }
      }
     // console.log(state.prodArr)
    })
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}
