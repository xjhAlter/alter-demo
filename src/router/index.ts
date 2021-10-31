import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import demo from './modules/demo'

NProgress.configure({ showSpinner: false })

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/views/home/index.vue'),
    },
    ...demo,
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.meta?.title) {
        document.title = to.meta?.title as string
    } else {
        document.title = 'Alter Demo'
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
