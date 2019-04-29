import { MESSAGE } from 'actions/types'

const initialState = false

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE:
            return action.open

        default:
            return state
    }
}
