import socket
import threading
import Firebase_authen as email_auth
import FirebaseApi as api
import Facial_Authen as fauth

SERVER = ''
PORT = 6704
ADDR = (SERVER, PORT)
HEADER = 64
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = 'DISCONNECT'


server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(ADDR)


def handle_client(conn, addr):
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
            return_msg_to_client(authenticate(msg[0], msg[1]))
    conn.close()
        
def recv_all(conn, msg_length):
    data = bytearray()
    while len(data) < msg_length:
        package = conn.recv(msg_length - len(data))
        if not package:
            return None
        data.extend(package)
    return data

def return_msg_to_client(conn, return_msg):
    return_msg = return_msg.encode(FORMAT)
    return_length = len(return_msg)
    return_length = str(return_length).encode(FORMAT)
    return_length += b' ' * (HEADER - len(return_length))
    conn.send(return_length)
    conn.send(return_msg)


def start():
    server.listen()
    print(f"[LISTENING] Server is listening on {SERVER}")
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn,addr))
        thread.start()
        print(f"[ACTIVE CONNECTIONS] {threading.activeCount()-1}")


def authenticate(command, data):
    if command == 'UP':
        return email_pass_auth(data)
    elif command == 'QR':
        return qr_auth(data)
    elif command == 'BLT':
        return blt_auth(data)
    elif command == 'FR':
        return fr_auth(data)


def email_pass_auth(data):
    data = data.split(', ')
    uname = data[0]
    pwd = data[1]
    car_id = data[2]
    result = email_auth.auth_user_by_email_password(uname, pwd)
    if not result:
        return 'FAIL'
    rental_status = api.get_rental_status(car_id, result)
    if not rental_status:
        return 'FAIL RENTAL, WRONG CAR'
    return 'SUCCESS, ' + str(rental_status)


def qr_auth(data):
    data = data.split(', ')
    uid = data[0]
    car_id = data[1]
    result = api.get_user(uid)
    if result:
        return 'SUCCESS, ' + api.get_car_detail(car_id)
    else:
        return 'FAIL, invalid qr code'


def blt_auth(data):
    data = data.split(', ')
    mac_addr_list = data[0]
    car_id = data[1]
    for mac in mac_addr_list:
        result = api.get_engineer_by_mac(mac)
        if result:
            return 'SUCCESS, ' + api.get_car_detail(car_id)
    return 'FAIL, no valid device in range'


def fr_auth(data):
    data = data.split(', ')
    img_data = data[0]
    car_id = data[1]
    user_id = fauth.fr_wrapper(img_data)
    if user_id == 'FAIL, face not recognized':
        return user_id
    rental_status = api.get_rental_status(car_id, user_id)
    if not rental_status:
        return 'FAIL RENTAL, WRONG CAR'
    return 'SUCCESS, ' + str(rental_status)


print('[STARTING] server is starting...')
start()

