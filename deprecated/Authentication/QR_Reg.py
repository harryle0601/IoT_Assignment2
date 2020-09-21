import cv2
# import numpy as np
import pyzbar.pyzbar as pyzbar




def QR_authentication():
    cap = cv2.VideoCapture(-1)
    while True:
        _, frame = cap.read()
        key ="unknown"
        decodedObjects = pyzbar.decode(frame)
        for obj in decodedObjects:
            print("Data", obj.data)
            key = obj.data
            
        if key == b'ditmemay':
            print(key)
            break

    