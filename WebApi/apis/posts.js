models = require('../models'),
express = require('express'),
{google} = require('googleapis');

plus = google.plus({
    version: 'v1',
    // auth: 'AIzaSyApbHuygOHXtV2AdQwpKrTWpRFxOm6lT10' // specify your API key here
    auth: 'AIzaSyApbHuygOHXtV2AdQwpKrTWpRFxOm6lT10'
  });
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
        models.feedPosts.aggregate([
            { $sort : { postedTime : -1}},
            { $limit : 10 },
            {
                "$lookup": {
                    from: "postactivities",
                    localField: "_id",
                    foreignField: "post_id",
                    as: "postLike"
                }
            },
            {
                "$lookup": {
                    from: "postactivities",
                    localField: "_id",
                    foreignField: "post_id",
                    as: "postLove"
                }
            },
            {
                $project: {
                    user_id: 1,feedPost:1,postedTime:1,imgUrl:1,_id:1,dpUrl:1,
                    postLike: { 
                        $filter: { 
                            input: "$postLike", 
                            as: "postLike", 
                            cond: { $eq : [ "$$postLike.activity", "like" ] } 
                        } 
                    },
                    postLove: { 
                        $filter: { 
                            input: "$postLove", 
                            as: "postLove", 
                            cond: { $eq : [ "$$postLove.activity", "love" ] } 
                        } 
                    } 
                } 
            } 
            
        ]).then((data) => {res.send({list:data}), console.log('list operation completed.')},(err) => {console.log(err)});
    })

    router.get('/api/test',(req,res)=>{
        async function main() {
            const res = await plus.people.get({ userId: 'me' });
            console.log(`Hello ${res.data.displayName}!`);
          };
          
        main().catch(console.error);
    })

module.exports = router;