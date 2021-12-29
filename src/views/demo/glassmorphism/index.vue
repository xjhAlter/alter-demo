<template>
    <div class="glassmorphism-page">
        <div class="image-item" v-for="(item, index) in images" :key="index">
            <div class="glassmorphism-image" :style="`background-image: url(${item})`"></div>
            <img :src="item" alt="图片" class="image" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    /**
     * 参考链接: https://juejin.cn/post/7034037550809366535
     */
    import images from '~/assets/js/image'
</script>

<style lang="scss" scoped>
    .glassmorphism-page {
        padding: 0.2rem;
        display: flex;
        flex-wrap: wrap;
    }
    .image-item {
        width: 3.2rem;
        height: 3rem;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.3rem 0.3rem 0;
    }
    .glassmorphism-image {
        position: absolute;
        width: 100%;
        height: 100%;
        filter: blur(0.08rem); // 通过滤镜实现
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .image {
        z-index: 1;
        max-width: 100%;
        max-height: 100%;
    }
</style>
