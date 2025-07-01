const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const historySchema = new schema({
    user:           {type: objectId, ref: 'User', required: true},
    message:        {type: String},
    imageData:      {type: objectId, ref: 'HairImage'},
    hairData:       {type: objectId, ref: 'HairData'},
    nlpData:    {type: objectId, ref: 'NlpData'}
}, {timestamps: true});

module.exports = mongoose.model('HairHistory', historySchema);