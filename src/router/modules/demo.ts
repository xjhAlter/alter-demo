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
    {
        path: base + 'shuttle',
        name: 'shuttle',
        component: () => import('~/views/demo/shuttle/index.vue'),
        meta: {
            title: '3d穿梭效果',
        },
    },
    {
        path: base + 'glassmorphism',
        name: 'glassmorphism',
        component: () => import('~/views/demo/glassmorphism/index.vue'),
        meta: {
            title: '毛玻璃',
        },
    },
    {
        path: base + 'svg-demo',
        name: 'svgDemo',
        component: () => import('~/views/demo/svg-demo/index.vue'),
        meta: {
            title: 'svg demo',
        },
    },
    {
        path: base + 'pixi-demo',
        name: 'pixiDemo',
        component: () => import('~/views/demo/pixi-demo/index.vue'),
        meta: {
            title: 'pixi demo',
        },
    },
    {
        path: base + 'rotate-3d',
        name: 'rotate3d',
        component: () => import('~/views/demo/rotate-3d/index.vue'),
        meta: {
            title: '3D 旋转动效',
        },
    },
]
