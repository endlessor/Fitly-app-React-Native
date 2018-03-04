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
                <div  v-else   @click=" $router.push('/bGuide/'+ i)">
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
                  <h3>Mascara</h3>
                </div>
                <open :loopObj="bGuideBlushBestSeller" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Volumizing</h3>
                </div>
                <open :loopObj="bGuideBlushPink" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Defining + Lengthing</h3>
                </div>
                <open :loopObj="bGuideBlushCarols" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Curling</h3>
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
      this.$store.dispatch('getProdFromArr',["262","263","279"]).then(function (response) {
        vm.bGuideBlushBestSeller=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["264","269","262","284","266"]).then(function (response) {
        vm.bGuideBlushPink=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["271","277","280","281","286"]).then(function (response) {
        vm.bGuideBlushCarols=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["285","279","234"]).then(function (response) {
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
