import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import store from './store'


Axios.defaults.withCredentials=true;
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
// Vue.use(axios)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
