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
]
