import { firebase, firebaseDB } from '../firebase'

import { SET_USER, SET_USERS, SET_FOLLOWING } from './types'

import { MD5 } from './utils'

export const adminLogin = login => (dispatch, getState) =>
    new Promise((res, rej) => {
        firebaseDB
            .ref('/adminPassword')
            .once('value')
            .then(snapshot => {
                const password = snapshot.val()
                if (password === MD5(login.password)) {
                    firebaseDB
                        .ref('/users')
                        .once('value')
                        .then(userSnapshot => {
                            const users = userSnapshot.val()
                            for (const id in users) {
                                if (users.hasOwnProperty(id)) {
                                    const user = users[id]
                                    if (user.name.toLowerCase() == login.name.toLowerCase()) {
                                        dispatch(followUsersUpdates())
                                        dispatch({
                                            type: SET_USER,
                                            name: user.name,
                                            isAdmin: user.isAdmin,
                                            isComing: user.isComing,
                                            id
                                        })
                                        return res()
                                    }
                                }
                            }
                            rej({ type: 'NOT_ADMIN' })
                        })
                } else {
                    rej({ type: 'INVALID_PASSWORD' })
                }
            })
    })

export const followUsersUpdates = () => dispatch => {
    dispatch({ type: SET_FOLLOWING, admin: true })

    firebaseDB.ref(`/users`).on('value', snapshot => {
        const usersDB = snapshot.val()
        const users = []

        for (const id in usersDB) {
            if (usersDB.hasOwnProperty(id)) {
                const user = usersDB[id]

                let relatives = false
                if (user.relatives) {
                    relatives = []
                    for (const relative in user.relatives) {
                        if (user.relatives.hasOwnProperty(relative)) {
                            relatives.push({
                                ...usersDB[relative],
                                id: relative
                            })
                        }
                    }
                }

                users.push({
                    ...user,
                    relatives: relatives ? relatives : [],
                    id
                })
            }
        }

        dispatch({
            type: SET_USERS,
            users
        })
    })
}
