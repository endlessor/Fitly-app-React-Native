<template>
  <div>


    <div class="banner_strip"></div>
    <div class="comm_pagebreads">

      <div class="container" >
        <div >
          <div class="row">
            <div class="col-sm-5 col-xs-12 comm_page_title">
              <span>Welcome</span>
              <h2>Kult TV</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tv_area">
      <div class="container">
        <div class="max_width">
          <div class="tv_left">
            <div class="howto">HOW TO’S</div>
            <ul v-for="(vidCatDet ,vidCatName) in howToCat" >
              <li @click="getHowToCatVid({howToCat: vidCatName })" v-if=" $route.query.selVidCat == vidCatName " class="active">
                <a>
                  <span >{{vidCatName}}</span>
                  <!--span v-else>{{vidCatName}}</span-->
                </a>
              </li>
              <li @click="getHowToCatVid({howToCat: vidCatName })" v-else>
                <a >
                  <span >{{vidCatName}}</span>
                  <!--span v-else>{{vidCatName}}</span-->
                </a>
              </li>
            </ul>
          </div>
          <div class="tv_right min_height">
            <loader v-if="howToVidLoader"></loader>
            <div class="row" v-else>
              <div class="col-md-6 col-xs-12 comm_imp col-lg-6" v-for="(vidDet, vidName) in howToVid" style="height: 285px;"

              >
                <div class="image_box hidden-xs" data-toggle="modal" data-target="#videoModal" @click="getCatVidProduct({vidCat: $route.query.selVidCat,vidName }); selectedLink=vidDet.videoLink;vidLoader=true" >
                  <img :src="vidDet.videoImgUrl" alt="item"  class="img_size" ><!--thumbnail image-->
                </div>
                <div class="image_box visible-xs"   @click="dialog = true ; selectedLink=vidDet.videoLink" >
                  <div class="cont_part">

                  </div>
                  <img :src="vidDet.videoImgUrl" alt="item"  ><!--thumbnail image-->
                </div>
                <div class="title_part hidden-xs" data-toggle="modal" data-target="#videoModal" @click="getCatVidProduct({vidCat: $route.query.selVidCat,vidName });selectedLink=vidDet.videoLink;vidLoader=true" >
                  <h5>Watch Videos and Get Inspired</h5><!--Video Tag-->
                  <a class="shop_btn">Show Now</a>
                  <a class="go_btn">
                    <img src="/static/images/player.svg" alt="player">
                  </a>
                </div>
                <div class="title_part visible-xs" @click="dialog = true ; selectedLink=vidDet.videoLink"  >
                  <h5>Watch Videos and Get Inspired</h5><!--Video Tag-->
                  <a class="shop_btn">Show Now</a>
                  <a class="go_btn">
                    <img src="/static/images/player.svg" alt="player">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="videoModal" >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content comm_modal">
              <el-card v-if="vidLoader" style="height:315px">
               <h2>Loading...</h2>
              </el-card>
              <button type="button" class="modal_close" data-dismiss="modal" aria-label="Close"><img src="/static/images/close.svg" alt="close"></button>
              <div class="modal_video" v-show="Object.keys(products).length != 0" >
                <div class="embed-responsive embed-responsive-16by9" v-show="!vidLoader">
                  <iframe class="embed-responsive-item" width="560" height="315"  @load="loaded" :src="selectedLink" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
              </div>
              <div class="modal_video_big" v-show="Object.keys(products).length === 0"  >
                <div class="embed-responsive embed-responsive-16by9" v-show="!vidLoader">
                  <iframe class="embed-responsive-item" width="560" height="315" @load="loaded" :src="selectedLink" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
              </div>
              <div class="modal_video_right hidden-xs hidden-sm  scroll_card " v-show="Object.keys(products).length != 0" v-if="!vidLoader">
                <div v-for="(p,k) in products" class="modal_video_right hidden-xs hidden-sm padding_class" v-if="parseInt(p.priceStartsFrom) != 999999999">
                  <div class="prod_repeat padding_class">
                    <loader v-if="productsLoader" ></loader>
                    <div class="padding_class" >
                      <router-link :to="{path:`/particularProduct/${k}`, query:{varient:'notSelected'}}">
                        <a data-dismiss="modal" class="prod_image" @click="$router.push({path:`/particularProduct/${k}`, query:{varient:'notSelected'}})">
                          <img :src="p.pBasicDetail.pPicUrl" alt="product" >
                        </a>
                        <div data-dismiss="modal" class="prod_cont" @click="$router.push({path:`/particularProduct/${k}`, query:{varient:'notSelected'}})">
                          <h4><a >{{p.pBasicDetail.pBrand}}</a></h4>
                          <p>{{p.pBasicDetail.pName}}</p>
                        </div>
                        <div data-dismiss="modal" class="prod_misc" @click="$router.push({path:`/particularProduct/${k}`, query:{varient:'notSelected'}})">
                          <rating :num="Math.round(p.pBasicDetail.pRating)" class="float" ></rating>
                          <div  class="half text-right" style="float:right" @click="$router.push({path:`/particularProduct/${k}`, query:{varient:'notSelected'}})">
                              <span v-if="parseInt(p.priceStartsFrom) == 999999999" style="float:right" class="half text-right">
                                Out Of Stock
                              </span>
                            <div v-else-if="parseInt(p.priceStartsFrom) <= 10000 ">
                              From <img src="/static/images/rupee-2.svg" alt="currency" >
                              {{p.priceStartsFrom}}
                            </div>
                            <div v-else></div>
                          </div>
                        </div>
                      </router-link>
                      <a  class="prod_compare" v-if="isLoggedIn" ><router-link  data-dismiss="modal" :to="{path:`/particularProduct/${k}`, query:{varient:'notSelected'}}">Compare price</router-link>
                        <img src="/static/images/wishlist-add.svg" alt="wishlist-add" v-if="Object.keys(wishlistObj).indexOf(k) === -1" @click="addWishlist(k),$forceUpdate();wishlistObj[k] = p">
                        <img src="/static/images/wishlist-hover.svg" alt="wishlist-hover" v-if="Object.keys(wishlistObj).indexOf(k) !== -1" @click="removeWishlist(k),$forceUpdate(); delete wishlistObj[k];">
                      </a>
                      <a  class="prod_compare" v-if="!isLoggedIn"  ><router-link data-dismiss="modal" :to="{path:`/particularProduct/${k}`, query:{varient:'notSelected'}}">Compare price</router-link>
                        <img src="/static/images/wishlist-add.svg" alt="wishlist-add" @click="$store.state.auth.showLoginPopup = true">
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialog"
      width="100%"
      center>
      <div class="modal_video">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" width="560" height="315"  frameborder="0" :src="selectedLink" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>

      </div>
    </el-dialog>

   <!-- VIDEO CAT =>
    <!-- video cat -->
    <!--div v-for="(vidCatDet ,vidCatName) in howToCat"  @click="getHowToCatVid({
      howToCat: vidCatName
    })">
      <span v-if=" $route.query.selVidCat == vidCatName ">{{vidCatName}} tick !</span>
      <span v-else>{{vidCatName}}</span>
    </div>


    <br>
    VIDEOS =>
    <!-- videos in vid cat -->
   <!-- {{Object.keys(howToVid).length}}
    <div v-for="(vidDet, vidName) in howToVid" @click="getCatVidProduct({ //click to open video in popup, i.e when product will get load
      vidCat: $route.query.selVidCat,
      vidName
    })">
      {{vidName}}
      {{vidDet}}
    </div>

    <br>
    PRODUCTS =>
  < {{products}}-->

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import rating from '@/components/rating.vue'
  import loader from '@/components/gen/recLoader'
  import ElCard from "../../../node_modules/element-ui/packages/card/src/main.vue";
  //
  export default {
    //
    data(){
      return{
        vid_width:0,
        dialog:false,
        selectedLink:'',
        vidLoader:false
      }
    },
    watch:{
      '$route':()=>{
        console.log('kult tv route watch')
        //$(".modal").removeClass("in");
        $(".modal-backdrop").remove();
        //$('body').removeClass('modal-open');
        //$('body').css('padding-right', '');
        $(".modal").hide();
        //window.thisOfVueComp7.dialog =  false
      }
    },
    components:{
      ElCard,
      rating,
      loader
    },
    created(){
      window.thisOfVueComp = this
      window.thisOfVueComp7 = this
      //
      this.$store.commit('getHowToCat')
    },
    computed:{
      ...mapGetters([
        'howToCat',
        'howToVid',
        'products',
          //
        'howToCatLoader', // loader for vid cat
        'howToVidLoader', // loader for videos in cat
        'productsLoader',  // loader for products associated with videos
        'isLoggedIn',
        'wishlistObj'
      ])
    },
    beforeDestroy(){
      $("#videoModal").hide()
    },
    methods:{
      ...mapMutations([
        'getHowToCatVid','getCatVidProduct','goTo',
        'addWishlist',
        'removeWishlist'
      ]),
      loaded(){
        setTimeout(()=>{
          this.vidLoader = false
        },5000)

        console.log('Vid Loaded')
      }
    },
    beforeDestroy(){
      //this.dialog = false
    },
    watch:{
      '$route':()=>{
       // $('#videoModal').modal('hide')
       // console.log('kult tv route watch')
        //$(".modal").removeClass("in");
        //$(".modal-backdrop").remove();
        //$('body').removeClass('modal-open');
        //$('body').css('padding-right', '');
        //$(".modal").hide();
        //window.thisOfVueComp7.dialog =  false
      }
    }
  }
</script>
<style scoped>
  .min_height{
    min-height: 500px;
  }
  .scroll_card{
    max-height: 500px;
    overflow: scroll
  }
  .tv_left ul {
    padding: 0;
     margin: 0px 0 !important;
    list-style: none;
  }
.modal_video_big{
  width:100%;
}
.padding_class{
  padding-left: 5px !important;
  padding-right: 5px !important;
}
ul, ol {
margin-top: 0;
 margin-bottom: 10px !important;
}
  .modal_video_right {
    width: 264px;
    /* float: right; */
     padding: 0px !important;
    background: #fff;
  }
  .float{
    float: left;
  }
  .prod_repeat .half {
    width: 50%;
    float: left;
    letter-spacing: -0.2px;
    color: #000000;
  }
  .img_size{
    width:90vh;
    height: 200.625px;
  }
</style>
