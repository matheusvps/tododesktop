import { RoutesNames } from '@/router/RoutesNames';


const routes = [
   {
     path: RoutesNames.TODO.PATH,
     name: RoutesNames.TODO.NAME,
     component: () => import('@/components/ToDo.vue')
   },
   {
      path: RoutesNames.BACKLOG.PATH,
      name: RoutesNames.BACKLOG.NAME,
      component: () => import('@/components/BackLog.vue')
    },
 
 ]

 export default routes;