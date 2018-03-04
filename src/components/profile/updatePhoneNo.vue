<template>
  <div>

    phone & otp => <br>
    <input
      placeholder="phone"
      v-model="$store.state.updatePhoneNo.phoneNo"
    /> <br>

    <button
      id="sign-in-button"
      @click="getOtp({
      phoneNo: $store.state.updatePhoneNo.phoneNo,
      otp: $store.state.updatePhoneNo.otp
    })"
    >
      {{getOrResendOtp}}
    </button> <br>

    <input
      placeholder="otp"
      v-model="$store.state.updatePhoneNo.otp"
    /> <br>

    <button
      v-if="getOrResendOtp == 'Resend OTP' "
      @click="updatePhoneNo({
        otp: $store.state.updatePhoneNo.otp
      })"
    >
      Update No
    </button>

    <div id="recaptcha-container"></div>

  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  //
  import loader from '@/components/gen/loader'
  //
  export default {
    methods:{
      ...mapMutations([
        'getOtp',
        'updatePhoneNo'
      ])
    },
    computed:{
      ...mapGetters([
        //
        'getOrResendOtp'
      ])
    },
    created(){
      if(!this.$store.state.auth.isLoggedIn){
        this.$router.push('/')
      }
    },
    components:{
      loader
    }
  }
</script>

<style scoped>
  .show{
    visibility: visible;
  }
  .hide{
    visibility: hidden;
  }
</style>

