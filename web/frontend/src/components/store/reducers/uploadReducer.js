const initState = {}

const uploadReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPLOADING':
            console.log('uploading');
            return { ...state, progress: action.payload };
        case 'UPLOAD_SUCCESS':
            console.log('create file success', action.payload);
            return { ...state, url: action.payload };
        case 'NO_CHANGE_IMAGE':
            console.log('no change imange', action.payload);
            return { ...state, url: { url: "https://firebasestorage.googleapis.com/v0/b/iotassignment2-d4c67.appspot.com/o/cars%2Fno-image.png?alt=media&token=c82408de-0396-4c2f-b0a3-1cc5fd127215", path: "/cars/" } };
        case 'UPLOAD_ERROR':
            console.log('create file error');
            return state;
        default:
            return state;
    }
};

export default uploadReducer;