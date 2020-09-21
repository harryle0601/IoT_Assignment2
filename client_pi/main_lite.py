import ClientSocket as cs
from getpass import getpass

CAR_ID = '0'
USAGE_STATUS = 'IDLE'

"""
    description: Special file use in demo. Demonstrate multiple instance socket connection. Only has email password authentication
    todo : get user input for email password authentication and send to master pi
"""

def Uname_pass():
    username = input("Username: ")
    password = getpass("Password: ")
    return 'UP, ' + username + ', ' + password

def main_wrapper():
    global CAR_ID, USAGE_STATUS
    opt = ''
    while opt != '1' and opt != '2':
        opt = input('Please select options:\n1.Login with email and password\n2.Change car id\n')
    if opt == '1':
        user_cred = Uname_pass()
        user_cred += ', ' + str(CAR_ID)
        return_status, return_data = cs.send_message(user_cred)
        if return_status != 'FAIL':
            USAGE_STATUS = return_status
        print(return_data)

    # utility code for demo purpose only
    else:
        CAR_ID = input('Enter ID for a car:\n')

def stop_car_usage():
    global USAGE_STATUS
    opt = ''
    while opt != 'exit':
        opt = input('To stop using the car please enter "exit":\n')
    USAGE_STATUS = 'IDLE'


while True:
    if USAGE_STATUS == 'SUCCESS' or USAGE_STATUS == 'FIXING':
        stop_car_usage()
    main_wrapper()
