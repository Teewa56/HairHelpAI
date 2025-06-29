const axios = require('axios');
require('dotenv').config();

modelUrl = process.env.AI_MODEL_LOCAL_URL;

modelAPI = axios.create({
    timeOut: 20000,
    baseURL: modelUrl
})

const predictHairData = async(data) => {
    return modelAPI.post('/predict_hair_data', data)
}

const predictImage = async(data) => {
    return modelAPI.post('/predict_image_data', data)
}

module.export = {
    modelAPI,
    predictHairData,
    predictImage
}