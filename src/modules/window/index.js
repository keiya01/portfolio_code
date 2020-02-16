const prefix = 'portfolio/window/'

const RESIZE_WINDOW = prefix + 'RESIZE_WINDOW'

const initialState = {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth < 600 ? window.innerWidth : 600,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case RESIZE_WINDOW:
            const {
                windowHeight,
                windowWidth,
            } = action
            return {
                ...state,
                windowHeight,
                windowWidth
            }
        default:
            return {
                ...state
            }
    }
}

export const resizeWindow = (h, w) => ({
    type: RESIZE_WINDOW,
    windowHeight: h,
    windowWidth: w
})