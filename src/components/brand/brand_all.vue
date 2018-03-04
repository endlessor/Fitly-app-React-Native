<template>
  <div>
    <loader v-if="allBrandLoader"></loader>
    <div class="container" v-else>
      <div class="banner_strip"></div>
      <div class="brands_title">
        <h2>Brand List</h2>
      </div>
    </div>
    <div class="container" >
      <div class="row make-columns">
        <div class="col-xs-6 col-md-4" v-for="i in alphabet" >
          <div class="panel panel-default elevation-0">
          <h1>{{i}}</h1>
          <div class="brands_list">
            <ul>
              <li v-for="(brandDet ,brand) in allBrands"  v-if="brand[0] === i" @click="goTo('/brandProduct/' + brand)">
                <a >{{brand}}</a>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </div>
    <main>
      <!--div class="container brands">
        <div class="row brands_row">
          <div class="col-sm-3 col-xs-12 brands_column" v-for="i in alphabet">
            <h1>{{i}}</h1>
            <div class="brands_list">
              <ul>
                <li v-for="(brandDet ,brand) in allBrands"  v-if="brand[0] === i">
                  <a >{{brand}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div-->
    </main>




    <!--div v-for="(brandDet ,brand) in allBrands">
      <span @click="goTo('/brandProduct/' + brand)">{{brand}}</span>
    </div-->

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import loader from '@/components/gen/loader'
  //
  export default {
    data(){
      return{
        alphabet:[
          'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
        ]
      }
    },
    created(){
      window.scroll(0,0)
      window.thisOfVueComp = this
      //
      this.$store.commit('getAllBrands', {
        // no para
      })
    },
    computed:{
      ...mapGetters([
        'allBrands', // all brands //to show properly on dom
        'allBrandLoader' //loader var for all brands //true => if allBrands is yet not loaded | false => when all brand is loaded
      ])
    },
    methods:{
      ...mapMutations([
        'goTo'
      ])
    },
    components:{
      loader
    }
  }
</script>
<style>
  .row.make-columns {
    -moz-column-width: 19em;
    -webkit-column-width: 19em;
    -moz-column-gap: 1em;
    -webkit-column-gap:1em;
    border-color: transparent;

  }

  .row.make-columns > div {
    display: inline-block;
    padding:  .5rem;
    width:  100%;
  }

  /* demo only* */
  .panel {
    box-shadow: 0 0px 0px rgba(0,0,0,0) ! important ;
    display: inline-block;
    height: 100%;
    width:  100%;

  }
  .panel-default {
    border-color: #fff ! important;
  }
</style>
