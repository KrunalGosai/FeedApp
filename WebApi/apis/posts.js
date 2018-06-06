models = require('../models'),
express = require('express')
    router = express.Router();

    router.post('/api/feed/newpost',(req,res) => {
        var body = req.body;
        console.log(body);
        if(body != undefined && body.user_id != undefined && body.feedPost != undefined){
            var post = new models.feedPosts({ user_id: body.user_id,feedPost: body.feedPost,postedTime: new Date()})
            post.save().then(() => {
                models.feedPosts.find({}).sort({postedTime: 'descending'}).limit( 10 ).then((resobj) =>{
                    res.send({info:'Record inserted successfully!',list:resobj});
                    console.log('Insert operation completed.')
                },(err)=>{
                    console.log(err);
                });
            },(err) => {
                console.log(err);
            });
        }else{
            res.statusCode = 422 //(Unprocessable Entity)
            res.send('invalid request !')
        }
    })
    
    router.get('/api/feed/list',(req,res) => {
        models.feedPosts.find({}).sort({postedTime: 'descending'}).limit( 10 ).then((resobj) =>{
            res.send({list:resobj});
            console.log('list operation completed.')
        },(err)=>{
            console.log(err);
        });
    })

module.exports = router;