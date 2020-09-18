const initState = {}

const issueReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_ISSUE_SUCCESS':
            console.log('add issue success');
            return state;
        case 'ADD_ISSUE_ERROR':
            console.log('add issue error');
            return state;
        case 'EDIT_ISSUE_SUCCESS':
            console.log('edit issue success');
            return state;
        case 'EDIT_ISSUE_ERROR':
            console.log('edit issue error');
            return state;
        case 'RESOLVE_ISSUE_SUCCESS':
            console.log('resolve issue success');
            return state;
        case 'RESOLVE_ISSUE_ERROR':
            console.log('resolve issue error');
            return state;
        default:
            return state;
    }
};

export default issueReducer;
