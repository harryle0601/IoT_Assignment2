# import Facial_Reg as FR
# import Bluetooth_Reg as BR
# import QR_Reg as QR
# import cv2
# if __name__ == "__main__":
    
#     # FR.Facial_Encode()
#     opt = input("Please choose an unlock method \n 1.Facial Recognition \n 2.Bluetooth Detection \n 3.QR Scan \n")
#     if (opt == "1"):
#         print('1')
#         # FR.Facial_Authentication()
#     elif (opt == "2"):
#         BR.bluetooth_authentication()
#     elif (opt =="3"):
#         QR.QR_authentication()

   
    
import authenticate as auth


if __name__ == "__main__":
    data = auth.user_authentication()
    print(data)


    # elif (opt == "2"):
    #     auth.bluetooth_authentication()
    # elif (opt =="3"):
    #     auth.QR_authentication(key)

