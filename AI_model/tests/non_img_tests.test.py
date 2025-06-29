import unittest
from AI_model.predict.predict_non_img_data import PredictHairInfo
from AI_model.model_train.hair_loss_model import Hair_model

class TestImageModel(unittest.TestCase):
    def setUp(self):
        self.model = Hair_model()
        self.model.build_model

    def test_image_prediction(self):
        prediction = 


if __name__ == '__main/__':
    unittest.main()