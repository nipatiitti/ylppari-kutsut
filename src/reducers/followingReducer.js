import { SET_FOLLOWING } from 'actions/types'

const initialState = false

export const followingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FOLLOWING:
            return action.following

        default:
            return state
    }
}
