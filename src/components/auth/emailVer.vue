<template>
  <div>
    <el-dialog
      :visible.sync="$store.state.auth.resendEmail"
      width="40%"
    >
      <span slot="footer" class="dialog-footer">
         <h5>Account(email) Not Verified!!! Click to continue and you will losse the cashback</h5>
    <button @click="sendVerLink" class="login_btn">Resend Verification Email</button>
    <p class="forgot_pass" @click="$store.state.particularProduct.selectedLink=''; $store.state.auth.resendEmail=false">
      <a :href="selectedLink" target="_blank" v-if="$store.state.particularProduct.selectedLink !==''">Continue Anyway</a>
      <a v-else @click="$store.state.auth.resendEmail=false">Continue Anyway</a>
    </p>
  </span>
    </el-dialog>
    <!--button
      @click="sendVerLink"
    >
      resend verfication link
    </button-->

  </div>
</template>

<script>
  //
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  //
  export default {
    //
    methods:{
      ...mapMutations([
        'sendVerLink',
        'selectedLink'
      ])
    },
    //
    created(){
      this.$store.commit('getEmailVerStatus')
      console.log(this.$store.state.auth.user)
    },
    computed:{
      ...mapGetters([
        'user'
      ])
    }
  }
</script>
