import tensorflow as tf
from tensorflow import keras

def predict_image(image):
    image = tf.image.resize(image, (224, 224))
    image = tf.expand_dims(image, axis=0)
    image = image / 255.0 
    model = keras.models.load_model('AI_model/models/image_class_model.keras')
    predictions = model.predict(image)
    predicted_class = tf.argmax(predictions, axis=1).numpy()[0]
    model.save('AI_model/models/image_class_model.keras') 
    return predicted_class