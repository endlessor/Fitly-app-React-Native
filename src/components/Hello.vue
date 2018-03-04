<template>
  <div>

    <div class="home_hero2">
      <div class="container2">
        <img src="/static/images/homeBanners/Desktop/beautyfulricher-desktop.jpg" class=" hidden-xs " @click="$router.push('kultPick/shopOption/MAKEUP')">
        <img src="/static/images/homeBanners/Mobile/beautyfulricher-mobile.jpg" class="visible-xs " @click="$router.push('kultPick/shopOption/MAKEUP')">
      </div>
    </div>
    <div class="intro_list">
      <div class="container">
        <ul>
          <li>
            <img src="/static/images/wallet-2.svg" alt="wallet">
            <strong>Shop beauty</strong>
            Assorted products to choose from
          </li>
          <li>
            <img src="/static/images/price-1.svg" alt="price">
            <strong>The best price</strong>
            Compare and get the best price
          </li>
          <li>
            <img src="/static/images/thumbs-up.svg" alt="thumbs-up">
            <strong>Trusted vendor</strong>
            Top rated sellers based on reviews
          </li>
          <li>
            <img src="/static/images/protect.svg" alt="protect">
            <strong>Customer protection</strong>
            Over   6,500 purchases is protected
          </li>
        </ul>
      </div>
    </div>
    <div class="container text-center">
      <div class="top_tags">
        <h3>Trending Searches</h3>
        <ul>
          <li @click="$router.push('/productCategory/BATH AND BODY/BODY MOISTURIZERS')"><a >Body Moisturizer</a></li>
          <li @click="$router.push('/productSubCategory/MEN/FRAGRANCE/PERFUMES')"><a >Men’s Perfume</a></li>
          <li @click="$router.push('/productSubCategory/MAKEUP/ACCESSORIES/MAKE UP REMOVER')"><a >Makeup Remover</a></li>
          <li @click="$router.push('/productSubCategory/MAKEUP/LIPS/LIPGLOSS')"><a >Glossy Lipstick</a></li>
          <li @click="$router.push('/productSubCategory/HAIR/HAIR TOOLS/HAIR DRYERS')"><a >Hair Dryers</a></li>
          <li @click="$router.push('/productSubCategory/MAKEUP/EYES/EYESHADOW')"><a >Eye Shadows</a></li>
          <li @click="$router.push('/productSubCategory/MAKEUP/LIPS/LIP TREATMENT')"><a >Lip Sunscreen</a></li>
          <li @click="$router.push('/productSubCategory/HAIR/SHAMPOO & CONDITIONER/DRY SHAMPOO')"><a >Dry Shampoo</a></li>
        </ul>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="comm_product_list">
      <div class="container text-center">
        <div class="comm_title" @click="goTo('/globalBestseller')">
          <h3>Global Best Sellers</h3>
          <a >Browser all <img src="/static/images/right-arrow-1.svg" alt="arrow" ></a>
        </div>
        <div >
          <div >
            <open :loopObj="homeGlobalProd" :md_lg_val="6"></open>
          </div>
        </div>
      </div>
    </div>
    <div class="home_intro">
      <div>
        <img class="main_img hidden-xs" style="height:390px" src="/static/images/homeBanners/Desktop/Kultpick%20Banner%20Scriptscale(1).jpg" alt="hero" @click="$router.push('/kultPick')">
        <img class="main_img visible-xs"  src="/static/images/homeBanners/Mobile/kultpics_mobile_30k.jpg" alt="hero"  @click="$router.push('/kultPick')">
      </div>
    </div>
    <div class="home_high" @click="$router.push('/bGuide/skincare')">
      <div class="container">
        <div class="row">
          <div class="col-sm-5 col-xs-12">
            <div class="high_cont">
              <h2>Skincare</h2>
              <p>
                Weve handpicked products to maintain and
                improve your skin whatever your stage in life.
                Select your age to get started.
              </p>
              <a class="more_btn">SHOP NOW</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--div-- class="visible-xs" @click="$router.push('/bGuide/SKINCARE')">
      <div class="container" style="width: 100% !important;height: 100% !important;">
        <div class="row">
          <div class="col-sm-6 col-xs-12" style="padding:0px">
            <img src="/static/images/homeBanners/Desktop/skincareallages-desktop.jpg" style="height: 400px" class="hidden-xs">
            <img src="/static/images/homeBanners/Mobile/skincareallages-mobile.jpg" style="height: 400px" class="visible-xs">
          </div>
        </div>
      </div>
      <img src="/static/images/cashback-5@2x.jpg" style="height: 400px" @click="$router.push('/cashback')">
    </div-->
    <div class="home_cats">
      <div class="container-fluid text-center">
        <div class="comm_title" @click="$router.push('/brandAll')">
          <h3>Most Selling</h3>
          <a >Browser all <img src="/static/images/right-arrow-1.svg" alt="arrow"></a>
        </div>
        <ul class="maincats_list">
          <li @click="$router.push(`productSubCategory/MAKEUP/FACE/COLOR CORRECT`)">
            <a >
              <img src="/static/images/catBanners/shop-cheeks.jpg" alt="item">
            </a>
          </li>
          <li @click="$router.push(`productCategory/MAKEUP/EYES`)">
            <a >
              <img src="/static/images/catBanners/shop-eyes.jpg" alt="item">
            </a>
          </li>
          <li @click="$router.push(`productCategory/MAKEUP/FACE`)">
            <a >
              <img src="/static/images/catBanners/shop-face.jpg" alt="item">
            </a>
          </li>
          <li @click="$router.push(`productCategory/MAKEUP/LIPS`)">
            <a >
              <img src="/static/images/catBanners/shop-lips.jpg" alt="item">
            </a>
          </li>
          <li @click="$router.push(`productCategory/MAKEUP/NAILS`)">
            <a >
              <img src="/static/images/catBanners/shop-nails.jpg" alt="item">
            </a>
          </li>
          <li @click="$router.push(`globalBestSeller/shopOption/SKINCARE`)">
            <a >
              <img src="/static/images/catBanners/shop-scincare.jpg" alt="item">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="news_subscribe">
      <div class="container text-center">
        <div class="subscribe_box">
          <div class="subscribe_cont">
            <img src="/static/images/gifts.svg" alt="gifts">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get Sale Alerts and Free Expert Insider’s Guide to Best Beauty Buys</p>
          </div>
          <div class="subscribe_form">
            <div class="row">
              <div class="col-xs-4 text-left">
                <label class="check_item">Latest products</label>
              </div>
              <div class="col-xs-4 text-center">
                <label class="check_item">Weekly news</label>
              </div>
              <div class="col-xs-4 text-right">
                <label class="check_item">Monthly digest</label>
              </div>
            </div>
            <div class="fields">
              <input type="text" placeholder="E-mail address"  v-model="$store.state.gen.newsLetterEmail" class="form-control">
              <button @click="newsletter_saveEmail"><img src="/static/images/send-now.svg" alt="send-now"></button>
            </div>
            <p class="sm">Every month our subscribers get awesome updates</p>
          </div>
        </div>
      </div>
    </div>
    <div class="comm_product_list">
      <div class="container text-center">
        <div class="comm_title" @click="$router.push('/kultPick')">
          <h3>Just Arrived</h3>
          <a >Browser all <img src="/static/images/right-arrow-1.svg" alt="arrow"></a>
        </div>
        <div >
          <div >
            <open :loopObj="homeJustArrived" :md_lg_val="6"></open>
          </div>
        </div>
      </div>
    </div>
    <div class="home_impcats">
      <div class="container" >
        <div class="row">
          <div class="col-md-6 col-xs-12 col-sm-6  comm_imp" @click="$router.push('/howTo?selVidCat=NAILS')">
            <div class="image_box" style="height: 275px !important;">
            <img class="hidden-xs hidden-sm" style="height: 275px !important;" src="/static/images/video%20banners/Desktop/01.jpg" alt="player">
             <img class="visible-xs visible-sm" style="height: 275px !important;" src="/static/images/video%20banners/Mobile/01mobile.jpg" alt="player">
            </div>
          </div>
          <div class="col-md-6 col-xs-12 col-sm-6  comm_imp" @click="$router.push('/howTo?selVidCat=MAKEUP')">
            <div class="image_box" >
             <img class="hidden-xs hidden-sm"  style="height: 275px !important; " src="/static/images/video%20banners/Desktop/02.jpg" alt="player">
             <img class="visible-xs visible-sm" style="height: 275px !important; "src="/static/images/video%20banners/Mobile/02mobile.jpg" alt="player">
            </div>
          </div>
          <div class="col-md-6 col-xs-12 col-sm-6 comm_imp" @click="$router.push('/howTo?selVidCat=MAKEUP')">
            <div class="image_box" style="height: 275px !important;">
            <img class="hidden-xs hidden-sm"  style="height: 275px !important;" src="/static/images/video%20banners/Desktop/03.jpg" alt="player">
              <img class="visible-xs visible-sm" style="height: 275px !important;" src="/static/images/video%20banners/Mobile/03mobile.jpg" alt="player">
            </div>
          </div>
          <div class="col-md-6 col-xs-12 col-sm-6 comm_imp" @click="$router.push('/howTo?selVidCat=HAIR')">
            <div class="image_box" style="height: 275px !important;">
              <img  class="hidden-xs hidden-sm" style="height: 275px !important;" src="/static/images/video%20banners/Desktop/04.jpg" alt="player">
             <img class="visible-xs visible-sm" style="height: 275px !important;" src="/static/images/video%20banners/Mobile/04mobile.jpg" alt="player">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="customer_review">
      <div class="container text-center">
        <div class="review_box">
          <h3>Customer Reviews</h3>
          <ul class="list-unstyled list-inline">
            <li><img src="/static/images/rating-stars.svg" alt="rating"></li>
            <li><strong>Best Price Ever</strong></li>
          </ul>
          <p>
            I love the way the way they lay out the price comparison and very quick to make decision and order right away.
            I’m not a huge make-up wearer so this is great for me. I will definitely recommend Kult  to my friends.  Thank you!
          </p>
          <div class="tweet_box">
            <a class="twitter_link" ><img src="/static/images/logo-twitter.svg" alt="twitter"></a>
            <img src="/static/images/helen-p@2x.jpg" alt="helen">
            <p>
              <strong>Helen Parker</strong>
              Mumbai, India.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="insta_sec">
      <div class="container text-center">
        <h3>Shop Our Instagram</h3>
        <a class="insta_outlink"  target="_blank"><img src="/static/images/instagram.svg" alt="instagram"> @kult.in</a>
        <p style="visibility: hidden">dskfn</p>
        <div>
          <div class="col-lg-1 visible-lg"></div>
          <div class="col-lg-2 visible-lg"  v-for="i in slider">
            <div class="hovereffect">
              <img class="img-responsive" :src="i.img"  alt="">
              <div class="overlay" >
                <a class="info" target="_blank" :href="i.url">OPEN</a>
              </div>
            </div>
          </div>
          <div class="col-lg-1 visible-lg"></div>
        </div>

        <div>
          <div class="col-xs-1 visible-xs"></div>
          <div class="col-xs-2 visible-xs"  v-for="i in slider">
            <div class="hovereffect">
              <img target="_blank" @click="openInNewTab(i.url)" class="img-responsive" :src="i.img"  alt="">
            </div>
          </div>
          <div class="col-xs-1 visible-xs"></div>
        </div>

        <div class="client_logo">
          <img class="hidden-xs" src="/static/images/brands.svg" alt="brands">
          <img class="visible-xs" src="/static/images/brands-mobile.svg" alt="brands">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import open from '@/components/openTabProd'
  import rating from '@/components/rating'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  export default {
    data(){
      return{
        slider:[
          {img: "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s320x320/sh0.08/e35/23970197_148114855948390_3288466028287229952_n.jpg",
            url: 'https://www.instagram.com/p/BcCc95wlGew/'},
          {img: "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s320x320/sh0.08/e35/24174861_1440082859374873_8749213935208497152_n.jpg",
            url: 'https://www.instagram.com/p/BcBuS-fFbp0/'},
          {img:  "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s320x320/sh0.08/e35/24126740_168923103843096_6886462610066112512_n.jpg",
            url: 'https://www.instagram.com/p/Bb9uN_cFIy0/'},
          {img:"https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/s320x320/23966995_195058901040355_3087356804582080512_n.jpg",
            url: 'https://www.instagram.com/p/Bb7BffqFf6M/'},
          {img: "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s320x320/sh0.08/e35/23967206_154084275216421_5255013097927606272_n.jpg",
            url: 'https://www.instagram.com/p/Bb6TMQxlYua/'},
        ]
      }
    },
    methods: {
      ...mapMutations([
        'goTo',
        'newsletter_saveEmail',
        'addWishlist',
        'removeWishlist'
      ]),
      openInNewTab(url){
        window.open(
          url,
          '_blank' // <- This is what makes it open in a new window.
        );
      }
    },
    created(){

    },
    components:{
      rating,
      open
    },
    computed:{
      ...mapGetters([
        'isLoggedIn',
        'wishlistObj',
        'homeGlobalProd',
        'homeJustArrived'

      ])
    }
  }
</script>
<style scoped>
  .prod_compare {
    padding-bottom: 24px;
    /* padding-right: 15px; */
  }
  .insta_sec {
    padding: 40px 0;
    max-height: 700px !important;
  }

  .hovereffect {
    width:100%;
    height:100%;
    float:left;
    overflow:hidden;
    position:relative;
    text-align:center;
    cursor:default;
  }

  .hovereffect .overlay {
    width:100%;
    height:100%;
    position:absolute;
    overflow:hidden;
    top:0;
    left:0;
    opacity:0;
    background-color:rgba(0,0,0,0.5);
    -webkit-transition:all .4s ease-in-out;
    transition:all .4s ease-in-out
  }

  .hovereffect img {
    display:block;
    position:relative;
    -webkit-transition:all .4s linear;
    transition:all .4s linear;
  }

  .hovereffect h2 {
    text-transform:uppercase;
    color:#fff;
    text-align:center;
    position:relative;
    font-size:17px;
    background:rgba(0,0,0,0.6);
    -webkit-transform:translatey(-100px);
    -ms-transform:translatey(-100px);
    transform:translatey(-100px);
    -webkit-transition:all .2s ease-in-out;
    transition:all .2s ease-in-out;
    padding:10px;
  }

  .hovereffect a.info {
    text-decoration:none;
    display:inline-block;
    text-transform:uppercase;
    color:#fff;
    border:1px solid #fff;
    background-color:transparent;
    opacity:0;
    filter:alpha(opacity=0);
    -webkit-transition:all .2s ease-in-out;
    transition:all .2s ease-in-out;
    margin:50px 0 0;
    padding:7px 14px;
  }

  .hovereffect a.info:hover {
    box-shadow:0 0 5px #fff;
  }

  .hovereffect:hover img {
    -ms-transform:scale(1.2);
    -webkit-transform:scale(1.2);
    transform:scale(1.2);
  }

  .hovereffect:hover .overlay {
    opacity:1;
    filter:alpha(opacity=100);
  }
  .hovereffect:hover h2,.hovereffect:hover a.info {
    opacity:1;
    filter:alpha(opacity=100);
    -ms-transform:translatey(0);
    -webkit-transform:translatey(0);
    transform:translatey(0);
  }

  .hovereffect:hover a.info {
    -webkit-transition-delay:.2s;
    transition-delay:.2s;
  }
  .float{
    float: left;
  }
  .home_intro .main_img {
    position: relative;
    width: 100% !important;
  }
  .container2{
    width: 100%;
    padding: 0px;
  /* height: 100%; */
  }
  .home_hero2 {
    /* padding: 94px 0 84px; */
    background-color: #ffffff;
    position: relative;
    margin-bottom: 60px;
    /* background-image: url(../images/girl-model@2x.jpg), url(../images/cosmetics@2x.jpg); */
    background-position: left center, 99% center;
    -webkit-background-size: 640px, 440px;
    background-size: 640px, 440px;
    background-repeat: no-repeat;
  }

</style>
