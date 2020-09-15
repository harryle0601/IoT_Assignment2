import firebase from 'firebase/app';

export const setRole = (user, role) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('rental').doc(user.id).update({
            Role: (role === "User" ? firebase.firestore().FieldValue.delete() : role),
        }).then(() => {
            dispatch({ type: 'SET_ROLE_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'SET_ROLE_ERROR' }, err);
        });
    }
};