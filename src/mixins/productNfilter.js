export default {
  //
  data(){
    return {
      selectedFilters: {},
      routePath: '',
      selectedFilters_str : ''
    }
  },
  //
  methods:{
    //
    sel_disSel_thisFilter(payload) {
      //
      this.routePath = payload.routePath // update route path in global var, will be used later in watch, cant pass in func
      console.log(this.routePath)
      //
      //this.$store.state.filter.filterLoader = true //Filter Loader start
      //
      //console.log(payload)
      if (Object.keys(this.selectedFilters).indexOf(payload.sel_filterDetail.filterName) == -1) { // filterName not found
        //
        //console.log("*** (1) add filter name & para ! ***")
        this.selectedFilters[payload.sel_filterDetail.filterName] = {}
        this.selectedFilters[payload.sel_filterDetail.filterName][payload.sel_filterDetail.filterPara] = {}
        //
      } else { // filterName found
        if (Object.keys(this.selectedFilters[payload.sel_filterDetail.filterName]).indexOf(payload.sel_filterDetail.filterPara) == -1) { // filterPara not found
          //
          //console.log("*** (2) add filter para ! ***")
          this.selectedFilters[payload.sel_filterDetail.filterName][payload.sel_filterDetail.filterPara] = {}
          //
        } else { // filterPara found
          //
          //console.log("*** (3) delete filter para ! ***")
          delete this.selectedFilters[payload.sel_filterDetail.filterName][payload.sel_filterDetail.filterPara]
          //
          if (Object.keys(this.selectedFilters[payload.sel_filterDetail.filterName]).length == 0) {
            //console.log("*** (4) delete filter name ! ***")
            delete this.selectedFilters[payload.sel_filterDetail.filterName]
            //
          }
        }
      }
      this.selectedFilters_str = JSON.stringify(this.selectedFilters) //just for watch, doesnot work on Obj properly
      //
      console.log("[Selected Filter] => ", this.selectedFilters)
      //
      //axios call to return product on basis of filter
      this.$router.push({ path:payload.compRoutePath , query: { selFilters:  this.selectedFilters_str } })
    },
    //
    //
    send_SelFilter_toCloud_toGetProducts_accordingToFilter_1(){
      console.log("Watching selectedFilters")
      //db
      //
      if( Object.keys(window.thisOfVueComp_filterMixin.selectedFilters).length == 0 ){ //not a situation
        console.log("Z1")
        //
        //
        setTimeout(()=>{
          this.$store.commit('getProducts', {
            routePath: window.routePath_7
          })
        },500)
      }else{
        //
        let payload = {
          sel_setOfFilters : window.thisOfVueComp_filterMixin.selectedFilters, //need these var on created //will get from url
          routePath: window.thisOfVueComp_filterMixin.routePath + '/filter' //need these var on created // can get from components only
        }
        //
        console.log("Z2")
        window.thisOfVueComp_filterMixin.$store.commit('send_SelFilter_toCloud_toGetProducts_accordingToFilter_2', payload)
      }
    },
    //
    // created thing
    productsOrFilterProducts_initCompCreatedFunc(payload){
      console.log(payload)
      //
      this.$store.state.gen.thisOfVueComp = payload.thisOfVueComp // needed at *start* of created. //(1) this
      //
      this.$store.commit('getFilters',{ //to get the filters
        routePath: payload.routePath //(2) routePath
      })
      //
      //
      if( Object.keys(payload.routeQuery).length == 0 ){ //get all product, irrespective of filters //(3)  $route.query
        console.log("1")
        //
        this.$store.commit('getProducts', {
          routePath: payload.routePath
        })
      } else {
        console.log("1B")
        //
        if( Object.keys(JSON.parse(payload.routeQuery.selFilters)).length == 0 ){  //get all product, irrespective of filters
          console.log("2")
          //
          this.$store.commit('getProducts', {
            routePath: payload.routePath
          })
        }else{ //if any filter
          console.log("3")
          //
          console.log( JSON.parse(payload.routeQuery.selFilters) )
          //
          this.selectedFilters = JSON.parse(payload.routeQuery.selFilters) //got
          this.routePath = payload.routePath //+
            //'/filter' //got //add filter in routePath
          //
          //this.selectedFilters_str = this.$route.query.selFilters //trigger
          //
          this.send_SelFilter_toCloud_toGetProducts_accordingToFilter_1() // 2 is in store
        }
      }
    }
  },
  //
  watch: {
    '$route' (to, from) {
      console.log('// react to route changes...')
      //
      //update var => selectedFilters
      if( Object.keys(window.thisOfVueComp_filterMixin.$route.query).length != 0 ){
        // was not getting updated by route value changes on back forward
        window.thisOfVueComp_filterMixin.selectedFilters = JSON.parse(window.thisOfVueComp_filterMixin.$route.query.selFilters)
      } else {
        window.thisOfVueComp_filterMixin.selectedFilters = {}
      }
      //
      window.thisOfVueComp_filterMixin.send_SelFilter_toCloud_toGetProducts_accordingToFilter_1()
      window.thisOfVueComp_filterMixin.$forceUpdate()
    }
  },
  //
  created(){
    window.thisOfVueComp_filterMixin = this
  }
}
