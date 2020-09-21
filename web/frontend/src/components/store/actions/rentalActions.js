import firebase from 'firebase/app';
import createEvent from '../../../apiGoogleCalendar'

export const addRental = (rental) => {
    var eventDate = new Date(rental.RentDate)
    rental.RentDate = firebase.firestore.Timestamp.fromMillis(rental.RentDate);
    return (dispatch, getState) => {
        firebase.firestore().collection('rental').add(rental).then(() => {
            firebase.firestore().collection('cars').doc(rental.Car.id).set({
                Available: "renting",
            }, { merge: true })
            var eventDate2 = eventDate
            eventDate2.setDate(eventDate2.getDate() + 1)
            createEvent({
                summary: "Rent " + rental.Car.Brand + " " + rental.Car.Model + " " + rental.Car.Color,
                description: "Rent " + rental.Car.Brand + " " + rental.Car.Model + " " + rental.Car.Color,
                start: {
                    dateTime: eventDate
                },
                end: {
                    dateTime: eventDate2
                }
            }).then((result) => {
                console.log(result)
                dispatch({ type: 'CREATE_RENTAL_SUCCESS' });
                window.location.reload()
            })
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
                Available: "Idle",
            }, { merge: true })
            dispatch({ type: 'RETURN_RENTAL_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'RETURN_RENTAL_ERROR' }, err);
        });
    }
};