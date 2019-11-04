import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddPizza from '@/components/AddPizza'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/add-pizza',
      name:'AddPizza',
      component:AddPizza 
    }
  ]
})
