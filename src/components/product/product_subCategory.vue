<template>
  <div>

    <product :routeDet = "{
        routePath: 'shopOption/' + $route.params.shopOption + '/category/' + $route.params.category + '/sub/' + $route.params.subCategory,
        routeQuery: $route.query,
        compRoutePath: '/productSubCategory/' + $route.params.shopOption + '/' + $route.params.category + '/' + $route.params.subCategory
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
      window.routePath_7 =  'shopOption/' + this.$route.params.shopOption + '/category/' + this.$route.params.category + '/sub/' + this.$route.params.subCategory //  7 :{
    },
    updated(){
      window.routePath_7 =  'shopOption/' + this.$route.params.shopOption + '/category/' + this.$route.params.category + '/sub/' + this.$route.params.subCategory
    }
  }
</script>
