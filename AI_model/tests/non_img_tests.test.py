import unittest
from AI_model.predict.predict_non_img_data import predict_hair_data
from AI_model.model_train.hair_loss_model import Hair_model

class TestNonImageModel(unittest.TestCase):
    def setUp(self):
        self.model = Hair_model()

    def test_non_image_prediction(self):
        test_data = {
            "Genetics": "Yes",
            "Hormonal_Changes": "No",
            "Medical_Conditions": "Psoriasis",
            "Medications_Treatments": "Accutane",
            "Nutritional_Deficiencies": "Iron deficiency",
            "Stress": "Moderate",
            "Age": 30,
            "Poor_Hair_Care_Habits": "No",
            "Environmental_Factors": "Yes",
            "Smoking": "Yes",
            "Weight_Loss": "No"
        }
        prediction = predict_hair_data(test_data)
        self.assertIn(prediction, [0, 1, 'Yes', 'No'])

if __name__ == '__main__':
    unittest.main()