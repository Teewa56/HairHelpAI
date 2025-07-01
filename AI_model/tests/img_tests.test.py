import unittest
from AI_model.predict.predict_img_data import predict_image
from AI_model.model_train.image_class_model import Image_model

class TestImageModel(unittest.TestCase):
    def setUp(self):
        self.model = Image_model()

    def test_image_prediction(self):
        test_img_url = "./images/test/Healthy/img_10_8.jpg" 
        prediction = predict_image(test_img_url)
        print('this is the prediction:', prediction)
        self.assertIsInstance(prediction, int)  

if __name__ == '__main__':
    unittest.main()