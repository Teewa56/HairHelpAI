const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const userSchema = new schema({
    fullName:       {type: String, required: true},
    userName:       {type: String, required: true},
    phone:          {type: Number},
    email:          {type: String, required: true},
    password:       {type: String},
    hairDetails:    [{type: objectId, ref: 'HairData'}],
    hairHistory:    [{type: objectId, ref: 'HairHistory'}],
    nlpResponses:   [{type, objectId, ref: 'NlpData'}],
    hairImages:     [{type: objectId, ref: 'HairImage'}],
    chats:          [{type: objectId, ref: 'Chat'}]
}, {timestamps: true});

userSchema.index({username: 1, email: 1}, {unique: true})

module.exports = mongoose.model('User', userSchema);