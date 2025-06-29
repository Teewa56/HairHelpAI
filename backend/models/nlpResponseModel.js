const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const nlpResponseModel = new schema({
    user:          {type: objectId, ref: 'User', required: true},
    imageData:     {type: objectId, ref: 'HairImage'},
    hairData:      {type: objectId, ref: 'HairData'},
    nlpRequest:    {type: String},
    nlpResponse:   {type: String},
}, {timestamps: true});

module.exports = mongoose.model('NlpData', nlpResponseModel);