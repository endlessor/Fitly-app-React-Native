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
            <el-tabs  v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="20" name="first">
                <loader v-if="loader"></loader>
                <div class="cat_prodarea buy_guide" v-if="!loader">
                  <div class="comm_title text-center">
                    <h3> Treat </h3>
                  </div>
                  <open :loopObj="prod_20_treat" :md_lg_val="8"></open>
                  <div class="divider"></div>
                </div>
                <div class="cat_prodarea buy_guide" v-if="!loader">
                  <div class="comm_title text-center">
                    <h3> Moisturize</h3>
                  </div>
                  <open :loopObj="prod_20_moisturize" :md_lg_val="8"></open>
                  <div class="divider"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="30" name="second">
                <loader v-if="loader"></loader>
                <div class="cat_prodarea buy_guide" v-if="!loader">
                  <div class="comm_title text-center">
                    <h3> Treat </h3>
                  </div>
                  <open :loopObj="prod_30_treat" :md_lg_val="8"></open>
                  <div class="divider"></div>
                </div>
                <div class="cat_prodarea buy_guide" v-if="!loader">
                  <div class="comm_title text-center">
                    <h3> Moisturize</h3>
                  </div>
                  <open :loopObj="prod_30_moisturize" :md_lg_val="8"></open>
                  <div class="divider"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="40" name="third">
                <loader v-if="loader"></loader>
                <div class="cat_prodarea buy_guide"v-if="!loader">
                  <div class="comm_title text-center">
                    <h3> Treat </h3>
                  </div>
                  <open :loopObj="prod_40_treat" :md_lg_val="8"></open>
                  <div class="divider"></div>
                </div>
                <div class="cat_prodarea buy_guide" v-if="!loader">
                  <div class="comm_title text-center">
                    <h3> Moisturize</h3>
                  </div>
                  <open :loopObj="prod_40_moisturize" :md_lg_val="8"></open>
                  <div class="divider"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="50" name="fourth">
                <loader v-if="loader"></loader>
                <div class="cat_prodarea buy_guide" v-if="!loader">
                  <div class="comm_title text-center">
                    <h3> Treat </h3>
                  </div>
                  <open :loopObj="prod_50_treat" :md_lg_val="8"></open>
                  <div class="divider"></div>
                </div>
                <div class="cat_prodarea buy_guide" v-if="!loader">
                  <div class="comm_title text-center">
                    <h3> Moisturize</h3>
                  </div>
                  <open :loopObj="prod_50_moisturize" :md_lg_val="8"></open>
                  <div class="divider"></div>
                </div>
              </el-tab-pane>
            </el-tabs>

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
        activeName: 'first',
        prod_20_treat:{},
        prod_20_moisturize:{},
        prod_30_treat:{},
        prod_30_moisturize:{},
        prod_40_treat:{},
        prod_40_moisturize:{},
        prod_50_treat:{},
        prod_50_moisturize:{},
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
        ]
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
      ]),
      handleClick(tab, event) {
        console.log(tab, event);
      }

    },
    created(){
      let vm = this
      vm.loader= true
      this.$store.dispatch('getProdFromArr',["972","987","988"]).then(function (response) {
        vm.prod_20_treat=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["2239","1139","1149"]).then(function (response) {
        vm.prod_20_moisturize=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["971","976","977"]).then(function (response) {
       vm.prod_30_treat=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["1141","1142","1138"]).then(function (response) {
       vm.prod_30_moisturize=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["894","979","978"]).then(function (response) {
       vm.prod_40_treat=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["1146","1147","1155"]).then(function (response) {
        vm.prod_40_moisturize=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["983","986","984"]).then(function (response) {
       vm.prod_50_treat=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["1148","1161","1170"]).then(function (response) {
        vm.prod_50_moisturize=response
        console.log(response)
      }).then(function () {
        setTimeout(()=>{
          vm.loader=false
        },500)
      })
    }
  }
</script>
<style>
  .el-tabs__content {
    overflow: visible !important;
    position: relative;
  }
  .el-tabs__nav {
    left: 38% !important;
    position: relative;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    float: left;
    z-index: 2;
  }
</style>
