<template>
    <div class="pixi-demo-game">
        <canvas width="512" height="384" ref="gameRef" id="game-canvas"></canvas>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import * as PIXI from 'pixi.js'

    const gameRef = ref()
    let stage
    let renderer

    function init() {
        stage = new PIXI.Container() // 创建舞台
        renderer = PIXI.autoDetectRenderer({ width: 512, height: 384, view: gameRef.value }) // 自动选择适当的渲染器
        renderer.render(stage) // 将舞台绘制到画布上
    }

    onMounted(() => {
        init()
    })
</script>

<style lang="scss" scoped>
    .pixi-demo-game {
        padding-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        canvas {
            background-color: #222;
        }
    }
</style>
