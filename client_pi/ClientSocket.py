import socket

SERVER = '192.168.1.246'
PORT = 6700
HEADER = 64
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = 'DISCONNECT'
ADDR = (SERVER, PORT)


client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(ADDR)


def send_message(msg):
    """
        Encode the request message to send to master pi.
        todo: first send a message to notify the size of the actual message then send the message to master pi. Then wait for return message
    """
    message = msg.encode(FORMAT)
    msg_length = len(message)
    send_length = str(msg_length).encode(FORMAT)
    send_length += b' ' * (HEADER - len(send_length))
    client.send(send_length)
    client.send(message)
    return_msg = receive_message().split(', ', 1)
    return return_msg[0], return_msg[1]

def receive_message():
    """
        decode the received message from master pi.
        todo: receive the size of the return message then call recv_all function
    """
    msg_length = client.recv(HEADER).decode(FORMAT)
    if msg_length:
        msg_length = int(msg_length)
        msg = recv_all(client, msg_length).decode(FORMAT)
        return msg
        
def recv_all(conn, msg_length):
    """
        Continue to receive the TCP packages until no more packages left or until fully receive the return message from server.
        todo: continue to receive the data from master until the specify length reach or no more package presented. then return the full data
    """
    data = bytearray()
    while len(data) < msg_length:
        package = conn.recv(msg_length - len(data))
        if not package:
            return None
        data.extend(package)
    return data
