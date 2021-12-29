interface FileType {
    [key: string]: any
}

// 导入目录下所有 .jpg 文件
const files: Record<string, FileType> = import.meta.globEager('/src/assets/img/common/*.jpg')
const images: string[] = []

Object.keys(files).forEach((path: string) => {
    const image = files[path]?.default
    images.push(image)
})

export default images

/**
 *  方法二，需要传入文件名称 & 循环次数，不可行
 */

/**
 * vite官方文档的解析静态资源URL
 */
// function getCommonImageUrl(name: string) {
//     return new URL(`../img/common/${name}.jpg`, import.meta.url).href
// }

/**
 * 返回长度为n的字符串, num长度不够时前面补0
 */
// function prefixInteger(num: number, n: number) {
//     return (Array(n).join('0') + num).slice(-n)
// }

// for (let i = 1; i <= 30; i++) {
//     images.push(getCommonImageUrl(prefixInteger(i, 3)))
// }
