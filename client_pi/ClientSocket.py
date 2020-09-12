import socket

serverAddress = ''
serverPort = 6600


def start_connection(command):
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect((serverAddress, serverPort))
    while True:
        in_data = client.recv(1024)
        client.sendall(bytes(command), 'UTF-8')
        if in_data == 'success':
            # print car unlock to console
            None
            break
        elif in_data == 'fail':
            # retry prompt
            None
        elif in_data == 'goodbye':
            # print goodbye to console or screen
            None
            break
    client.close()
