<template>
  <div>


    <el-dialog
      :visible.sync="$store.state.auth.showRegisterPopup"
      :width="screenW"
    >
      <div>
        <div>
          <div v-if="showRefCode" class="modal-content comm_modal" >
            <h2 >Enter Your Phone Number</h2>
            <phone-ref v-if="showRefCode " ></phone-ref>
          </div>
        <div class="modal-content comm_modal" v-else>
          <div class="reg_pop"><img src="/static/images/arrow-down.svg" alt="arrow-down"> Register in a few easy steps</div>
          <button type="button" class="modal_close" @click="$store.state.auth.showRegisterPopup=false" aria-label="Close"><img src="/static/images/close.svg" alt="close"></button>
          <div class="modal_left">
            <h2>Join Kult.</h2>
            <ul class="list-unstyled reg_steps">
              <li class="active"><a >Let’s start with your email</a></li>
              <li class="active"><a >What name do you go by</a></li>
              <li class="active"><a >OK, let’s get you protected</a></li>
              <li class="active"><a  >You’re done!</a></li>
            </ul>
            <h4>Want to speed things up?</h4>
            <div class="right_modalform">
              <div class="">
                <div class="signup_form">
                  <div id="right_tab1"class="signup_form" >
                    <input type="text" placeholder="Enter email address" v-model="$store.state.auth.email" class="form-control">
                  </div>
                  <div id="right_tab2" class="signup_form">
                    <input type="text" placeholder="Enter Name" v-model="$store.state.auth.name" class="form-control">
                  </div>
                  <div id="right_tab3" class="signup_form">
                    <input type="text" placeholder="Enter password"  v-model="$store.state.auth.password" class="form-control">
                  </div>

                  <div id="right_tab5" class="signup_form">
                    <input v-model="$store.state.auth.dob" class="form-control textbox-n" placeholder="Enter Date Of Birth"  type="text" onfocus="(this.type='date')"  onblur="(this.type='text')" id="date">
                  </div>
                  <div id="right_tab4" class="signup_form">
                    <button   class="login_btn mt_30 "
                      v-if="btnLoader"
                    >
                      <i class='fa fa-spinner fa-spin ' ></i>
                    </button>
                    <button   class="login_btn mt_20 "
                              v-else
                               @click="emailPasswordSignup({
                                email: $store.state.auth.email,
                                password: $store.state.auth.password,
                                //
                                name: $store.state.auth.name,
                                //
                                dob: $store.state.auth.dob
                              }) "
                    >
                      DONE!
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="connect_social">
              <a class="fb"
                 @click="fbP({
                      todo: 'login'
                    })"
              >
                <i class="fa fa-facebook"></i>
                LOGIN
              </a>
              <a class="google"
                 @click="googleP({
                      todo: 'login'
                    })"
              >
                <i class="fa fa-google"></i>
                LOGIN
              </a>
            </div>
            <a @click="$store.state.auth.showLoginPopup= true, $store.state.auth.showRegisterPopup= false" class="modal_login_link">Login with email</a>
          </div>
          <div class="modal_right" >
            <div class="top_mod_strip"><i class="fa fa-angle-left"></i> Join with email</div>
          </div>
          <div class="clearfix"></div>
        </div>
        </div>
      </div>
   <!-- EMAIL PASSWORD LOGIN => <br>
    <input
      v-model="$store.state.auth.email"
      placeholder="Email"
    /> <br>

    <input
      v-model="$store.state.auth.password"
      placeholder="Password"
    /> <br>

    <input
      placeholder="Name"
      v-model="$store.state.auth.name"
    /> <br>

    <input
      placeholder="Date of Birth"
      v-model="$store.state.auth.dob"
    /> <br>

    <input
      placeholder="Phone Number"
      v-model="$store.state.auth.phone"
    /> <br>

    <button
      @click="emailPasswordSignup({
        email: $store.state.auth.email,
        password: $store.state.auth.password,
        //
        name: $store.state.auth.name,
        //
        dob: $store.state.auth.dob,
        //
        phone: $store.state.auth.phone
      })"
    >
      SIGNUP
    </button> <br-->
    </el-dialog>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  import phoneRef from './phoneRef.vue'
  //
  export default {
    data(){
     return{
       modal:''
     }
    },
    components:{
      phoneRef
    },
    computed:{
      ...mapGetters([
        'closeAuthDialog',
        'btnLoader',
        'screenW',
        'showRefCode',
      ])
    },
    methods:{
      ...mapMutations([
        'emailPasswordSignup',
        'fbP',
        'twitterP',
        'googleP'
      ]),
    }
  }
</script>
<style>
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
  .google{
    background: #FA6803  ;
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
  .signup_form{
    margin-top: 20px;
  }
  .mt_20{

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

</style>
