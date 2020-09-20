from firebase_admin import credentials, firestore, initialize_app, auth

cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

cars_collection = db.collection('cars')
users_collection = db.collection('users')
issues_collection = db.collection('issues')
rental_collection = db.collection('rental')

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

def authen_user_by_up(uname, password):
    try:
        users = users_collection.where('Email', '==', uname).get()
        user_list = []
        if len(users) == 0:
            return False
        else:
            return True
    except Exception as e:
        return f"An Error Occurred: {e}"
    
def get_rental_status(car_id, uname):
    try:
        rentals = rental_collection.where('Car.id', '==', car_id).where('User.email', '==', uname).get()
        if len(rentals) == 0:
            return False
        else:
            return True
    except Exception as e:
        return f"An Error Occurred: {e}"