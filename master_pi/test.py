import master_pi.Firebase_authen as email_auth
import master_pi.FirebaseApi as api

def authenticate(command, data):
    if command == 'UP':
        return email_pass_auth(data)

def email_pass_auth(data):
    data = data.split(', ')
    uname = data[0]
    pwd = data[1]
    car_id = data[2]
    result = email_auth.auth_user_by_email_password(uname, pwd)
    if result:
        rental_status = api.get_rental_status(car_id, result)
        if rental_status:
            return 'SUCCESS, ' + str(api.get_car(car_id))
        else:
            return 'FAIL RENTAL, WRONG CAR'
    else:
        return 'FAIL'

result = authenticate('UP', 'minhle@gmail.com, minhle, 2')
print(result)