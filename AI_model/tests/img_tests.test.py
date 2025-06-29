import unittest
from AI_model.predict.predict_img_data import PredictImage
from AI_model.model_train.image_class_model import Image_model

class TestImageModel(unittest.TestCase):
    def setUp(self):
        self.model = Image_model()
        self.model.build_model

    def test_image_prediction(self):
        prediction = self.model.predict_image


if __name__ == '__main/__':
    unittest.main()