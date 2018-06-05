const mongo = require('Mongoose');

const models = {
    feedPosts: mongo.model('feedPost',  {user_id: String,feedPost: String,postedTime: Date}),
    users: mongo.model('user',{firstName:String,lastName:String,gender:Boolean,dob:Date})
};

module.exports = models;