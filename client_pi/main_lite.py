import client_pi.ClientSocket as cs
from client_pi.authenticate_AP import Uname_pass

def main_wrapper():
    user_cred = Uname_pass()
    cs.send_message(user_cred)

while True:
    main_wrapper()