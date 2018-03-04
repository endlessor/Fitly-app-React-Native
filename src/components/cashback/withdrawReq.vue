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
                <li @click="$router.replace('/myOrder')"><a >MY ORDER</a></li>
                <li class="active"><a >WITHDRAWAL</a></li>
                <li @click="$router.replace('/amazonCashbackReq')"><a>AMAZON CASHBACK REQUEST</a></li>
              </ul>
            </div>
          </div>
          <div class="acount_btm">
            <div class="row">
              <div class="col-xs-8">
                <h4>Withdrawal</h4>
                <div class="order_commit with_btn">
                  <button data-toggle="modal" data-target="#reqModal">ADD REQUEST</button>
                  <input style="visibility: hidden;" type="text" placeholder="Search" class="form-control">
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
            <loader v-if="myOrderLoader"></loader>
            <div v-else class="table-responsive">
              <table class="table">

                <tr>
                  <th>Request Id</th>
                  <th>Account Number</th>
                  <th>Account Holder Name</th>
                  <th>IFSC Code</th>
                  <!--th>ORDER DATE</th-->
                  <th>Amount</th>
                  <!--th>COMMENT</th-->
                  <!--th>ACTION</th-->
                </tr>

                <tr v-for="(det,k) in myOrders.cashbackMoneyReqs" style="text-align: center">
                  <td>{{k}}</td>
                  <td>{{det.accHolderName}}</td>
                  <td>{{det.accNo}}</td>
                  <td>{{det.ifscCode}}</td>
                  <td>{{det.amt}}</td>
                </tr>

                <tr v-if=" Object.keys(myOrders.cashbackMoneyReqs).length == 0 ">
                  <td colspan="6">
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

    <div class="modal fade" id="reqModal" tabindex="-1" role="dialog" aria-labelledby="reqModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content comm_modal">
          <button type="button" class="modal_close" data-dismiss="modal" aria-label="Close"><img src="/static/images/close.svg" alt="close"></button>
          <h4>Withdrawal Request</h4>
          <div class="amazon_form">
            <label>Account Holder Name</label>
            <input type="text" class="form-control" v-model="$store.state.withdrawReq.pay_accHolderName">
            <label>Account Number</label>
            <input type="number" class="form-control" v-model="$store.state.withdrawReq.pay_accNo">
            <label>IFSC Code</label>
            <input class="form-control" v-model="$store.state.withdrawReq.pay_ifscCode">
            <!--textarea class="form-control" v-model="$store.state.amazonCashbackReq.amazonCashbackReq_orderDesc"></textarea-->
            <!--div class="file_upload">
              <label><img src="/static/images/attach.svg" alt="attach">
                Click to attach file
                <input type="file" id="File" size="60" @change="uploadImg({
                  event: $event
                })">
              </label>
              <p>PNG, JPEG are accepted only.</p>
            </div-->
            <btnLoader v-if="btnLoader"></btnLoader>
            <button v-else class="acount_btn" @click="sendWithdrawalReq({
              accHolderName: $store.state.withdrawReq.pay_accHolderName,
              accNo: $store.state.withdrawReq.pay_accNo,
              ifscCode: $store.state.withdrawReq.pay_ifscCode,
              amt : $store.state.myOrder.myOrders.walletAmount
            })">Send</button>
          </div>
          <div class="clearfix"></div>
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
  $(document).ready(function(){
    var trigger = $('.hamburger'),
      isClosed = false;
    trigger.click(function () {
      hamburger_cross();
    });
    function hamburger_cross() {
      if (isClosed == true) {
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    }
    $('[data-toggle="offcanvas"]').click(function () {
      $('.wrapper').toggleClass('toggled');
    });
    $('.gall_thumbs ul li a').click(function(e){
      e.preventDefault();
      var link_src = $(this).attr('href');
      $(".main_image").attr("src",link_src);
      $('.gall_thumbs ul li').removeClass('active');
      $(this).parent().toggleClass('active');
    });
  });
  $(window).load(function() {
    $(".preloader-icon-container").fadeOut("slow");;
  });
  //
  export default {
    //
    components:{
      loader,
      btnLoader
    },
    computed:{
      ...mapGetters([
        'btnLoader','myOrderLoader','myOrders'
      ])
    },
    methods:{
      ...mapMutations([
        'sendWithdrawalReq',
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
