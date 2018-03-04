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
              <div class="cat_prodarea buy_guide" v-else>
                <div class="comm_title text-center">
                  <h3> Global Bestsellers</h3>
                </div>
                <open :loopObj="bGuideHighGBS" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Dewy</h3>
                </div>
                <div class="comm_title text-center">
                  <h4>Glow Low</h4>
                </div>
                <open :loopObj="dewGlowLow" :md_lg_val="8"></open>
                <div class="comm_title text-center">
                  <h4>Glow High</h4>
                </div>
                <open :loopObj="dewGlowHigh" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Shimmer</h3>
                </div>
                <div class="comm_title text-center">
                  <h4>Glow Low</h4>
                </div>
                <open :loopObj="shimGlowLow" :md_lg_val="8"></open>
                <div class="comm_title text-center">
                  <h4>Glow High</h4>
                </div>
                <open :loopObj="shimGlowHigh" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Natural</h3>
                </div>
                <div class="comm_title text-center">
                  <h4>Glow Low</h4>
                </div>
                <open :loopObj="natGlowLow" :md_lg_val="8"></open>
                <div class="comm_title text-center">
                  <h4>Glow High</h4>
                </div>
                <open :loopObj="natGlowHigh" :md_lg_val="8"></open>
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
        bGuideHighGBS:{},
        dewGlowLow:{},
        dewGlowHigh:{},
        shimGlowLow:{},
        shimGlowHigh:{},
        natGlowLow:{},
        natGlowHigh:{},
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
      ])

    },
    created(){
      let vm = this
      vm.loader= true
      this.$store.dispatch('getProdFromArr',["163","164","168","123","174"]).then(function (response) {
        vm.bGuideHighGBS=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["173"]).then(function (response) {
        vm.dewGlowLow=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["163"]).then(function (response) {
        vm.dewGlowHigh=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["181"]).then(function (response) {
        vm.shimGlowLow=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["183"]).then(function (response) {
        vm.shimGlowHigh=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["174"]).then(function (response) {
        vm.natGlowLow=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["168"]).then(function (response) {
        vm.natGlowHigh=response
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
