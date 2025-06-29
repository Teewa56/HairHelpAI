const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const chatSchema = new schema({
    user:          {type: objectId, ref: 'User', required: true},
    userRequest:    {type: String},
    botResponse:   {type: String},
}, {timestamps: true});

module.exports = mongoose.model('Chat', chatSchema);