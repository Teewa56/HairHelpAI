const User = require('../models/userModel');
const HairDetails = require('../models/hairDetailModel');
const HairImage = require('../models/hairImgModel');
const HistoryModel = require('../models/historyModel');
const NlpData = require('../models/nlpResponseModel');
const { PredictHairData, PredictHairImage } = require('../services/modelService');

/* 
modules
1. add new hair data and predict
2. Predict new hair images
3. get predition history
*/

const predictSignUpInfo = async(req, res) => {
    try {
        const userId = req.headers('UserId');
        if (!userId) return res.status(401).json({message: 'User id missing'});
        const data = req.body;
        const {age, genetics, hormonalChanges, medicalConditions, medications, nutritionalDeficiencies,
            stressLevel, poorHairHabits, enviromentalFactors, smoking, weightLoss, image} = data;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: 'User not found!'});
        const hairModelQueryData = {
            Genetics: genetics,
            Hormonal_Changes: hormonalChanges,
            Medical_Conditions: medicalConditions,
            Medications_Treatments: medications,
            Nutritional_Deficiencies: nutritionalDeficiencies,
            Stress: stressLevel,
            Age: age,
            Poor_Hair_Care_Habits: poorHairHabits,
            Environmental_Factors: enviromentalFactors,
            Smoking: smoking,
            Weight_Loss: weightLoss,
        }
        const imgModelQueryData = image;
        const hairPrediction = await PredictHairData(hairModelQueryData);
        //handle error
        const imagePrediction =  await PredictHairImage(imgModelQueryData);
        //handle error
        const hairData = new HairDetails({
            user: userId, poorHairHabits,
            age, genetics, hormonalChanges,
            medicalConditions, medications,
            nutritionalDeficiencies, stressLevel,
            enviromentalFactors, smoking, weightLoss,
            hairLoss: hairPrediction
        });
        await hairData.save();
        const imageDetails = new HairImage({
            user: userId, 
            image,
            prediction: imagePrediction
        });
        await imageDetails.save();
        const updatedUserInfo = {
            ...user,
            hairDetails: [...hairDetails, hairData._id],
            hairImages: [...hairImages, imageDetails._id]
        };
        await user.save(updatedUserInfo);
        res.status(200).json({
            message: 'Succesfully Predicted',
            imgData: {
                imagePrediction,
                id: imageDetails._id
            },
            hairData: {
                hairPrediction,
                id: hairDetails._id
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

const saveNLPResultAfterSignUp = async(req, res) => {
    try {
        const userId = req.headers('UserId');
        if (!userId) return res.status(401).json({message: 'User id missing'});
        const data = req.body;
        const {imgId, hairId, nlpRequest, nlpResponse} = data;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: 'User not found!'});
        const nlpData = new NlpData({
            user: userId,
            imageData: imgId,
            hairData: hairId,
            nlpRequest, 
            nlpResponse
        });
        await nlpData.save();
        const historyData = new HistoryModel({
            user: userId,
            message: `Prediction for image ${imgId} on sign up`,
            imageData: imgId,
            hairData: hairId,
            nlpData: nlpData._id
        });
        await historyData.save();
        res.status(200).json({message: 'Successfully saved the responses'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    predictSignUpInfo,
    saveNLPResultAfterSignUp
}