<template>
    <div class="pixi-demo-start" ref="pixiRef"> </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import * as PIXI from 'pixi.js'
    import windImg from '~/assets/img/pixi/wind.png'
    import pokemonImg from '~/assets/img/pixi/pokemon.png'
    import { hitTestRectangle } from '../utils'

    const pixiRef = ref()

    let type = 'WebGL'
    if (!PIXI.utils.isWebGLSupported()) {
        type = 'canvas'
    }
    PIXI.utils.sayHello(type)

    // 生成canvas元素
    const app = new PIXI.Application({
        width: 256, // default: 800 宽度
        height: 256, // default: 600 高度
        antialias: true, // default: false 反锯齿(使字体和图形边缘更加平滑)
        // transparent: false, // default: false 透明度(使canvas背景透明)   已废弃(v6.0.0), 使用backgroundAlpha
        backgroundAlpha: 1, // 设置透明度
        resolution: 1, // default: 1 分辨率(用于不同分辨率和像素密度下,通常设置为1)
        // forceCanvas: true, // 使用canvas绘图API
    })

    app.renderer.backgroundColor = 0x409eff // 使用十六进制颜色值设置背景颜色
    app.renderer.resize(512, 512) // 重置宽高

    // console.log('宽度', app.renderer.view.width) // 获取宽高

    function addImg(url: string) {
        const loader = new PIXI.Loader() // 创建加载器(本项目使用的版本跟中文网的版本不同)
        // 加载图像
        loader.add([url]).load(() => {
            // 加载完成时回调(该函数接受一个loader的入参)
            const sprite = new PIXI.Sprite(loader.resources[url].texture) // 创建精灵

            // 调整位置
            // sprite.x = 96
            // sprite.y = 96
            sprite.position.set(100, 300)

            // 调整宽高
            // sprite.width = 80
            // sprite.height = 160

            // 缩放
            // sprite.scale.x = 2
            // sprite.scale.y = 2
            sprite.scale.set(1.5, 1.5)

            // 旋转 默认绕左上角(锚点)旋转
            // sprite.rotation = 0.5

            // 改变精灵的锚点(会改变精灵的位置)
            // sprite.anchor.x = 0.5
            // sprite.anchor.y = 0.5
            sprite.anchor.set(0.5, 0.5) // 数值: 0 - 1, 使精灵中心成为锚点
            // sprite.pivot.set(32, 32) // 改变精灵的原点，使用像素值

            app.stage.addChild(sprite) // 显示精灵(stage是容纳所有精灵的容器)

            // 隐藏精灵(二选一)
            // app.stage.removeChild(sprite)
            // sprite.visible = false // 推荐
        })
    }

    // 雪碧图捕获子图像
    function addSpritesImg(url: string) {
        // 碰撞测试代码
        const block = new PIXI.Graphics()
        block.beginFill(0xccff99)
        block.drawRect(0, 0, 64, 64)
        block.endFill()
        block.x = 64
        block.y = 64
        app.stage.addChild(block)

        // 本函数代码
        const loader = new PIXI.Loader()
        loader.add(url).load(() => {
            const texture = PIXI.utils.TextureCache[url]
            // 68 * 56
            const rectangle = new PIXI.Rectangle(544, 56, 68, 56) // 参数分别为x, y, 宽, 高
            texture.frame = rectangle
            const pikachu = new PIXI.Sprite(texture)
            pikachu.position.set(360, 0)
            pikachu.scale.set(2, 2)
            app.stage.addChild(pikachu)

            // 移动精灵
            app.ticker.add((delta) => gameLoop(delta))

            function gameLoop(delta: number) {
                // delta: 帧之间的延迟分量,可以不要
                // 该函数每秒会被执行60次
                // requestAnimationFrame(gameLoop) // 除了ticker,也可以使用requestAnimationFrame进行循环
                if (pikachu.x > 30) {
                    pikachu.x -= 1 + delta
                } else if (pikachu.y < 200) {
                    pikachu.y += 1 + delta
                }

                // 碰撞测试
                if (hitTestRectangle(pikachu, block)) {
                    block.tint = 0xff3300 // 碰撞时颜色发生变化(实际图片有透明边缘, 变化时机会提前)
                } else {
                    block.tint = 0xccff99
                }
            }
        })
    }

    // 绘制图形
    function draw() {
        // 跟Canvas Drawing API 几乎相同
        const rectangle = new PIXI.Graphics()
        rectangle.beginFill(0x66ccff) // 填充颜色
        rectangle.drawRect(0, 0, 64, 64) //绘制矩形, x, y, 宽, 高
        rectangle.endFill()
        rectangle.x = 64
        rectangle.y = 64
        app.stage.addChild(rectangle)
    }

    onMounted(() => {
        pixiRef.value.appendChild(app.view)
        addImg(windImg)
        addSpritesImg(pokemonImg)
        // draw()
    })
</script>

<style lang="scss" scoped>
    .pixi-demo-start {
        padding-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
