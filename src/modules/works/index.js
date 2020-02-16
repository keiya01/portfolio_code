import * as API from '../../constants/api'

const prefix = 'portfolio/works/'

const GET_WORKS_START = prefix + 'GET_WORKS_START'
const GET_WORKS_SUCCESS = prefix + 'GET_WORKS_SUCCESS'
const GET_WORKS_FAILED = prefix + 'GET_WORKS_FAILED'
const GET_WORKS_END = prefix + 'GET_WORKS_END'

const initialState = {
    data: [],
    isFetching: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_WORKS_START:
            return {
                ...state,
                isFetching: true
            }
        case GET_WORKS_SUCCESS:
            const {
                data
            } = action
            return {
                ...state,
                data,
                isFetching: true
            }
        case GET_WORKS_FAILED:
            return {
                ...state,
                error: action.error
            }
        case GET_WORKS_END:
            return {
                ...state,
                isFetching: false
            }
        default:
            return {
                ...state
            }
    }
}

const getWorksStart = () => ({
    type: GET_WORKS_START
})
const getWorksSuccess = (json) => ({
    type: GET_WORKS_SUCCESS,
    data: json
})
const getWorksFaild = (error) => ({
    type: GET_WORKS_FAILED,
    error
})
const getWorksEnd = () => ({
    type: GET_WORKS_END
})

export const getWorks = () => async (dispatch, getState) => {
    const uri = API.WORKS
    dispatch(getWorksStart())
    try {
        const res = await fetch(uri)
        const data = await res.json()
        dispatch(getWorksSuccess(data))
    } catch(error) {
        dispatch(getWorksFaild(error))
    } finally {
        dispatch(getWorksEnd())
    }
}