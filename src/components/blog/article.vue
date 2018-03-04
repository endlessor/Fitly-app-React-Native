<template>
  <div>
    <div >
      <div class="banner_strip"></div>
      <div class="comm_pagebreads">
        <div class="container">
          <div >
            <div class="row">
              <div class="col-sm-5 col-xs-12 comm_page_title">
                <span>Welcome</span>
                <h2>Kult Blog</h2>
              </div>
              <div class="col-sm-7 col-xs-12 text-right cust_left">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="blog_inn">
        <div class="container">
          <div class="max_width">
            <div class="row">
              <div class="col-xs-12">
                <div class="blog_in_title">
                  <span class="blog_inndate">{{dates(blogDet.date)}}</span>
                  <h2>{{blogName}}</h2>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="col-sm-7 col-xs-12 blog_left">
                <div class="blog_inncont">
                  <div class="blog_image" >
                    <img :src="blogDet.blogImgUrl" alt="blog">
                    <span ><span  class="blog_tag" v-for="i in blogDet.blogTag ">#{{i}}</span></span>
                  </div>
                  <ul class="list-unstyled list-inline blog_views">
                    <li><img src="/static/images/view.svg" alt="view">{{articleViews}}</li>
                    <i class='fa fa-spinner fa-spin ' v-show="likeBtnLoader"></i>
                    <li  v-show="!likeBtnLoader" v-if="isLoggedIn">
                      <img src="/static/images/heart-icon.svg" alt="view" v-if="!userLike" @click="blogLike({blogCat:blogDet.blogCat,blogName:$route.query.name,userUid:user.uid})">
                      <span v-if="userLike" @click="blogLike({blogCat:blogDet.blogCat,blogName:$route.query.name,userUid:user.uid})"><i class="fa fa-heart"></i></span>
                      {{articleLike}}
                    </li>
                    <li v-if="!isLoggedIn"><img src="/static/images/heart-icon.svg" alt="view"  @click="$store.state.auth.showLoginPopup=true">{{articleLike}}</li>
                  </ul>
                  <ul class="list-unstyled list-inline">
                    <li><a href="https://www.instagram.com/kult.in/" target="_blank"><i class="fa fa-instagram icon_size" ></i></a></li>
                    <li><a href="https://goo.gl/UHWH1o" target="_blank"><i class="fa fa-youtube-play icon_size"></i></a></li>
                    <!--li><a  target="_blank"><i class="fa fa-facebook"></i></a></li>
                    <li><a  target="_blank"><i class="fa fa-instagram"></i></a></li>
                    <li><a  target="_blank"><i class="fa fa-pinterest"></i></a></li-->
                  </ul>
                  <p v-html="blogDet.blogContent">
                  </p>
                </div>
              </div>
              <div class="col-sm-5 col-xs-12 hidden-xs sidebar" >
                <div class="side_box">
                  <div class="blog_sidecat" v-for="(b,cat) in blogs">
                    <h4>{{cat}}</h4>
                    <div class="cat_side" v-for="(blog,name) in b"  @click="$router.push({path:'/article', query:{name,cat}})">
                      <a  class="cat_img" ><img :src="blog.blogImgUrl" alt="image" class="img_size"></a>
                      <div class="cat_cont">
                        <h5><a >{{name}}</a></h5>
                        <ul class="comm_pagemenus "><span v-for="i in blog.blogTag "><li><a  class="cat_link" >{{i}}</a></li></span></ul>
                        <ul class="list-unstyled list-inline blog_views">
                          <li><img src="/static/images/view.svg" alt="view">{{blog.views}}</li>
                          <li><img src="/static/images/heart-icon.svg" alt="view">{{blog.likes}}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="ads">
                    <a >
                      <img src="/static/images/ads@2x.jpg" alt="ads">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login></login>
  <!--div style="background-color:yellow ">{{this.$store.state.article.blogName}}</div>
    {{$store.state.article.blogDet}}-->
  <!--{{$store.state.article.sideBlogs}}-->
  </div>
</template>
<script>
  import loader from '@/components/gen/loader'
  import btnLoader from '@/components/gen/btnLoader'
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import login from '@/components/auth/login'
  export default {
    components:{
      loader,
      login,
      btnLoader
    },
    methods:{
      ...mapMutations([
        'blogLike'
      ]),
      dates(date){
        let newDate = moment(date).format('MMMM D YYYY')
        return newDate
      },
      articleBlog(blog){
        console.log(blog)
        let selBlog = JSON.stringify(blog)
        console.log(selBlog)
        return selBlog
      },
    },
    watch:{
      $route:function () {
        let vm = this
        this.$store.commit('articleContents')
        this.$store.dispatch('getLikes',{blogCat:vm.$route.query.cat, blogName:vm.$route.query.name})
        if(vm.$store.state.auth.user){
          this.$store.dispatch('getLikeStatus',{
            blogCat: vm.$router.currentRoute.query.cat,
            blogName:vm.$router.currentRoute.query.name,
            uid:vm.$store.state.auth.user.uid
          }).then(function () {
            vm.$forceUpdate()
          })
        }
        this.$store.commit('blogView',{
          blogCat: vm.$router.currentRoute.query.cat,
          blogName:vm.$router.currentRoute.query.name,
        })
        this.$store.dispatch('getLikes',{
          blogCat: vm.$router.currentRoute.query.cat,
          blogName:vm.$router.currentRoute.query.name,
        }).then(function () {
          vm.$forceUpdate()
        })
      }
    },
    computed:{
      ...mapGetters([
        'blogDet',
        'blogName',
        'blogs', // blogs & details (right side category wise(small))
        'blogLoader', //loader for blog
        //
        'blogTags', // blog tags
        'blogTagLoader', // blog tag loader,
        //
        'blogsAtHome',  //blog to show on home page(large left side blogs)
        'blogsAtHomeLoader', //loader for blogs at home (left side)
        'articleLike',
        'articleViews',
        'isLoggedIn',
        'user',
        'userLike',
        'likeBtnLoader',
        'articleLoader'
      ])
    },
    created(){
      let vm = this
      window.scroll(0,0)
      window.thisOfVueComp=this
      this.$store.commit('articleContents')
      //alert(vm.$store.state.auth.user.uid)
      this.$store.dispatch('getLikes',{blogCat:vm.$route.query.cat, blogName:vm.$route.query.name})
      setTimeout(()=>{
        console.log(vm.$route)
       //
        if(vm.$store.state.auth.user){
          this.$store.dispatch('getLikeStatus',{
            blogCat: vm.$router.currentRoute.query.cat,
            blogName:vm.$router.currentRoute.query.name,
            uid:vm.$store.state.auth.user.uid
          }).then(function () {
            vm.$forceUpdate()
          })
        }
      },2000)
      this.$store.commit('blogView',{
        blogCat: vm.$router.currentRoute.query.cat,
        blogName:vm.$router.currentRoute.query.name,
      })
      this.$store.dispatch('getLikes',{
        blogCat: vm.$router.currentRoute.query.cat,
        blogName:vm.$router.currentRoute.query.name,
      }).then(function () {
        vm.$forceUpdate()
      })
    }
  }
</script>
<style>
  .img_size{

    height: 109.531px;
    width: 91.266px;

  }
  .icon_size{
    font-size: 18px;

    margin-right: 3px;
  }
  .blog_tag {
     position: relative !important;
    left: 0;
    bottom: 0;
    line-height: 20px;
    background: #000;
    padding: 10px;
    margin-top: -3px;
    /* padding: 6px 11px; */
    color: #fff;
    letter-spacing: 1px;
    z-index: 3;
  }
  .max_width{
    min-height: 900px;
  }
</style>
