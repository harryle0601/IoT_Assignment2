# Required imports
import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

# Initialize Flask app
app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()
cars_collection = db.collection('cars')
users_collection = db.collection('cars')
issues_collection = db.collection('issues')
rental_collection = db.collection('rental')

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
        return f"An Error Occured: {e}"

@app.route('/cars', methods=['GET'])
def get_car_list():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        car_id = request.args.get('id')
        if car_id:
            car = cars_collection.document(car_id).get()
            return jsonify(car.to_dict()), 200
        else:
            car_list = [doc.to_dict() for doc in cars_collection.stream()]
            return jsonify(car_list), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/update', methods=['PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        cars_collection.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/delete', methods=['DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        car_id = request.args.get('id')
        cars_collection.document(car_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

port = int(os.environ.get('PORT', 6799))
if __name__ == '__main__':
    app.run(threaded=True, port=port)
