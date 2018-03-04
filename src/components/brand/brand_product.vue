<template>
  <div>

    <product :routeDet = "{
        routePath: 'brandCat/A-Z Brands/brand/' + $route.params.brand ,
        routeQuery: $route.query,
        compRoutePath: '/brandProduct/' + $route.params.brand
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
    updated(){
      window.routePath_7 =  'brandCat/A-Z Brands/brand/' + this.$route.params.brand
    },
    created(){
      //
      window.routePath_7 =  'brandCat/A-Z Brands/brand/' + this.$route.params.brand //  7 :{
      //
    }
  }
</script>
