import router from '@/router'
import blogFunc from './blogFunctions'
import blog from './blog'
import gen from '../gen'
const state = {
  blogName:'',
  blogDet:{},
  sideBlogs:{},
  articleLike:'',
  articleViews:'',
  userLike:false,
  likeBtnLoader:false,
  articleLoader:false
}
const mutations = {
  articleContents(){
    state.articleLoader=true
    console.log(blog.state.blogs)
    if(Object.keys(blog.state.blogs).length!==0){
      state.blogName = router.currentRoute.query.name
      state.blogDet=blog.state.blogs[router.currentRoute.query.cat][router.currentRoute.query.name]
      console.log(state.blogDet)
    }else{
     // state.articleLoader=true
      mutations.getArticle()
      blog.mutations.getBlogs(blog.state)
    }
   /*// console.log(router.currentRoute.query)
    state.blogName = router.currentRoute.query.name
    state.blogDet = JSON.parse(router.currentRoute.query.selArticle)
   // state.sideBlogs = JSON.parse(router.currentRoute.query.sideBlogs)
    blogFunc.actions.getLikes(state,{blogCat:state.blogDet.blogCat,blogName:router.currentRoute.query.name}).then(function (likes) {
      state.articleLike=likes
      blog.mutations.blogView(state,{blogCat:state.blogDet.blogCat,blogName:router.currentRoute.query.name,blog:'article'})
    }).then(function () {
      console.log(state.blogName)
     // console.log(state.blogDet)
     // console.log(state.side)
    }) */
  },
  getArticle(){
    //console.log(blog.state.blogs)
    if(blog.state.blogs[router.currentRoute.query.cat]===undefined){
      setTimeout(()=>{
        mutations.getArticle()
      },200)
    }else{
      if(blog.state.blogs[router.currentRoute.query.cat][router.currentRoute.query.name]=== undefined){
        setTimeout(()=>{
          mutations.getArticle()
        },200)
      }else{
        console.log(blog.state.blogs)
       // state.articleLoader=false
        state.blogName = router.currentRoute.query.name
        state.blogDet=blog.state.blogs[router.currentRoute.query.cat][router.currentRoute.query.name]

        window.thisOfVueComp.$forceUpdate()
      }
    }
  }
}
const getters = {
  articleLike:state => state.articleLike,
  articleViews:state=>state.articleViews,
  blogName:state => state.blogName,
  blogDet:state=> state.blogDet,
  sideBlogs:state=>state.sideBlogs,
  userLike:state=>state.userLike,
  likeBtnLoader:state=>state.likeBtnLoader,
  articleLoader:state=>state.articleLoader
}
export default{
  state,
  getters,
  mutations
}
