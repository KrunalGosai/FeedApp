"use strict";

const express = require('express');
const route = require('./route');
const bodyParser = require('body-parser');
const app = express();
const server  = require('http').createServer(app);
const io = require('socket.io')(server);
var models = require('./models');


//CORS middleware
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Tableau-Auth"); 
    // res.header("Access-Control-Request-Headers", "accept, content-type, currentuserid , currentRole");
    
      next();
  });
  
app.use(bodyParser.urlencoded({limit: '50mb',extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb'}));

app.all('/api/*',route);

server.listen(8080);
io.on('connection',(socket)=>{
  console.log('a user connected');

  socket.on('newpost', (body) => {
    if(body != undefined && body.user_id != undefined && body.feedPost != undefined){
      var post = new models.feedPosts({ user_id: body.user_id,feedPost: body.feedPost,postedTime: new Date()})
      post.save().then(() => {
          models.feedPosts.find({}).sort({postedTime: 'descending'}).then((resobj) =>{
              io.emit('newpost',{info:'Record inserted successfully!',list:resobj});
              console.log('Insert operation completed.')
          },(err)=>{
              console.log(err);
          });
      },(err) => {
          console.log(err);
      });
    }else{
      console.log('insert record fail');
    }
  });
})

app.listen(4000, () => console.log('Example app listening on port 4000!'))