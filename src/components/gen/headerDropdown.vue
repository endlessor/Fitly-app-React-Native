<template>
    <div>

        <div class="container hidden-xs ">
            <div class="xs-menu-cont">
                <a id="menutoggle" @click="menuToggle"><i class="fa fa-align-justify"></i> </a>
            </div>
            <nav class="menu">
                <ul>
                    <li class="drop-down" @mouseover="showDropdown()" @mouseleave="closeDropdown()">
                        <a>SHOP</a>
                        <div class="mega-menu fadeIn animated min_height"
                             style="z-index: 999;text-align: left;margin-top: -1px;box-shadow: 1px 1px 3px #aaaaaa ">
                            <loader v-if="shopOptionLoader"></loader>
                            <div class="mm-3column" v-if="!shopOptionLoader">
								<span class="left-images" style="color: #888888">
								    <div v-for="(shop,i) in shopArr" @mouseover="sel = shop" class="shop_opt"
                                         v-bind:class="{ activeMenu: sel === shop}">
                      {{shop}}
                    </div>
				        </span>
                            </div>
                            <div class="categories-list " style="line-height: 20px">
                                <div class="row make-columns" v-if="!shopOptionLoader">
                                    {{sel}}
                                    <div class="col-xs-3 col-md-6 " v-for="j in Object.keys(shopOptions[sel])"
                                         v-if="sel !== '' ">
                                        <div>
                                            <div>
                                                <h6 style="color: #080808"
                                                    @click="goTo(`/productCategory/${sel}/${j}`)">{{j}}</h6>
                                                <div v-for="k in Object.keys(shopOptions[sel][j])"
                                                     v-if="k!= 'DUMMY'" style="color: #888888"
                                                     @click="goTo(`/productSubCategory/${sel}/${j}/${k}`)">
                                                    {{k}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--<h6 style="color: #080808" @click="$router.push(`/kultPick/shopOption/${sel}`)">KULT PICKS</h6>-->
                                    <!--<h6 style="color: #080808" @click="$router.push(`/globalBestSeller/shopOption/${sel}`)">GLOBAL BEST SELLERS</h6>-->
                                </div>
                            </div>
                        </div>

                    </li>
                    <li class="drop-down" @mouseover="showDropdown2()" @mouseleave="closeDropdown2()">
                        <a>BRANDS</a>
                        <div class="mega-menu2 fadeIn animated min_height"
                             style="z-index: 999;margin-top: -1px;width: 10%;box-shadow: 1px 1px 3px #aaaaaa">
                            <brand-loader v-if="brandCatLoader"></brand-loader>
                            <div v-else>
								<span class="left-images" style="color: #888888; text-align: left; line-height: 20px">
                  <h6 @click="goTo(`/brandAll`)" style="color: #080808;    margin-top: 7px;"> A TO Z BRANDS</h6>
								    <div v-for="(shop,i) in Object.keys(brandCat)"
                                         style="color: #080808;    margin-top: 7px;">
                      <h6>{{shop}}</h6>
                      <div v-for="j in Object.keys(brandCat[shop])" style="color: #888888"
                           @click="$router.push('/brandProduct/'+j)">
                        {{j}}
                      </div>
                    </div>
				        </span>
                            </div>
                        </div>
                    </li>
                    <li @click="goTo('/kultPick')"><a>KULT PICKS</a></li>
                    <li @click="goTo('/globalBestseller')"><a>GLOBAL BESTSELLERS</a></li>
                    <li class="drop-down" @mouseover="showDropdown3()" @mouseleave="closeDropdown3();">
                        <a>BEAUTY GUIDE</a>
                        <div class="mega-menu3 fadeIn animated"
                             style="z-index: 999;margin-top: -1px; width: 10%;box-shadow: 1px 1px 3px #aaaaaa">
                            <div>
								<span class="left-images" style="color: #888888; text-align: left;  line-height: 20px">
								    <div v-for="(guide,i) in beautyGuideArr"
                                         @click="goTo('/bGuide/'+ beautyGuideArr[i])">
                     {{beautyGuideArr[i]}}
                    </div>
				        </span>
                            </div>
                        </div>
                    </li>
                    <li><a @click="goTo('/blog')">EDITOR’S BLOG</a></li>
                    <li><a @click="goTo('/howTo')">KULT TV</a></li>

                </ul>
            </nav>

            <!--ul class="main_menu">
              <li class="has_submenu " @mouseover="showdiv=true"><a  >SHOP</a>


                <!--el-card class="opts">
                  <div class="opts" v-for="(shop,i) in Object.keys(shopOptions)">
                    {{shop.toUpperCase()}}
                    <span class="sub_opt" v-for="j in Object.keys(shopOptions[shop])">
                <b>{{j.toUpperCase()}}</b>
                <div v-for="k in Object.keys(shopOptions[shop][j])">
                  {{k.toUpperCase()}}
                </div>
              </span>
                    <div class="cat" >
                      {{shopOptions[i]}}
                    </div>
                  </div>
                </el-card-->
            <!--/li>
            <li class="has_submenu shop"><a >BRANDS</a>
              <el-card class="opts">
                <div @click="goTo(`/brandAll`)">
                  <b>Brands A to Z</b>
                </div>
                <div class="opts" v-for="(shop,i) in Object.keys(brandCat)">
                  <b>{{shop.toUpperCase()}}</b>
                  <div v-for="j in Object.keys(brandCat[shop])" @click="$router.push('/brandProduct/'+j)">
                    <div>{{j.toUpperCase()}}</div>
                  </div>
                </div>
              </el-card>
              <!--div class="opts" v-for="(shop,i) in Object.keys(brandCat)">
                {{shop}}
                {{brandCat[shop]}}
                <div class="cat" >
                  {{brandCat[i]}}
                </div>
              </div-->
            <!--/li>

            <li><a @click="goTo('/kultPick')">KILT PICKS</a></li>
            <li><a @click="goTo('/globalBestseller')">GLOBAL BESTSELLERS</a></li>
            <li class="has_submenu shop"><a >BEAUTY GUIDE</a>
              <el-card class="opts">
                <div class="opts" v-for="guide in beautyGuideArr">
                  {{guide.toUpperCase()}}
                </div>
              </el-card>
            </li>
            <li><a @click="goTo('/blog')">EDITOR’S BLOG</a></li>
            <li ><a @click="goTo('/howTo')">KULT TV</a></li>
          </ul-->

        </div>
    </div>
</template>
<script>
    import brandLoader from '@/components/gen/brandDropdownLoader'
    import loader from '@/components/gen/dropdownLoader'
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        components: {
            loader,
            brandLoader
        },
        data() {
            return {
                shopArr: [
                    'MAKEUP',
                    'SKINCARE',
                    'FRAGRANCE',
                    'HAIR',
                    'BATH AND BODY',
                    'TOOLS AND BRUSHES',
                    'MEN'
                ],
                sel: 'MAKEUP',
                beautyGuideArr: [
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
                'goTo'
            ]),
            menuToggle() {
                $('.xs-menu').toggleClass('displaynone');
            },
            showDropdown3() {
                $('.mega-menu3').addClass('display-on');
            },
            closeDropdown3() {
                $('.mega-menu3').removeClass('display-on');
            },
            showDropdown2() {
                $('.mega-menu2').addClass('display-on');
            },
            closeDropdown2() {
                $('.mega-menu2').removeClass('display-on');
            },
            showDropdown() {
                $('.mega-menu').addClass('display-on');
            },
            closeDropdown() {
                $('.mega-menu').removeClass('display-on');
            },
            someFunc() {
                //add active class on menu
                $('ul li').click(function (e) {
                    e.preventDefault();
                    $('li').removeClass('active');
                    $(this).addClass('active');
                });
            },
        },
        computed: {
            ...mapGetters([
                'Homeloader',
                'shopOptions', // shop dropdown var
                'brandCat',
                'shopOptionLoader',
                'brandCatLoader'
            ])
        },
        created() {
            this.someFunc()
            window.thisOfVueComp_2 = this
        },
    }
</script>
<style scoped>
    .activeMenu {
        color: hotpink;
    }

    .shop_opt:hover {
        color: hotpink;
    }

    html, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */
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
        margin-top: 20px;
        display: table;
        width: 100%;
    }

    .container:after, .container:before {
        content: "";
        clear: both;
    }

    nav.menu {
        background: black;
        position: relative;
        min-height: 35px;
        text-align: center;
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
        display: block;
        padding: 0px 1.2vh;
    }

    .menu > ul li a:hover {
        background: #444;
        color: #fff;
    }

    .active {
        background: #444 !important;

    }

    .displaynone {
        display: none;
    }

    .xs-menu-cont {
        display: none;
    }

    .xs-menu-cont > a {
        background: none repeat scroll 0 0 #ff7f50;
        border-radius: 3px;
        padding: 3px 6px;
        display: block;
        border-bottom: 1px solid #E67248;
        box-shadow: 0 1px 2px #e67248;
        -webkit-box-shadow: 0 1px 2px #e67248;
        -moz-box-shadow: 0 1px 2px #e67248;
    }

    .xs-menu-cont > a:hover {
        cursor: pointer;
    }

    .xs-menu li {
        color: #fff;
        padding: 14px 30px;
        border-bottom: 1px solid #ccc;
        background: #FF7F50;

    }

    .xs-menu a {
        text-decoration: none;
    }

    .mega-menu {
        left: 10%;
        background: none repeat scroll 0 0 #ffffff;
        margin-top: 3px;
        position: absolute;
        width: 80%;
        padding: 15px;
        display: none;

    }

    .mega-menu2 {
        background: none repeat scroll 0 0 #ffffff;
        margin-top: 3px;
        position: absolute;
        width: 17%;
        padding: 15px;
        display: none;

    }

    .mega-menu3 {
        background: none repeat scroll 0 0 #ffffff;
        margin-top: 3px;
        position: absolute;
        width: 17%;
        padding: 15px;
        display: none;

    }

    .min_height {
        min-height: 300px;
    }

    #menutoggle i {
        color: #fff;
        font-size: 33px;
        margin: 0;
        padding: 0;
    }

    /*--column--*/
    .mm-6column:after, .mm-6column:before, .mm-3column:after, .mm-3column:before {
        content: "";
        display: table;
        clear: both;

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
        width: 10%;
    }

    .responsive-img {
        display: block;
        max-width: 100%;

    }

    .left-images {
        margin-right: 25px;
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

    .categories-list li :hover {
        background: inherit !important;
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

    .mm-view-more {
        background: none repeat scroll 0 0 #ff7f50;
        color: #fff;
        display: inline !important;
        line-height: normal;
        padding: 5px 8px !important;
        margin-top: 10px;
    }

    .display-on {
        display: block;
    }

    .drop-down > a:after {
        content: "\f0dd";
        color: #fff;
        font-family: FontAwesome;
        font-style: normal;
        margin-left: 5px;
        margin-top: -15px;

    }

    /*MediaQuerys*/
    @media (max-width: 600px) {
        .menu {
            display: none;
        }

        .xs-menu li a {

            padding: 0px;
        }

        .xs-menu-cont {
            display: block;
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

    .row.make-columns {
        display: flex;
        justify-content: space-between;
        /*flex-flow: row wrap;*/
        /*align-items: flex-start;*/
        /*-moz-column-width: 19em;*/
        /*-webkit-column-width: 19em;*/
        /*-moz-column-gap: 1em;*/
        /*-webkit-column-gap: 1em;*/
        border-color: transparent;

    }

    .row.make-columns > div {
        display: inline-block;
        padding: .5rem;
        width: 100%;
    }

    .fadeIn {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
    }
</style>
