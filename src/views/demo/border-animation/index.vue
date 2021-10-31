<template>
    <div class="border-animation-page">
        <div class="fs-16">边框长度变化</div>
        <div class="box box1 mt-10"></div>
        <div class="mt-30 fs-16">虚线边框动画</div>
        <div class="box box2 mt-10"></div>
        <div class="mt-30 fs-16">渐变边框</div>
        <div class="box-row mt-10">
            <div class="box box3"></div>
            <div class="box box3 box3-single"></div>
            <div class="box box3 box3-couple"></div>
            <div class="box box3 box3-conic"></div>
        </div>
        <div class="mt-30 fs-16">border-image 渐变</div>
        <div class="box box4 mt-10"></div>
    </div>
</template>

<script lang="ts">
    /**
     * 参考链接：
     * https://github.com/chokcoco/iCSS/issues/92
     */
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'borderAnimation',
    })
</script>

<style lang="scss">
    .border-animation-page {
        padding: 20px;
        .box-row {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            .box {
                margin-right: 30px;
                margin-bottom: 10px;
            }
        }
        .box {
            width: 100px;
            height: 100px;
            position: relative;
            cursor: pointer;
        }
        .box1 {
            --borderColor: #03a9f3;
            border: 1px solid var(--borderColor);

            &::before,
            &::after {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                transition: all ease 0.5s;
            }

            &::before {
                top: -5px;
                left: -5px;
                border-top: 1px solid var(--borderColor);
                border-left: 1px solid var(--borderColor);
            }

            &::after {
                right: -5px;
                bottom: -5px;
                border-bottom: 1px solid var(--borderColor);
                border-right: 1px solid var(--borderColor);
            }

            &:hover::before,
            &:hover::after {
                width: calc(100% + 9px);
                height: calc(100% + 9px);
            }
        }
        .box2 {
            background: linear-gradient(90deg, #333 50%, transparent 0) repeat-x, linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
                linear-gradient(0deg, #333 50%, transparent 0) repeat-y, linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
            background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
            background-position: 0 0, 0 100%, 0 0, 100% 0;
            &:hover {
                animation: linearGradientMove 0.3s infinite linear;
            }
            @keyframes linearGradientMove {
                100% {
                    background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
                }
            }
        }
        .box3 {
            border-radius: 4px;
            overflow: hidden;

            &::before {
                content: '';
                position: absolute;
                left: -50%;
                top: -50%;
                width: 200%;
                height: 200%;
                background-repeat: no-repeat;
                background-size: 50% 50%, 50% 50%;
                background-position: 0 0, 100% 0, 100% 100%, 0 100%;
                background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),
                    linear-gradient(#377af5, #377af5);
                animation: rotate 4s linear infinite;
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            }
            &::after {
                content: '';
                width: 90px;
                height: 90px;
                position: absolute;
                left: 5px;
                top: 5px;
                background-color: #fff;
                border-radius: 4px;
            }
            &.box3-single {
                &::before {
                    background-size: 50% 50%;
                    background-position: 0 0;
                    background-image: linear-gradient(#399953, #399953);
                }
            }
            &.box3-couple {
                &::before {
                    background-image: linear-gradient(#d53e33, #d53e33), linear-gradient(transparent, transparent), linear-gradient(#d53e33, #d53e33),
                        linear-gradient(transparent, transparent);
                }
            }
            &.box3-conic {
                background-color: rgba(168, 239, 255, 0.2);
                &::before {
                    background: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
                }
            }
        }
        .box4 {
            border: 10px solid;
            border-image: linear-gradient(45deg, gold, deeppink) 1;
            clip-path: inset(0px round 10px);
            animation: huerotate 6s infinite linear;
            filter: hue-rotate(360deg);
            @keyframes huerotate {
                0% {
                    filter: hue-rotate(0deg);
                }
                100% {
                    filter: hue-rotate(360deg);
                }
            }
        }
    }
</style>
