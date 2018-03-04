<template>
    <div>
        <!--{{ amazonLinkPrice}}-->
        <div class="banner_strip"></div>
        <div class="go_back">
            <div class="container">
                <a @click="$router.go(-1)" class="go_link"><i class="fa fa-angle-left"></i> Go Back</a>
            </div>
        </div>
        <div class="prod_single">
            <div class="container">
                <div class="min_height">
                    <comp-loader v-if="pTypeLoader "></comp-loader>
                    <div class="row" v-if="!pTypeLoader " style="min-height: 700px">
                        <div class="col-md-5 col-xs-12">
                            <div class="prod_left">
                                <div class="prod_leftmisc">
                                    <h2>{{pDets[$router.currentRoute.params.pId].pBasicDetail.pBrand}}</h2>
                                    <h3>{{pDets[$router.currentRoute.params.pId].pBasicDetail.pName}}</h3>
                                    <div class="prod_wishadd">
                                        <div class="prod_rate float">
                                            <span v-for="icon in 5">
                                                <span v-if="icon <= Math.round(pDets[$router.currentRoute.params.pId].pBasicDetail.pRating)">
                                                    <i class="material-icons p_star">star</i>
                                                </span>
                                                <span v-else>
                                                    <i class="material-icons p_star_unchecked">star</i>
                                                </span>
                                            </span>
                                        </div>
                                        <a v-if="isLoggedIn" class="ml_24">
                                            <img src="/static/images/wishlist-add.svg" alt="wishlist-add"
                                                 v-if="Object.keys(wishlistObj).indexOf($router.currentRoute.params.pId) === -1"
                                                 @click="addWishlist({pId:$router.currentRoute.params.pId,pDet:pDets[$router.currentRoute.params.pId]});
                           wishlistObj[$router.currentRoute.params.pId] = pDets[$router.currentRoute.params.pId]; $forceUpdate()">
                                            <img src="/static/images/wishlist-hover.svg" alt="wishlist-hover"
                                                 v-if="Object.keys(wishlistObj).indexOf($router.currentRoute.params.pId) !== -1"
                                                 @click="removeWishlist({pId:$router.currentRoute.params.pId,pDet:pDets[$router.currentRoute.params.pId]});
                           delete wishlistObj[$router.currentRoute.params.pId]; $forceUpdate()">
                                        </a>
                                        <a v-if="!isLoggedIn" class="ml_24">
                                            <img src="/static/images/wishlist-add.svg" alt="wishlist-add"
                                                 @click="$store.state.auth.showLoginPopup = true">
                                        </a>
                                    </div>
                                </div>
                                <div class="product-color-list dropdown" v-if="prodArr.length > 1">
                                    <button class="dropdown-toggle" data-toggle="dropdown" style="background-color: transparent; width: 100%">
                                        <template v-for="i in prodArr" v-if="selected.key===i.key">
                                            <i v-if="i.det.swatchImgUrl !== ''"><img :src="i.det.swatchImgUrl"></i>
                                            <span style="text-align: left">{{i.key}}</span>
                                            <em class="fa fa-angle-down"></em>
                                        </template>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <template v-for="i in prodArr">
                                            <li v-if="selected.key === i.key" class="active"
                                                @click="$store.state.particularProduct.selected = i">
                                                <i v-if="i.det.swatchImgUrl !== ''"><img :src="i.det.swatchImgUrl"></i>
                                                <span>{{i.key}}</span>
                                            </li>
                                            <li v-else
                                                @click="$store.state.particularProduct.selected = i; $router.replace({path:`/particularProduct/${$router.currentRoute.params.pId}`, query:{varient:i.key}})">
                                                <i v-if="i.det.swatchImgUrl !== ''"><img :src="i.det.swatchImgUrl"></i>
                                                <span>{{i.key}}</span>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                                <div class="product-color-list" v-if="prodArr.length == 1">
                                    <div>
                                        <template v-for="i in prodArr" v-if="selected.key===i.key">
                                            <i v-if="i.det.swatchImgUrl !== ''"><img :src="i.det.swatchImgUrl"></i>
                                            <span>{{i.key}}</span>
                                        </template>
                                    </div>
                                </div>
                                <div class="product-color-swatch">
                                    <ul>
                                        <li v-for="i in prodArr" v-if="i.det.swatchImgUrl !== ''"
                                            @click="$store.state.particularProduct.selected = i; $router.replace({path:`/particularProduct/${$router.currentRoute.params.pId}`, query:{varient:i.key}})">
                                            <template v-if="selected.key === i.key" class="active">
                                                <i>
                                                    <img :src="i.det.swatchImgUrl">
                                                    <em class="fa fa-check"></em>
                                                </i>
                                            </template>
                                            <template v-else>
                                                <i><img :src="i.det.swatchImgUrl"></i>
                                            </template>
                                        </li>
                                    </ul>
                                </div>

                                <!--  <div class="prod_pricerange" v-if="Object.keys(JSON.parse($route.query.prodDet)).indexOf(priceStartsFrom) != -1">
                                    From <strong>{{JSON.parse($route.query.prodDet).priceStartsFrom}}</strong>Rupee
                                  </div> -->
                                <div class="prod_storelinks">
                                    <div class="store_nos">
                                        <!--img src="/static/images/price-2.svg" alt="price">
                                        <span>3 - Stores</span>
                                        <img src="/static/images/infos.svg" alt="info"-->
                                    </div>
                                    <!--div class="prod_pricerange">
                                      From <strong>2,036</strong> to <strong>7,999</strong> Rupee
                                    </div-->
                                    <ul class="prod_shoplinks list-unstyled" v-if="!isLoggedIn ">
                                        <li v-for="(l,k) in selected.det.affliateDomains" >
                                            <a @click="$store.state.auth.showLoginPopup=true;
                      $store.state.particularProduct.selectedLink = newLink(l.link,k)"
                                               target="_blank"
                                               v-if="k != 'amazon' && l.price.toString().indexOf('999999999') == -1 "
                                               style="padding-bottom: 30px"
                                            >
                                              <img src="/static/images/shoppersstop%20.png" class="shoppersstop_img"  alt="shoppersstop" v-if="k=='shoppersstop'">
                                              <img src="/static/images/New-Flipkart-Logo.jpeg" class="flipkart_img"  alt="flipkart" v-if="k=='flipkart'">
                                              <img src="/static/images/nykaa.png" class="flipkart_img"  alt="nykaa" v-if="k=='nykaa'">
                                              <img src="/static/images/nnnow.png" class="nnnow_img"  alt="nnnow" v-if="k=='nnnow'">'
                                              <img src="/static/images/myntra.jpg" class="flipkart_img"  alt="myntra" v-if="k=='myntra'">
                                                <!--span class="aff_name" v-else>{{k.toUpperCase()}}</span-->
                                                <span class="aff_price">₹{{l.price}}</span>
                                                <span style="margin-top: 17px">BUY NOW</span>
                                            </a>
                                            <a @click="$store.state.auth.showLoginPopup=true;
                      $store.state.particularProduct.selectedLink = l.link"
                                               target="_blank"
                                               style="padding-bottom: 50px"
                                               v-if="k == 'amazon' && amazonLinkPrice != 'Out Of Stock' ">
                                              <img src="/static/images/amazon.jpg" class="amazon_img"  alt="amazon" v-if="k=='amazon'">
                                                <span style="margin-top: 22px;" v-if="amazonPriceLoader">Fetching Price...</span>
                                                <span class="aff_price" v-if="amazonLinkPrice != 'Out Of Stock'"
                                                      v-show="!amazonPriceLoader">₹{{amazonLinkPrice}}</span>
                                                <span style="margin-top: 17px"
                                                      v-show="!amazonPriceLoader">BUY NOW</span>
                                            </a>
                                            <!--a @click="$store.state.auth.showLoginPopup=true; $store.state.particularProduct.selectedLink =l.link"target="_blank" v-if="parseInt(l.price) < 10001 || parseInt(amazonLinkPrice) <10001 &&  parseInt(amazonLinkPrice) != -1" class="box">
                                              <span class="aff_name">{{k.toUpperCase()}}</span>
                                              <!--span class="aff_price" v-if="l.price===undefined || l.price===999999999"> Out Of Stock</span-->
                                            <!--div class="show_price" v-if="k !== 'amazon'">
                                              <span class="aff_price" > ₹ {{l.price}}</span>
                                              <span>
                                                <strong>BUY NOW</strong>
                                            </span>
                                            </div>
                                            <div class="show_price" v-else >
                                              <span class="aff_price" v-if="!isNaN(amazonLinkPrice)"> ₹ {{parseInt(amazonLinkPrice)}}</span>
                                              <span>
                                                <strong>BUY NOW</strong>
                                            </span>
                                            </div>
                                          </a>
                                          <a v-else-if="(parseInt(l.price) || parseInt(amazonLinkPrice)) == ('999999999' ||  999999999) || l.price.indexOf('99999') != -1 " class="box">
                                            <span class="aff_name" >{{k.toUpperCase()}}</span>
                                            <div  class="show_price" >
                                              <span class="aff_price" ></span>
                                              <span >
                                                <strong style="float: right">Out Of Stock</strong>
                                              </span>
                                            </div>
                                          </a>
                                          <a-- v-else @click="$store.state.auth.showLoginPopup=true; $store.state.particularProduct.selectedLink =l.link" class="box">
                                            <span class="aff_name">{{k.toUpperCase()}}</span>
                                            <div class="show_price" >
                                              <span class="aff_price" ></span>
                                              <span>
                                                <strong>BUY NOW</strong>
                                            </span>
                                            </div>
                                          </a-->
                                        </li>
                                    </ul>
                                    <ul class="prod_shoplinks list-unstyled" v-if="isLoggedIn && email">
                                        <li v-for="(l,k) in selected.det.affliateDomains" class="box">
                                            <a :href='newLink(l.link,k)' target="_blank"
                                               v-if="k != 'amazon' && l.price.toString().indexOf('999999999') == -1 "
                                               style="padding-bottom: 30px"
                                            >
                                              <img src="/static/images/New-Flipkart-Logo.jpeg" class="flipkart_img"  alt="flipkart" v-if="k=='flipkart'">
                                              <img src="/static/images/shoppersstop%20.png" class="shoppersstop_img"  alt="shoppersstop" v-if="k=='shoppersstop'">
                                              <img src="/static/images/nykaa.png" class="flipkart_img"  alt="nykaa" v-if="k=='nykaa'">
                                              <img src="/static/images/nnnow.png" class="nnnow_img"  alt="nnnow" v-if="k=='nnnow'">'
                                              <img src="/static/images/myntra.jpg" class="flipkart_img"  alt="myntra" v-if="k=='myntra'">
                                                <span class="aff_price">₹{{l.price}}</span>
                                                <span style="margin-top: 17px">BUY NOW</span>
                                            </a>
                                            <a :href="l.link + '&subid=' + $store.state.auth.user.email" target="_blank"
                                               v-if="k == 'amazon' && amazonLinkPrice != 'Out Of Stock' "  style="padding-bottom: 50px">
                                              <img src="/static/images/amazon.jpg" class="amazon_img"  alt="amazon" v-if="k=='amazon'">
                                                <span style="margin-top: 22px;" v-if="amazonPriceLoader">Fetching Price...</span>
                                                <span class="aff_price" v-if="amazonLinkPrice != 'Out Of Stock'"
                                                      v-show="!amazonPriceLoader">₹{{amazonLinkPrice}}</span>
                                                <span style="margin-top: 17px"
                                                      v-show="!amazonPriceLoader">BUY NOW</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <!--a v-else-if="(parseInt(l.price) || parseInt(amazonLinkPrice)) == ('999999999' ||  999999999)" class="box">
                                      <span class="aff_name">{{k.toUpperCase()}}</span>
                                      <div  class="show_price" >
                                        <span class="aff_price" ></span>
                                        <span>
                                          <strong style="float: right">Out Of Stock</strong>
                                        </span>
                                      </div>
                                    </a>
                                    <a v-else :href="l.link + '&subid=' + $store.state.auth.user.email" class="box">
                                      <span class="aff_name">{{k.toUpperCase()}}</span>
                                      <div class="show_price" >
                                        <span class="aff_price" ></span>
                                        <span>
                                          <strong>BUY NOW</strong>
                                      </span>
                                      </div>
                                    </a>
                                  </li>
                                </ul-->
                                    <!--$store.state.particularProduct.selectedLink =l.link -->
                                    <ul class="prod_shoplinks list-unstyled" v-if="isLoggedIn &&   !email">
                                        <li v-for="(l,k) in selected.det.affliateDomains">
                                            <a @click="dialog=true; $store.state.particularProduct.selectedLink= newLink(l.link,k)"
                                               v-if="k != 'amazon' && l.price.toString().indexOf('999999999') == -1 "
                                               style="padding-bottom: 30px"
                                            >
                                              <img src="/static/images/New-Flipkart-Logo.jpeg" class="flipkart_img"  alt="flipkart" v-if="k=='flipkart'">
                                              <img src="/static/images/nykaa.png" class="flipkart_img"  alt="nykaa" v-if="k=='nykaa'">
                                              <img src="/static/images/shoppersstop%20.png" class="shoppersstop_img"  alt="shoppersstop" v-if="k=='shoppersstop'">
                                              <img src="/static/images/nnnow.png" class="nnnow_img"  alt="nnnow" v-if="k=='nnnow'">'
                                              <img src="/static/images/myntra.jpg" class="flipkart_img"  alt="myntra" v-if="k=='myntra'">
                                                <span class="aff_price">₹{{l.price}}</span>
                                                <span style="margin-top: 17px">BUY NOW</span>
                                            </a>
                                            <a @click="dialog=true;$store.state.particularProduct.selectedLink =l.link "
                                               v-if="k == 'amazon' && amazonLinkPrice != 'Out Of Stock' "  style="padding-bottom: 50px">
                                              <img src="/static/images/amazon.jpg" class="amazon_img"  alt="amazon" v-if="k=='amazon'">
                                                <span style="margin-top: 22px;" v-if="amazonPriceLoader">Fetching Price...</span>
                                                <span class="aff_price" v-if="amazonLinkPrice != 'Out Of Stock'"
                                                      v-show="!amazonPriceLoader">₹{{amazonLinkPrice}}</span>
                                                <span style="margin-top: 17px"
                                                      v-show="!amazonPriceLoader">BUY NOW</span>
                                            </a>
                                            <!--a @click="dialog=true;$store.state.particularProduct.selectedLink =l.link "  class="box" v-if="amazonLinkPrice != 'Out Of Stock' || l.price.indexOf('999999999') != -1">
                                              <span v-if="k != 'amazon'">
                                                <span  class="aff_price" v-if="!isNaN(l.price) && l.price > 0 && l.price <= 10000"> <span class="rupee">₹</span> {{l.price}}</span>
                                                <strong  v-else-if="l.price.indexOf('999999999') != -1 ">OUT OF STOCK</strong>
                                                <span class="show_price" v-else></span>
                                                  <strong v-if="l.price.indexOf('999999999') == -1 ">BUY NOW</strong>
                                              </span>
                                              <span v-else>
                                               <!-- {{amazonPriceLoader}}-->
                                            <!--strong v-show="amazonPriceLoader">Fetching Price...</strong>
                                            <span class="aff_price" v-if="amazonLinkPrice != 'Out Of Stock'" v-show="!amazonPriceLoader">{{amazonLinkPrice}}</span>
                                             <strong v-if="amazonLinkPrice != 'Out Of Stock' && !amazonPriceLoader">BUY NOW</strong>
                                            <strong  v-else v-show="!amazonPriceLoader" >OUT OF STOCK</strong>
                                          </span>
                                        </a-->
                                        </li>
                                    </ul>
                                    <el-dialog
                                            :visible.sync="dialog"
                                                    width="40%"
                                            >
                                              <span slot="footer" class="dialog-footer">
                                                 <h5>Account Not Verified!!! Click to continue and you will losse the cashback</h5>
                                                <button class="login_btn" @click="sendVerLink">Resend Verification Email</button>
                                                 <p class="forgot_pass" @click="dialog=false"><a @click="emptyLink()">Continue Anyway</a></p>
                                              </span>
                                    </el-dialog>
                                    <!--el-dialog
                                      :visible.sync="dialog"
                                    >
                                      <span>
                                           <div  v-if="selectedLink !== ''">
                                           <a :href="selectedLink" target="_blank" @click="$store.state.particularProduct.selectedLink=''; dialog=false">
                                              <h5>>Account Not Verified!!! Click to continue and you will losse the cashback</h5>
                                               <el-button>Continue Anyway</el-button>
                                           </a>
                                          </div>
                                      </span>
                                    </el-dialog-->
                                    <!---*********************** Show when Price is available for affliate!!! To Do once price is uploaded*******---->
                                    <!--li class="prod_shoplinks list-unstyled"  v-if="!isLoggedIn">
                                      <a  @click="$store.state.auth.showLoginPopup=true"
                                          v-for="(l,k) in selected.det.affliateDomains"
                                      >
                                        <span >{{k}}</span>
                                        <span  style="float: right" >
                                            <strong>BUY NOW</strong>
                                        </span>
                                        <br>
                                      </a>
                                    </li>
                                    <li class="prod_shoplinks list-unstyled"  v-if="isLoggedIn && email">
                                      <a v-for="(j,k) in selected.det.affliateDomains"
                                         target="_blank"
                                         :href="j.link + '&subid=' + $store.state.auth.user.email"
                                      >
                                        <span >{{k}}</span>
                                        <span  style="float: right" >
                                            <strong>BUY NOW</strong>
                                        </span>
                                        <br>
                                      </a>
                                    </li>
                                    <li class="prod_shoplinks list-unstyled"  v-if="isLoggedIn &&   !email">
                                      <a v-for="(j,k) in selected.det.affliateDomains"
                                         @click="alertEmailNotVerified()"
                                      >
                                        <span >{{k}}</span>
                                        <span  style="float: right" >
                                            <strong>BUY NOW</strong>
                                        </span>
                                        <br>
                                      </a>
                                    </li-->
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 col-xs-12 min_height">
                            <div class="prod_gallery">
                                <div class="gall_main" v-if="selected.det !== undefined">
                                    <a>
                                        <img :src="selected.det.pTypeImgUrl">
                                    </a>
                                    <el-button @click="dialog2=true" icon="el-icon-zoom-in"></el-button>
                                </div>
                                <el-dialog
                                        width="80%"
                                        :visible.sync="dialog2"
                                >
                                    <img class="main_image" :src="selected.det.pTypeImgUrl" alt="gallery">
                                </el-dialog>
                                <div class="gall_thumbs">

                                    <!--ul>
                                      <li class="active">
                                        <a :href="selected.det.pTypeImgUrl">
                                          <img src="/static/images/rectangle-18@2x.jpg" alt="gallery">
                                        </a>
                                      </li>
                                      <li>
                                        <a :href="selected.det.pTypeImgUrl">
                                          <img src="/static/images/rectangle-18-copy@2x.jpg" alt="gallery">
                                        </a>
                                      </li>
                                      <li>
                                        <a :href="selected.det.pTypeImgUrl">
                                          <img src="/static/images/rectangle-18-copy-19@2x.jpg" alt="gallery">
                                        </a>
                                      </li>
                                      <li>
                                        <a :href="selected.det.pTypeImgUrl">
                                          <img src="/static/images/rectangle-18-copy-20@2x.jpg" alt="gallery">
                                        </a>
                                      </li>
                                    </ul-->
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                            <div class="prod_inncont">
                                <h3>Overview</h3>
                                <div v-html="pDets[$router.currentRoute.params.pId].pOtherDetail.pAbout"
                                     class="min_height"></div>
                                <h3>Product Details</h3>
                            </div>
                            <ul class="prod_social">
                                <li><a href="https://www.instagram.com/kult.in/" target="_blank"><i
                                        class="fa fa-instagram"></i></a></li>
                                <li><a href="https://goo.gl/UHWH1o" target="_blank"><i
                                        class="fa fa-youtube-play"></i></a></li>
                                <!--li><a  target="_blank"><i class="fa fa-facebook"></i></a></li>
                                <li><a  target="_blank"><i class="fa fa-pinterest"></i></a></li>
                                <li><a  target="_blank"><i class="fa fa-twitter"></i></a></li-->
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="prod_rel_cats text-center">
                    <div>
                        <h3>Recommended</h3>
                    </div>
                    <rec-loader v-if="recLoader"></rec-loader>
                  <div v-else>
                    <open :loopObj="recProducts" :md_lg_val="6"></open>
                  </div>
                    <!--el-row :gutter="15">
                        <el-col :xs="24" :sm="24" :md="6" :lg="6" v-for="(pDet, pId) in recProducts"
                                v-if="parseInt(pDet.priceStartsFrom) != 999999999"
                                v-show="!recLoader"
                        >
                            <div style="display: flex; justify-content: center;">
                                <div class="grid-content pa-2 rec_prod">
                                    <a class="prod_image"
                                       @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">
                                        <img :src="pDet.pBasicDetail.pPicUrl" style="height:200px; max-width: 276.656px"
                                             alt="product">
                                    </a>
                                    <div class="prod_cont"
                                         @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">
                                        <h4><a>{{pDet.pBasicDetail.pBrand}}</a></h4>
                                        <span v-for="(i,k) in pDet.pBasicDetail.pName" v-if="k < 20">{{i}}</span><span
                                            v-if="pDet.pBasicDetail.pName.length > 20">...</span>
                                    </div>
                                    <div class="prod_misc"
                                         @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">
                                        <div class="float">
                                            <rating :num="Math.round(pDet.pBasicDetail.pRating)"></rating>
                                        </div>
                                        <div class="half text-right">
                              <span v-if="parseInt(pDet.priceStartsFrom) == 999999999" style="float: right"
                                    class="half text-right">
                                Out Of Stock
                              </span>
                                            <div v-else-if="parseInt(pDet.priceStartsFrom) <= 10000 ">
                                                From <img src="/static/images/rupee-2.svg" alt="currency">
                                                {{pDet.priceStartsFrom}}
                                            </div>
                                            <div v-else></div>
                                        </div>
                                    </div>
                                    <a class="prod_compare" v-if="isLoggedIn"><span
                                            @click="$router.push({path:`/particularProduct/${pId}`, query:{varient:'notSelected'}})">Compare price</span>
                                        <img src="/static/images/wishlist-add.svg" alt="wishlist-add"
                                             v-if="Object.keys(wishlistObj).indexOf(pId) === -1"
                                             @click="addWishlist({pId,pDet}); wishlistObj[pId] = pDet; $forceUpdate()">
                                        <img src="/static/images/wishlist-hover.svg" alt="wishlist-hover"
                                             v-if="Object.keys(wishlistObj).indexOf(pId) !== -1"
                                             @click="removeWishlist({pId,pDet}); delete wishlistObj[pId]; $forceUpdate()">
                                    </a>
                                    <a class="prod_compare" v-if="!isLoggedIn"><span
                                            @click="$router.push({path:`/particularProduct/${pId}`})">Compare price</span>
                                        <img src="/static/images/wishlist-add.svg" alt="wishlist-add"
                                             @click="$store.state.auth.showLoginPopup = true">
                                    </a>
                                </div>
                            </div>
                        </el-col>
                        <!-- load more ends -->
                    <!--/el-row-->
                    <!--div class="prod_repeater">
                      <div class="prod_repeat prod_repeat1">
                        <a class="prod_image" >
                          <img src="/static/images/item-1@2x.jpg" alt="product">
                        </a>
                        <div class="prod_cont">
                          <h4><a >MAXFACOR</a></h4>
                          <p>Miracle Touch Foundation</p>
                        </div>
                        <div class="prod_misc">
                          <div class="half"><img src="/static/images/rate-4.svg" alt="rating"></div>
                          <div class="half text-right">From <img src="/static/images/rupee-2.svg" alt="currency"> 2,036</div>
                        </div>
                        <a  class="prod_compare">Compare price <img src="/static/images/wishlist-add.svg" alt="wishlist-add"></a>
                        <a  class="go_store">Go to store</a>
                      </div>
                      <div class="prod_repeat prod_repeat2">
                        <a class="prod_image" >
                          <img src="/static/images/item-2@2x.jpg" alt="product">
                        </a>
                        <div class="prod_cont">
                          <h4><a >CLINIQUE</a></h4>
                          <p>Even Better Glow</p>
                        </div>
                        <div class="prod_misc">
                          <div class="half"><img src="/static/images/rate-4.svg" alt="rating"></div>
                          <div class="half text-right">From <img src="/static/images/rupee-2.svg" alt="currency"> 2,036</div>
                        </div>
                        <a  class="prod_compare">Compare price <img src="/static/images/wishlist-add.svg" alt="wishlist-add"></a>
                        <a  class="go_store">Go to store</a>
                      </div>
                      <div class="prod_repeat prod_repeat3">
                        <a class="prod_image" >
                          <img src="/static/images/item-3@2x.jpg" alt="product">
                        </a>
                        <div class="prod_cont">
                          <h4><a >ELF</a></h4>
                          <p>Glossy Lipstick</p>
                        </div>
                        <div class="prod_misc">
                          <div class="half"><img src="/static/images/rate-4.svg" alt="rating"></div>
                          <div class="half text-right">From <img src="/static/images/rupee-2.svg" alt="currency"> 2,036</div>
                        </div>
                        <a  class="prod_compare">Compare price <img src="/static/images/wishlist-add.svg" alt="wishlist-add"></a>
                        <a  class="go_store">Go to store</a>
                      </div>
                      <div class="prod_repeat prod_repeat4">
                        <a class="prod_image" >
                          <img src="/static/images/item-4@2x.jpg" alt="product">
                        </a>
                        <div class="prod_cont">
                          <h4><a >NYX</a></h4>
                          <p>Eyeshadow Palette</p>
                        </div>
                        <div class="prod_misc">
                          <div class="half"><img src="/static/images/rate-4.svg" alt="rating"></div>
                          <div class="half text-right">From <img src="/static/images/rupee-2.svg" alt="currency"> 2,036</div>
                        </div>
                        <a  class="prod_compare">Compare price <img src="/static/images/wishlist-add.svg" alt="wishlist-add"></a>
                        <a  class="go_store">Go to store</a>
                      </div>
                    </div>
                  <!--/div-->
                </div>
            </div>
        </div>

        <span hidden> {{updateSelVar}}</span>


        <!-- sometimes there isn't price for a domain, in this case hide the links too -->
        <!--{{pTypes}}-->

    </div>
</template>

<script>
    import open from '@/components/openTabProd'
    import recLoader from '@/components/gen/recLoader'
    import compLoader from '@/components/gen/comp_loader'
    import rating from '@/components/rating'
    import {mapGetters} from 'vuex'
    import loader from '@/components/gen/loader'
    import {mapMutations} from 'vuex'
    import axios from 'axios'
    //
    export default {
        data() {
            return {
                pDets: {},
                email: false,
                dialog: false,
                dialog2: false,
                amazonPrice: '',
                //
                amazonPriceLoaded: false,//amazon price,
                selVar: {},
                amazonLinkPrice: '', ///////////show this var at amzon price
                amazonPriceLoader: true
            }
        },
        components: {
            loader,
            rating,
            compLoader,
            recLoader,
            open
        },
        computed: {
            ...mapGetters([
                'recProducts',
                'wishlistObj',
                'pTypes',
                'prodArr',
                'selected',
                'pTypeLoader',
                'isLoggedIn',
                'selectedLink',
                'amazonLoader',
                'recLoader'
                //
                //'amazonLinkPrice' //show this ******
            ]),
            updateSelVar() {
                this.selVar = this.$store.state.particularProduct.selected
                return this.selVar
            }
        },
        watch: {
            dialog: function () {
                let vm = this
                if (!this.dialog) {
                    setTimeout(() => {
                        this.$store.state.particularProduct.selectedLink = ''
                    }, 1000)
                }
            },
            '$route.params.pId': function () {
                let vm = this
                window.scroll(0, 0)
                this.$store.commit('getRecProducts')
                this.$store.commit('getTypeNLinkOfThisProduct', {
                    pId: this.$router.currentRoute.params.pId
                })
                let arr = []
                arr[0] = this.$router.currentRoute.params.pId
                this.$store.dispatch('getProdFromArr', arr).then(function (response) {
                    vm.pDets = response
                    //alert(this.$router.currentRoute.params.pId)
                    console.log(response)
                })
                //
                console.log("[selected]", this.$store.state.particularProduct.selected)
                //
                //if(!this.amazonPriceLoaded)
                //this.fetchAmazonPrice()
                //
            },
            selVar: () => {

                let vm = window.thisOfVueComp
                vm.amazonPriceLoader = true
                console.log(vm.amazonPriceLoader)
                //setTimeout(()=>{
                console.log("[@@@] => ", window.thisOfVueComp.$store.state.particularProduct.selected)
                //
                let x = window.thisOfVueComp.$store.state.particularProduct.selected
                console.log("[###]", x)
                let y = ''

                if (Object.keys(x).indexOf('det') != -1) {


                    if (Object.keys(x.det.affliateDomains).indexOf('amazon') != -1) { //amazon is there
                        vm.amazonPriceLoader = true
                        console.log('============1')
                        let url = x.det.affliateDomains.amazon.link
                        let pId = window.thisOfVueComp.$route.params.pId
                        let pType = x.key
                        //
                        //
                        console.log("[pid] => ", pId)
                        console.log("[pType] => ", pType)
                        console.log("[url] => ", url)
                        //
                        //
                        window.thisOfVueComp.$store.dispatch('axiosReq', {
                            params: {
                                pId, //fill **
                                pType //fill**
                            },
                            funcName: 'getAmazonPriceFromDb'
                        }).then((result_1) => {
                            console.log("1 => ", result_1)
                            if (result_1 == '-1' || result_1 == '999999999') { //not in db / or out of stock etc ...
                                window.thisOfVueComp.$store.dispatch('axiosReq', {
                                    params: {
                                        url //amazon lik url , fill**
                                    },
                                    funcName: 'getAmazonPriceFromAPI'
                                }).then((result_2) => {
                                    //
                                    console.log("2 => ", result_2)
                                    if (result_2 == '-1') {
                                        y = 'Failed to fetch Price !'
                                        window.thisOfVueComp.amazonLinkPrice = y
                                        console.log("[%] => ", window.thisOfVueComp.amazonLinkPrice)
                                        console.log('==============2')
                                        vm.amazonPriceLoader = false
                                        console.log(vm.amazonPriceLoader)
                                        //state.amazonLoader = false
                                        window.thisOfVueComp.$forceUpdate()
                                        //failed to fetch price, show accordingly(message) on dom
                                    } else if (result_2 == '999999999') {
                                        y = 'Out Of Stock'
                                        window.thisOfVueComp.amazonLinkPrice = y
                                        console.log("[%%] => ", window.thisOfVueComp.amazonLinkPrice)
                                        console.log('==============3')
                                        console.log(vm.amazonPriceLoader)
                                        vm.amazonPriceLoader = false
                                        console.log(window.thisOfVueComp)
                                        vm.$forceUpdate()
                                        console.log(vm.amazonPriceLoader)
                                        //show out of stock on dom
                                    } else {
                                        console.log("[save] => ", result_2)  // show result on dom //this is price of amazon link
                                        y = result_2
                                        window.thisOfVueComp.amazonLinkPrice = y
                                        console.log("[%] => ", window.thisOfVueComp.amazonLinkPrice)
                                        console.log('==============4')
                                        console.log(vm.amazonPriceLoader)
                                        vm.amazonPriceLoader = false
                                        console.log(window.thisOfVueComp)
                                        vm.$forceUpdate()
                                        //
                                        window.thisOfVueComp.$store.dispatch('axiosReq', {
                                            params: {
                                                pId, // fill**,
                                                pType, // fill**
                                                price: result_2
                                            },
                                            funcName: 'saveAmazonPriceToDb'
                                        })
                                        //
                                    }
                                    //*turn loader off*
                                    //state.amazonLoader = false
                                    //window.thisOfVueComp.$forceUpdate()
                                    //
                                })
                            } else {
                                console.log(result_1) // show result on dom //this is price of amazon link
                                y = result_1
                                window.thisOfVueComp.amazonLinkPrice = y
                                console.log("[%] => ", window.thisOfVueComp.amazonLinkPrice)
                                //*turn loader off*
                                console.log('==============5')
                                vm.amazonPriceLoader = false
                                console.log(vm.amazonPriceLoader + '***********************')
                                //state.amazonLoader = false
                                setTimeout(() => {
                                    window.thisOfVueComp.$forceUpdate()
                                }, 2000)
                            }
                        })
                        //
                        //
                    } else {
                        console.log('==============6')
                        vm.amazonPriceLoader = false
                        console.log(vm.amazonPriceLoader)
                        window.thisOfVueComp.$forceUpdate()
                        //do nothing
                        //state.amazonLoader = false  //stop loader
                    }
                    //
                    //
                    /*
                      window.thisOfVueComp.$forceUpdate()
                    console.log(y)
                      console.log(window.thisOfVueComp.amazonLinkPrice) */
                    //},6000)
                }
            }
        },
        methods: {
            ...mapMutations([
                'addWishlist',
                'removeWishlist',
                'sendVerLink',
            ]),
            newLink(link, k) {
                let vm = this
                let subid = ''
                if (this.$store.state.auth.isLoggedIn && vm.email) {
                    subid = this.$store.state.auth.user.email
                } else {
                    subid = ''
                }
                if (k == 'nykaa') {
                    return 'https://ad.admitad.com/g/1ocifeg24mf70acd494689d7fe25ba/?subid=' + subid + '&ulp=' + link
                } else if (k == 'flipkart') {
                    // return link
                    return 'https://ad.admitad.com/g/rb1qie435bf70acd4946a80d05f527/?subid=' + subid + '&ulp=' + link
                } else if (k == 'myntra') {
                    return 'https://ad.admitad.com/g/s56leml8ckf70acd494623d5247706/?subid=' + subid + '&ulp=' + link
                } else if (k == 'nnow') {
                    return 'https://ad.admitad.com/g/f6dgh64z7uf70acd4946f448324775/?subid=' + subid + '&ulp=' + link
                } else if (k == 'shoppersstop') {
                    return 'https://ad.admitad.com/g/4ez4f2n9r7f70acd49468ff14b2938/?subid=' + subid + '&ulp=' + link
                } else {
                    return link
                }


                // console.log('https://ad.admitad.com/g/1ocifeg24mf70acd494689d7fe25ba/?subid='+subid+'&ulp='+link)
            },
            emptyLink() {
                setTimeout(() => {
                    // alert(this.$store.state.particularProduct.selectedLink)
                    window.open(this.$store.state.particularProduct.selectedLink, '_blank')
                    this.$store.state.particularProduct.selectedLink = ''
                }, 200)//{

                // }
            }
        },
        //

        beforeDestroy() {
            this.$store.state.particularProduct.selectedLink = ''
        },
        created() {
            window.scroll(0, 0)
            let vm = this
            window.thisOfVueComp = this
            //
            this.$store.commit('getRecProducts')
            this.$store.commit('getTypeNLinkOfThisProduct', {
                pId: this.$route.params.pId
            })
            let arr = []
            arr[0] = this.$router.currentRoute.params.pId
            this.$store.dispatch('getProdFromArr', arr).then(function (response) {
                vm.pDets = response
                //alert(this.$router.currentRoute.params.pId)
                console.log(response)
            })
            if (vm.$store.state.auth.isLoggedIn) {
                for (let i in Object.values(vm.$store.state.auth.user.providerData)) {
                    console.log(vm.$store.state.auth.user)
                    if (Object.values(vm.$store.state.auth.user.providerData)[i].providerId === 'password') {
                        if (vm.$store.state.auth.user.emailVerified) {
                            vm.email = true
                        }
                    } else {
                        vm.email = true
                    }
                }
            }
            //
            this.$store.state.gen.f = true
            //
            //if(!this.amazonPriceLoaded)
            //this.fetchAmazonPrice()
        },
    }
</script>
<style scoped>
    .splash-banner {
        background: #1b70d3;
        position: absolute;
        bottom: 20px;
        left: -15px;
        width: 95%;
        text-align: center;
        z-index: 12000;
    }

    .splash-banner-title {
        color: #fff;
        font-weight: 700;
        padding: 12px;
        font-size: 12px;
        font-style: italic;
        display: block;
    }

    .splash-banner:before {
        content: '';
        display: block;
        position: absolute;
        bottom: -15px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 15px 15px 0;
        border-color: transparent #074778 transparent transparent;
    }

    .splash-banner:after {
        content: '';
        display: block;
        position: absolute;
        right: -20px;
        top: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 43px 20px 0 0;
        border-color: #1b71d3 transparent transparent transparent;
    }

    .ml_40 {
        margin-left: 30px;
    }

    .float {
        float: left;
    }

    .p_star {
        font-size: 20px;
        color: #eca8b5;
    }

    .p_star_unchecked {
        font-size: 20px;
        color: #959595;
    }

    .ml_24 {
        margin-left: 24px !important;
    }

    .mt_30 {
        margin-top: 5vh;
    }

    .aff_name {
        text-align: left;
        position: inherit !important;
        margin-left: -80px !important;

    }

    .aff_price {
        right: 45% !important;
        margin-top: 17px;
        /*  margin-top: -1vh;
        position: relative !important;
         margin-left: 20px !important;
         margin-right: 10px !important;*/
    }

    .prod_shoplinks li a span strong {
        margin-top: 14px !important;
        font-size: 14px;
        font-weight: bold;
        color: #000000;
        display: block;
    }

    .tv_left ul {
        padding: 0;
        margin: 0px 0 !important;
        list-style: none;
    }

    .min_height {
        min-height: 500px;
    }

    /*ul, ol {
      margin-top: 0;
      margin-bottom: 10px !important;
    }*/ /* it brings nav bar up */
    .main_image {
        width: 100%;
        min-height: 500px;
        max-height: 600px;

    }

    .show_price {
        padding: 0px;
        /* margin: 0px; */
        margin-top: -22px;
    }

    .rupee {
        right: 100% !important;
        margin-top: -1vh;
    }

    .prod_shoplinks li a span {
        position: absolute;
        line-height: 1;
        right: 13px;
        top: 0px;
        text-align: left;
    }

    .rec_prod {
        height: 342px;
        width: 276.66px;
    }
  .flipkart_img{
    height: 30px;
    width: 90px;
    margin-top: -9px;
  }
    .amazon_img{
      height: 30px;
      margin-top: -3px;
      width: 90px;
    }
    .nnnow_img{
      height: 30px;
      width: 80px;
      margin-top: -9px;
    }
  .shoppersstop_img{
    height: 35px;
    width: 100px;
    margin-top: -9px;
  }
</style>

