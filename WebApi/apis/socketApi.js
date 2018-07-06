"use strict";
var models = require("../models");
var fs = require("fs");
const app = express();
const server  = require('http').createServer(app);
const io = require('socket.io')(server);
var api = function(){};

server.listen(8080);
io.on('connection',(socket)=>{
  console.log('a user connected');
  socket.on('newpost',(body) => { api.newPost(body,io)})
})

api.newPost = (body, io) => {
  if ( body != undefined && body.user_id != undefined && body.feedPost != undefined ) {
    var imgName = '';
    if (body.image64 != undefined && body.image64 != "") {
      imgName = new Date().getTime().toString();
      imgName = Buffer.from(imgName).toString("base64") + ".jpg";
      var img = body.image64.toString();
      var dpUrl = body.dpPic.toString();
      var data = img.replace(/^data:image\/\w+;base64,/, "");
      data = img.split(',')[1];
      var bufferImage = new Buffer(data, "base64");

      fs.writeFile("./public/images/" + imgName, bufferImage, err => {
        console.log(err);
      });
      console.log("file uploaded");
    }
    var post = new models.feedPosts({ user_id: body.user_id, feedPost: body.feedPost, postedTime: new Date(),dpUrl: body.dpPic, imgUrl: (imgName == '' ? '' : "/images/" + imgName),});
    post.save().then(
      () => {
        models.feedPosts.find({}).sort({ postedTime: "descending" }).then(resobj => {
          io.emit("newpost", {info: "Record inserted successfully!",list: resobj});
              console.log("Insert operation completed.");
            },
            err => {
              console.log(err);
            }
          );
      },
      err => {
        console.log(err);
      }
    );
  } else {
    console.log("insert record fail");
  }
};

module.exports = api;