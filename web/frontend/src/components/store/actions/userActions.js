import firebase from 'firebase/app';

export const setRole = (user, role) => {
    return (dispatch, getState) => {
        if (role !== 'User') {
            firebase.firestore().collection('users').doc(user.id).update({
                Role: role,
            }).then(() => {
                dispatch({ type: 'SET_ROLE_SUCCESS' });
            }).catch(err => {
                dispatch({ type: 'SET_ROLE_ERROR' }, err);
            });
        } else {
            firebase.firestore().collection('users').doc(user.id).update({
                Role: firebase.firestore.FieldValue.delete(),
            }).then(() => {
                dispatch({ type: 'SET_ROLE_SUCCESS' });
            }).catch(err => {
                dispatch({ type: 'SET_ROLE_ERROR' }, err);
            });
        }
    }
};