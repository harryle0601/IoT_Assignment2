const carsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            console.log('fetch success');
            console.log(action)
            return {
                ...state,
                carsError: null,
                cars: action.cars,
                isMax: action.isMax
            }

        case 'FETCH_ERROR':
            console.log('fetch error');
            return {
                ...state,
                carsError: null
            }

        default:
            return state
    }
};

export default carsReducer;