import firebase from 'firebase/app';

export const addIssue = (issue) => {
    issue['ReportDate'] = firebase.firestore.Timestamp.fromMillis(Date.now());
    return (dispatch, getState) => {
        firebase.firestore().collection('issues').add(issue).then(() => {
            firebase.firestore().collection('cars').doc(issue.Car.id).set({
                Available: "Fixing",
            }, { merge: true })
            dispatch({ type: 'CREATE_ISSUE_SUCCESS' });
            window.location.reload()
        }).catch(err => {
            dispatch({ type: 'CREATE_ISSUE_ERROR' }, err);
        });
    }
};

export const editIssue = (issue) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('issues').doc(issue.id).set({
            ...issue,
        }, { merge: true }).then(() => {
            dispatch({ type: 'EDIT_ISSUE_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'EDIT_ISSUE_ERROR' }, err);
        });
    }
};

export const resolveIssue = (issue) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('issues').doc(issue.id).set({
            Resolve: true,
        }, { merge: true }).then(() => {
            firebase.firestore().collection('cars').doc(issue.Car.id).set({
                Available: "Idle",
            }, { merge: true })
            dispatch({ type: 'RESOLVE_ISSUE_SUCCESS' });
            // window.location.reload()
        }).catch(err => {
            dispatch({ type: 'RESOLVE_ISSUE_ERROR' }, err);
        });
    }
};