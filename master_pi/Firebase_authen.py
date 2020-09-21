import pyrebase

config = {
    "apiKey": "AIzaSyB6_pMrQeJZUadK72Dy1ljfgYDu8jrf4jM",
    "authDomain": "iotassignment2-d4c67.firebaseapp.com",
    "databaseURL": "https://iotassignment2-d4c67.firebaseio.com",
    "projectId": "iotassignment2-d4c67",
    "storageBucket": "iotassignment2-d4c67.appspot.com",
    "messagingSenderId": "421326197012",
    "appId": "1:421326197012:web:8f8b8308d7f5a8e1ebb201",
    "measurementId": "G-DQS4MS2J7W"
  }

# initialize connection to firebase authentication
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()


def auth_user_by_email_password(email, password):
    """
        description : authenticate a user using email and password combination
        todo : authenticate user using firebase build in function
        return : string of an user_id. return false if authentication fail
    """
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        if user:
            return user['localId']
        else:
            return False
    except Exception as e:
        print(e)
