import socket
import threading

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
        data = data.split(', ')
        uname = data[0]
        pwd = data[1]
        car_id = data[2]
        result = api.authen_user_by_up(uname, pwd)
        print(result)
        return 'success'

print('[STARTING] server is starting...')
start()