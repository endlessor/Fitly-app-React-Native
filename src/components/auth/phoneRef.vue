<template>
  <div>
    <div id="right_tab6" class="right_tabs active" style="margin-top: 30px">
      <input type="text" placeholder="Enter Phone Number"  v-model="$store.state.auth.number" class="form-control">
    </div>
    <div id="right_tab7" class="right_tabs active" style="margin-top: 30px" v-if="showRefField">
      <input type="text" placeholder="Enter Refral Code"  v-model="$store.state.auth.refCode" class="form-control">
    </div>
    <div id="right_tab4"class="right_tabs active text-center" >
      <button class="login_btn"
              v-if="btnLoader"
      >
        <i class='fa fa-spinner fa-spin '></i>
      </button>
      <button class="login_btn"
              v-else
                 @click="afterLogin_userDetail({
                 phone:$store.state.auth.number,
                 refCode:$store.state.auth.refCode
                 })"
      >
        <span v-if="!btnLoader">SAVE</span>
      </button>
      <p class="forgot_pass float_right" v-if="!btnLoader" @click="$store.state.auth.showLoginPopup=false; $store.state.auth.showRegisterPopup=false" ><a >Skip</a></p>
    </div>

  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  import btn from '@/components/gen/btnLoader'
  //
  export default {
    components:{
      btn
    },
    computed:{
      ...mapGetters([
          'btnLoader',
        'showRefField'
      ])
    },
    methods:{
      ...mapMutations([
        'afterLogin_userDetail'
      ])
    }
  }
</script>
<style>
  .float_right{
    float: right;
  }
</style>
