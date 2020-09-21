import storageRef from '../../../index'
import { v4 as uuidv4 } from 'uuid';

export const uploadToStorage = (file) => {
    return (dispatch, getState) => {
        const token = uuidv4();
        if (!file.image) 
            dispatch({ type: 'NO_CHANGE_IMAGE' })
        else {
            const uploadTask = storageRef.ref(`${token + file.path + file.image.name}`).put(file.image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progress function ....
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    dispatch({ type: 'UPLOADING', payload: progress });
                }, (error) => {
                    // error function ....
                    console.log(error);
                }, () => {
                    // complete function ....
                    storageRef.ref(file.path).child(file.image.name).getDownloadURL().then(url => {
                        console.log(url);
                        const pay = {
                            url,
                            path: file.path
                        }
                        dispatch({ type: 'UPLOAD_SUCCESS', payload: pay });
                    }).catch(err => {
                        dispatch({ type: 'UPLOAD_ERROR' }, err);
                    })
                });
        }
    }
};
