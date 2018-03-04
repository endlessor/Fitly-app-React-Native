<template>
  <div>

    <product :routeDet = "{
        routePath: 'shopOption/' + $route.params.shopOption + '/category/' + $route.params.category,
        routeQuery: $route.query,
        compRoutePath: '/productCategory/' + $route.params.shopOption + '/' + $route.params.category
      }"
    >
    </product>

  </div>
</template>

<script>
  import product from './product.vue'
  //
  export default {
    //
    components:{
      product
    },
    created(){
      window.routePath_7 = 'shopOption/' + this.$route.params.shopOption + '/category/' + this.$route.params.category//  7 :{
    },
    updated(){
      window.routePath_7 =  'shopOption/' + this.$route.params.shopOption + '/category/' + this.$route.params.category
    }
  }
</script>
