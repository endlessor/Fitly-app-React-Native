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
              <!--a  target="_blank" class="social_link">@karish2308</a-->
            </div>
            <div class="acc_menu">
              <ul>
                <li @click="$router.replace('/credit')"><a >CREDIT</a></li>
                <li @click="$router.replace('/wishlist')"><a >WISHLIST</a></li>
                <li class="active"><a >MY ORDER</a></li>
                <li @click="$router.replace('/withdrawReq')"><a >WITHDRAWAL</a></li>
                <li @click="$router.replace('/amazonCashbackReq')"><a>AMAZON CASHBACK REQUEST</a></li>
              </ul>
            </div>
          </div>
          <div class="acount_btm">
            <div class="row">
              <loader v-if="myOrderLoader"></loader>
              <div v-else class="col-xs-8">
                <h4>My Order</h4>
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
              <div class="text-right entries col-xs-4">
                <!--h4>Entries</h4-->
                <!--select class="form-control">
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select-->
              </div>
            </div>

            <div  class="table-responsive" v-if="!myOrderLoader">
              <table class="table">

                <tr>
                  <th>ORDER NUMBER</th>
                  <th>ORDER PRICE</th>
                  <th>CASHBACK PRICE</th>
                  <th>ACTION ID</th>
                  <!--th>ORDER DATE</th-->
                  <th>STATUS</th>
                  <!--th>COMMENT</th-->
                  <!--th>ACTION</th-->
                </tr>

                <tr v-for="(det,k) in myOrders.orders" style="text-align: center">
                  <!--{{det}}-->
                  <!--td><a target="_blank" :href="det.order_img">Image Link</a></td-->
                  <td>{{k}}</td>
                  <td>&#x20b9; {{det.order_sum}}</td>
                  <td>&#x20b9; {{det.order_cashback}}</td>
                  <td>{{det.action_id}}</td>
                  <td>
                    <span v-if="det.status == 'TRUE' ">
                      Confirmed
                    </span>
                    <span v-else>
                      Unconfirmed
                    </span>
                  </td>
                </tr>

                <tr v-if=" typeof myOrders.orders === 'object' ">
                  <td colspan="6" v-if=" Object.keys(myOrders.orders).length == 0 ">
                    <div class="no_data text-center">
                      <img src="/static/images/sad.svg" alt="sad">
                      No data available in the table
                    </div>
                  </td>
                </tr>

              </table>
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
