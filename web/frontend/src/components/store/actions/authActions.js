import firebase from 'firebase/app';

export const signInEmailPassword = (credentials) => {
    return (dispatch, getState) => {
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });

    }
}

export const signInGmail = () => {
    return (dispatch, getState) => {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(resp => {
            firebase.firestore().collection('users').doc(resp.user.uid).set({
                Email: resp.user.email
            }, { merge: true });
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState) => {
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(resp => {
            return firebase.firestore().collection('users').doc(resp.user.uid).set({
                Email: newUser.email
            });
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
            console.log(err.message)
            dispatch({ type: 'SIGNUP_ERROR', err });
        });
    }
}

export const fogotPassword = (email) => {
    return (dispatch, getState) => {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            dispatch({ type: 'SENT_PASSWORD_EMAIL' });
        }).catch(function (error) {
            // An error happened.}
            dispatch({ type: 'SENT_PASSWORD_EMAIL_ERROR' });
        })
    }

}