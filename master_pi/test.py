import Facial_Authen as fauth
import FirebaseApi as api

def authenticate(command, data):
    if command == 'FR':
        return fr_auth(data)
    
def fr_auth(data):
    data = data.split(', ')
    img_data = data[0]
    car_id = data[1]
    user_id = fauth.fr_wrapper(img_data)
    print(user_id)
    if user_id == 'FAIL, face not recognized':
        return user_id
    rental_status = api.get_rental_status(car_id, user_id)
    if not rental_status:
        return 'FAIL RENTAL, WRONG CAR'
    return 'SUCCESS, ' + str(rental_status)

f = open('testimg.txt', 'r')
data = f.read() + ', 0'
result = authenticate('FR', data)

print(result)