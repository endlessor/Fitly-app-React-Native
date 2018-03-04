<template>
  <div>
    <div class="banner_strip"></div>
    <div class="breads">
      <div class="container">
        <h3>Kult Picks</h3>
      </div>
    </div>
    <product :routeDet = "{
        routePath: 'kultPickGlobalBestSeller/kultPick', //db path
        routeQuery: $route.query,
        compRoutePath: '/kultPick'
      }"
    >
    </product>


  </div>
</template>

<script>
  import product from '@/components/product/product.vue'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  //
  export default {
    //
    components:{
      product
    },
    computed:{
      ...mapGetters([
        'shopOptions'
      ])
    },
    methods:{
      ...mapMutations([
        'goTo'
      ])
    },
    created(){
      window.thisOfVueComp_3 = this
      window.routePath_7 =  'kultPickGlobalBestSeller/kultPick' //  7 :{
    },
    updated(){
      window.routePath_7 =  'kultPickGlobalBestSeller/kultPick'
    }
  }
</script>
