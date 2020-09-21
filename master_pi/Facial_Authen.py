#from PIL import image
import face_recognition
import cv2
import numpy as np
import glob
import urllib.request
import os
import FirebaseApi as api

cwd = os.getcwd()
known_face_encodings = []
known_face_names = []


def update_local_image_folder():
    """
        description : fetch all the users from firebase that has picture. Rename the picture and put in Face_Images dir
        todo : check db for all user contain picture. download the picture, rename it to the user_id and place in Face_Image dir
        return : void.
    """
    user_list = api.get_user_images()
    image_path = os.path.join(cwd, 'Face_Images')

    for user_id in user_list:
        if not os.path.exists(os.path.join(image_path, user_id + '.jpg')):
            url = user_list[user_id]['Avatar']
            urllib.request.urlretrieve(url, os.path.join(image_path, user_id + '.jpg'))


def facial_encode():
    """
        description : encode all the image in Face_Images dir
        todo : Encode all image in Face_Images dir and save the encode on RAM
        return : void.
    """
    # make array of sample pictures with encodings
    global known_face_encodings, known_face_names
    dirname = os.path.dirname(__file__)
    path = os.path.join(cwd, 'Face_Images')
    # make an array of all the saved jpg files' paths
    list_of_files = [f for f in glob.glob('./Face_Images/*.jpg')]
    # find number of known faces
    number_files = len(list_of_files)

    names = list_of_files.copy()

    for i in range(number_files):
        globals()['image_{}'.format(i)] = face_recognition.load_image_file(list_of_files[i])
        encode_img = face_recognition.face_encodings(globals()['image_{}'.format(i)])
        
        if len(encode_img) != 0:
            globals()['image_encoding_{}'.format(i)] = encode_img[0]
            known_face_encodings.append(globals()['image_encoding_{}'.format(i)])

        # Create array of known names
        names[i] = names[i].replace(os.path.join(cwd, 'Face_Images'), "")
        names[i] = names[i].replace(".jpg", "")
        known_face_names.append(names[i])


def facial_authentication():
    """
        description : encode the image send from agent pi and compare it to the list of encoded image on RAM
        todo : Encode image in check_faces dir and compare it to the encoded images in RAM. If match return the file name
        return : string of a user_id.
    """
    # Initialize some variables
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True
    name = "unknown"

    while True:
        global known_face_names, known_face_encodings
        # Grab a single frame of video
        frame = cv2.imread(os.path.join(cwd, 'check_faces/checkauth.jpg'))
        
        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = frame[:, :, ::-1]
        
        # Only process every other frame of video to save time
        if process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(
                rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(
                    known_face_encodings, face_encoding)
                name = "Unknown"

                # # If a match was found in known_face_encodings, just use the first one.
                if True in matches:
                    first_match_index = matches.index(True)
                    name = known_face_names[first_match_index]

                face_names.append(name)

        process_this_frame = not process_this_frame

        # Display the results
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4

            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35),
                        (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6),
                        font, 1.0, (255, 255, 255), 1)

        # Display the resulting image
        # cv2.imshow('Video', frame)

        # Hit 'q' on the keyboard to quit!
        if name != "unknown":
            name = name.split('/')
            return name[2]

    


def decode (data):
    """
        description : decode the hex code of an image send from agent pi and save it to check_faces dir
        todo : decode a hex coded image
        return : void.
    """
    if os.path.exists(os.path.join(cwd, 'check_faces/checkauth.jpg')):
        os.remove(os.path.join(cwd, 'check_faces/checkauth.jpg'))
    data_b = bytes.fromhex(data) 
    data_encode = np.array(data_b)
    str_encode = data_encode.tostring()
    nparr = np.frombuffer(str_encode, np.uint8)
    img_decode = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    cv2.imwrite("./check_faces/checkauth.jpg", img_decode)


def fr_wrapper(data):
    """
        description : basic wrapper to run all function in order and reset global variable when finish
        todo : run other function in order
        return : a string of an user_id.
    """
    global known_face_encodings, known_face_names
    decode(data)
    update_local_image_folder()
    facial_encode()
    user_id = facial_authentication()
    known_face_encodings = []
    known_face_names = []
    if user_id:
        return user_id
    else:
        return 'FAIL, face not recognized'

