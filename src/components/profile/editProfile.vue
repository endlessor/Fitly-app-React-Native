<template>
  <div>
    <div >



      <div class="banner_strip"></div>
      <div class="comm_account">
        <div class="container">
          <div class="accont_box">
            <div class="acount_top text-center">
              <div class="account_pic">
                <div class="acount_name">{{$store.state.auth.user.displayName[0].toUpperCase()}}</div>
                <div class="full_name" >{{$store.state.auth.user.displayName}}</div>
                <!--a  target="_blank" class="social_link">@karish2308</a-->
              </div>
              <div class="acc_menu">
                <ul>
                  <li class="active"><a >EDIT PROFILE</a></li>
                  <li><a @click="$router.replace('/changePassword')">CHANGE PASSWORD</a></li>
                  <li><a @click="$router.replace('/deleteAccount')">CLOSE ACCOUNT</a></li>
                </ul>
              </div>
            </div>
            <div class="acount_btm">
              <div >
                <h4>Update your profile settings</h4>
                <div class="row min_height">
                  <div class="col-md-8 col-lg-7 col-xs-12">
                    <loader v-if="uDetLoader"></loader>
                    <div class="account_form" v-else>
                      <div class="row">
                        <div class="col-xs-12">
                          <label>Name (Required)</label>
                          <input type="text"  v-model="$store.state.editProfile.uName" class="form-control">
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-xs-12">
                          <label>Email Address (Required)</label>
                          <input type="email" :value="$store.state.editProfile.uEmail" readonly class="form-control">
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-xs-12">
                          <label>Date of Birth</label>
                          <input type="text" v-model="$store.state.editProfile.uDob" class="form-control">
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-xs-12">
                          <label>Number</label>
                          <input type="text" v-model="$store.state.editProfile.uPhone" class="form-control">
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-xs-12">
                          <label>Refral Code</label>
                          <input type="text" disabled v-model="$store.state.editProfile.uRefcode" class="form-control">
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <btnLoader v-if="btnLoader"></btnLoader>
                      <button
                        v-else
                        class="acount_btn"
                        @click="updateUserDet({
                        name: $store.state.editProfile.uName,
                        email: $store.state.editProfile.uEmail,
                        dob: $store.state.editProfile.uDob,
                        phone: $store.state.editProfile.uPhone,
                        refCode:$store.state.editProfile.uRefcode
                      })"
                      >Save changes
                      </button>
                    </div>
                  </div>
                  <div class="col-md-4 col-lg-offset-1 text-right sm_left cust_left col-xs-12">
                    <div class="connect_social text-center">
                      <a class="fb" @click="fbP({todo: 'linkAcc'})"><i class="fa fa-facebook"></i>CONNECT MY FACEBOOK</a>
                      <a class="google" @click="googleP({todo: 'linkAcc'})"><i class="fa fa-google"></i>CONNECT MY GOOGLE</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


<!--
      update detail=>
      <input
        v-model="$store.state.editProfile.uName"
        placeholder="name"
      />
      <input
        v-model="$store.state.editProfile.uEmail"
        placeholder="email"
      />
      <input
        v-model="$store.state.editProfile.uDob"
        placeholder="dob"
      />
      <input
        v-model="$store.state.editProfile.uPhone"
        placeholder="phone number"
      />

      <btnLoader v-if="btnLoader"></btnLoader>
      <button
        v-else
        @click="updateUserDet({
          name: $store.state.editProfile.uName,
          email: $store.state.editProfile.uEmail,
          dob: $store.state.editProfile.uDob,
          phone: $store.state.editProfile.uPhone
        })"
      >
        update
      </button> <br>


      link google account =>
      <button @click="googleP({
      todo: 'linkAcc'
    })">
        google
      </button> <br>

      link facebook account =>
      <button @click="fbP({
      todo: 'linkAcc'
    })">
        facebook
      </button> <br>

      link twitter login =>
      <button @click="twitterP({
        todo: 'linkAcc'
      })">
        twitter
      </button>-->
    </div>

    <!-- show in dialog, use v-if var in flag -->
    <!--el-dialog
      v-if="$store.state.editProfile.showReAuth"
      :visible.sync="$store.state.editProfile.showReAuth"
      width="100%"
      center>
      <span>
        <re-auth></re-auth>
      </span>
    </el-dialog-->
    <!--reAuth
      v-if="$store.state.editProfile.showReAuth">
    </reAuth-->

  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  //
  import reAuth from '@/components/auth/reAuth.vue'
  //
  import loader from '@/components/gen/dropdownLoader'
  //
  import btnLoader from '@/components/gen/btnLoader'

  export default {
    methods:{
      ...mapMutations([
        'googleP',
        'fbP',
        'twitterP',
        //
        'updateUserDet'
      ])
    },
    created(){
      if(!this.$store.state.auth.isLoggedIn){
        this.$router.push('/')
      }
      window.thisOfVueComp = this
      //
      this.$store.commit('profile_checkIfLoggedIn')
      //
      if(this.$store.state.auth.isLoggedIn) //if loggedin
        this.$store.commit('getUserDet') //fetch user details
    },
    components:{
      loader,
      reAuth,
      btnLoader
    },
    computed:{
      ...mapGetters([
        'uDetLoader',
        //
        'uName',
        'uEmail',
        'uDob',
        'uPhone',
        'btnLoader'
      ])
    }
  }
</script>
<style>
  .google{
    background: #FA6803  ;
  }
  .min_height{
    min-height: 573px;
  }
</style>
