const initState = {}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_ROLE_SUCCESS':
            console.log('set role success');
            return { ...state };
        case 'SET_ROLE_ERROR':
            console.log('set role fail');
            return { ...state };
        default:
            return state;
    }
};

export default userReducer;