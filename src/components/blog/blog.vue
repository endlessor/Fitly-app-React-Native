<template xmlns="http://www.w3.org/1999/html">
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
              <ul class="comm_pagemenus blog_tags" >
                <span   v-for="(blogTagDet, blogTagName) in blogTags"
                       @click="getBlogsOfThisTag({
                          tagName: blogTagName
                        })"
                >
                  <li ><a >{{blogTagName}}</a></li>
                </span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comm_pagearea">
      <div class="container">
        <div class="min_height">
          <div class="row">
            <div class="col-sm-7 col-xs-12 blog_left">
              <loader v-if="blogsAtHomeLoader"></loader>
              <div v-if="!blogsAtHomeLoader">
                <div class="blog_repeat" v-for="(blog,k) in blogsAtHome">
                  <div class="blog_image">
                    <a ><img :src="blog.blogImgUrl" alt="blog"></a>
                    <a  class="blog_tag" v-for="i in blog.blogTag ">#{{i}}</a>
                  </div>
                  <div class="blog_cont">
                    <h3>{{k}}</h3>
                    <span class="blog_date">{{dates(blog.date)}}</span>
                    <span v-html="blogCont(blog.blogContent)"></span>
                    <span>...</span>
                    <!--span v-for="(b,j) in blog.blogContent" v-show="j <= 30">
                    <span >{{b}}</span>
                  </span>
                    <span v-if="blog.blogContent.length > 31">...</span-->
                    <a @click="$router.push({path:'/article', query:{name:k, cat:blog.blogCat}})" class="blog_read">Read more</a>

                  </div>
                </div>
                <div class="blog_repeat visible-xs" v-for="(blog,k) in blogs" >
                  <div v-for="(b,n) in blog" v-if="Object.keys(blogsAtHome).indexOf(n) == -1">
                    <div class="blog_image">
                      <a ><img :src="b.blogImgUrl" alt="blog"></a>
                      <a  class="blog_tag" v-for="i in b.blogTag ">#{{i}}</a>
                    </div>
                    <div class="blog_cont">
                      <h3>{{k}}</h3>
                      <span class="blog_date">{{dates(b.date)}}</span>
                      <span v-html="blogCont(b.blogContent)"></span>
                      <span>...</span>
                      <!--span v-for="(b,j) in blog.blogContent" v-show="j <= 30">
                      <span >{{b}}</span>
                    </span>
                      <span v-if="blog.blogContent.length > 31">...</span-->
                      <a @click="$router.push({path:'/article', query:{name:n, cat:b.blogCat}})" class="blog_read">Read more</a>

                    </div>
                  </div>
                </div>
                <div class="blog_repeat">
                  <div class="blog_contact">
                    <h4>Get in touch</h4>
                    <ul class="list-unstyled list-inline">
                      <li><a href="https://www.instagram.com/kult.in/" target="_blank"><i class="fa fa-instagram" ></i></a></li>
                      <li><a href="https://goo.gl/UHWH1o" target="_blank"><i class="fa fa-youtube-play"></i></a></li>
                      <!--li><a  target="_blank"><i class="fa fa-facebook"></i></a></li>
                      <li><a  target="_blank"><i class="fa fa-instagram"></i></a></li>
                      <li><a  target="_blank"><i class="fa fa-pinterest"></i></a></li-->
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-5 col-xs-12 hidden-xs sidebar" >
              <div class="side_box" >
                        <div class="side_box" >
                          <div class="blog_repeat" >
                            <div class="blog_contact">
                              <h4>Get in touch</h4>
                              <ul class="list-unstyled list-inline">
                                <li><a href="https://www.instagram.com/kult.in/" target="_blank"><i class="fa fa-instagram"></i></a></li>
                                <li><a href="https://goo.gl/UHWH1o" target="_blank"><i class="fa fa-youtube-play"></i></a></li>
                                <!--li><a  target="_blank"><i class="fa fa-facebook"></i></a></li>
                                <li><a  target="_blank"><i class="fa fa-instagram"></i></a></li>
                                <li><a  target="_blank"><i class="fa fa-pinterest"></i></a></li-->
                              </ul>
                            </div>
                          </div>
                        </div>
                      <loader v-if="blogLoader"></loader>
                        <div class="side_box" v-else>
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















  <!--  TAGS =>
    <div
      v-for="(blogTagDet, blogTagName) in blogTags"
      @click="getBlogsOfThisTag({
        tagName: blogTagName
      })"
    >
      {{blogTagName}}
    </div>

    <br>
    BLOGS AT HOME =>
    {{blogsAtHome}}
    <br>

    <br>
    BLOGS =>
    {{blogs}}-->

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import moment from 'moment'
  import loader from '@/components/gen/searchLoader'
  import tagLoader from '@/components/gen/recLoader'
  //
  export default {
    //
    components:{
      loader,
      tagLoader
    },
    created(){
      window.thisOfVueComp = this
      //
      this.$store.commit('getBlogs')
      this.$store.commit('getBlogTags')
      this.$store.commit('getBlogsAtHome')
    },
    //
    methods:{
      ...mapMutations([
        'getBlogsOfThisTag',
        'goTo'
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
      blogCont(content){
        let str = content.substring(0,60)
        str.split('h2')
        console.log(str)
        return str
      }
    },
    //
    computed:{
      ...mapGetters([
        'blogs', // blogs & details (right side category wise(small))
        'blogLoader', //loader for blog
        //
        'blogTags', // blog tags
        'blogTagLoader', // blog tag loader,
        //
        'blogsAtHome',  //blog to show on home page(large left side blogs)
        'blogsAtHomeLoader', //loader for blogs at home (left side)
      ]),
    }
  }
</script>
<style scoped>
  .img_size{

    height: 109.531px;
    width: 91.266px;

  }
  .min_height{
    min-height: 900px;
  }
</style>
