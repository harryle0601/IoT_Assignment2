from firebase_admin import credentials, firestore, initialize_app

# firebase connection setup and establish
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

# predetermine collection from database
cars_collection = db.collection('cars')
users_collection = db.collection('users')
issues_collection = db.collection('issues')
rental_collection = db.collection('rental')


def get_engineer_by_id(uid):
    """
        description : Fetches a document with a id value in users collection.
        todo : Return document that matches document ID.
        return : Return a dictionary.
    """
    try:
        engineer = users_collection.document(uid).get()
        return engineer.to_dict()
    except Exception as e:
        print(e)


def get_engineer_by_mac(mac):
    """
        description : Fetches a document with a id value in users collection.
        todo : Return document that matches document ID.
        return : Return a dictionary.
    """
    try:
        print(mac)
        engineer = users_collection.where('MAC', '==', mac).get()
        print(engineer.to_dict())
        return engineer.to_dict()
    except Exception as e:
        print(e)


def get_user_images():
    """
        description : Fetches a list of document from users collection that contain an image field.
        todo : Return all documents that has 'Avatar' field.
        return : Return dictionary of users.
    """
    list_of_user = {}
    try:
        users = users_collection.get()
        for user in users:
            user_id = str(user.id)
            user = user.to_dict()
            if 'Avatar' in user:
                list_of_user[user_id] = user
        return list_of_user
    except Exception as e:
        print(e)


def get_car_detail(car_id):
    """
        description : fetch the list of issues document from a Car from the issues collection that has not been resolve.
        todo : Return document that has a particular Car ID and has been resolve.
        return : Return a dictionary of issues or a dictionary of a car.
    """
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
        description : Fetches a document from Car collection.
        todo : Return document that matches document ID.
        return : Return a dictionary of a car.
    """
    try:
        # Check if ID was passed to URL query
        car = cars_collection.document(car_id).get()
        return car.to_dict()
    except Exception as e:
        return f"An Error Occurred: {e}"


def get_rental_status(car_id, uid):
    """
        description : Fetches a document from rental collection that match both a car id and user id.
        todo : Return document that matches car ID and user ID field that does not have a return date.
        return : Return a dictionary of an active rental record.
    """
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
