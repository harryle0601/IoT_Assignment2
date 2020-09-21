import socket

SERVER = '192.168.137.143'
PORT = 6700
HEADER = 64
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = 'DISCONNECT'
ADDR = (SERVER, PORT)


client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(ADDR)


def send_message(msg):
    message = msg.encode(FORMAT)
    msg_length = len(message)
    send_length = str(msg_length).encode(FORMAT)
    send_length += b' ' * (HEADER - len(send_length))
    client.send(send_length)
    client.send(message)
    receive_message()

def receive_message():
    msg_length = client.recv(HEADER).decode(FORMAT)
    if msg_length:
        msg_length = int(msg_length)
        msg = recv_all(client, msg_length).decode(FORMAT)
        print(msg)
        
def recv_all(conn, msg_length):
    data = bytearray()
    while len(data) < msg_length:
        package = conn.recv(msg_length - len(data))
        if not package:
            return None
        data.extend(package)
    return data

def change_car_id(car_id):
    global CAR_ID
    CAR_ID = car_id

