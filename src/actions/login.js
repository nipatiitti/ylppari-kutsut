/**
 * Login action creator
 *
 * @author name <Niilo.jaakkola@icloud.com>
 *
 *
 */

import { firebase, firebaseDB } from '../firebase'

import { SET_USER, SET_FOLLOWING, LOGOUT, MESSAGE } from './types'

export const message = () => dispatch => {
    dispatch({ type: MESSAGE, open: true })
    window.setTimeout(() => dispatch({ type: MESSAGE, open: false }), 2000)
}

export const logout = () => ({
    type: LOGOUT
})

export const login = login => dispatch =>
    new Promise((res, rej) => {
        firebaseDB
            .ref('/users/')
            .once('value')
            .then(snapshot => {
                const users = snapshot.val()
                for (const id in users) {
                    if (users.hasOwnProperty(id)) {
                        const user = users[id]
                        if (
                            user.name.toLowerCase() ===
                            `${login.firstName} ${login.lastName}`.toLowerCase()
                        ) {
                            let relatives = false
                            if (user.relatives) {
                                relatives = []
                                for (const relative in user.relatives) {
                                    if (user.relatives.hasOwnProperty(relative)) {
                                        relatives.push({
                                            ...users[relative],
                                            id: relative
                                        })
                                    }
                                }
                            }
                            dispatch(followUserUpdates(id))
                            dispatch({
                                type: SET_USER,
                                name: user.name,
                                isAdmin: user.isAdmin,
                                isComing: user.isComing,
                                notComing: user.notComing,
                                relatives: relatives ? relatives : [],
                                id
                            })
                            res()
                        }
                    }
                }
                rej()
            })
            .catch(e => rej(e))
    })

export const followUserUpdates = id => dispatch => {
    dispatch({ type: SET_FOLLOWING, user: true })

    firebaseDB.ref(`/users`).on('value', snapshot => {
        const users = snapshot.val()
        const user = users[id]

        let relatives = false
        if (user.relatives) {
            relatives = []
            for (const relative in user.relatives) {
                if (user.relatives.hasOwnProperty(relative)) {
                    relatives.push({
                        ...users[relative],
                        id: relative
                    })
                }
            }
        }

        dispatch({
            type: SET_USER,
            ...user,
            relatives: relatives ? relatives : []
        })
    })
}
