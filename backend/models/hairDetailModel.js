const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;
//get the list of the possible mdeications, 
//medicalconditions and nutritional deficiences from the csv file 
const hairDetailSchema = new schema({
    user:                   {type: objectId, ref: 'User', required: true},
    age:                    {type: Number},
    genetics:               {type: String, enum: ['Yes', 'No']},
    hormonalChanges:        {type: String, enum: ['Yes', 'No']},
    medicalConditions:      {type: String},
    medications:            {type: String},
    nutritionalDeficiencies:{type: String},
    stressLevel:            {type: String, enum: ['Moderate', 'High', 'Low']}, 
    poorHairHabits:         {type: String, enum: ['Yes', 'No']},
    enviromentalFactors:    {type: String, enum: ['Yes', 'No']},
    smoking:                {type: String, enum: ['Yes', 'No']},
    weightLoss:             {type: String, enum: ['Yes', 'No']},
    hairLoss:               {type: Number, enum: ['Yes', 'No']},//prediction
}, {timestamps: true});

module.exports = mongoose.model('HairData', hairDetailSchema);