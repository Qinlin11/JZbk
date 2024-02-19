import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/plugins/element'
import '@/plugins/viewer'
import 'animate.css';
import axios from 'axios';
import Header from '@/components/Header'
import Comment from '@/components/Comment'
import Ready from '@/components/Ready'
import Prepare from '@/components/Prepare'
import PDF from '@/components/Pdf'
import Sec from '@/components/Sec'
import Design from '@/components/Design'
import Create from '@/components/Create'
import myButton from '@/components/MyButton'
import * as moment from 'moment'
Vue.component(myButton.name,myButton)
Vue.component(Create.name,Create)
Vue.component(Design.name,Design)
Vue.component(Sec.name,Sec)
Vue.component(PDF.name,PDF)
Vue.component(Ready.name,Ready)
Vue.component(Prepare.name,Prepare)
Vue.component(Header.name,Header)
Vue.component(Comment.name,Comment)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = axios; 
    Vue.prototype.$moment = moment;
  },
}).$mount('#app')
