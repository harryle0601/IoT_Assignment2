import authReducer from './authReducer'
import carsReducer from './carsReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    cars: carsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer

// the key name will be the data property on the state object