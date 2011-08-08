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

var tweetparse = require("./tweetparse.js");
var tweets = {
"not a review":-1,
"still not a 5 anything review":-1,
"pretty crappy *": -1,
"slightly better **":2,
"average ***":3,
"good ****":4,
"see this *****":5,
"This is a 1/5 show":1,
"This is a 2/5 show":2,
"this is a 3/5 show":3,
"this is a 4/5 show":4,
"This is a 5/5 show":5,
"I give it 1*":1,
"I give it 2*":2,
"I give it 3*s":3,
"I give it 4*s":4,
"I give it 5*s":5,
"I give it 1 star":1,
"I give it 2 stars":2,
"I give it 3 stars":3,
"I give it 4 stars":4,
"I give it 5 stars":5,
"I give it one star":1,
"I give it two stars":2,
"I give it three stars":3,
"I give it four stars":4,
"I give it five stars":5,
"4* show":4,
"I give it 4.5 stars":-1,
"I give it 2.5/5":-1,
"it's a 3.5* show":-1,
"slightly better * *":2,
"average * * *":3,
"good * * * *":4,
"see this * * * * *":5,
"giving * up":-1
};

for(i in tweets)
{
  var result = tweetparse.classifyReview(i);
  if(result != tweets[i]){
  	console.log("Failure for '"+i+"' expected: "+tweets[i]+" actual: "+result);
  }
}
