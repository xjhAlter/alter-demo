<template>
    <div class="simulator-page">
        <div class="notice-container">
            <div class="notice" :class="[noticeType, { show: noticeShow }]">
                <div class="notice-message">{{ noticeMsg }}</div>
            </div>
        </div>
        <div class="btn-list">
            <div class="btn" @click="notice()">success</div>
            <div class="btn" @click="refreshRadar()">刷新</div>
        </div>
        <div class="radar-wrapper">
            <div class="radar-bg"></div>
            <!-- <div class="radar" :style="radarStyle"></div> -->
            <canvas id="radar" ref="radar"></canvas>
            <div class="attr attr-a">{{ attrA }}</div>
            <div class="attr attr-b">{{ attrB }}</div>
            <div class="attr attr-c">{{ attrC }}</div>
            <div class="attr attr-d">{{ attrD }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    /**
     * 某模拟器预研
     */
    import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
    export default defineComponent({
        name: 'simulator',
        setup() {
            const state = reactive({
                noticeType: 'success',
                noticeShow: false,
                noticeMsg: 'Hello World',
                attrA: 10,
                attrB: 10,
                attrC: 10,
                attrD: 10,
                radarMax: 10,
            })

            let timer = 0
            function notice() {
                state.noticeShow = true
                clearTimeout(timer)
                timer = setTimeout(() => {
                    state.noticeShow = false
                }, 2000)
            }

            // 使用clipPath绘制雷达图
            const radarStyle = computed(() => {
                const { attrA, attrB, attrC, attrD, radarMax } = state
                const half = radarMax / 2
                const pointA = (radarMax - attrA) * half
                const pointB = (radarMax - attrB) * half
                const pointC = (attrC + radarMax) * half
                const pointD = (attrD + radarMax) * half
                return {
                    clipPath: `polygon(50% ${pointA}%, ${pointB}% 50%, 50% ${pointC}%, ${pointD}% 50%)`,
                }
            })

            const radar = ref()
            // 使用canvas绘制雷达图
            function drawRadar() {
                const canvas = radar.value
                if (canvas) {
                    const { width, height } = canvas
                    const { attrA, attrB, attrC, attrD, radarMax } = state
                    const half = radarMax / 200
                    const pointA = (radarMax - attrA) * half * height
                    const pointB = (radarMax - attrB) * half * width
                    const pointC = (attrC + radarMax) * half * height
                    const pointD = (attrD + radarMax) * half * width
                    const halfWidth = width / 2
                    const halfHeight = height / 2
                    const ctx = canvas.getContext('2d')
                    ctx.clearRect(0, 0, width, height)
                    ctx.beginPath()
                    ctx.moveTo(halfWidth, pointA)
                    ctx.lineTo(pointB, halfHeight)
                    ctx.lineTo(halfWidth, pointC)
                    ctx.lineTo(pointD, halfHeight)
                    ctx.lineTo(halfWidth, pointA)
                    // ctx.strokeStyle = '#ff0000'
                    // ctx.stroke() // 绘制边框
                    ctx.closePath()
                    const gradient = ctx.createRadialGradient(halfWidth, halfHeight, 0, halfWidth, halfHeight, halfWidth)
                    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.3)')
                    gradient.addColorStop(1, 'rgba(255, 0, 0, 0.9)')
                    // ctx.fillStyle = 'rgba(255,0,0,0.3)'
                    ctx.fillStyle = gradient // 渐变填充
                    ctx.fill() // 绘制填充色
                }
            }

            function refreshRadar() {
                state.attrA = Math.round(Math.random() * 10)
                state.attrB = Math.round(Math.random() * 10)
                state.attrC = Math.round(Math.random() * 10)
                state.attrD = Math.round(Math.random() * 10)
                drawRadar()
            }

            onMounted(() => {
                const canvas = radar.value
                if (canvas) {
                    // 重置canva画布大小
                    const { width, height } = canvas.getBoundingClientRect()
                    canvas.width = width
                    canvas.height = height
                }
                refreshRadar()
            })

            return {
                notice,
                ...toRefs(state),
                radarStyle,
                radar,
                refreshRadar,
            }
        },
    })
</script>

<style lang="scss" scoped>
    @keyframes approach {
        0% {
            transform: translateY(-100%);
        }

        50% {
            transform: translateY(10%);
        }

        100% {
            transform: translateY(0);
        }
    }
    .simulator-page {
        position: relative;
        .notice-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            .notice {
                width: 100%;
                min-height: 2rem;
                color: white;
                font-weight: bold;
                display: flex;
                flex-direction: row;
                align-items: center;
                .notice-message {
                    flex: 1;
                    padding: 0 1rem;
                    font-size: 0.3rem;
                    word-break: break-word;
                    overflow: auto;
                }
                &.success {
                    background: lightgreen;
                }
                &.show {
                    box-shadow: 0 0.02rem 0.02rem 0.02rem rgba(0, 0, 0, 0.12);
                    animation-name: approach;
                    animation-direction: forwards;
                    animation-duration: 0.6s;
                    animation-timing-function: ease-in-out;
                    animation-fill-mode: forwards;
                    animation-iteration-count: 1;
                }
                &:not(.show) {
                    display: none;
                    transform: translateY(-100%);
                }
            }
        }

        .btn-list {
            width: 100%;
            padding: 1rem 0.5rem;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            .btn {
                width: 1.6rem;
                height: 0.72rem;
                border: 0.01rem solid #409eff;
                border-radius: 0.04rem;
                color: #409eff;
                font-size: 0.3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 0.4rem 0.4rem 0;
                cursor: pointer;
                &:hover {
                    background: #409eff;
                    color: #fff;
                    transition: all 0.4s ease 0s;
                }
            }
        }

        .radar-wrapper {
            margin: 0.5rem auto;
            width: 5rem;
            height: 5rem;
            // background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            .radar-bg {
                width: 3.53rem;
                height: 3.53rem;
                border: 0.01rem solid lightcoral;
                transform: rotate(45deg);
            }
            .radar {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: -webkit-radial-gradient(rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0.9));
            }
            #radar {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .attr {
                position: absolute;
                font-size: 0.3rem;
                &.attr-a {
                    left: 50%;
                    top: -10%;
                    transform: translate(-50%, 0);
                }
                &.attr-b {
                    left: -10%;
                    top: 50%;
                    transform: translate(0%, -50%);
                }
                &.attr-c {
                    left: 50%;
                    bottom: -10%;
                    transform: translate(-50%, 0);
                }
                &.attr-d {
                    right: -10%;
                    top: 50%;
                    transform: translate(0%, -50%);
                }
            }
        }
    }
</style>
