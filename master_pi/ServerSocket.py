import socket
import threading

host = ''
port = 6600


class ClientThread(threading.Thread):
    def __init__(self, clientAddress, clientSocket):
        threading.Thread.__init__(self)
        self.cSocket = clientSocket
        self.cAddress = clientAddress
        print('new connection added: ', clientAddress)

    def run(self):
        print('Connected from: ', self.cAddress)
        msg = ''
        while True:
            data = self.cSocket.recv(2048)
            data = data.decode()
            msg = data.split(' ', 1)
            return_message = get_return_message(msg[0], msg[1])
            self.cSocket.send(bytes(return_message, 'UTF-8'))
        print('client at: ' + self.cAddress, " disconnected")


def server_setup():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print('socket created')
    try:
        server.bind((host, port))
    except socket.error as msg:
        print(msg)
    print('socket bind complete')
    return server


def setup_connection(server):
    server.listen(1)
    conn, address = server.accept()
    newThread = ClientThread(address, conn)
    newThread.start()
    return conn


def get_return_message(command, userdata):
    return {
        # replace 'placeholder' with function call to authenticate userdata from db
        # function must return 'success' or 'failed'
        'AUTHENTICATE': 'placeholder',
        'LOCK': 'Goodbye'
    }.get(command, 'unknown command')


s = server_setup()
print('server started')
print('waiting for client connection')
while True:
    setup_connection(s)
