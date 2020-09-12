import firebase from 'firebase/app';

export const addCar = (car) => {
    return (dispatch, getState) => {
        const author = getState().firebase.auth;
        firebase.firestore().collection('cars').add(car).then(() => {
            dispatch({ type: 'CREATE_CAR_SUCCESS' });
            window.location.reload()
        }).catch(err => {
            dispatch({ type: 'CREATE_CAR_ERROR' }, err);
        });
    }
};

// export const deliverCarToCart = (carts) => {
//     return (dispatch) => {
//         var cartfromlocal = JSON.parse(localStorage.getItem('cart'));
//         var numberOfItem;
//         if (cartfromlocal === undefined || cartfromlocal === null || cartfromlocal === []) {
//             numberOfItem = 0
//         } else {
//             numberOfItem = cartfromlocal.length

//         }
//         const cart = { count: numberOfItem, cars: cartfromlocal }
//         console.log('redux cart', cart)
//         dispatch({ type: 'CAR_TO_CART', payload: cart })

//     }
// }

// export const registerRetailers = (id) => {
//     return (dispatch, getState) => {
//         const author = getState().firebase.auth;
//         firebase.firestore().collection('cars').doc(id).update({
//             retailerId: firebase.firestore.FieldValue.arrayUnion(author.uid)
//         }).then(() => {
//             dispatch({ type: 'EDIT_CAR_SUCCESS' });
//         }).catch(err => {
//             dispatch({ type: 'EDIT_CAR_ERROR' }, err);
//         });
//     }
// };

export const editCar = (car) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('cars').doc(car.id).set({
            ...car,
        }, { merge: true }).then(() => {
            dispatch({ type: 'EDIT_CAR_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'EDIT_CAR_ERROR' }, err);
        });
    }
};
// export const editDetails = (details) => {
//     return (dispatch, getState) => {
//         firebase.firestore().collection('cars').doc(details.id).update({
//             detail: details.details
//         }).then(() => {
//             dispatch({ type: 'EDIT_CAR_SUCCESS' });
//         }).catch(err => {
//             dispatch({ type: 'EDIT_CAR_ERROR' }, err);
//         });
//     }
// };
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