import firebase from 'firebase/app';

export const addRental = (rental) => {
    console.log(rental.RentDate)
    rental.RentDate = firebase.firestore.Timestamp.fromMillis(rental.RentDate);
    return (dispatch, getState) => {
        firebase.firestore().collection('rental').add(rental).then(() => {
            firebase.firestore().collection('cars').doc(rental.Car.id).set({
                Available: false,
            }, { merge: true })
            dispatch({ type: 'CREATE_RENTAL_SUCCESS' });
            window.location.reload()
        }).catch(err => {
            dispatch({ type: 'CREATE_RENTAL_ERROR' }, err);
        });
    }
};

export const editRental = (rental) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('rental').doc(rental.id).set({
            ...rental,
        }, { merge: true }).then(() => {
            dispatch({ type: 'EDIT_RENTAL_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'EDIT_RENTAL_ERROR' }, err);
        });
    }
};

export const returnCar = (rental, returnDate) => {
    console.log("return rental", rental)
    return (dispatch, getState) => {
        firebase.firestore().collection('rental').doc(rental.id).set({
            ReturnDate: firebase.firestore.Timestamp.fromMillis(returnDate)
        }, { merge: true }).then(() => {
            firebase.firestore().collection('cars').doc(rental.Car.id).set({
                Available: true,
            }, { merge: true })
            dispatch({ type: 'RETURN_RENTAL_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'RETURN_RENTAL_ERROR' }, err);
        });
    }
};