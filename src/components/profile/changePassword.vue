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
                <li class="active"><a >CHANGE PASSWORD</a></li>
                <li><a @click="$router.replace('/deleteAccount')">CLOSE ACCOUNT</a></li>
              </ul>
            </div>
          </div>
          <div class="acount_btm" v-if="!setPass">
            <h4>Update your password</h4>
            <p>You want to change your password?</p>
            <div class="row">
              <div class="col-md-8 col-lg-7 col-xs-12">
                <div class="account_form">
                  <div class="row">
                    <div class="col-sm-6 col-xs-12 left">
                      <label>Current password</label>
                      <input type="password" v-model="$store.state.changePassword.oldPassword" class="form-control">
                    </div>
                    <div class="col-sm-6 col-xs-12 right">
                      <label>New password</label>
                      <input type="password" v-model="$store.state.changePassword.newPassword" class="form-control">
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  <button class="acount_btn"
                          @click="changePassword({
                          newPassword: $store.state.changePassword.newPassword,
                          oldPassword: $store.state.changePassword.oldPassword
                        })"
                  >Update password</button>
                </div>
              </div>
            </div>
          </div>
          <div class="acount_btm" v-if="setPass">
            <h4>Set your password</h4>
            <p>You want to set your password?</p>
            <div class="row">
              <div class="col-md-8 col-lg-7 col-xs-12">
                <div class="account_form">
                  <div class="row">
                    <div class="col-xs-12 left">
                      <label>New Password</label>
                      <input type="password" v-model="$store.state.changePassword.firstTimePassword" class="form-control">
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  <button class="acount_btn"
                          @click="setPassword({
                             password: $store.state.changePassword.firstTimePassword
                          })"
                  >Set Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="$store.state.editProfile.showReAuth"
      width="100%"
      center>
      <span>
        <re-auth></re-auth>
      </span>
    </el-dialog>






  <!--  set password for first time => <br>
    <input
      v-if="setPass"
      placeholder="password"
      v-model="$store.state.changePassword.firstTimePassword"
    />
    <button
      v-if="setPass"
      @click="setPassword({
         password: $store.state.changePassword.firstTimePassword
      })"
    >
      set password
    </button>
    <reAuth_2 v-if="showReAuth_2"></reAuth_2> <!-- show in dialog -->


   <!-- change password=>
    <input
      v-if="!setPass"
      placeholder="old password"
      v-model="$store.state.changePassword.oldPassword"
    />
    <input
      placeholder="new password"
      v-model="$store.state.changePassword.newPassword"
    />
    <button
      v-if="!setPass"
      @click="changePassword({
        newPassword: $store.state.changePassword.newPassword,
        oldPassword: $store.state.changePassword.oldPassword
      })"
    >
      update password
    </button>-->

  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  //
  import reAuth_2 from '@/components/auth/reAuth_2'
  //
  export default {
    methods:{
      ...mapMutations([
        'changePassword',
        'setPassword'
      ])
    },
    computed:{
      ...mapGetters([
        'showReAuth_2',
        'setPass'
      ])
    },
    created(){
      if(!this.$store.state.auth.isLoggedIn){
        this.$router.push('/')
      }
      let vm = this
      window.thisOfVueComp = this
      //
      this.$store.commit('profile_checkIfLoggedIn')
      for(let i in this.$store.state.auth.user.providerData){
        if(this.$store.state.auth.user.providerData[i].providerId==='password'){
          vm.$store.state.changePassword.setPass= false
        }
      }
    },
    components:{
      reAuth_2
    }
  }
</script>
