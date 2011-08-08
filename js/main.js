/*
   Copyright 2011 David Illsley <david@illsley.org>

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var http = require('http');
var crypto = require('crypto');
var currentStatus = {};
var currentText;
var currentHash="nope";
var lastUpdated = "";
var helper = require("./twitterconnect.js");
var tweetparse = require("./tweetparse.js");

function say(msg){
var starred = tweetparse.classifyReview(msg.text);
if(starred >0){
  var no = {text:msg.text,username:msg.user.screen_name,date: msg.created_at, image:msg.user.profile_image_url};
  lastUpdated = msg.created_at;
  currentStatus[starred] =  no;
  console.log(currentStatus[starred]);
}
currentText = "var map="+JSON.stringify(currentStatus)+";\nvar lastUpdated=\""+lastUpdated+"\";";
}
helper.connectToStream(say);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain', 'etag' : currentHash});
    res.end(currentText);
}).listen(1338, "127.0.0.1");
console.log("Started: "+new Date());
