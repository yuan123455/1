import Vue from 'vue';
import App from './App';
import require from "./utils/require.js";
Vue.config.productionTip = false
Vue.prototype.require=require;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
