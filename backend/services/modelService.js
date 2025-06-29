const {predictHairData, predictImage} = require('../api/modelApi')

async function PredictHairData(data) {
    try {
        const res = await predictHairData(data);
        return res.data
    } catch (error) {
        return error
    }
}

async function PredictHairImage(data) {
    try {
        const res = await predictImage(data);
        return res.data
    } catch (error) {
        return error
    }
}

module.export = {
    PredictHairData, PredictHairImage
}