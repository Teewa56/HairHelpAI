const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const hairImgSchema = new schema({
    user:       {type: objectId, ref: 'User', required: true},
    image:      {type: String, required: true},
    prediction: {
        type: String, 
        enum: ['Advanced Loss', 'Early Thinning', 'Healthy', 'Moderate Balding']
    },
}, {timestamps: true});

module.exports = mongoose.model('HairImage', hairImgSchema);