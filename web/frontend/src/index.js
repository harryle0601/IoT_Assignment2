import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider, useSelector } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';
import { createStore, compose, applyMiddleware } from 'redux'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import { createFirestoreInstance, getFirestore } from 'redux-firestore'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ColorLinearProgress from './components/layout/ColorLinearProgress'
import thunk from 'redux-thunk';
import rootReducer from './components/store/reducers/rootReducer'
import ErrorHandler from './components/utils/ErrorHandler';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const fbConfig = {
    apiKey: "AIzaSyB6_pMrQeJZUadK72Dy1ljfgYDu8jrf4jM",
    authDomain: "iotassignment2-d4c67.firebaseapp.com",
    databaseURL: "https://iotassignment2-d4c67.firebaseio.com",
    projectId: "iotassignment2-d4c67",
    storageBucket: "iotassignment2-d4c67.appspot.com",
    messagingSenderId: "421326197012",
    appId: "1:421326197012:web:8f8b8308d7f5a8e1ebb201",
    measurementId: "G-DQS4MS2J7W"
};
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}
const middlewares = [
    thunk.withExtraArgument(getFirebase, getFirestore)
]

firebase.initializeApp(fbConfig)
firebase.firestore()

const storageRef = firebase.storage();
export default (storageRef)

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div style={{ textAlign: "center", paddingTop:"20px" }}><h1 style={{ fontFamily: 'Muli', marginBottom: "5%" }}>Loading...</h1><img alt='loading' src='/Car Loading.gif'></img></div>;
    return children
}

const initialState = window && window.__INITIAL_STATE__
const store = createStore(
    rootReducer, initialState,
    compose(
        applyMiddleware(...middlewares))
)

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

ReactDOM.render(<Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}><div id='bckgrd' className='bckgrd'>
        <AuthIsLoaded><MuiThemeProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <ErrorHandler> */}
                <App />
            {/* </ErrorHandler> */}
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
        </AuthIsLoaded>
    </div></ReactReduxFirebaseProvider>
</Provider>, document.getElementById('root'));

serviceWorker.register();
