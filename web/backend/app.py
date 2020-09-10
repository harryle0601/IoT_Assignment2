# Required imports
import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app, auth

# Initialize Flask app
app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

auth.set_custom_user_claims('pW4ymnAZJFSXPneGrheTRjvt9hw2', {'admin': True})
auth.set_custom_user_claims('Zysrn5S61wgXsHUKqa8LyTPMj6A3', {'engineer': True})

cars_collection = db.collection('cars')
users_collection = db.collection('users')
issues_collection = db.collection('issues')


@app.route('/car', methods=['POST'])
def add_new_car():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        cars_collection.add(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/cars/{car_id}', methods=['GET'])
def get_car():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        car_id = request.args.get('car_id')
        car = cars_collection.document(car_id).get()
        return jsonify(car.to_dict()), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


if __name__ == '__main__':
    app.run(threaded=True)
