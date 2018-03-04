<template>
  <div>
    <div class="banner_strip"></div>
    <div class="comm_account">
      <div class="container">
        <div class="accont_box">
          <div class="acount_top text-center">
            <a @click="goTo('/editProfile')" class="edit_account">
              <img src="/static/images/icon-135-pen-angled.svg" alt="icon">
              Edit Account
            </a>
            <div class="account_pic">
              <div class="acount_name">{{$store.state.auth.user.displayName[0].toUpperCase()}}</div>
              <div class="full_name" >{{$store.state.auth.user.displayName}}</div>
            </div>
            <div class="acc_menu">
              <ul>
                <li @click="$router.replace('/credit')"><a >CREDIT</a></li>
                <li class="active" ><a >WISHLIST</a></li>
                <li @click="$router.replace('/myOrder')"><a >MY ORDER</a></li>
                <li @click="$router.replace('/withdrawReq')"><a >WITHDRAWAL</a></li>
                <li @click="$router.replace('/amazonCashbackReq')"><a>AMAZON CASHBACK REQUEST</a></li>
              </ul>
            </div>
          </div>
          <div class="acount_btm">
            <div class="row">
              <div class="col-xs-12 col-md-4">
                <h4>Wishlist</h4>
              </div>
              <div class="text-right entries col-xs-12 col-md-8 wishlist-control">
                <el-select v-model="selected" placeholder="Sort By">
                  <el-option
                    v-for="item in options"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                <span  onclick="window.print();" class="print-wishlist">Print</span>
                <div class="view-switcher">
                  <div class="grid-view">
                    <span class="grid-box"></span>
                    <span class="grid-box"></span>
                    <span class="grid-box"></span>
                    <span class="grid-box"></span>
                    <span class="grid-box"></span>
                    <span class="grid-box"></span>
                    <span class="grid-box"></span>
                    <span class="grid-box"></span>
                    <span class="grid-box"></span>
                  </div>
                  <div class="list-view active">
                    <span class="list-box"></span>
                    <span class="list-box"></span>
                    <span class="list-box"></span>
                    <span class="list-box"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="wishlist-main">
              <div class="wishlist-options">

              </div>
              <el-row :gutter="15" >
                <el-col :xs="12" :sm="12" :md="8" :lg="8" v-for="(pDet,index) in wishlistArr"
                        v-if="parseInt(pDet.priceStartsFrom) != 999999999"
                >

                  <div >
                    <div class="grid-content pa-2" >
                      <router-link :to="{path:`/particularProduct/${pDet.key}`, query:{varient:'notSelected'}}">
                        <a class="prod_image" @click="$router.push({path:`/particularProduct/${pDet.key}`, query:{varient:'notSelected'}})">
                          <figure style="width: 169px; height: 250px; background-size: contain; background-position: center; background-repeat: no-repeat" :style="{'background-image': 'url('+pDet.pBasicDetail.pPicUrl+')'}"></figure>
                          <!--img :src="pDet.pBasicDetail.pPicUrl" style="height:286px "  alt="product"-->
                        </a>
                        <div class="prod_cont" @click="$router.push({path:`/particularProduct/${pDet.key}`, query:{varient:'notSelected'}})">
                          <h4><a >{{pDet.pBasicDetail.pBrand}}</a></h4>
                          <span v-for="(i,k) in pDet.pBasicDetail.pName" v-if="k < 30">{{i}}</span><span v-if="pDet.pBasicDetail.pName.length > 30">...</span>
                        </div>
                        <div class="prod_misc" @click="$router.push({path:`/particularProduct/${pDet.key}`, query:{varient:'notSelected'}})">
                          <div class="float"><rating :num="Math.round(pDet.pBasicDetail.pRating)" ></rating></div>
                          <div class="half text-right" >
                              <span v-if="parseInt(pDet.priceStartsFrom) == 999999999" style="float: right" class="half text-right">
                                Out Of Stock
                              </span>
                            <div v-else-if="parseInt(pDet.priceStartsFrom) <= 10000 ">
                              From <img src="/static/images/rupee-2.svg" alt="currency" >
                              {{pDet.priceStartsFrom}}
                            </div>
                            <div v-else></div>
                          </div>

                        </div>
                      </router-link>
                      <a  class="prod_compare" v-if="isLoggedIn"><router-link :to="{path:`/particularProduct/${pDet.key}`, query:{varient:'notSelected'}}">Compare price</router-link>
                        <img src="/static/images/wishlist-hover.svg" alt="wishlist-hover" @click="removeWishlist({pId:pDet.key,pDet});delete wishlistObj[pDet.key]; removeFromWishArr(index);$forceUpdate">
                      </a>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <!--div-- class="wishlist-products">
                <div class="prod_repeater">
                  <div class="prod_repeat prod_repeat1" v-for="(pDet, pId) in wishlistObj" >
                    <a class="prod_image" >
                      <img :src="pDet.pBasicDetail.pPicUrl" alt="product">
                    </a>
                    <div class="prod_cont">
                      <h4><a >{{pDet.pBasicDetail.pBrand}}</a></h4>
                      <p>{{pDet.pBasicDetail.pName}}</p>
                    </div>
                    <div class="prod_misc">
                      <div class="float"><rating :num="Math.round(pDet.pBasicDetail.pRating)" ></rating></div>
                      <div class="half text-right" v-if="Object.keys(pDet).indexOf(pDet.priceStartsFrom) != -1">From <img src="/static/images/rupee-2.svg" alt="currency" >{{pDet.priceStartsFrom}}</div>
                    </div>
                    <a  class="prod_compare" v-if="isLoggedIn"><span @click="$router.push({path:`/particularProduct/${pId}`})">Compare price</span>
                      <img src="/static/images/wishlist-add.svg" alt="wishlist-add" v-if="Object.keys(wishlistObj).indexOf(pId) === -1" @click="addWishlist(pId),$forceUpdate()">
                      <img src="/static/images/wishlist-hover.svg" alt="wishlist-hover" v-if="Object.keys(wishlistObj).indexOf(pId) !== -1" @click="removeWishlist(pId),$forceUpdate()">
                    </a>
                    <a  class="prod_compare" v-if="!isLoggedIn"><span @click="$router.push({path:`/particularProduct/${pId}`})">Compare price</span>
                      <img src="/static/images/wishlist-add.svg" alt="wishlist-add" @click="$store.state.auth.showLoginPopup = true">
                    </a>
                    <a  class="go_store">Go to store</a>
                  </div>
                </div>
              </div-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  import rating from '@/components/rating'
  import loader from '@/components/gen/loader'
  //
  import productNfilter from '../../mixins/productNfilter'
  import VIcon from "vuetify/es5/components/VIcon/VIcon";
  import open from '@/components/openTabProd'
  //
  export default{
    //
    data(){
      return{
        selected:'',
        options: ['date','price'
        ],
       wishlistArr:[]
      }
    },
    watch:{
      selected:function () {
        if(this.selected === 'price')
        this.sortWishList('priceStartsFrom')
        else
          this.sortWishList('date')
      }
    },
    components: {
      VIcon,
      rating,
      infiniteLoading:InfiniteLoading,
      loader,
      open
    },
    //
    methods:{
      ...mapMutations([
        'loadMoreProducts','goTo',
        'addWishlist',
        'removeWishlist'
      ]),
      removeFromWishArr(index){
        this.wishlistArr.splice(index,1)

      },
      sortWishList(key){
        //alert('hey')
        let c = 0
        console.log(this.$store.state.wishlist.wishlistBool)
        if(this.$store.state.wishlist.wishlistBool !== false){
          this.wishlistArr=[]
          for(let i in this.$store.state.wishlist.wishlistObj){
            c++
            //alert(i)
            let temp = this.$store.state.wishlist.wishlistObj[i]
            temp.key = i
            this.wishlistArr.push(temp)
            console.log(c ,'=====================', Object.keys(this.$store.state.wishlist.wishlistObj).length)
            if(c === Object.keys(this.$store.state.wishlist.wishlistObj).length){
              function compare(a,b){
                if (a[key] < b[key])
                  return -1;
                if (a[key] > b[key])
                  return 1;
                return 0;
              }

              this.wishlistArr.sort(compare)
              console.log(this.wishlistArr)
            }
          }
        }else{
          setTimeout(()=>this.sortWishList('date'),100)
        }
      }
    },
    computed:{
      ...mapGetters([
        'products', // all products gets loaded in this, show in DOM
        'productsLoader', // till products are loaded this is true
        'wishlistObj',
        'isLoggedIn',

      ])
    },
    created(){
      this.sortWishList('date')
      if(!this.$store.state.auth.isLoggedIn){
        this.$router.push('/')
      }
      window.vueCompProduct= this
    }
  }
</script>
<style>
  .row.make-columns {
    -moz-column-width: 19em;
    -webkit-column-width: 19em;
    -moz-column-gap: 1em;
    -webkit-column-gap:1em;
    border-color: transparent;

  }

  .row.make-columns > div {
    display: inline-block;
    padding:  .5rem;
    width:  100%;
  }

  /* demo only* */
  .panel {
    box-shadow: 0 0px 0px rgba(0,0,0,0) ! important ;
    display: inline-block;
    height: 100%;
    width:  100%;

  }
  .panel-default {
    border-color: #fff ! important;
  }
</style>
