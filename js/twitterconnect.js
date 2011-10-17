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

module.exports.connectToStream = function(callback){
	new RefreshRequest(callback).start();	
};

function RefreshRequest(callback){
	var self = this;
	this.cback = callback;
	this.message = '';
	this.processChunk = function(chunk){
		console.log(chunk);
		if(self.message == undefined || self.message == "undefined"){
			self.message = "";
		}
		if(chunk != null && chunk != undefined && chunk!= "undefined"){
			self.message = self.message+ chunk;

			var newlineIndex = self.message.indexOf('\r');
    			while (newlineIndex !== -1) {
        			var tweet = self.message.slice(0, newlineIndex);
				if(tweet.length >0){ // Hack to avoid newl
					console.log("processing: "+tweet);
					var obj = JSON.parse(tweet);
					self.cback(obj);
				}
        			self.message = self.message.slice(newlineIndex + 2);
				newlineIndex = self.message.indexOf('\r');
   			}
		}
		
	};
	this.processComplete = function(data){
		console.log("processComplete: "+data);
  	  self.start();
        };
	this.start = function(){
		var https = require('https');
		var auth = 'Basic ' + new Buffer(process.env.TWITTER_USER+ ':' + process.env.TWITTER_PASS).toString('base64');
		var options = {
			host: 'stream.twitter.com',
			port: 443,
			path: '/1/statuses/filter.json',
			method: 'POST',
			headers: {
				'Authorization': auth,
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
		var request = https.request(options, function (response) {
			response.setEncoding('utf8');
  			response.on('data', self.processChunk);
  			response.on('end', self.processComplete);
		});
		request.write('track\=edfringe&delimited\=1', encoding='utf8');
		request.end();
	};
}
