<template>
  <div>
    <span v-for="icon in 5" >
        <span v-if="icon <= num"  >
            <i class="material-icons star"  >star</i>
        </span>
         <span v-else>
            <i class="material-icons star_unchecked" >star</i>
        </span>
    </span>
  </div>
</template>
<script>
  export default {
    props:['num']
  }
</script>
<style>
  .star{
   color: #eca8b5 ;
   font-size: 12.5px
  }
  .star_unchecked{
    color: #959595;
    font-size: 12.5px
  }
</style>
