<template>
  <div>
    <product :routeDet = "{
        routePath: 'kultPickGlobalBestSeller/globalBestSeller/shopOption/' + $route.params.shopOption, //db path
        routeQuery: $route.query,
        compRoutePath: '/globalBestSeller/shopOption/' + $route.params.shopOption
      }"
    >
    </product>

  </div>
</template>

<script>

  import product from '@/components/product/product.vue'
  //
  export default {
    //
    components:{
      product
    },
    created(){
      window.routePath_7 =   'kultPickGlobalBestSeller/globalBestSeller/shopOption/' + this.$route.params.shopOption //  7 :{
    },
    updated(){
      window.routePath_7 =  'kultPickGlobalBestSeller/globalBestSeller/shopOption/' + this.$route.params.shopOption
    }
  }
</script>
