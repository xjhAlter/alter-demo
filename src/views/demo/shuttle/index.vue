<template>
    <div class="shuttle-bg">
        <div class="container">
            <div class="group">
                <div class="item item-right"></div>
                <div class="item item-left"></div>
                <div class="item item-top"></div>
                <div class="item item-bottom"></div>
                <div class="item item-middle"></div>
            </div>
            <div class="group">
                <div class="item item-right"></div>
                <div class="item item-left"></div>
                <div class="item item-top"></div>
                <div class="item item-bottom"></div>
                <div class="item item-middle"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    // 参考链接： https://github.com/chokcoco/iCSS/issues/148
    // 本话知识点
    /*
        1. box-shadow
            例子: box-shadow: 1px 2px 3px 4px red;
            参数: x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色
            

        2. filter: hue-rotute
        3. perspective
    */
</script>

<style lang="scss" scoped>
    /** 生成随机数 */
    @function randomNum($max, $min: 0, $u: 1) {
        @return ($min + random($max)) * $u;
    }
    /** 生成随机颜色 */
    @function randomColor() {
        @return rgb(randomNum(255), randomNum(255), randomNum(255));
    }
    /** 生成点阴影 */
    @function shadowSet($maxWidth, $maxHeight, $count) {
        $shadow: 0 0 0 0 randomColor();
        @for $i from 0 through $count {
            $x: #{random(10000) * 0.0001 * $maxWidth};
            $y: #{random(10000) * 0.0001 * $maxHeight};
            $shadow: $shadow, #{$x} #{$y} 0 #{random(5)}px randomColor();
        }
        @return $shadow;
    }

    .shuttle-bg {
        background-color: #000;
        width: 1366px;
        height: 100vh;
        overflow: hidden;
        display: flex;
        .container {
            margin: auto;
            perspective: 5px;
            perspective-origin: 50% 50%;
            position: relative;
            animation: hueRotate 20s infinite linear;
        }
        .group {
            position: absolute;
            width: 1366px;
            height: 100vh;
            left: -683px;
            top: -50vh;
            transform-style: preserve-3d;
            animation: move 8s infinite linear;
            &:nth-child(2) {
                animation: move 8s infinite linear;
                animation-delay: -4s;
                .item {
                    animation-delay: -4s;
                }
            }
        }
        .item {
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(#05040a, #03010e);
            background-size: cover;
            opacity: 1;
            animation: fade 8s infinite linear;
            animation-delay: 0;
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: shadowSet(1366px, 100vh, 500); // 绘制了500个阴影点
            }
            &.item-right {
                transform: rotateY(90deg) translateZ(500px);
            }
            &.item-left {
                transform: rotateY(-90deg) translateZ(500px);
            }
            &.item-top {
                transform: rotateX(90deg) translateZ(500px);
            }
            &.item-bottom {
                transform: rotateX(-90deg) translateZ(500px);
            }
            &.item-middle {
                transform: rotateX(180deg) translateZ(1000px);
            }
        }
    }

    @keyframes move {
        0% {
            transform: translateZ(-200px) rotate(0deg);
        }
        100% {
            transform: translateZ(150px) rotate(0deg);
        }
    }

    @keyframes fade {
        0% {
            opacity: 0.2;
        }
        25%,
        60% {
            opacity: 1;
        }
        100% {
            opacity: 0.2;
        }
    }

    @keyframes hueRotate {
        0% {
            filter: hue-rotute(0);
        }
        100% {
            filter: hue-rotate(360deg);
        }
    }

    @media screen and (max-width: 1366px) {
        .shuttle-bg {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
</style>
