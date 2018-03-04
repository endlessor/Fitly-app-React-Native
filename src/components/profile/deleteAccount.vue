<template>
  <div>


    <div class="banner_strip"></div>
    <div class="comm_account">
      <div class="container">
        <div class="accont_box">
          <div class="acount_top text-center">
            <div class="account_pic">
              <div class="acount_name">{{$store.state.auth.user.displayName[0].toUpperCase()}}</div>
              <div class="full_name">{{$store.state.auth.user.displayName}}</div>
              <!--a  target="_blank" class="social_link">@karish2308</a-->
            </div>
            <div class="acc_menu">
              <ul>
                <li><a @click="$router.replace('/editProfile')">EDIT PROFILE</a></li>
                <li><a @click="$router.replace('/changePassword')">CHANGE PASSWORD</a></li>
                <li class="active"><a >CLOSE ACCOUNT</a></li>
              </ul>
            </div>
          </div>
          <div class="acount_btm">
            <h4>Close your account</h4>
            <p>Closing your account will delete your profile and all your wishlist and credit. Note that you will not restore your account once this process is done.</p>
            <br>
            <div class="col-md-8 col-lg-7 col-xs-12">
              <label>Password</label>
              <input type="text" v-model="$store.state.deleteAccount.passwordDelAcc" class="form-control">
            </div>
            <div class="clearfix "></div>
            <button class="acount_btn red mt_40"  @click="deleteAccount({
                     password: $store.state.deleteAccount.passwordDelAcc
                 })"
            >
                Delete account
            </button>
          </div>
        </div>
      </div>
    </div>





   <!-- delete account =>
    <input
      placeholder="password"
      v-model="$store.state.deleteAccount.passwordDelAcc"
    />
    <button
      @click="deleteAccount({
        password: $store.state.deleteAccount.passwordDelAcc
      })"
    >
      delete
    </button> -->

  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  //
  export default {
    //
    methods:{
      ...mapMutations([
        'deleteAccount'
      ])
    },
    //
    created(){
      //
      if(!this.$store.state.auth.isLoggedIn){
        this.$router.push('/')
      }
      this.$store.commit('profile_checkIfLoggedIn')
    }
  }
</script>
<style>
  .mt_40{
    margin-top: 40px;
  }
</style>
