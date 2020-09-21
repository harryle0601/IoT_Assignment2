from firebase_admin import credentials, firestore, initialize_app

cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

cars_collection = db.collection('cars')
users_collection = db.collection('users')
issues_collection = db.collection('issues')
rental_collection = db.collection('rental')


def get_engineer_by_id(uid):
    try:
        engineer = users_collection.document(uid).get()
        return engineer.to_dict()
    except Exception as e:
        print(e)


def get_engineer_by_mac(mac):
    try:
        engineer = users_collection.where('MAC', '==', mac).get()
        return engineer.to_dict()
    except Exception as e:
        print(e)


def get_user_images():
    list_of_user = {}
    
    try:
        users = users_collection.get()
        for user in users:
            id = str(user.id)
            user = user.to_dict()
            if 'Avatar' in user:
                list_of_user[id] = user
        return list_of_user
    except Exception as e:
        print(e)


def get_car_detail(car_id):
    active_issues = []
    try:
        issues = issues_collection.where('Car.id', '==', car_id).get()
        for issue in issues:
            if issue.to_dict()['Resolve'] != 'true':
                active_issues.append(issue.to_dict())
        if len(active_issues) == 0:
            return get_car(car_id)
        return active_issues
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
        rentals = rental_collection.where('Car.id', '==', car_id).where('UID', '==', uid).get()
        if len(rentals) == 0:
            return False
        else:
            for rental in rentals:
                rental = rental.to_dict()
                if 'ReturnDate' not in rental:
                    return rental
            return False
    except Exception as e:
        return f"An Error Occurred: {e}"
