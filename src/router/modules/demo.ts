const base = '/demo/'
export default [
    {
        path: base + 'border-animation',
        name: 'borderAnimation',
        component: () => import('~/views/demo/border-animation/index.vue'),
        meta: {
            title: '边框动画',
        },
    },
    {
        path: base + 'simulator',
        name: 'simulator',
        component: () => import('~/views/demo/simulator/index.vue'),
        meta: {
            title: '某模拟器功能预研',
        },
    },
]
