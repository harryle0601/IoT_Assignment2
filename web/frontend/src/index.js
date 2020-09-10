import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRoute from "./AppRoute";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./firebase";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig, {userProfile: 'users', useFirestoreForProfile: true}),
        reactReduxFirebase(fbConfig)
    )
);

ReactDOM.render(<Provider store={store}><AppRoute /></Provider>, document.getElementById('root'));
serviceWorker.register();



