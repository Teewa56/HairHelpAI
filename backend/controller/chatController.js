const User = require('../models/userModel');
const HairDetails = require('../models/hairDetailModel');
const HairImage = require('../models/hairImgModel');
const HistoryModel = require('../models/historyModel');
const NlpResponse = require('../models/nlpResponseModel');
const Chat = require('../models/chatModel');

/*
this will contain
1. save messages
2. delete messages
3. get messages for user
the messages are gotten from the frontend which is processed by chat gpt already 
but we are just saving it here so the use can access it later
*/