import authenticate_AP as ap
import ClientSocket as cs

CAR_ID = "1"
USAGE_STATUS = 'IDLE'


def main_wrapper():
    """
        Basic controller to decide which type of user is using the car. For demo allow option to change car_id.
        Take input from user. Then call controller for request user type.
    """
    global CAR_ID, USAGE_STATUS
    opt = ''
    command = ''
    while opt != "1" and opt != "2" and opt != "3":
        opt = input('Please select usage type:\n1.Customer\n2.Engineer\n3.Change car ID\n')
    if opt == "1":
        command = ap.user_authentication()
    elif opt == "2":
        command = ap.engineer_authentication()
    # utility code for demo purpose only
    else:
        CAR_ID = input('Enter ID for a car:\n')

    """
        Generate a socket request and send request to master pi 
    """
    if command != '':
        command += ', ' + CAR_ID

        f = open("data.txt", "a")
        f.write(command)
        return_status, return_data = cs.send_message(command)
        if return_status != 'FAIL':
            USAGE_STATUS = return_status
        print(return_data)

def stop_car_usage():
    """
        Allow user to exit the car. Change car status
        todo : take input from user. If input is 'exit' change status .
    """
    global USAGE_STATUS
    opt = ''
    while opt != 'exit':
        opt = input('To stop using the car please enter "exit":\n')
    USAGE_STATUS = 'IDLE'

while True:
    if USAGE_STATUS == 'SUCCESS' or USAGE_STATUS == 'FIXING':
        stop_car_usage()
    main_wrapper()


