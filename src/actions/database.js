import { firebase, firebaseDB } from '../firebase'

import { id } from './utils'

export const changeUser = (id, data) =>
    firebaseDB.ref(`/users/${id}`).update({
        ...data
    })

export const deleteRelative = (userId, relativeId) =>
    firebaseDB.ref(`/users/${userId}/relatives/${relativeId}`).remove()

export const addUser = (name, isAdmin = false) =>
    firebaseDB.ref(`/users/${id()}`).set({
        isComing: false,
        notComing: false,
        hasAvec: false,
        name,
        isAdmin,
        allergies: ''
    })

export const addRelative = (userId, relativeId) =>
    firebaseDB.ref(`/users/${userId}/relatives/${relativeId}`).set(true)

export const deleteUser = id => (dispatch, getState) => {
    const users = getState().adminReducer.users
    users.forEach((user, i) => {
        user.relatives.forEach(relative => {
            if (relative.id === id) {
                firebaseDB.ref(`/users/${user.id}/relatives/${id}`).remove()
            }
        })
    })

    firebaseDB.ref(`/users/${id}`).remove()
}
