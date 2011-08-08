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

module.exports.classifyReview = function(tweet){
  return whichStar(tweet);
}


var tweet = "This is a five star review";
var tweet2 = "This is a 2/5 review";
console.log(tweet);
var containsStar = tweet.indexOf("star") != -1  || tweet.indexOf("*") != -1;
console.log(containsStar);
var containsDivision = tweet2.indexOf("\/5") != -1;
console.log(containsDivision);

console.log(whichStar(tweet2));
console.log("dottest"+"I give it 4.5 stars".match("([^\.?][1-5]|one|two|three|four|five)[ ]?(star|[\*])"));
console.log(tweet2.match("[1-5]\/5"));

var re = /((^[1-5]|[^\.?][1-5]|one|two|three|four|five)[ ]?(star|[\*])|[^\.]?[1-5]\/5)/i;
var tweets = ["not a review", "still not a 5 anything review","pretty crappy *","slightly better **","average ***","good ****","see this *****","This is a 1/5 show","This is a 2/5 show", "this is a 3/5 show", "this is a 4/5 show", "This is a 5/5 show","I give it 1*","I give it 2*", "I give it 3*s","I give it 4*s", "I give it 5*s","I give it 1 star","I give it 2 stars","I give it 3 stars", "I give it 4 stars","I give it 5 stars","I give it one star", "I give it two stars", "I give it three stars","I give it four stars","I give it five stars","4* show"];

function whichStar(tweet){
  var re = /((^[1-5]|[^\.][1-5]|one|two|three|four|five)[ ]?(star|[\*])|(^[1-5]|[^\.][1-5])\/5)/i;
  var matched = re.exec(tweet);
  if(matched !=null){
    var matchString = matched[0];
    if(matchString.indexOf("one") != -1){
      return 1;
    }
    if(matchString.indexOf("two") != -1){
      return 2;
    }
    if(matchString.indexOf("three") != -1){
      return 3;
    }
    if(matchString.indexOf("four") != -1){
      return 4;
    }
    if(matchString.indexOf("five") != -1){
      return 5;
    }
    if(" " == matchString.substr(0,1)){
      return parseInt(matchString.substr(1,1));
    }
    return parseInt(matchString.substr(0,1));
  }
  var starIndex = tweet.indexOf("*****");
  if(starIndex != -1){
    return 5;
  }
  starIndex = tweet.indexOf("****");
  if(starIndex != -1){
    return 4;
  }
  starIndex = tweet.indexOf("***");
  if(starIndex != -1){
    return 3;
  }
  starIndex = tweet.indexOf("**");
  if(starIndex != -1){
    return 2;
  }
  starIndex = tweet.indexOf("*");
  if(starIndex != -1){
    return 1;
  }
  return -1;
}

for(i in tweets){
  //console.log(whichStar(tweets[i]));
  //console.log(re.exec(tweets[i]));
}

//console.log(re.exec("I give it 4 stars"));
