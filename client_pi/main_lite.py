import ClientSocket as cs
from getpass import getpass

CAR_ID = 0

def Uname_pass():
    username = input("Username: ")
    password = getpass("Password: ")
    return 'UP, ' + username + ', ' + password

def main_wrapper():
    global CAR_ID
    user_cred = Uname_pass()
    user_cred += ', ' + str(CAR_ID)
    cs.send_message(user_cred)

while True:
    main_wrapper()