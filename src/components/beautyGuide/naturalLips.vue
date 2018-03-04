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
                  <h3>Matte</h3>
                </div>
                <open :loopObj="bGuideBlushBestSeller" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Radient</h3>
                </div>
                <open :loopObj="bGuideBlushPink" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Natural</h3>
                </div>
                <open :loopObj="bGuideBlushCarols" :md_lg_val="8"></open>
                <div class="divider"></div>
              </div>
              <div class="cat_prodarea buy_guide" v-if="!loader">
                <div class="comm_title text-center">
                  <h3>Highshine</h3>
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
      this.$store.dispatch('getProdFromArr',["528","547","550","551","502","512","519"]).then(function (response) {
        vm.bGuideBlushBestSeller=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["501","513","514","524","542","543","501"]).then(function (response) {
        vm.bGuideBlushPink=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["503","510","539","563"]).then(function (response) {
        vm.bGuideBlushCarols=response
        console.log(response)
      })
      this.$store.dispatch('getProdFromArr',["549","554","509","536"]).then(function (response) {
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
