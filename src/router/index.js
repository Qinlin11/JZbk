import vue from 'vue'
import VueRouter from 'vue-router';
import routes from './route'
vue.use(VueRouter);
const router = new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
      }
})
export default router;