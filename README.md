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