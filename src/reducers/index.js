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

// export root reducer
export const rootReducer = combineReducers({
    router: connectRouter(history),
    userReducer,
    followingReducer
})

// export history
export { history }
