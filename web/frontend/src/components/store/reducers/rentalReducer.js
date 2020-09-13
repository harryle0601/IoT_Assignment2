const initState = {}

const rentalReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_RENTAL_SUCCESS':
            console.log('add rental success');
            return state;
        case 'ADD_RENTAL_ERROR':
            console.log('add rental error');
            return state;
        case 'EDIT_RENTAL_SUCCESS':
            console.log('edit rental success');
            return state;
        case 'EDIT_RENTAL_ERROR':
            console.log('edit rental error');
            return state;
        case 'RETURN_RENTAL_SUCCESS':
            console.log('return rental success');
            return state;
        case 'RETURN_RENTAL_ERROR':
            console.log('return rental error');
            return state;
        default:
            return state;
    }
};

export default rentalReducer;
