<template>
  <div>

    Login with your provider first to set a password !
    <!-- recent login require to reset password -->

    FACEBOOK LOGIN =>
    <button
      @click="fbP({
        todo: 'login'
      })"
    >
      FACEBOOK
    </button> <br>


    GOOGLE LOGIN =>
    <button
      @click="googleP({
        todo: 'login'
      })"
    >
      GOOGLE
    </button> <br>

    TWITTER LOGIN=>
    <button
      @click="twitterP({
        todo:'login'
      })"
    >
      twitter
    </button> <br>

  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  //
  export default{
    methods:{
      ...mapMutations([
        'googleP',
        'fbP',
        'twitterP'
      ])
    }
  }
</script>
