import { SET_USER, LOGOUT } from 'actions/types'

const initialState = {
    name: '',
    id: '',
    isAdmin: false,
    isComing: false,
    hasAvec: false,
    allergies: '',
    relatives: [],
    loggedIn: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action,
                loggedIn: true
            }

        case LOGOUT:
            return initialState

        default:
            return state
    }
}
