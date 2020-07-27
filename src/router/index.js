import Vue from 'vue'
import Router from 'vue-router'
import DengLu from '../components/DengLu/DengLu.vue'
import first3D from "../pages/first3D.vue"
import Geojson from "../pages/Geojson.vue"
import Obj from "../pages/Obj.vue"
import City from "../pages/City.vue"



// import Producer from "../components/Producer"
// 告诉vue使用router
Vue.use(Router)
//暴露出router
export default new Router({
    //配置路由的模式，默认hash，可选history
    //hash 显示效果为：http://localhost:8081/#/about
    //history 显示效果为：http://localhost:8081/about
    //history需要后端配置，因为此路由会去服务器请求路径文件，应该配置服务器什么都不操作，详见：https://router.vuejs.org/zh/guide/essentials/history-mode.html
    mode:"hash",
    //routes中设置路由的页面
    routes: [
        {
            //路由的路径
            path: '/denglu',
            //名称
            name: 'denglu',
            //页面
            component: City
        },

        {
            //路由的路径
            path: '/',
            //重定向路径
            redirect:"/denglu"
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     //可以通过这种方法直接引入页面，简写
        //     component: () => import( './views/About.vue'),
        //     //嵌套路由用法
        //     children: [{
        //         //代表在路由'/about/任何id值'才会显示此组件
        //         path: ':id',
        //         component: () => import("./views/about/about1.vue"),
        //     }, {
        //         //代表在路由'/about/任何id值/about2'才会显示此组件
        //         path: ':id/about2',
        //         component: () => import("./views/about/about2.vue"),
        //     }]
        // },
        // {
        //     path: '/user',
        //     name: 'user',
        //     //命名视图(注意要加s)
        //     components:{
        //         //没有命名的视图默认为default
        //         default:user,
        //         //显示命名为a的视图为a组件
        //         a:a
        //     }
        // },
        {
            //设置404页面
            path: '*',
            //重定向404页面（需要上面配置好）
            redirect:"/404"
        }
    ],
    //设置跳转后的滚动条
    // scrollBehavior(to,from,savePostion){
    //     //跳转到的路由，从哪个路由跳转，上个路由的滚动条位置
    //     console.log(to,from,savePostion)
    //     //可以设置滚动条坐标
    //     return {x:0,y:1000}
    //     //也可以设置滚动到某个元素(选择器)
    //     return {selector:'#btn'}
    // }
})