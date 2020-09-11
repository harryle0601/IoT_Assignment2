import face_recognition
import cv2
import numpy as np
import os
import glob
import bluetooth
import sys
import pyzbar.pyzbar as pyzbar
import getpass


video_capture = cv2.VideoCapture(-1)

######################### - - Facial Recognition - - ##############################


known_face_encodings = []
known_face_names = []
def Facial_Encode():
    # make array of sample pictures with encodings
    
    dirname = os.path.dirname(__file__)
    path = "/home/pi/IoT_Assignments/IoT_Assignment2/Authentication/known_people/"

    # make an array of all the saved jpg files' paths
    list_of_files = [f for f in glob.glob(path+'*.jpg')]
    # find number of known faces
    number_files = len(list_of_files)

    names = list_of_files.copy()
    print(names)


    
    for i in range(number_files):
        globals()['image_{}'.format(i)] = face_recognition.load_image_file(
            list_of_files[i])
        globals()['image_encoding_{}'.format(i)] = face_recognition.face_encodings(
            globals()['image_{}'.format(i)])[0]
        known_face_encodings.append(globals()['image_encoding_{}'.format(i)])

        # Create array of known names
        names[i] = names[i].replace(
            "/home/pi/IoT_Assignments/IoT_Assignment2/Authentication/known_people/", "")
        names[i] = names[i].replace(".jpg", "")
        known_face_names.append(names[i])

    print(names)
def Facial_Authentication():
    # Initialize some variables
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True
    name = "unknown"

    while True:
        # Grab a single frame of video
        ret, frame = video_capture.read()

        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

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
            break

    return name

######################### - - Bluetooth Detection - - ##############################

def bluetooth_authentication():
    print("performing inquiry...")

    nearby_devices = bluetooth.discover_devices(
            duration=8, lookup_names=True, flush_cache=True, lookup_class=False)

    print("found %d devices" % len(nearby_devices))

    for addr, name in nearby_devices:
        try:
            if (addr =="A4:50:46:0A:22:70"):
                print(addr)
                break
        except UnicodeEncodeError:
            print("  %s - %s" % (addr, name.encode('utf-8', 'replace')))

######################### - - QR Scanner - - ##############################

def QR_authentication():
    while True:
        _, frame = video_capture.read()
        key ="unknown"
        decodedObjects = pyzbar.decode(frame)
        for obj in decodedObjects:
            print("Data", obj.data)
            key = obj.data
        if key != "unknown":
            break
    
    return key
            
    
######################### - - Username Password - - ##############################
def Uname_pass():
    username = input("Username: ")
    password = getpass.getpass()
    return [username, password]

######################### - - Take a picture - - ##############################
def take_picture():
# Initialize some variables
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True
    name = "unknown"

    while True:
        # Grab a single frame of video
        ret, frame = video_capture.read()

        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Only process every other frame of video to save time
        if process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            if bool(face_locations):
                byte_im = cv2.imencode(".jpg",rgb_small_frame)[1]
                byte_im = byte_im.tobytes()
                return byte_im 
            else:
                print ("Please move your face closer")
            
        process_this_frame = not process_this_frame


######################### - - Revert Bytes to  - - ##############################
def decode (data):
    data_encode = np.array(data)
    str_encode = data_encode.tostring()
    nparr = np.frombuffer(str_encode, np.uint8)
    img_decode = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    cv2.imwrite("./haha.jpg", img_decode)

######################### - - Usage - - ##############################

def user_authentication():
    Facial_Encode()
    opt = input("Please choose an unlock method \n 1.Facial Recognition \n 2.Username and Password \n")
    if (opt == "1"):
        auth_reg = Facial_Authentication()
    elif (opt =="2"):
        auth_reg = Uname_pass()

    return auth_reg

def engineer_authentication():
    opt = input("Please choose an unlock method \n 1.QR Scan \n 2.Bluetooth Scan \n")
    if (opt == "1"):
        auth_reg = QR_authentication()
    elif (opt =="2"):
        auth_reg = bluetooth_authentication()
    return auth_reg