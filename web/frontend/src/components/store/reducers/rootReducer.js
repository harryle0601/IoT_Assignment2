import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import carReducer from './carReducer'
import uploadReducer from './uploadReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    carReducer,
    uploadReducer
});

export default rootReducer

// the key name will be the data property on the state object