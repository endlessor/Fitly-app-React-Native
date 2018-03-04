<template>
  <div style="cursor:default">

    <loader v-if="dbRefLoader"></loader>
    <div v-else >
      <loader v-if="authLoader"></loader>
      <div v-else>
        <alert></alert>
          <i class="el-icon-warning btn_nav" v-if="!isEmailVerified && isLoggedIn" @click="$store.state.auth.resendEmail=true"></i>
        <div class="wrapper" >
          <header>
            <div class="top_strip">
              <div class="container text-center">
                <p @click="goTo('/cashback')">
                  <img src="/static/images/price.svg" alt="price">
                  Get 10% Cashback on all your purchases.
                  <img src="/static/images/arrow.svg" alt="price">
                  <a >Learn more</a>
                </p>
              </div>
            </div>

            <div class="container top_misc hidden-xs">
              <br>
              <div class="row">
                <div class="col-xs-4">
                  <p><img src="/static/images/pin-locate.svg" alt="pin-locate"><span>Mumbai, India</span></p>
                </div>

                <div class="hidden-xs col-xs-4">
                </div>

                <div class="col-xs-4 text-right head_drop">
                  <div class="dropdown">
                    <p class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <a >
                        <img src="/static/images/user-profile.svg" alt="user-profile">
                        <span v-if="!isLoggedIn">Login/Register</span>
                        <span  v-if="isLoggedIn">{{user.displayName}}</span>
                        <img  class="drop_arrow" src="/static/images/down.svg" alt="down">
                      </a>
                    </p>
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2" v-if="isLoggedIn">
                      <li><span>Your Account</span></li>
                      <li @click="goTo('/editProfile')"><a >Edit Profile</a></li>
                      <li><a @click="logout">Logout</a></li>
                    </ul>
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2" v-if="!isLoggedIn">
                      <li><span>Your Account</span></li>
                      <li @click="$store.state.auth.showLoginPopup=true; $store.state.particularProduct.selectedLink =''"><a >Login</a></li>
                      <li @click="$store.state.auth.showRegisterPopup=true"><a  >Create an Account</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="container top_main_area">
              <div class="row">
                <div class="col-sm-4 col-xs-12 pull-right text-right">
                  <button type="button" class="hamburger is-closed visible-xs" data-toggle="offcanvas" @click="hamburger_cross()">
                    <span class="hamb-top"></span>
                    <span class="hamb-middle"></span>
                    <span class="hamb-bottom"></span>
                  </button>
                  <a class="logo visible-xs" @click="goTo('/')"><img src="/static/images/logo.svg" alt="logo"></a>

                  <ul class="top_quick_links">
                    <li>
                      <a  v-if="isLoggedIn" @click="goTo('/wishlist')">
                        <img src="/static/images/wishlist.svg" alt="wishlist">
                        <span class="hidden-xs"  >Wishlist ({{wishlistCnt}})</span>
                      </a>
                      <a  v-if="!isLoggedIn"  @click="$store.state.auth.showLoginPopup = true"  >
                        <img src="/static/images/wishlist.svg" alt="wishlist">
                        <span class="hidden-xs"  >Wishlist </span>
                      </a>
                    </li>
                    <li class="sec">
                      <a  @click="goTo('/credit')" v-if="isLoggedIn" >
                        <span class="rupee" ><img src="/static/images/rupee.svg" alt="rupee" ></span>
                        <img src="/static/images/wallet.svg" alt="wallet">
                        <span class="hidden-xs">Kult Wallet</span>
                      </a>
                      <a  @click="$store.state.auth.showLoginPopup=true" v-else >
                        <span class="rupee" ><img src="/static/images/rupee.svg" alt="rupee" ></span>
                        <img src="/static/images/wallet.svg" alt="wallet">
                        <span class="hidden-xs">Kult Wallet</span>
                      </a>
                    </li>
                  </ul>
                </div>

                  <a @click="goTo('/')"  class="logo hidden-xs col-sm-1"
                     style="">
                    <img src="/static/images/logo.svg" alt="logo">
                  </a>
                  <search class="col-sm-7 col-xs-12 " style="margin-top: -5px;"></search>
              </div>
            </div>
            <br>
            <dropdown></dropdown>
            <nav class="navbar navbar-inverse navbar-fixed-top visible-xs" id="sidebar-wrapper" role="navigation">
              <ul class="nav sidebar-nav"  style="background-color: transparent; padding-top: 0">
                <v-expansion-panel style="background-color: black; padding-top:15px;">
                  <v-expansion-panel-content v-if="!isLoggedIn">
                    <div slot="header"  class="white ml_5" >LOGIN/REGISTER</div>
                    <v-card flat class="white" >
                      <v-card-text >
                        <li style="padding: 12px 12px 12px 30px" @click="hamburger_cross() ; $store.state.auth.showLoginPopup=true;$store.state.particularProduct.selectedLink =''" > LOGIN</li>
                      </v-card-text>
                      <v-card-text >
                        <li style="padding: 12px 12px 12px 30px" @click="hamburger_cross() ; $store.state.auth.showRegisterPopup=true  "> CREATE AN ACCOUNT</li>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel style="background-color: black">
                  <v-expansion-panel-content v-if="isLoggedIn" >
                    <div slot="header"  class="white ml_5" @click="goTo('/editProfile')">MY PROFILE</div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel style="background-color: black">
                  <v-expansion-panel-content v-if="isLoggedIn">
                    <div slot="header"  class="white ml_5" @click="logout">LOGOUT</div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel expand >
                  <v-expansion-panel-content class="first_level">
                    <div slot="header" class="ml_5">SHOP</div>
                    <v-card flat>
                      <v-card-text  class="">
                        <v-expansion-panel expand v-for="(shop,i) in Object.keys(shopOptions)">
                          <v-expansion-panel-content class="second_level">
                            <div slot="header" class="">{{shop}}</div>
                            <v-card flat>
                              <v-card-text  class="" >
                                <v-expansion-panel expand v-for="j in Object.keys(shopOptions[shop])">
                                  <v-expansion-panel-content class="third_level">
                                    <div slot="header" class="" @click="goTo(`/productCategory/${shop}/${j}`)">{{j}}</div>
                                    <v-card>
                                      <v-card-text class="" v-for="k in Object.keys(shopOptions[shop][j])">
                                        <div class="ml_20" v-if="k != 'DUMMY'" @click="goTo(`/productSubCategory/${shop}/${j}/${k}`)">{{k}}</div>
                                      </v-card-text>
                                    </v-card>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel expand>
                  <v-expansion-panel-content class="first_level">
                    <div slot="header" class='ml_5'>BRANDS</div>
                    <v-card flat>
                      <v-card-text class="">
                        <div style="padding: 12px 0 12px 30px" class="" @click="goTo('/brandAll')" >BRANDS A TO Z</div>
                        <!--v-expansion-panel >
                          <v-expansion-panel-content >
                          </v-expansion-panel-content>
                        </v-expansion-panel-->
                        <v-expansion-panel v-for="(shop,i) in Object.keys(brandCat)">
                          <v-expansion-panel-content class="second_level">
                            <div slot="header" class="">{{shop}}</div>
                            <v-card flat>
                              <v-card-text class="">
                                <div v-for="j in Object.keys(brandCat[shop])">
                                  <div>
                                    <div class="ml_20" @click="goTo(`/brandProduct/${j}`)">{{j}}</div>
                                  </div>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel  v-for="name in headerCatNames">
                  <v-expansion-panel-content v-if="name.name!=='BEAUTY GUIDE'" class="first_level">
                    <div slot="header"  class="ml_5"  @click="goTo(name.funcPath)">{{name.name}}</div>
                    <v-card flat v-if="name.name==='beauty guide'" >
                      <v-card-text v-for="guide in beautyGuideArr" class="ml_20">
                        {{guide}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                  <v-expansion-panel-content v-else class="first_level">
                    <div slot="header"  class="ml_5" >{{name.name}}</div>
                    <v-card flat >
                      <v-card-text v-for="(guide,i) in beautyGuideArr" @click="goTo('/bGuide/'+ beautyGuideArr[i])" class="bguide">
                        {{guide}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </ul>
            </nav>
          </header>
          <login_form></login_form>
          <signup_form></signup_form>
          <!--div id="opts">{{shopOptions}}</div-->
          <!--{{brandCat}}-->
          <!--div v-if="isLoggedIn">
            Email: {{user.email}} <br>  <!-- take whatever is needed ! -->
           <!-- Name: {{user.displayName}}
            <button @click="logout">
              LOGOUT
            </button>
          </div-->

          <div class="min_height">
            <router-view></router-view>
          </div>
          <br>

          <footer>
            <div class="container">
              <div class="row">
                <div class="col-sm-7 col-xs-12">
                  <div class="row">
                    <div class="col-md-3 col-xs-4">
                      <h4>KULT.IN</h4>
                      <ul class="foot_menu">
                        <li @click="goTo('/about')"><a >About Us</a></li>
                        <li @click="goTo('/contact')"><a >Contact us</a></li>
                        <li @click="goTo('/tnc')"><a >Terms of Cashback</a></li>
                        <li @click="goTo('/blog')"><a >Blog</a></li>
                      </ul>
                    </div>
                    <div class="col-md-3 col-xs-4">
                      <h4>Account</h4>
                      <ul class="foot_menu">
                        <li v-if="isLoggedIn" @click="goTo('/editProfile')"><a >My Account</a></li>
                        <li v-else @click="$store.state.auth.showLoginPopup=true"><a >My Account</a></li>
                        <li v-if="isLoggedIn" @click="goTo('/wishlist')"><a >Wishlist</a></li>
                        <li v-else @click="$store.state.auth.showLoginPopup=true"><a >Wishlist</a></li>
                        <li v-if="!isLoggedIn" @click="$store.state.auth.showRegisterPopup=true"><a >Register</a></li>
                      </ul>
                    </div>
                    <div class="col-md-3 col-xs-4">
                      <h4>Support</h4>
                      <ul class="foot_menu">
                        <li><a  href= "mailto:info@kult.in" target="_top">Info@Kult.In</a></li>
                        <li @click="goTo(`/howTo`)"><a >How to’s</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-sm-5 col-xs-12">
                  <div >
                    <h4><em>Gain expert advice for looking red-carpet ready  24/7.</em></h4>
                    <div v-if="!showNewsletterInput">
                      <el-input placeholder="Enter your email to subscribe"  disabled v-model="$store.state.gen.newsLetterEmail" class="input-with-select ">
                        <el-button slot="append" icon="fa fa-spinner fa-spin ></i>"></el-button>
                      </el-input>
                    </div>
                    <div v-if="showNewsletterInput">
                      <el-input placeholder="Enter your email to subscribe" v-model="$store.state.gen.newsLetterEmail" class="input-with-select ">
                        <el-button slot="append" icon="fa fa-arrow-right" @click="newsletter_saveEmail"></el-button>
                      </el-input>
                    </div>
                    <!--form>
                      <input type="text" placeholder="Enter your email to subscribe" v-model="$store.state.gen.newsLetterEmail" class="form-control">
                      <button @click="newsletter_saveEmail"><img src="/static/images/tail-right.svg" alt="tail-right"></button>
                    </form-->
                    <h6>Secure Payments</h6>
                    <img src="/static/images/group-18.svg" alt="payments">
                  </div>
                </div>
              </div>
              <hr>
              <div class="row copy_right">
                <div class="col-sm-3 col-xs-6">
                  <a href="/" class="foot_logo"><img src="/static/images/logo-white.svg" alt="logo"></a>
                </div>
                <div class="col-sm-3 text-right cust_center pull-right col-xs-6">
                  <ul class="foot_social list-unstyled list-inline">
                    <!--li><a  target="_blank"><i class="fa fa-facebook"></i></a></li-->
                    <li><a href="https://www.instagram.com/kult.in/" target="_blank"><i class="fa fa-instagram"></i></a></li>
                    <li><a href="https://goo.gl/UHWH1o" target="_blank"><i class="fa fa-youtube-play"></i></a></li>
                    <!--li><a  target="_blank"><i class="fa fa-twitter"></i></a></li-->
                  </ul>
                </div>
                <div class="col-sm-6 text-center col-xs-12">
                  <p>Copyright &copy; 2018 - All Right Reserved.</p>
                </div>
              </div>
            </div>
          </footer>
          <email-ver></email-ver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import "./js/jquery-ui.js"
  import './js/jquery.min.js'
  import './js/bootstrap.min.js'
  import './js/slick.min.js'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import loader from '@/components/gen/loader'
  import VExpansionPanel from "vuetify/es5/components/VExpansionPanel/VExpansionPanel";
  import VCard from "vuetify/es5/components/VCard/VCard";
  import login_form from '@/components/auth/login.vue'
  import signup_form from '@/components/auth/signup.vue'
  import btnLoader from '@/components/gen/btnLoader'
  import dropdown from '@/components/gen/headerDropdown.vue'
  import axios from 'axios'
  import emailVer from '@/components/auth/emailVer'
  import search from '@/components/search/search'
  import alert from '@/components/gen/alert'
  //
  //
  export default {
    data(){
      return{
        isClosed:false,
        sel:'MEN',
        headerCatNames:[
          {name:'KULT PICKS',funcPath:'/kultPick'},
          {name:'GLOBAL BESTSELLERS',funcPath:'/globalBestSeller'},
          {name:'BEAUTY GUIDE',funcPath:'/beautyGuide'},
          {name:`EDITO'S BLOG`,funcPath:'/blog'},
          {name:'KULT TV',funcPath:'/howTo'},
        ],
        input:'',
        dialogVisible:false,
        showdiv:false,
        beautyGuideArr:[
          'BLUSH',
          'CONTOURING',
          'HIGHLIGHTING',
          'MASCARAS',
          'NEUTRAL LIPS',
          'ACNE',
          'SKINCARE',
          'SUNSCREENS',
          'ANTIAGING'
        ]
      }
    },
    methods: {
      ...mapMutations([
        'goTo',
        'logout',
        'newsletter_saveEmail',
        'search',
        'getSearchDet',

      ]),
      hamburger_cross() {
        let vm = this
        var trigger = $('.hamburger')
        if (vm.isClosed) {
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          vm.isClosed = false;
        } else {
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          vm.isClosed = true;
        }
        $('.wrapper').toggleClass('toggled');
      },
    },
    computed:{
      ...mapGetters([
        'showNewsletterInput',
        'dbRefLoader',
        // SHOP DROPDOWN
        'shopOptions', // shop dropdown var
        'shopOptionLoader', //its true till shop dropdown is not loaded.
        // BRAND DROPDOWN
        'brandCat', // brand dropdown var
        'allBrandLoader' , //its true till brand dropdown is not loaded.
        //
        'user', //user object
        'isLoggedIn',
        //
        'authLoader',
        'showAuthPopup',
        'wishlistObj',
        'wishlistCnt',
        'searchList',
        'selectedLink',
        'isEmailVerified'
      ])
    },
    components:{
      VCard,
      VExpansionPanel,
      loader,
      login_form,
      signup_form,
      btnLoader,
      dropdown,
      emailVer,
      search,
      alert
    },
    watch:{
      $route:function () {
        this.$store.state.auth.showLoginPopup=false
        this.$store.state.auth.showRegisterPopup=false
        this.$store.state.auth.showRefCode=false
      }
    },
    created(){
      window.thisOfAppNav=this
      window.thisOfAppComp= this
      window.thisOfVueComp_2 = this
      this.$store.commit('getGlobalBestSellersOnHomePage')
      this.$store.commit('getJustArrivedOnHomePage')
      //
      //
      let sH
      //
      var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      console.log("iOS => ", iOS)
      if(iOS) {
        var iw = (iOS) ? screen.width : window.innerWidth, ih = (iOS) ? screen.height : window.innerHeight;
        console.log("iW => ", iw)
        sH = iw
      }else{
        console.log(window.innerWidth)
        sH = window.innerWidth
      }

      if(sH <= 1024){
        this.$store.state.gen.screenW = '80%'
      }else{
        this.$store.state.gen.screenW = '40%'
      }


      //this.$store.state.gen.screenW = '40%'

    },
    updated(){
      this.$store.commit('getLoginStatus')
    }

  }
</script>
<style>
  @import './assets/css/bootstrap.min.css';
  @import '../node_modules/element-ui/lib/theme-chalk/index.css';
  @import './assets/css/bootstrap.css';
  @import './assets/css/style.css';
  @import './assets/css/slick.css';
  @import './assets/css/slick-theme.css';
  @import './assets/css/jquery-ui.css';
  @import './assets/css/jquery.fancybox.css';
  @import './assets/cssLib/googleFont.css';
  @import './assets/css/font-awesome.min.css';
  @import './assets/css/style-overwritten.css';
  li.expansion-panel__container.first_level.expansion-panel__container--active{
    background-color: #FDE0E2;
  }
  li.expansion-panel__container.second_level.expansion-panel__container--active{
    background-color: #FCEAEA;
  }
  li.expansion-panel__container.third_level.expansion-panel__container--active{
    background-color: #FFF6F7;
  }
  .expansion-panel__header{
    padding:12px;
  }
  .second_level > .expansion-panel__header{
    background-color: #FCEAEA;
    padding-left: 30px;
  }
  .third_level > .expansion-panel__header{
    background-color: #FFF6F7;
    padding-left: 40px;
  }
  .ml_20 {
    margin-left: 40px;
    padding: 10px;
  }
  .sidebar-nav li:before{
    background-color: transparent;
  }
  .card__text{
    padding: 0;
  }
  .card__text.bguide{
    padding: 12px 12px 12px 30px;
  }
  .opts{
    display: none;
  }
  .opts:hover .sub_opt{
    display: block;
    float: right;
    margin-left: 30px;
  }
  .shop:hover .opts{
    display: block;
    top: 0;
    left: 100%;
    margin-top: -1px;
  }
  .cat{
    display: none;
  }
  .sub_opt{
    display: none;
  }

  .min_height{
    min-height: 300px;
  }
  .white{
    color:white
  }
  .ml_5{
    margin-left: 5px;
  }
  .row.make-columns {
    -moz-column-width: 19em;
    -webkit-column-width: 19em;
    -moz-column-gap: 1em;
    -webkit-column-gap:1em;
    border-color: transparent;

  }
  .shop_child{
    display: none;
  }

  .shop_pa:hover .shop_child{
    display: block;
    top: 0;
    left: 100%;
    margin-top: -1px;
    padding: 40px;
  }
  .row.make-columns > div {
    display: inline-block;
    padding:  .5rem;
    width:  100%;
  }

  /* demo only* */
  .panel {
   /* box-shadow: 0 0px 0px rgba(0,0,0,0) ! important ;*/
    height: 100%;
    width:  100%;

  }


  .pre-icon {
    width: 32px !important;
    height: 32px !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    -webkit-animation: rotating 1s linear infinite !important;
    -moz-animation: rotating 1s linear infinite !important;
    -ms-animation: rotating 1s linear infinite !important;
    -o-animation: rotating 1s linear infinite !important;
    animation: rotating 1s linear infinite !important;
  }
  .top_strip {
    background-color: #f31d28;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33;
    letter-spacing: 1.5px;
    color: #ffeef2;
    padding: 3px 0;
    height: 20px !important;
    z-index: 3 ;
  }
.btn_nav{
  float: right;
  font-size: 20px;
  padding: 10px;
}
  .float-right{
    float: right;
  }

  /*** nav ***/
  .menu > ul li a[data-v-efba1426], .xs-menu li a[data-v-efba1426] {
    text-decoration: none;
    color: #fff;
    display: block;
    padding: 0px 2vh ! important;
  }

</style>

