from firebase_admin import credentials, firestore, initialize_app, auth

cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

cars_collection = db.collection('cars')
users_collection = db.collection('users')
rental_collection = db.collection('rental')
issues_collection = db.collection('issue')

def get_rental(car_id):
    try:
        docs = rental_collection.where('Car.UID', '==', car_id)
        for doc in docs:
            print(doc.to_dict())
        return docs
    except Exception as e:
        return f"An Error Occurred: {e}"

def get_user(user_id):
    try:
        user = users_collection.document(user_id).get()
        return user.to_dict()
    except Exception as e:
        return f"An Error Occurred: {e}"

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