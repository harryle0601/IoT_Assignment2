const initState = {}

const carReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_CAR_SUCCESS':
            console.log('add car success');
            return state;
        case 'ADD_CAR_ERROR':
            console.log('add car error');
            return state;
        case 'EDIT_CAR_SUCCESS':
            console.log('edit car success');
            return state;
        case 'EDIT_CAR_ERROR':
            console.log('edit car error');
            return state;
        case 'REMOVE_CAR_SUCCESS':
            console.log('remove car success');
            return state;
        case 'REMOVE_CAR_ERROR':
            console.log('remove car error');
            return state;
        default:
            return state;
    }
};

export default carReducer;
