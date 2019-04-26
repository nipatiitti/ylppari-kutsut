import { firebase, firebaseDB } from '../firebase'

import { SET_USER } from './types'

export const changeComing = (id, isComing) => (dispatch, getState) =>
    new Promise((res, rej) => {
        firebaseDB
            .ref(`/users/${id}`)
            .update({
                isComing
            })
            .then(() => {
                res()
            })
            .catch(e => rej(e))
    })
