const initState = {}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_ROLE_SUCCESS':
            console.log('set role success');
            return { ...state };
        case 'SET_ROLE_ERROR':
            console.log('set role fail');
            return { ...state };
        case 'EDIT_PROFILE_SUCCESS':
            console.log('EDIT  profile success');
            return { ...state };
        case 'EDIT_PROFILE_ERROR':
            console.log('edit profile fail');
            return { ...state };
        default:
            return state;
    }
};

export default userReducer;