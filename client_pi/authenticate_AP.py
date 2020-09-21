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

######################### - - Bluetooth Detection - - ##############################

def bluetooth_authentication():
    """
        description: get all the bluetooth mac address near client pi
        todo : discover all nearby device and return the list  of address to controller
        return : authentication type and list of address
    """
    print("performing inquiry...")

    nearby_devices = bluetooth.discover_devices(
            duration=8, lookup_names=True, flush_cache=True, lookup_class=False)

    print("found %d devices" % len(nearby_devices))

    return 'BLT' + str(nearby_devices)
    # for addr, name in nearby_devices:
    #     try:
    #         return addr
    #     except UnicodeEncodeError:
    #         print("  %s - %s" % (addr, name.encode('utf-8', 'replace')))

######################### - - QR Scanner - - ##############################

def QR_authentication():
    """
        description: scan a qr code from camera
        todo : scan a qr code and decode the qr to string
        return : authentication type and string message
    """
    while True:
        _, frame = video_capture.read()
        key ="unknown"
        decodedObjects = pyzbar.decode(frame)
        for obj in decodedObjects:
            print("Data", obj.data)
            key = obj.data
        if key != "unknown":
            break
    
    return 'QR, ' + key
            
    
######################### - - Username Password - - ##############################
def Uname_pass():
    """
        description: get input from user for username and password
        todo : get input from user
        return : authentication type and combine string of username and password
    """
    username = input("Username: \n")
    password = getpass.getpass('Password: \n')
    return 'UP, ' + username + ', ' + password

######################### - - Take a picture - - ##############################
def take_picture():
    """
        description: take a picture and convert it to hex code to send to master pi
        todo : take picture and convert to hex code
        return : authentication type and hex code of the image
    """
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
                return 'FR, ' + str(byte_im.hex())
            else:
                print ("Please move your face closer")
            
        process_this_frame = not process_this_frame


######################### - - Revert Bytes to  - - ##############################
def decode (data):
    data_encode = np.array(data)
    str_encode = data_encode.tostring()
    nparr = np.frombuffer(str_encode, np.uint8)
    img_decode = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    cv2.imwrite("./checkauth.jpg", img_decode)

######################### - - Usage - - ##############################

def user_authentication():
    """
        description: controller for all function related to user
        todo : input from user for user function
        return : data return from function call
    """
    opt = ''
    while opt != "1" and opt != "2":
        opt = input("Please choose an unlock method \n 1.Facial Recognition \n 2.Username and Password \n")
    if opt == "1":
        auth_data = take_picture()
    else:
        auth_data = Uname_pass()

    return auth_data

def engineer_authentication():
    """
            description: controller for all function related to engineer
            todo : input from user for engineer function
            return : data return from function call
        """
    opt = ''
    while opt != "1" and opt != "2":
        opt = input("Please choose an unlock method \n 1.QR Scan \n 2.Bluetooth Scan \n")
    if opt == "1":
        auth_data = QR_authentication()
    else:
        auth_data = bluetooth_authentication()
    return auth_data
