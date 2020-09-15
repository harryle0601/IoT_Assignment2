import firebase from 'firebase/app';

export const addCar = (car) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('cars').add(car).then(() => {
            dispatch({ type: 'CREATE_CAR_SUCCESS' });
            window.location.reload()
        }).catch(err => {
            dispatch({ type: 'CREATE_CAR_ERROR' }, err);
        });
    }
};

export const editCar = (car, id) => {
    return (dispatch, getState) => {
        console.log("firebase cars id",id)
        firebase.firestore().collection('cars').doc(id).set({
            ...car,
        }, { merge: true }).then(() => {
            dispatch({ type: 'EDIT_CAR_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'EDIT_CAR_ERROR' }, err);
        });
    }
};

export const removeCar = (id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('cars').doc(id).remove()
            .then(() => {
                dispatch({ type: 'REMOVE_CAR_SUCCESS' });
            }).catch(err => {
                dispatch({ type: 'REMOVE_CAR_ERROR' }, err);
            });
    }
};