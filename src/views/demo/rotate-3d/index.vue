<template>
    <div class="rotate-page" @mousemove="handleMouseMove">
        <div class="rotate" ref="rotateRef"></div>
        <div class="cover" ref="coverRef"></div>
    </div>
</template>

<script lang="ts" setup>
    /**
     * 参考链接：
     * https://github.com/chokcoco/iCSS/issues/179
     */
    import { ref } from 'vue'

    const rotateRef = ref()
    const coverRef = ref()
    const multiple = 20

    function transformElement(x: number, y: number) {
        const rotateEl = rotateRef.value
        const box = rotateEl.getBoundingClientRect()
        // 以元素中心为界
        const calcX = -(y - box.y - box.height / 2) / multiple
        const calcY = (x - box.x - box.width / 2) / multiple
        rotateEl.style.transform = 'rotateX(' + calcX + 'deg) ' + 'rotateY(' + calcY + 'deg)'

        const coverEl = coverRef.value
        const coverBox = rotateEl.getBoundingClientRect()
        // 以元素中心为界
        const coverCalcX = -(y - coverBox.y - coverBox.height / 2) / multiple
        const coverCalcY = (x - coverBox.x - coverBox.width / 2) / multiple
        coverEl.style.transform = 'rotateX(' + coverCalcX + 'deg) ' + 'rotateY(' + coverCalcY + 'deg)'
    }

    function handleMouseMove(e: MouseEvent) {
        window.requestAnimationFrame(function () {
            transformElement(e.clientX, e.clientY)
        })
    }
</script>

<style lang="scss" scoped>
    .rotate-page {
        width: 100%;
        height: 100vh;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        transform-style: preserve-3d;
        perspective: 500px;
    }

    .rotate {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.5);
        transform-style: preserve-3d;
    }
    .cover {
        width: 200px;
        height: 200px;
        background: rgba(255, 0, 0, 0.5);
        transform-style: preserve-3d;
    }
</style>
