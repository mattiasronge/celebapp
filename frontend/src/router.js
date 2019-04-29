import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [

    {
      path : '/addcelebs',
      name : 'add-celebs',
      component : () =>
        import('./components/Admin/Addcelebs.vue'),
    },

    {
      path : '/celebs',
      name : 'celebs',
      component : () =>
        import('./components/Admin/celebs.vue')
      
    }, 
    {
    path : '/seen',
    name : 'seen',
    component : () =>
      import('./components/Admin/seen.vue')
    
    }

  ]
});


export default router;
