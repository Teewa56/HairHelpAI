import tensorflow as tf
from tensorflow import keras
import requests

def predict_image(img_url):
    response = requests.get(img_url)
    image = tf.image.decode_image(response.content, channels=3)
    image = tf.image.resize(image, (224, 224))
    image = tf.expand_dims(image, axis=0)
    image = image / 255.0
    model = keras.models.load_model('models/image_class_model.keras')
    predictions = model.predict(image)
    predicted_class = tf.argmax(predictions, axis=1).numpy()[0]
    return int(predicted_class)