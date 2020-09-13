import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import carReducer from './carReducer'
import uploadReducer from './uploadReducer'
import rentalReducer from './rentalReducer'
import issueReducer from './issueReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    carReducer,
    rentalReducer,
    issueReducer,
    uploadReducer
});

export default rootReducer

// the key name will be the data property on the state object