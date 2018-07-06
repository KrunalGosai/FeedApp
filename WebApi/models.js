const mongo = require('Mongoose');
const Schema = mongo.Schema;
    mongo.connect('mongodb+srv://krunal:mongodev@cluster0-v8st9.mongodb.net/feedapp?retryWrites=true');
const models = {
    feedPosts: mongo.model('feedPost',  {user_id: String,feedPost: String,postedTime: Date,imgUrl:String,dpUrl:String}),
    users: mongo.model('user',{firstName:String,lastName:String,gender:Boolean,dob:Date}),
    postActivitys: mongo.model('postActivity',{ activity:String,user_id:String,post_id:{type:Schema.Types.ObjectId, ref:'postActivity'}})
};

module.exports = models;