<template>
    <div class="navigation-wrapper" :class="{ open: isOpen }">
        <div class="switch-wrapper" @click="switchMenu">
            <svg viewBox="0 0 50 50" class="switch-btn">
                <rect class="rect rect1" />
                <rect class="rect rect2" />
                <rect class="rect rect3" />
            </svg>
        </div>
        <div class="menu-wrapper">
            <div class="menu-list">
                <div v-for="item in menu" :key="item.title">
                    <div class="menu-title" @click="changeMenu(item)">{{ item.title }}</div>
                    <div
                        v-if="item.children && item.children.length && item.title === currentMenu"
                        v-for="i in item.children"
                        :key="i.title"
                        class="menu-children"
                        @click="changePath(i.path)"
                        >{{ i.title }}</div
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, toRefs } from 'vue'
    import { useRouter } from 'vue-router'
    import demo from '@/router/modules/demo'

    interface Imenu {
        title: string
        path?: string
        children?: Imenu[]
    }

    export default defineComponent({
        name: 'navigation',
        setup() {
            const router = useRouter()
            const state = reactive({
                isOpen: false,
                currentMenu: 'Demo',
            })

            const demoList = demo.map((item) => {
                return {
                    title: item.meta?.title,
                    path: item.path,
                }
            })

            const menu: Imenu[] = [
                {
                    title: 'Home',
                    path: '/',
                    children: [],
                },
                {
                    title: 'Demo',
                    children: demoList,
                },
            ]

            function switchMenu() {
                state.isOpen = !state.isOpen
            }

            function changeMenu(item: Imenu) {
                state.currentMenu = item.title
                if (item.path) {
                    changePath(item.path)
                }
            }

            function changePath(path: string) {
                state.isOpen = false
                router.push({ path })
            }

            return {
                ...toRefs(state),
                menu,
                switchMenu,
                changeMenu,
                changePath,
            }
        },
    })
</script>

<style lang="scss">
    .navigation-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;
        width: 0;
        height: 0;
        &.open {
            .switch-wrapper {
                border-color: #fff;
            }
            .rect {
                fill: #fff;
            }
            .rect1 {
                transform: translate(16.5px, -4px) rotate(45deg);
            }
            .rect2 {
                width: 0;
                transform: translateX(20.5px);
            }
            .rect3 {
                transform: translate(-16px, 17.5px) rotate(-45deg);
            }
            .menu-wrapper {
                transform: translateX(0);
            }
        }
    }
    .switch-wrapper {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: 3px solid #000;
        cursor: pointer;
        position: absolute;
        left: 15px;
        top: 15px;
        transition: all ease 0.5s;
        z-index: 1;
    }
    .switch-btn {
        position: absolute;
        left: 3px;
        top: 5px;
        width: 40px;
        height: 40px;
        .rect {
            x: 5;
            width: 40px;
            height: 3px;
            fill: #000;
            transition: all ease 0.5s;
            &.rect1 {
                y: 11;
            }
            &.rect2 {
                y: 21;
            }
            &.rect3 {
                y: 31;
            }
        }
    }
    .menu-wrapper {
        width: 200px;
        min-height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        padding-top: 80px;
        transform: translateX(-200px);
        transition: all ease 0.5s;
        .menu-list {
            width: 100%;
            height: calc(100vh - 80px);
            overflow: auto;
            &::-webkit-scrollbar {
                width: 0;
            }
            .menu-title,
            .menu-children {
                height: 40px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-left: 40px;
                color: #fff;
                cursor: pointer;
                &:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
            .menu-title {
                font-size: 20px;
                font-weight: bold;
                padding-left: 20px;
            }
        }
    }
    @media screen and (max-width: 1366px) {
        .navigation-wrapper {
            position: relative;
            width: 100%;
            height: 80px;
            background-color: #fff;
        }
    }
</style>
