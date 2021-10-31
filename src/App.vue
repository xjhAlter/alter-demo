<template>
    <div class="main">
        <navigation></navigation>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import navigation from '@/components/navigation/index.vue'
    export default defineComponent({
        name: 'App',
        components: { navigation },
    })
</script>

<style lang="scss">
    .main {
        min-width: 100%;
        min-height: 100%;
        background: linear-gradient(45deg, #409eff, #ff7875);
        position: relative;
    }

    .content {
        width: 100%;
        max-width: 1366px;
        min-height: 100vh;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, 1);
    }
</style>
