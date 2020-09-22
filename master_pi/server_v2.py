import socket
import threading
import Firebase_authen as email_auth
import FirebaseApi as api
import Facial_Authen as fauth

SERVER = ''
PORT = 6701
ADDR = (SERVER, PORT)
HEADER = 64
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = 'DISCONNECT'


server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(ADDR)


def handle_client(conn, addr):
    """
        description: a thread for a client connection. Receive and process the data sent from client
        todo : receive data from client. Process the data then parse to authentication controller.
        return : void
    """
    print(f"[NEW CONNECTION] {addr} connected.")
    connected = True
    while connected:
        msg_length = conn.recv(HEADER).decode(FORMAT)
        if msg_length:
            msg_length = int(msg_length)
            msg = recv_all(conn, msg_length).decode(FORMAT)
            msg = msg.split(', ', 1)
            if msg[0] == DISCONNECT_MESSAGE:
                connected = False
            result = authenticate(msg[0], msg[1])
            print(result)
            return_msg_to_client(conn, result)
    conn.close()
        
def recv_all(conn, msg_length):
    """
        description: Continue to receive the TCP packages until no more packages left or until fully receive the return message from server.
        todo : continue to receive the data from master until the specify length reach or no more package presented. then return the full data
        return : string
    """
    data = bytearray()
    while len(data) < msg_length:
        package = conn.recv(msg_length - len(data))
        if not package:
            return None
        data.extend(package)
    return data

def return_msg_to_client(conn, return_msg):
    """
        description : compile and send a return message to the connected client
        todo : send header message about the size of the return message then send return message
        return : void
    """
    return_msg = return_msg.encode(FORMAT)
    return_length = len(return_msg)
    return_length = str(return_length).encode(FORMAT)
    return_length += b' ' * (HEADER - len(return_length))
    conn.send(return_length)
    conn.send(return_msg)


def start():
    """
        description : start the socket server
        todo : listen to a socket port. Create new thread if a connection is made
        return : void
    """
    server.listen()
    print(f"[LISTENING] Server is listening on {SERVER}")
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn,addr))
        thread.start()
        print(f"[ACTIVE CONNECTIONS] {threading.activeCount()-1}")


def authenticate(command, data):
    """
        description : main controller for authentication
        todo : decide which type of authentication to use base on a command code
        return : string of both status and data.
    """
    if command == 'UP':
        return email_pass_auth(data)
    elif command == 'QR':
        return qr_auth(data)
    elif command == 'BLT':
        return blt_auth(data)
    elif command == 'FR':
        return fr_auth(data)


def email_pass_auth(data):
    """
        description: process data for authentication through email and password
        todo : split the data to get email, password and car_id then authentication and fetch car data if success
        return : string of authen status and car detail
    """
    data = data.split(', ')
    uname = data[0]
    pwd = data[1]
    car_id = data[2]
    result = email_auth.auth_user_by_email_password(uname, pwd)
    if not result:
        return 'FAIL'
    rental_status = api.get_rental_status(car_id, result)
    if not rental_status:
        return 'FAIL RENTAL, YOU DIDNT BOOK THIS CAR'
    return 'SUCCESS, ' + str(rental_status)


def qr_auth(data):
    """
        description: process data for authentication by qr
        todo : split data to get qr_code and car_id. authenticate the qr code and fetch car_issues if success
        return : string of status and car_detail
    """
    data = data.split(', ')
    uid = data[0]
    car_id = data[1]
    result = api.get_engineer_by_id(uid)
    if result:
        return 'FIXING, ' + str(api.get_car_detail(car_id))
    else:
        return 'FAIL, invalid qr code'


def blt_auth(data):
    """
        description: process data for authentication by bluetooth
        todo : split data to get list of mac address near client pi and car_id. authenticate the mac address and fetch car_issues if success
        return : string of status and car_detail
    """
    data = data.split(', ')
    mac_addr_list = data[0]
    length = len(mac_addr_list)
    print(length)
    car_id = data[1]
    for i in range(length):
        result = api.get_engineer_by_mac(mac_addr_list[i])
        if result:
            return 'FIXING, ' + api.get_car_detail(car_id)
    return 'FAIL, no valid device in range'


def fr_auth(data):
    """
        description: process data for authentication by facial recognition
        todo : split data to get hexcoded image and car_id. authenticate the image and fetch car_detail if success
        return : string of status and car_detail
    """
    data = data.split(', ')
    img_data = data[0]
    car_id = data[1]
    user_id = fauth.fr_wrapper(img_data)
    if user_id == 'FAIL, face not recognized':
        return user_id
    rental_status = api.get_rental_status(car_id, user_id)
    if not rental_status:
        return 'FAIL RENTAL, YOU DIDNT BOOK THIS CAR'
    return 'SUCCESS, ' + str(rental_status)


print('[STARTING] server is starting...')
start()

