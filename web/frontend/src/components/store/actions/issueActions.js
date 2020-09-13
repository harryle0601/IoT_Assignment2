import firebase from 'firebase/app';

export const addIssue = (issue) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('issue').add(issue).then(() => {
            firebase.firestore().collection('cars').doc(issue.Car.id).set({
                Available: false,
            }, { merge: true })
            dispatch({ type: 'CREATE_ISSUE_SUCCESS' });
            window.location.reload()
        }).catch(err => {
            dispatch({ type: 'CREATE_RENTAL_ERROR' }, err);
        });
    }
};

export const editIssue = (issue) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('issue').doc(issue.id).set({
            ...issue,
        }, { merge: true }).then(() => {
            dispatch({ type: 'EDIT_ISSUE_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'EDIT_ISSUE_ERROR' }, err);
        });
    }
};