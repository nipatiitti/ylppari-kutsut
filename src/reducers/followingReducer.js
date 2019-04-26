import { SET_FOLLOWING } from 'actions/types'

const initialState = {
    user: false,
    admin: false
}

export const followingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FOLLOWING:
            return {
                user: action.user ? action.user : state.user,
                admin: action.admin ? action.admin : state.admin
            }

        default:
            return state
    }
}
