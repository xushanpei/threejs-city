import Vue from 'vue'	//引用vue
import Vuex from 'vuex'	//引用vuex

//modules


Vue.use(Vuex)	//安装vuex

//暴露接口(返回我们定义好的模块）
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
        logintoken:null,

    },
    mutations:{
        //es6语法，等同edit:funcion(){...}
        updatelogintaken(state,newlogin){
            state.logintoken = newlogin
        }
    }
})
export default store