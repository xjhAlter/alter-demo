<template>
    <div class="svg-demo">
        <h2>一、线条动画</h2>
        <div class="demo-1">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300px" height="300px">
                <polygon class="g-polygon-wrap" points="150 0, 300 75, 300 225, 150 300, 0 225,  0 75, 150 0" />
                <polygon class="g-polygon-move" points="150 0, 300 75, 300 225, 150 300, 0 225,  0 75, 150 0" />
            </svg>
        </div>
        <h2>二、文字</h2>
        <div class="demo-2">
            <svg viewBox="0 0 400 200">
                <text x="0" y="70%">Alterx</text>
            </svg>
        </div>
        <h2>三、stroke-dasharray 和 stroke-dashoffset</h2>
        <div class="demo-3">
            <svg width="400" height="400" viewPort="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <!-- 线段和缺口都是5 -->
                <line stroke-dasharray="5, 5" x1="10" y1="10" x2="390" y2="10" />
                <!-- 单数时,线段和缺口交替 -->
                <line stroke-dasharray="5, 10, 20" x1="10" y1="40" x2="390" y2="40" />
                <!-- 偶数时,单数位是线段,偶数位是缺口 -->
                <line stroke-dasharray="5, 10, 20, 40" x1="10" y1="80" x2="390" y2="80" />
            </svg>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
    .svg-demo {
        padding-top: 0.1rem;
        h2 {
            margin: 0.2rem;
        }
    }
    .demo-1 {
        width: 100%;
        padding: 1rem 0;
        display: flex;
        background: #000;

        svg {
            margin: auto; // 居中
            overflow: visible;
            transform: scalex(0.9); // x轴方向缩小为0.9
        }

        .g-polygon-wrap,
        .g-polygon-move {
            fill: none;
            stroke: #bf303c;
            stroke-width: 2;
            stroke-linejoin: round; // 在线段连接处创建圆滑过渡角
            stroke-linecap: round;
        }

        .g-polygon-move {
            transform-origin: center center;
            transform: scale(1.05); // 放大至1.05倍
            stroke: linear-gradinet(180deg, red, transprent);
            stroke-width: 1.5;
            stroke-dasharray: 280, 700; // 线框短划线和缺口的长度分别为280和700
            stroke-dashoffset: 8; // 偏移量
            animation: move 2.4s infinite linear;
        }

        @keyframes move {
            0% {
                stroke-dashoffset: 8;
            }
            100% {
                stroke-dashoffset: -972;
            }
        }
    }
    .demo-2 {
        width: 100%;
        padding: 1rem 0;
        display: flex;
        background: #000;
        font-family: 'Geometos';
        svg {
            width: 600px;
            height: 300px;
            margin: auto;
        }

        svg text {
            text-transform: uppercase; // 转换为大写
            animation: stroke 5s infinite alternate;
            // animation: stroke 5s forwards linear;
            letter-spacing: 10px;
            font-size: 80px;
        }
        @keyframes stroke {
            0% {
                fill: rgba(72, 138, 20, 0); // 透明填充色
                stroke: rgba(54, 95, 160, 1);
                stroke-dashoffset: 25%;
                stroke-dasharray: 0 50%;
                stroke-width: 0.2;
            }
            50% {
                fill: rgba(72, 138, 20, 0);
                stroke: rgba(54, 95, 160, 1);
                stroke-width: 0.5;
            }
            70% {
                fill: rgba(72, 138, 20, 0);
                stroke: rgba(54, 95, 160, 1);
                stroke-width: 1; // 描边宽度逐渐增加
            }
            90%,
            100% {
                fill: rgba(72, 138, 204, 1); // 填充颜色
                stroke: rgba(54, 95, 160, 0);
                stroke-dashoffset: -25%;
                stroke-dasharray: 50% 0;
                stroke-width: 0;
            }
        }
    }
    .demo-3 {
        line {
            stroke-width: 5;
            stroke: #ff7700;
        }
    }
</style>
