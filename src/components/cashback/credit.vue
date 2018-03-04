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
              <div class="full_name">{{$store.state.auth.user.displayName}}</div>
              <!--a href="#" target="_blank" class="social_link">@karish2308</a-->
            </div>
            <div class="acc_menu">
              <ul>
                <li class="active"><a >CREDIT</a></li>
                <li @click="$router.replace('/wishlist')"><a >WISHLIST</a></li>
                <li @click="$router.replace('/myOrder')"><a >MY ORDER</a></li>
                <li @click="$router.replace('/withdrawReq')"><a >WITHDRAWAL</a></li>
                <li @click="$router.replace('/amazonCashbackReq')"><a>AMAZON CASHBACK REQUEST</a></li>
              </ul>
            </div>
          </div>

          <div class="acount_btm">
            <loader v-if="myOrderLoader"></loader>
            <div v-else class="text-center">

                <div class="row">
                  <div class="col-xs-12">
                    <!--div class="order_commit with_btn">
                      <button data-toggle="modal" data-target="#reqModal">ADD REQUEST</button>
                      <input style="visibility: hidden;" type="text" placeholder="Search" class="form-control">
                    </div-->

                    <div class="order_commit">
                      <p>Total Cashback Amount &#x20b9; {{parseInt(myOrders.confirmedCashback) +
                      parseInt(myOrders.unconfirmedCashback)}}</p>
                      <p class="sm">
                        <span>₹ {{myOrders.confirmedCashback}}</span> Confirmed &nbsp;
                        <span>₹ {{myOrders.unconfirmedCashback}}</span> Unconfirmed</p>
                    </div>

                  </div>
                </div>

              <br><br>

              <div class="row">
                <img src="/static/images/coins.svg" alt="credit" class="acount_icon">
                <h4>You have &#x20b9; {{myOrders.walletAmount}} Credits</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import  {mapMutations} from 'vuex'
  //
  import loader from '@/components/gen/recLoader'
  import btnLoader from '@/components/gen/btnLoader'
  //
  export default {
    //
    components:{
      loader,
      btnLoader
    },
    computed:{
      ...mapGetters([
        'myOrders', 'myOrderLoader'
      ])
    },
    methods:{
      ...mapMutations([
        'goTo'
      ])
    },
    created(){
      if(!this.$store.state.auth.isLoggedIn){
        this.$router.push('/')
      }
      window.thisOfVueComp = this
      this.$store.commit('getMyOrders')
    }
  }
</script>

<style scoped>
  input[type="file"] {
    display: none;
  }
</style>
