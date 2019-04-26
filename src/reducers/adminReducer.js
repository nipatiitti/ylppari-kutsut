import { SET_USERS } from 'actions/types'

const initialState = {
    users: []
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }

        default:
            return state
    }
}
