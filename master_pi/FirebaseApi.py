from firebase_admin import credentials, firestore, initialize_app

cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

cars_collection = db.collection('cars')
users_collection = db.collection('users')
issues_collection = db.collection('issues')
rental_collection = db.collection('rental')

def get_user_images():
    list_of_user = {}
    try:
        users = users_collection.get()
        for user in users:
            id = str(user.id)
            user = user.to_dict()
            if 'Avatar' in user:
                list_of_user[id] = user
        print(list_of_user)
        return list_of_user
    except Exception as e:
        print(e)

def get_car(car_id):
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        car = cars_collection.document(car_id).get()
        return car.to_dict()
    except Exception as e:
        return f"An Error Occurred: {e}"
    
def get_rental_status(car_id, uid):
    try:
        rentals = rental_collection.where('UID', '==', uid).get()
        if len(rentals) == 0:
            return False
        else:
            for rental in rentals:
                rental = rental.to_dict()
                if not rental['ReturnDate'] and rental['Car']['id'] == car_id:
                    return True
            return False
    except Exception as e:
        return f"An Error Occurred: {e}"
