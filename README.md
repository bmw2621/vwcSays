# Endpoints

## /dev/jeromeSays

Returns a random image of Jerome saying what you want him to say

**Method**: POST
**Required Param**: text
*Text*: Text for Jerome to say

## /dev/jodySays/{jodyType}

Returns a random image of Jerome saying what you want him to say

**Method**: POST
**Path Param**: JodyType
***Options***:
    happy - *default*
    drill 
    mad
    eyeroll 
**Required Param**: text
*Text*: Text for Jerome to say

#TODO
- [x] Create temp directory in S3 bucket
- [x] Convert lambdas to write image to S3
- [x] Convert Lamba response to json object to support Slackbot
- [ ] Enable webhooks API in slack app
- [ ] Profit