<template>
  <div>



<div>
  <!-- {{screenW}} -->
  <el-dialog
    :width="screenW"
    :visible.sync="$store.state.auth.showLoginPopup"
  >
    <div class="for_mobile">
      <div >
        <div v-if="showRefCode"  v-show="isRefGiven=='f'" class="modal-content comm_modal" >
          <h2 >Enter Your Phone Number</h2>
          <phone-ref v-if="showRefCode" v-show="isRefGiven=='f'"></phone-ref>
        </div>
        <div class="modal-content comm_modal " v-else>
          <button type="button" class="modal_close" @click="$store.state.auth.showLoginPopup=false" aria-label="Close"><img src="/static/images/close.svg" alt="close"></button>
          <div  class=" modal_left">
            <h2 v-if="!showRefCode">Enter your account</h2>

            <div class="login_form" v-if="!showForgot && !showRefCode">
              <input type="text" placeholder="Email"  v-model="$store.state.auth.email" class="form-control">
              <input type="text" placeholder="Enter password"  v-model="$store.state.auth.password" class="form-control">
              <button class="login_btn"
                      v-if="loginBtnLoader"
              >
                <i class='fa fa-spinner fa-spin ' ></i>
              </button>
              <button class="login_btn"
                      v-else
                      @click="emailPasswordLogin({
                        email: $store.state.auth.email,
                        password: $store.state.auth.password
                      })"
              >
                <span> Login </span>
              </button>
            </div>
            <p class="forgot_pass" @click="$store.state.auth.showForgot=true,$store.state.auth.showRefCode=false" v-if="!showForgot && ! showRefCode"><a >Forgot password?</a></p>
            <forgot v-if="showForgot && !showRefCode"></forgot>
          </div>
          <div class="modal_right">
            <img src="/static/images/login.png" alt="image">
            <div class="login_social" v-if="!showRefCode">
              <p>Enter via</p>
              <div class="connect_social text-center">
                <a class="fb"
                   @click="fbP({
                      todo: 'login'
                    })">
                  <i class="fa fa-facebook"></i>LOGIN</a>
                <!--a class="twitter"
                   @click="twitterP({
                    todo:'login'
                  })"
                ><i class="fa fa-twitter"></i>LOGIN</a-->
                <a class="google"
                   @click="googleP({
                    todo:'login'
                  })"
                ><i class="fa fa-google"></i>LOGIN</a>
              </div>
            </div>
            <div class="reg_cont" v-if="!showRefCode">
              <p  v-if="selectedLink === ''">
                New to Kult? <br>
                <a @click="$store.state.auth.showLoginPopup= false, $store.state.auth.showRegisterPopup= true">Join Kult</a>
              </p>
              <p style="margin-bottom: 50px"  v-if="selectedLink !== ''">
                New to Kult? <br>
                <a @click="$store.state.auth.showLoginPopup= false, $store.state.auth.showRegisterPopup= true">Join Kult</a>
              </p>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="splash-banner"  v-if="selectedLink !== ''">
          <a  @click="emptySelLink()">
            <span class="splash-banner-title lightbox-custom-closer" >CONTINUE WITHOUT LOG IN AND LOSE CASHBACK</span>
          </a>
        </div>
      </div>
    </div>
  </el-dialog>
</div>
<!--div class="visible-xs">
      <el-dialog
        width="60%"
        :visible.sync="$store.state.auth.showLoginPopup"
      >
        <div class="for_mobile">
          <div >
            <div v-if="showRefCode" class="modal-content comm_modal" >
              <h2 >Enter Your Phone Number</h2>
              <phone-ref v-if="showRefCode " v-show="!isRefGiven"></phone-ref>
            </div>
            <div class="modal-content comm_modal " v-else>
              <button type="button" class="modal_close" @click="$store.state.auth.showLoginPopup=false" aria-label="Close"><img src="/static/images/close.svg" alt="close"></button>
              <div  class=" modal_left">
                <h2 v-if="!showRefCode">Enter your account</h2>

                <div class="login_form" v-if="!showForgot && !showRefCode">
                  <input type="text" placeholder="Email"  v-model="$store.state.auth.email" class="form-control" style="z-index: 2!important;">
                  <input type="text" placeholder="Enter password"  v-model="$store.state.auth.password"  class="form-control" style="z-index: 2!important;">
                  <button class="login_btn"
                          v-if="loginBtnLoader"
                  >
                    <i class='fa fa-spinner fa-spin ' ></i>
                  </button>
                  <button class="login_btn"
                          v-else
                          @click="emailPasswordLogin({
                        email: $store.state.auth.email,
                        password: $store.state.auth.password
                      })"
                  >
                    <span> Login </span>
                  </button>
                </div>
                <p class="forgot_pass" @click="$store.state.auth.showForgot=true,$store.state.auth.showRefCode=false" v-if="!showForgot && ! showRefCode"><a >Forgot password?</a></p>
                <forgot v-if="showForgot && !showRefCode"></forgot>
              </div>
              <div class="modal_right">
                <img src="/static/images/login.png" alt="image">
                <div class="login_social" v-if="!showRefCode">
                  <p>Enter via</p>
                  <div class="connect_social text-center">
                    <a class="fb"
                       @click="fbP({
                      todo: 'login'
                    })">
                      <i class="fa fa-facebook"></i>LOGIN</a>
                    <a class="twitter"
                       @click="twitterP({
                    todo:'login'
                  })"
                    ><i class="fa fa-twitter"></i>LOGIN</a>
                  </div>
                </div>
                <div class="reg_cont" v-if="!showRefCode">
                  <p  v-if="selectedLink === ''">
                    New to Kult? <br>
                    <a @click="$store.state.auth.showLoginPopup= false, $store.state.auth.showRegisterPopup= true">Join Kult</a>
                  </p>
                  <p style="margin-bottom: 50px"  v-if="selectedLink !== ''">
                    New to Kult? <br>
                    <a @click="$store.state.auth.showLoginPopup= false, $store.state.auth.showRegisterPopup= true">Join Kult</a>
                  </p>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="splash-banner"  v-if="selectedLink !== ''">
              <a :href="selectedLink" target="_blank" @click="emptySelLink()">
                <span class="splash-banner-title lightbox-custom-closer" >CONTINUE WITHOUT LOG IN AND LOSE CASHBACK</span>
              </a>
            </div>
          </div>
        </div>
      </el-dialog>
    </div-->



   <!-- EMAIL PASSWORD LOGIN =>
    <input
      v-model="$store.state.auth.email"
      placeholder="Email"
    />

    <input
      v-model="$store.state.auth.password"
      placeholder="Password"
    />

    <button
      @click="emailPasswordLogin({
        email: $store.state.auth.email,
        password: $store.state.auth.password
      })"
    >
      LOGIN
    </button> <br>

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
    </button-->

  </div>
</template>

<script>
  import axios from 'axios'
  import phoneRef from './phoneRef.vue'
  import forgot from './forgotPassword.vue'
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  import btnLoader from '@/components/gen/btnLoader'
  //
  export default {
    components:{
      forgot,
      phoneRef,
      btnLoader
    },
    computed:{
      ...mapGetters([
        'showForgot',
        'showAuthPopup',
        'showRefCode',
        'showLoginPopup',
        'loginBtnLoader',
        'selectedLink',
        'isRefGiven',
        'screenW',
      ])
    },
    methods:{
      ...mapMutations([
        'afterLogin_userDetail',
        'googleP',
        'fbP',
        'twitterP',
        //
        'emailPasswordLogin'
      ]),
      emptySelLink(){
          this.$store.state.auth.showLoginPopup =false
        setTimeout(()=>{
          window.open(this.$store.state.particularProduct.selectedLink, '_blank');
          this.$store.state.particularProduct.selectedLink =''
        },100)
      },
    },
    created(){

    }
  }
</script>
<style scoped>
  .google{
    background: #FA6803  ;
  }
  .comm_modal::after {
    visibility: hidden !important;
    position: absolute;
    left: 50%;
    height: 100%;
    top: 0;
    content: "";
    width: 7px;
    margin-left: -4px;
    background: #fff;
  }
  .comm_modal::before {
    visibility: hidden !important;
    position: absolute;
    left: 50%;
    height: 100%;
    top: 0;
    content: "";
    width: 7px;
    margin-left: -4px;
    background: #fff;
  }
  .splash-banner {
    background: #1b70d3;
    position: absolute;
    bottom: 20px;
    left: -15px;
    width: 95%;
    text-align: center;
    z-index: 12000;
  }

  .splash-banner-title {
    color: #fff;
    font-weight: 700;
    padding: 12px;
    font-size: 12px;
    font-style: italic;
    display: block;
  }

  .splash-banner:before {
    content: '';
    display: block;
    position: absolute;
    bottom: -15px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 15px 0;
    border-color: transparent #074778 transparent transparent;
  }
  .splash-banner:after {
    content: '';
    display: block;
    position: absolute;
    right: -20px;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 43px 20px 0 0;
    border-color: #1b71d3 transparent transparent transparent;
  }
  .el-dialog__body {
     padding: 0px 0px !important;
    /* color: #606266; */
     line-height: 18px !important;
    font-size: 14px;
  }
  .el-dialog__header {
    padding: 0px 0px 0px !important;
  }
  .v-modal {
    z-index: 0 !important;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
  }


</style>
