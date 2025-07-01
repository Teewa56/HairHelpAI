from flask import Blueprint, request, jsonify
from predict.predict_non_img_data import predict_hair_data
from predict.predict_img_data import predict_image
from model_train.hair_loss_model import Hair_model
from model_train.image_class_model import Image_model

api = Blueprint('api', __name__)

@api.route('/predict_hair_data', methods=['POST'])
def predict_hair_data_endpoint():
    data = request.get_json()
    prediction = predict_hair_data(data)
    return jsonify({"hair_information_prediction": prediction})

@api.route('/predict_image_data', methods=['POST'])
def predict_image_data_endpoint():
    data = request.get_json()
    prediction = predict_image(data['image_url'])
    return jsonify({"hair_image_prediction": prediction})

@api.route('/train_hair_model', methods=['POST'])
def hair_model_train():
    Hair_model().train()
    return jsonify({"message": "Hair model trained"})

@api.route('/train_image_model', methods=['POST'])
def image_model_train():
    Image_model().train()
    return jsonify({"message": "Image model trained"})