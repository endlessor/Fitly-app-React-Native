import Vue from 'vue'
import Vuex from 'vuex'
//modules
import auth from './modules/auth'
import gen from './modules/gen'
//header
import header_shopOption from './modules/header/header_shopOption'
import header_brand from './modules/header/header_brand'
//product
import product from './modules/product/product'
import particularProduct from './modules/product/particularProduct'
//filter
import filter from './modules/filter/filter'
//brand
import brand_all from './modules/brand/brand_all'
//howTo
import howTo from './modules/howTo/howTo'
//blog
import blog from './modules/blog/blog'
import blogFunc from './modules/blog/blogFunctions'
import article from './modules/blog/article'
//profile
import editProfile from './modules/profile/editProfile'
import changePassword from "./modules/profile/changePassword"
import deleteAccount from './modules/profile/deleteAccount'
import updatePhoneNo from './modules/profile/updatePhoneNo'
//wishlist
import wishlist from './modules/wishlist/wishlist'
//cashback
import amazonCashbackReq from './modules/cashback/amazonCashbackReq'
import credit from './modules/cashback/credit'
import myOrder from './modules/cashback/myOrder'
import withdrawReq from './modules/cashback/withdrawReq'
//homePage
import hello from './modules/hello'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules:{
    //
    auth,
    gen,
    //
    header_shopOption,
    header_brand,
    //
    product,
    particularProduct,
    //
    filter,
    //
    brand_all,
    //
    howTo,
    //
    blog,
    blogFunc,
    article,
    //
    editProfile,
    changePassword,
    deleteAccount,
    updatePhoneNo,
    //
    wishlist,
    //
    amazonCashbackReq,
    credit,
    myOrder,
    withdrawReq,
    //
    hello
  }
})
