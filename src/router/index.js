import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddPizza from '@/components/AddPizza'

import EditPizza from '@/components/EditPizza'

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
    },
    {
      path:'/edit-pizza/:pizza_slug',
      name:'EditPizza',
      component:EditPizza 
    }
  ]
})
