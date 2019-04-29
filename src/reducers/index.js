/**
 * Root reducer
 *
 * @author name <Niilo.jaakkola@icloud.com>
 *
 *
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

// Reducers
import { userReducer } from './userReducer'
import { followingReducer } from './followingReducer'
import { adminReducer } from './adminReducer'
import { messageReducer } from './messageReducer'

// export root reducer
export const rootReducer = combineReducers({
    router: connectRouter(history),
    userReducer,
    followingReducer,
    adminReducer,
    messageReducer
})

// export history
export { history }
