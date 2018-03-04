<template>
  <div>
    <div class="">
    <nav class="">
              <div class="search_form">
               <!--@blur="closeDropdown4()"-->
                <div>
                  <input type="text"  v-model="input" @keydown.enter="goToSearchPage" @keyup="" placeholder="What are you looking for?" class="form-control" @blur="closeDropdown4()" >
                  <button @click="goToSearchPage"><img src="/static/images/search.svg" alt="search"></button>
                  <img class="search_close" src="/static/images/64-px-close.svg" alt="search">
                </div>
                  <div class="mega-menu4 fadeIn animated " style="position: absolute; z-index: 9999; width: 100%;"  @mouseover="showDropdown4" @mouseleave="closeDropdown4">
                    <div class="mm-3column drop-down ">
                      <span class="left-images" style="color: #888888" >
                          <div v-for="(search,key) in searchList" class="text item paddin_g" @click="getSearchDet({key,search}); input = ''; $store.state.gen.searchList={}; closeDropdown4()">
                            <div class="row">
                              <div class="col-xs-4">
                               <img :src="search.pBasicDetail.pPicUrl" style="width:50px;height: 50px;" class="mm-5column">
                              </div>
                              <div class="col-xs-8">
                                <h3>{{search.pBasicDetail.pBrand}}</h3>
                                 <p>{{search.pBasicDetail.pName}}</p>
                              </div>
                            </div>

                               <!--span v-for="(i,j) in search.pBasicDetail.pName" v-show="j < 26">
                                  <span>{{i}}</span>
                                </span-->
                              <!--span v-if="search.pBasicDetail.pName.length > 25">...</span-->
                          </div>
                      </span>
                 </div>
               </div>
              </div>
 </nav>
 </div>
 <!--a-- @click="goTo('/')"  class="logo hidden-xs float_right" ><img src="/static/images/logo.svg" alt="logo"></a-->
<!--a-- @click="goTo('/')"  class="logo hidden-xs float-right"><img src="/static/images/logo.svg" alt="logo"></a-->

    <!--div class="col-sm-8 col-xs-12 pull-left">
      <div class="search_form">
        <a href="index.html" class="logo hidden-xs"><img src="images/logo.svg" alt="logo"></a>
        <form>
          <div>
            <input id="searchbar" type="text" placeholder="What are you looking for?" class="form-control">
            <button><img src="images/search.svg" alt="search"></button>
            <img class="search_close" src="images/64-px-close.svg" alt="search">
          </div>
          <div class="autocomplete-suggestions" style="position: absolute; display: block; z-index: 9999; width: 100%;"></div>
        </form>
      </div>
    </div-->
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    data(){
      return {
        input:''
      }
    },
    computed:{
      ...mapGetters([
        'searchList',
      ])
    },
    methods:{
      ...mapMutations([
        'goTo',
        'getSearchDet',

      ]),
      goToSearchPage(){
        let vm = this
        $("#form-control").keypress(function(e) {
          search($("#form-control").get(0));
          e.preventDefault()
        });
        if(vm.input != ''){
          vm.$router.push({path:'/search', query:{qStr:vm.input}})
        }

      },
      search(){
        let vm = this
        console.log()
        // alert('hi')
        // alert(document.getElementById('search').value)
        axios.get('https://us-central1-kult-2.cloudfunctions.net/searchProduct', {
          params: {
            qStr:vm.input
          }
        }).then(function (response) {
          console.log(response.data)
          vm.$store.state.gen.searchList = response.data
          console.log(vm.$store.state.gen.searchList)
          // console.log(Object.keys(response.data).length)
        }).catch(function (error) {
          console.log(error)
        })
      },
      showDropdown4(){
        $('.mega-menu4').addClass('display-on');
      },
      closeDropdown4(){
        setTimeout(()=>{
          $('.mega-menu4').removeClass('display-on');
        },2500)
      },
    },
    created(){
      //this.someFunction()
    }
  }
</script>
<style scoped>
  html, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }/* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after, q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  header h2 {
    margin: 25px 10px;
    font-size: 28px;
    text-align: center;
    color: cornsilk;
  }
  .container {
    margin-top: 20px ;
    display: table;
    width: 100%;
  }
  .container:after, .container:before {
    content: ""; clear : both;
  }
  nav.menu {
    background: transparent;
    position: relative;
    min-height: 35px;
  }

  .menu > ul > li {
    list-style: none;
    display: inline-block;
    color: #fff;
    line-height: 40px;

  }
  .menu > ul li a, .xs-menu li a {
    text-decoration: none;
    color: #fff;
    display:block;
  }
  .menu > ul li a:hover {
    background:#444;
    color: #fff;
  }
  .active{
    background:#444 !important;

  }
  .displaynone{
    display: none;
  }
  .xs-menu-cont{
    display:none;
  }
  .xs-menu-cont > a {
    background: none repeat scroll 0 0 #ff7f50;
    border-radius: 3px;
    padding: 3px 6px;
    display: block;
    border-bottom:1px solid #E67248;
    box-shadow: 0 1px 2px #e67248;
    -webkit-box-shadow: 0 1px 2px #e67248;
    -moz-box-shadow: 0 1px 2px #e67248;
  }
  .xs-menu-cont > a:hover{
    cursor: pointer;
  }

  .xs-menu li {
    color: #fff;
    padding: 14px 30px;
    border-bottom: 1px solid #ccc;
    background: #FF7F50;

  }
  .xs-menu  a{
    text-decoration:none;
  }
  .float_right{
    float: right;
  }
  .float_left{
    float: left;
  }
  .mega-menu4 {
    background: none repeat scroll 0 0 #f2f4f7;
    left: 0;
    margin-top: 3px;
    position: absolute;
    padding:15px;
    display:none;



  }
  #menutoggle i {
    color: #fff;
    font-size: 33px;
    margin: 0;
    padding: 0;
  }


  /*--column--*/
  .mm-6column:after, .mm-6column:before, .mm-3column:after, .mm-3column:before{
    content:"";
    display:table;
    clear:both;


  }
  .mm-6column, .mm-3column {
    float: left;
    position: relative;
  }
  .mm-6column {
    width: 50%;
    height: 100%;
  }
  .mm-3column {
    max-width: 100%;
  }
  .mm-5column {
    max-width: 50%;
  }
  .responsive-img {
    display: block;
    max-width: 100%;

  }
  .left-images{
    margin-right:25px;
  }
  .left-images, .left-categories-list {
    float: left;
  }
  .categories-list li {
    display: block;
    line-height: normal;
    margin: 0;
    padding: 5px 0;
  }
  .categories-list li :hover{
    background:inherit !important;
  }
  .left-images > p {
    background: none repeat scroll 0 0 #ff7f50;
    display: block;
    font-size: 18px;
    line-height: normal;
    margin: 0;
    padding: 5px 14px;
  }
  .categories-list span {
    font-size: 18px;
    padding-bottom: 5px;
    text-transform: uppercase;
  }
  .mm-view-more{
    background: none repeat scroll 0 0 #ff7f50;
    color: #fff;
    display: inline !important;
    line-height: normal;
    padding: 5px 8px !important;
    margin-top:10px;
  }
  .display-on{
    display:block;
  }
  .drop-down > a:after{
    content:"\f0dd";
    color:#fff;
    font-family: FontAwesome;
    font-style: normal;
    margin-left: 5px;
    margin-top: -15px;


  }
  /*MediaQuerys*/
  @media (max-width: 600px) {
    .menu {
      display:none;
    }
    .xs-menu li a {

      padding:0px;
    }
    .xs-menu-cont{
      display:block ;
    }
  }


  /*Animation--*/

  .animated {
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
  .paddin_g{

  }
</style>
