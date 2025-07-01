import joblib
import numpy as np
#train model after predicting with the new data and save
class PredictHairInfo:
    def predict_hair_data(hair_data):
        model = joblib.load('AI_model/models/hair_loss_model.pkl')
        data = np.array(hair_data).reshape(1, -1) 
        prediction = model.predict(data)
        print(prediction)
        joblib.dump(model, 'AI_model/models/hair_loss_model.pkl')
        return prediction['Yes', 'No']