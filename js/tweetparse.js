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
  starIndex = tweet.indexOf(" **");
  if(starIndex != -1){
    return 2;
  }
  starIndex = tweet.indexOf(" *");
  if(starIndex != -1){
    return 1;
  }
  return -1;
}
