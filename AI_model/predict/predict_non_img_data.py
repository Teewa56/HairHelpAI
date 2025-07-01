import joblib
import numpy as np

def predict_hair_data(hair_data):
    model = joblib.load('models/hair_loss_model.pkl')
    data = np.array(list(hair_data.values())).reshape(1, -1)
    prediction = model.predict(data)
    return prediction[0]