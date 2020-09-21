import authenticate_AP as ap
import ClientSocket as cs

CAR_ID = "0"

def main_wrapper():
    global CAR_ID
    opt = ''
    while opt != 1 and opt != 2:
        opt = input('Please select usage type:\n1.Customer\n2.Engineer')
    if opt == 1:
        command, data = ap.user_authentication()
    else:
        command, data = ap.engineer_authentication()
        
    command = command + ', ' + data + ', ' + CAR_ID
    
    return_data = cs.send_message(command)
