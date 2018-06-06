const mongo = require('Mongoose');
    mongo.connect('mongodb+srv://krunal:mongodev@cluster0-v8st9.mongodb.net/feedapp?retryWrites=true');
const models = {
    feedPosts: mongo.model('feedPost',  {user_id: String,feedPost: String,postedTime: Date}),
    users: mongo.model('user',{firstName:String,lastName:String,gender:Boolean,dob:Date})
};

module.exports = models;