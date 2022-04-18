<template>
    <div class="pixi-demo">
        <Start></Start>
        <!-- <Game></Game> -->
    </div>
</template>

<script lang="ts" setup>
    import Start from './components/start.vue'
    import Game from './components/game.vue'
</script>

<style lang="scss" scoped>
    .pixi-demo {
        padding-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
