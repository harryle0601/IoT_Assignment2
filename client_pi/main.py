import authenticate_AP as ap
import ClientSocket as cs

CAR_ID = "1"

def main_wrapper():
    global CAR_ID
    opt = ''
    while opt != "1" and opt != "2":
        opt = input('Please select usage type:\n1.Customer\n2.Engineer\n')
    if opt == "1":
        command= ap.user_authentication()
    else:
        command = ap.engineer_authentication()
        
    command +=', ' + CAR_ID

    f = open("data.txt", "a")
    f.write(command)
    
    return_data = cs.send_message(command)

while True:
    main_wrapper()

