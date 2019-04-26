import * as firebaseCore from 'firebase'
import { firebaseConfig } from './config'

const firebase = firebaseCore.initializeApp(firebaseConfig)

const firebaseDB = firebase.database()

export { firebase, firebaseDB }
