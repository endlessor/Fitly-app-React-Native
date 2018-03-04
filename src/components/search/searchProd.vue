<template>
  <div class="min_height">
    <div class="banner_strip" ></div>
    <div class="breads">
      <div class="container">
        <h3>Kult Search</h3>
      </div>
    </div>
    <loader v-if="sLoader"></loader>
    <div v-else>
      <h4 v-if="noProd">No Results Found</h4>
      <div class="padding_20" v-else>
        <open :loopObj="searchProds" :md_lg_val="6"></open>
        <!--el-row :gutter="48" >
          <el-col :xs="12" :sm="12" :md="6" :lg="6" v-for="(pDet, pId) in searchProds"
                  v-if="parseInt(pDet.priceStartsFrom) != 999999999"
                  style="height: 455px"
          >
            <div>
              <div class="grid-content pa-2" >
                <a class="prod_image"   @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">
                  <img :src="pDet.pBasicDetail.pPicUrl"  style="height:286px " alt="product">
                </a>
                <div class="prod_cont"  @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">
                  <h4><a >{{pDet.pBasicDetail.pBrand}}</a></h4>
                  <span v-for="(i,k) in pDet.pBasicDetail.pName" v-if="k < 20">{{i}}</span><span v-if="pDet.pBasicDetail.pName.length > 20">...</span>
                </div>
                <div class="prod_misc"  @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">
                  <div class="float" ><rating :num="Math.round(pDet.pBasicDetail.pRating)" ></rating></div>
                  <div class="half text-right" >
                              <span v-if="parseInt(pDet.priceStartsFrom) == 999999999" style="float: right" class="half text-right">
                                Out Of Stock
                              </span>
                    <div v-else-if="parseInt(pDet.priceStartsFrom) <= 10000 ">
                      From <img src="/static/images/rupee-2.svg" alt="currency" >
                      {{pDet.priceStartsFrom}}
                    </div>
                    <div v-else></div>
                  </div>
                </div>
                <a  class="prod_compare" v-if="isLoggedIn"><span @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})" >Compare price</span>
                  <img src="/static/images/wishlist-add.svg" alt="wishlist-add" v-if="Object.keys(wishlistObj).indexOf(pId) === -1" @click="addWishlist({pId,pDet}); wishlistObj[pId] = pDet; $forceUpdate()">
                  <img src="/static/images/wishlist-hover.svg" alt="wishlist-hover" v-if="Object.keys(wishlistObj).indexOf(pId) !== -1" @click="removeWishlist({pId,pDet}); delete wishlistObj[pId]; $forceUpdate()">
                </a>
                <a  class="prod_compare" v-if="!isLoggedIn"><span @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})" >Compare price</span>
                  <img src="/static/images/wishlist-add.svg" alt="wishlist-add" @click="$store.state.auth.showLoginPopup = true">
                </a>
              </div>
            </div>
          </el-col>
          <!-- load more ends -->
        <!--/el-row-->
      </div>
    </div>
  </div>
</template>
<script>
  import open from '@/components/openTabProd'
  import rating from '@/components/rating'
  import {mapGetters} from 'vuex'
  import loader from '@/components/gen/searchLoader'
  import {mapMutations} from 'vuex'
  import axios from 'axios'
  export default{
    data(){
      return{
        searchProds:{},
        sLoader:false,
        noProd:false
      }
    },
    components:{
      loader,
      rating,
      open
    },
    methods: {
      ...mapMutations([
        'addWishlist',
        'removeWishlist'
      ]),
    },
    computed: {
      ...mapGetters([
        'wishlistObj',
        'isLoggedIn',
        //
        //'amazonLinkPrice' //show this ******
      ]),
    },
    watch:{
      $route:function () {
        this.noProd=false
        let vm = this
        this.sLoader=true
        axios.get('https://us-central1-kult-2.cloudfunctions.net/searchResults?qStr='+ vm.$route.query.qStr).then(function (response) {
          console.log(response.data)
          if(Object.keys(response.data).length != 0){
            vm.searchProds=response.data
          }else{
            vm.noProd=true
          }

          vm.sLoader=false
        }).catch(function (error) {
          console.log(error)
          vm.sLoader=false
        })
      }
    },
    created(){
      let vm = this
      this.sLoader=true
      axios.get('https://us-central1-kult-2.cloudfunctions.net/searchResults?qStr='+ vm.$route.query.qStr).then(function (response) {
        console.log(response.data)
        if(Object.keys(response.data).length != 0){
          vm.searchProds=response.data
        }else{
          vm.noProd=true
        }

        vm.sLoader=false
      }).catch(function (error) {
        console.log(error)
        vm.sLoader=false
      })
    }
  }
</script>
<style>
  .padding_20{
    padding:3vh;
  }
  .min_height{
    min-height: 700px;
  }
</style>
