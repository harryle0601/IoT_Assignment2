from PIL import image
import cv2
import numpy as np
import urllib.request
import os
import master_pi.FirebaseApi as api

cwd = os.getcwd()
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
recognizer = cv2.createLBPHFaceRecognizer()


def update_local_image_folder():
    user_list = api.get_user_images()
    image_path = os.path.join(cwd, 'Face_Images')
    for id in user_list:
        if not os.path.exists(os.path.join(image_path, id)):
            user_image_folder = os.path.join(image_path, id)
            os.mkdir(user_image_folder)
            url = user_list[id]['Avatar']
            urllib.request.urlretrieve(url, os.path.join(user_image_folder, id + '.jpg'))

