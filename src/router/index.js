import Vue from 'vue'
import Router from 'vue-router'
//
const Hello = resolve => {
  require.ensure(['@/components/Hello'],()=>{
    resolve(require('@/components/Hello'));
  });
};
//product
const product_particularProduct = resolve => {
  require.ensure(['@/components/product/particularProduct'],()=>{
    resolve(require('@/components/product/particularProduct'));
  });
};
const product_category = resolve => {
  require.ensure(['@/components/product/product_category'],()=>{
    resolve(require('@/components/product/product_category'));
  });
};
const product_subCategory = resolve => {
  require.ensure(['@/components/product/product_subCategory'],()=>{
    resolve(require('@/components/product/product_subCategory'));
  });
};
//brand
const brand_all = resolve => {
  require.ensure(['@/components/brand/brand_all'],()=>{
    resolve(require('@/components/brand/brand_all'));
  });
};
const brand_product = resolve => {
  require.ensure(['@/components/brand/brand_product'],()=>{
    resolve(require('@/components/brand/brand_product'));
  });
};
//global Best Seller
const globalBestSeller_product = resolve => {
  require.ensure(['@/components/globalBestSeller/globalBestSeller_product'],()=>{
    resolve(require('@/components/globalBestSeller/globalBestSeller_product'));
  });
};
const globalBestSellerShopOption_product = resolve => {
  require.ensure(['@/components/globalBestSeller/globalBestSellerShopOption_product'],()=>{
    resolve(require('@/components/globalBestSeller/globalBestSellerShopOption_product'));
  });
};
//kult pick
const kultPick_product = resolve => {
  require.ensure(['@/components/kultPick/kultPick_product'],()=>{
    resolve(require('@/components/kultPick/kultPick_product'));
  });
};
const kultPickShopOption_product = resolve => {
  require.ensure(['@/components/kultPick/kultPickShopOption_product'],()=>{
    resolve(require('@/components/kultPick/kultPickShopOption_product'));
  });
};
//howTo
const howTo = resolve => {
  require.ensure(['@/components/howTo/howTo'],()=>{
    resolve(require('@/components/howTo/howTo'));
  });
};
//blog
const blog = resolve => {
  require.ensure(['@/components/blog/blog'],()=>{
    resolve(require('@/components/blog/blog'));
  });
};
const article = resolve => {
  require.ensure(['@/components/blog/article'],()=>{
    resolve(require('@/components/blog/article'));
  });
};
//auth
const auth_login = resolve => {
  require.ensure(['@/components/auth/login'],()=>{
    resolve(require('@/components/auth/login'));
  });
};
const auth_signup = resolve => {
  require.ensure(['@/components/auth/signup'],()=>{
    resolve(require('@/components/auth/signup'));
  });
};
const emailVer = resolve => {
  require.ensure(['@/components/auth/emailVer'],()=>{
    resolve(require('@/components/auth/emailVer'));
  });
};
const forgotPassword = resolve => {
  require.ensure(['@/components/auth/forgotPassword'],()=>{
    resolve(require('@/components/auth/forgotPassword'));
  });
};
//profile
const editProfile = resolve => {
  require.ensure(['@/components/profile/editProfile'],()=>{
    resolve(require('@/components/profile/editProfile'));
  });
};
const wishlist = resolve => {
  require.ensure(['@/components/wishlist/wishlist'],()=>{
    resolve(require('@/components/wishlist/wishlist'));
  });
};
const changePassword = resolve => {
  require.ensure(['@/components/profile/changePassword'],()=>{
    resolve(require('@/components/profile/changePassword'));
  });
};
const deleteAccount = resolve => {
  require.ensure(['@/components/profile/deleteAccount'],()=>{
    resolve(require('@/components/profile/deleteAccount'));
  });
};
const updatePhoneNo = resolve => {
  require.ensure(['@/components/profile/updatePhoneNo'],()=>{
    resolve(require('@/components/profile/updatePhoneNo'));
  });
};
const about = resolve => {
  require.ensure(['@/components/gen/about'],()=>{
    resolve(require('@/components/gen/about'));
  });
};
const contact = resolve => {
  require.ensure(['@/components/gen/contact'],()=>{
    resolve(require('@/components/gen/contact'));
  });
};
const tnc = resolve => {
  require.ensure(['@/components/gen/tnc'],()=>{
    resolve(require('@/components/gen/tnc'));
  });
};
const cashback = resolve => {
  require.ensure(['@/components/gen/cashback'],()=>{
    resolve(require('@/components/gen/cashback'));
  });
};
//cashback
const amazonCashbackReq = resolve => {
  require.ensure(['@/components/cashback/amazonCashbackReq'],()=>{
    resolve(require('@/components/cashback/amazonCashbackReq'));
  });
};
const credit = resolve => {
  require.ensure(['@/components/cashback/credit'],()=>{
    resolve(require('@/components/cashback/credit'));
  });
};
const myOrder = resolve => {
  require.ensure(['@/components/cashback/myOrder'],()=>{
    resolve(require('@/components/cashback/myOrder'));
  });
};
const withdrawReq = resolve => {
  require.ensure(['@/components/cashback/withdrawReq'],()=>{
    resolve(require('@/components/cashback/withdrawReq'));
  });
};
//beautyGuide
const bGuide = resolve => {
  require.ensure(['@/components/beautyGuide/bGuide'],()=>{
    resolve(require('@/components/beautyGuide/bGuide'));
  });
};
const countring = resolve => {
  require.ensure(['@/components/beautyGuide/contouring'],()=>{
    resolve(require('@/components/beautyGuide/contouring'));
  });
};
const highlight = resolve => {
  require.ensure(['@/components/beautyGuide/highlight'],()=>{
    resolve(require('@/components/beautyGuide/highlight'));
  });
};
const mascara = resolve => {
  require.ensure(['@/components/beautyGuide/mascara'],()=>{
    resolve(require('@/components/beautyGuide/mascara'));
  });
};
const naturalLips = resolve => {
  require.ensure(['@/components/beautyGuide/naturalLips'],()=>{
    resolve(require('@/components/beautyGuide/naturalLips'));
  });
};
const acne = resolve => {
  require.ensure(['@/components/beautyGuide/acne'],()=>{
    resolve(require('@/components/beautyGuide/acne'));
  });
};
const masks = resolve => {
  require.ensure(['@/components/beautyGuide/masks'],()=>{
    resolve(require('@/components/beautyGuide/masks'));
  });
};
const sunscreen = resolve => {
  require.ensure(['@/components/beautyGuide/sunscreen'],()=>{
    resolve(require('@/components/beautyGuide/sunscreen'));
  });
};
const skincare = resolve => {
  require.ensure(['@/components/beautyGuide/skinCare'],()=>{
    resolve(require('@/components/beautyGuide/skinCare'));
  });
};
const searchProd = resolve => {
  require.ensure(['@/components/search/searchProd'],()=>{
    resolve(require('@/components/search/searchProd'));
  });
};
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Hello', component: Hello },
    { path: '/about', name: 'About', component: about },
    { path: '/contact', name: 'Contact', component: contact },
    { path: '/tnc', name: 'T&C', component: tnc },
    { path: '/cashback', name: 'Cashback', component: cashback },
    //product
    { path: '/particularProduct/:pId', name: 'Particular Product', component: product_particularProduct},
    { path: '/productCategory/:shopOption/:category', name: 'Product Category', component: product_category},
    { path: '/productSubCategory/:shopOption/:category/:subCategory', name: 'Product SubCategory', component: product_subCategory},
    //brand
    { path: '/brandAll', name: 'Brand All', component: brand_all},
    { path: '/brandProduct/:brand', name: 'Brand Product', component: brand_product},
    //special
    { path: '/globalBestSeller', name: 'Global Best Seller', component: globalBestSeller_product },
    { path: '/globalBestSeller/shopOption/:shopOption', name: 'Global Best Seller - Shop', component: globalBestSellerShopOption_product},
    //
    { path: '/kultPick', name: 'Kult Pick', component: kultPick_product },
    { path: '/kultPick/shopOption/:shopOption', name: 'Kult Pick - Shop', component: kultPickShopOption_product},
    //howTo
    { path: '/howTo', name: 'How To', component: howTo },
    //blog
    { path: '/blog', name: 'Blog', component: blog},
    { path: '/article', name: 'Article', component: article},
    //auth
    { path: '/login', name: 'Login', component: auth_login },
    { path: '/signup', name: 'Signup', component: auth_signup },
    { path: '/emailVer', name: 'Email Verification', component: emailVer },
    { path: '/forgotPassword', name: 'Forgot Password', component: forgotPassword },
    //profile
    { path: '/editProfile', name: 'Edit Profile', component: editProfile },
    { path: '/changePassword', name: 'Change Password', component: changePassword },
    { path: '/deleteAccount', name: 'Delete Account', component: deleteAccount },
    { path: '/updatePhoneNo', name: 'Update Phone No', component: updatePhoneNo },
    //wishlist
    { path: '/wishlist', name: 'Wishlist', component: wishlist },
    //cashback
    { path: '/amazonCashbackReq' , name: 'Amazon Cashback Request', component: amazonCashbackReq},
    { path: '/credit' , name: 'Credit', component: credit},
    { path: '/myOrder', name : 'My Order', component: myOrder},
    { path: '/withdrawReq' , name : 'Withdraw Request', component: withdrawReq},
    //bGuide
    { path: '/bGuide/Blush', name: 'Beauty Guide', component: bGuide},
    { path: '/bGuide/Contouring', name: 'Beauty Countouring', component: countring},
    { path: '/bGuide/Highlighting', name: 'Highlight', component: highlight},
    { path: '/bGuide/Mascaras', name: 'Mascara', component: mascara},
    { path: '/bGuide/Neutral Lips', name: 'Natural Lips', component: naturalLips},
    { path: '/bGuide/Acne', name: 'Acne', component: acne},
    { path: '/bGuide/Antiaging', name: 'Masks', component: masks},
    { path: '/bGuide/Sunscreens', name: 'Masks', component: sunscreen},
    { path: '/bGuide/Skincare', name: 'skincare', component: skincare},
    { path: '/search', name: 'Search', component: searchProd},
  ]
})
