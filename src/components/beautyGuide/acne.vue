<template>
  <div>
    <div class="banner_strip"></div>
    <div class="main_catarea" >
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="side_filterbox buy_guide">
              <div class="buy_title hidden-xs">BUYING GUIDES</div>
              <div class="buy_title visible-xs"><a ><i class="fa fa-close"></i></a></div>
              <div  v-for="i in beautyGuideArr">
              <div class="filter_box active" v-if="$route.path.indexOf(i) !== -1">
                <div class="filter_title ">
                  <a >{{i}}</a>
                </div>
              </div>
              <div  v-else  @click=" $router.push('/bGuide/'+ i)">
                <div class="filter_title ">
                  <a >{{i}}</a>
                </div>
              </div>
            </div>
            </div>
            <div class="min_height">
              <loader v-if="loader"></loader>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Emergency Spot Treatment</h3>
                </div>
                <open :loopObj="bGuideBlushBestSeller" :md_lg_val="8"></open>
                <!--el-row :gutter="15" >
                  <el-col :xs="12" :sm="12" :md="8" :lg="8"  v-if="parseInt(pDet.priceStartsFrom) != 999999999"  v-for="(pDet, pId) in bGuideBlushBestSeller"
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
                        <a  class="prod_compare" v-if="isLoggedIn"><span @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">Compare price</span>
                          <img src="/static/images/wishlist-add.svg" alt="wishlist-add" v-if="Object.keys(wishlistObj).indexOf(pId) === -1" @click="addWishlist({pId,pDet}); wishlistObj[pId] = pDet; $forceUpdate()">
                          <img src="/static/images/wishlist-hover.svg" alt="wishlist-hover" v-if="Object.keys(wishlistObj).indexOf(pId) !== -1" @click="removeWishlist({pId,pDet}); delete wishlistObj[pId]; $forceUpdate()">
                        </a>
                        <a  class="prod_compare" v-if="!isLoggedIn"><span @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">Compare price</span>
                          <img src="/static/images/wishlist-add.svg" alt="wishlist-add" @click="$store.state.auth.showLoginPopup = true">
                        </a>
                      </div>
                    </div>
                  </el-col>



                  <!-- {{$route.query}}
                  {{Object.keys(JSON.parse($route.query.selFilters)).length}} -->
                  <!-- load more -->
                  <!-- no filter sel -->

                  <!-- show load more -->

                  <!-- load more ends -->


                <!--/el-row-->
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>All Over Treatment</h3>
                </div>
                <open :loopObj="bGuideBlushPink" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Moisturizer</h3>
                </div>
                <open :loopObj="bGuideBlushCarols" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Clensers</h3>
                </div>
                <open :loopObj="bGuideBlushNudes" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import open from '@/components/openTabProd'
  import rating from '@/components/rating'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import loader from '@/components/gen/searchLoader'
  export default {
    data(){
      return{
        loader:false,
        bGuideBlushBestSeller:{},
        bGuideBlushPink:{},
        bGuideBlushCarols:{},
        bGuideBlushNudes:{},
        beautyGuideArr:[
          'Blush',
          'Contouring',
          'Highlighting',
          'Mascaras',
          'Neutral Lips',
          'Acne',
          'Skincare',
          'Sunscreens',
          'Antiaging'
        ],

      }
    },
    components:{
      rating,
      loader,
      open
    },
    computed:{
      ...mapGetters([
        'isLoggedIn',
        'wishlistObj'
      ])
    },
    methods:{
      ...mapMutations([
        'addWishlist',
        'removeWishlist'
      ])

    },
    created(){
      let vm = this
      this.loader = true
      this.$store.dispatch('getProdFromArr',["961","968","970"]).then(function (response) {
        vm.bGuideBlushBestSeller=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["1179","964","2234"]).then(function (response) {
        vm.bGuideBlushPink=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["967","968","1177"]).then(function (response) {
        vm.bGuideBlushCarols=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["1037","1043"]).then(function (response) {
        vm.bGuideBlushNudes=response
        console.log(response)
      }).then(function () {
        setTimeout(()=>{
          vm.loader=false
        },500)
      })
    }
  }
</script>
<style scoped>
  .min_height{
    min-height: 400px;
  }
</style>
