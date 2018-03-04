<template>
  <div>
    <el-row :gutter="10" >
      <el-col :xs="12" :sm="12" :md="md_lg_val" :lg="md_lg_val" v-for="(pDet, pId) in loopObj"

      >
        <div style="height: 445px !important;">
          <div class="grid-content " >
            <router-link :to="{path:`/particularProduct/${pId}`, query:{varient:'notSelected'}}">
              <a class="prod_image"  @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">
                <figure style="width: 169px; height: 250px; background-size: contain; background-position: center; background-repeat: no-repeat" :style="{'background-image': 'url('+pDet.pBasicDetail.pPicUrl+')'}"></figure>
              </a>
              <div class="prod_cont" @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">
                <h4><a >{{pDet.pBasicDetail.pBrand}}</a></h4>
                <span v-for="(i,k) in pDet.pBasicDetail.pName" v-if="k < 20">{{i}}</span><span v-if="pDet.pBasicDetail.pName.length > 20">...</span>
              </div>
              <div class="prod_misc" @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">
                <div class="float" ><rating :num="Math.round(pDet.pBasicDetail.pRating)" ></rating></div>
                <div class="half text-right" >
                      <span v-if="parseInt(pDet.priceStartsFrom) == 999999999" style="float: right; visibility: hidden" class="half text-right">
                        hfhhd
                      </span>
                  <div v-else-if="parseInt(pDet.priceStartsFrom) <= 10000 ">
                    From <img src="/static/images/rupee-2.svg" alt="currency" >
                    {{pDet.priceStartsFrom}}
                  </div>
                  <div v-else></div>
                </div>
              </div>
            </router-link>
            <a  class="prod_compare" v-if="isLoggedIn" style="display: flex"><router-link :to="{path:`/particularProduct/${pId}`, query:{varient:'notSelected'}}" class="float">Compare price</router-link>
              <img src="/static/images/wishlist-add.svg" alt="wishlist-add" v-if="Object.keys(wishlistObj).indexOf(pId) === -1" @click="addWishlist({pId,pDet}); wishlistObj[pId] = pDet; $forceUpdate()">
              <img src="/static/images/wishlist-hover.svg" alt="wishlist-hover" v-if="Object.keys(wishlistObj).indexOf(pId) !== -1" @click="removeWishlist({pId,pDet}); delete wishlistObj[pId]; $forceUpdate()">
            </a>
            <a  class="prod_compare"  v-if="!isLoggedIn" style="display: flex"><router-link :to="{path:`/particularProduct/${pId}`, query:{varient:'notSelected'}}" class="float">Compare price</router-link>
              <img src="/static/images/wishlist-add.svg" alt="wishlist-add" @click="$store.state.auth.showLoginPopup = true">
            </a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import rating from '@/components/rating'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  export default {
    props:['loopObj','md_lg_val'],
    methods: {
      ...mapMutations([
        'addWishlist',
        'removeWishlist'
      ]),
    },
    components:{
      rating,
    },
    computed:{
      ...mapGetters([
        'isLoggedIn',
        'wishlistObj',
      ])
    }
  }
</script>
<style>
  .float{
    /*margin-left: -30px;*/
  }
</style>
