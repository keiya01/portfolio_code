export const setWindowHeight = () => {
    const ua = navigator.userAgent.toLowerCase()
    let windowHeight = 0
    if (ua.match(/android|iphone/) !== null) {
        // スマホ用のサイズ調整
        windowHeight = window.screen.height
    } else {
        windowHeight = window.innerHeight
    }

    return windowHeight
}