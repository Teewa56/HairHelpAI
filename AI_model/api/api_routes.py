from flask import Blueprint, request, jsonify
from predict.predict_non_img_data import predict_hair_data
from predict.predict_img_data import predict_image
from model_train.hair_loss_model import Hair_model
from model_train.image_class_model import Image_model

api = Blueprint('api', __name__)
data = object
image = str
non_image_data_prediction = predict_hair_data(data)
image_data_prediction = predict_image(image)
train_hair_model = Hair_model()
train_image_model = Image_model()

@api.route('/predict_hair_data', methods=['POST'])
def predict_hair_data(data):
    data = request.get_json()
    prediction = non_image_data_prediction(data)
    return jsonify({"Hair information prediction: ", {prediction}})

@api.route('/predict_image_data', methods=['POST'])
def predict_hair_image(data):
    data = request.get_json()
    prediction = image_data_prediction(data)
    return jsonify({"Hair image prediction: ", prediction})

@api.route('/train_hair_model', methods=['POST'])
def hair_model_train():
    train_hair_model()

@api.route('/train_image_model', methods=['POST'])
def image_model_train():
    train_image_model()