import socket
import threading
import master_pi.Firebase_authen as email_auth
import master_pi.FirebaseApi as api

SERVER = ''
PORT = 6700
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
            msg = conn.recv(msg_length).decode(FORMAT)
            print(msg)
            msg = msg.split(', ', 1)
            if msg[0] == DISCONNECT_MESSAGE:
                connected = False
            authenticate(msg[0], msg[1])
    conn.close()
        

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

def email_pass_auth(data):
    data = data.split(', ')
    uname = data[0]
    pwd = data[1]
    car_id = data[2]
    result = email_auth.auth_user_by_email_password(uname, pwd)
    if result:
        rental_status = api.get_rental_status(car_id, result)
        if rental_status:
            return 'SUCCESS, ' + str(api.get_car(car_id))
        else:
            return 'FAIL RENTAL, WRONG CAR'
    else:
        return 'FAIL'

def qr_auth(data):
    data = data.split(', ')
    uid = data[0]
    car_id = data[1]
    result = api.get_user(uid)
    if result:
        return 'SUCCESS, ' + api.get_car_detail(car_id)
    else:
        return 'FAIL, invalid qr code'

print('[STARTING] server is starting...')
start()