// 'use strict';
const Jimp = require('jimp');
const AWS = require('aws-sdk');
const querystring = require('querystring');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const s3 = new AWS.S3();

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx'.replace(/[x]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

module.exports.jeromeSays = async (event, context, callback) => {
  let buff = new Buffer(event.body, 'base64');
  let eventBody = buff.toString('ascii');
  const params = querystring.parse(eventBody);

  if (process.env.JEROME_SAYS !== params.token) {
    return {
      statusCode: 401,
      body: "Unauthorized"
    };
  }

  let url = 'https://vwcsays.s3.us-east-2.amazonaws.com/jerome/'
  const images = ['avengenerdSays.jpeg','baneSays.jpeg','cigarSays','redshirt.jpeg','cascadia.jpeg','captainJS.jpeg','jeromeSays.jpeg','motivationSays.jpeg','musclesSays.jpeg']
  url = url + `${images[Math.floor(Math.random() * images.length)]}`

  const textData = {
    text: params.text ? params.text : 'Hello VWC', //the text to be rendered on the image
    maxWidth: 400, //image width - 10px margin left - 10px margin right
    maxHeight: 267, //logo height + margin
    placementX: 505, // 10px in on the x axis
    placementY: 95 //bottom of the image: height - maxHeight - margin
  };

  const image = await Jimp.read(url)
    .then(tpl => (
      Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => ([tpl, font]))
      ))
    .then(data => {

      let tpl = data[0];
      let font = data[1];

      return tpl.print(font, textData.placementX, textData.placementY, {
        text: textData.text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      }, textData.maxWidth, textData.maxHeight);
    })

    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    const key = `temp${create_UUID()}.jpeg`

    await s3.putObject({
      Bucket: process.env.BUCKET,
      Key: key,
      Body: buffer,
    }).promise()

    const respBody = {
      response_type: "in_channel",
      attachments:[
        {
          image_url:`https://vwcsays-dev-serverlessdeploymentbucket-17jlo01fyeebu.s3.amazonaws.com/temp/${key}`,
          thumb_url:`https://vwcsays-dev-serverlessdeploymentbucket-17jlo01fyeebu.s3.amazonaws.com/temp/${key}`,
        }
      ]
    }

    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(respBody),
      isBase64Encoded: false
    })


};

module.exports.jodySays = async (event, context, callback) => {
  let buff = new Buffer(event.body, 'base64');
  let eventBody = buff.toString('ascii');
  const params = querystring.parse(eventBody);
  
  if (process.env.JODY_SAYS !== params.token) {
    return {
      statusCode: 401,
      body: "Unauthorized"
    };
  }

  const avatarOptions = ['drill', 'happy','eyeroll','mad']
  let splitSentence = params.text.split(' ')
  let avatar = avatarOptions.includes(splitSentence[0].toLowerCase()) ?  splitSentence.shift() : 'happy'
  let text = splitSentence.join(' ')

  const Jimp = require('jimp');
  let url = 'https://vwcsays.s3.us-east-2.amazonaws.com/jody/'
  let imageFileName;
  switch(avatar.toLowerCase()){
    case 'drill':
      imageFileName = 'jodyDrill.jpg';
      break;
    case 'eyeroll':
      imageFileName = 'jodyEyeroll.jpg';
      break;
    case 'mad':
      imageFileName = 'jodyMad.jpg';
      break;
    case 'cry':
      imageFileName = 'jodyCry.jpg';
      break;
    case 'happy':
    default:
      imageFileName = 'jodyHappy.jpg';
  }
  url = url + imageFileName
  const textData = {
    text: text ? text : 'Hello VWC', //the text to be rendered on the image
    maxWidth: 400, //image width - 10px margin left - 10px margin right
    maxHeight: 267, //logo height + margin
    placementX: 505, // 10px in on the x axis
    placementY: 95 //bottom of the image: height - maxHeight - margin
  };

  const image = await Jimp.read(url)
    .then(tpl => (
      Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => ([tpl, font]))
      ))
    .then(data => {

      let tpl = data[0];
      let font = data[1];

      return tpl.print(font, textData.placementX, textData.placementY, {
        text: textData.text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      }, textData.maxWidth, textData.maxHeight);
    })

    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    const key = `temp${create_UUID()}.jpeg`

    await s3.putObject({
      Bucket: process.env.BUCKET,
      Key: key,
      Body: buffer,
    }).promise()

    const respBody = {
      response_type: "in_channel",
      attachments:[
        {
          image_url:`https://vwcsays-dev-serverlessdeploymentbucket-17jlo01fyeebu.s3.amazonaws.com/temp/${key}`,
          thumb_url:`https://vwcsays-dev-serverlessdeploymentbucket-17jlo01fyeebu.s3.amazonaws.com/temp/${key}`,
        }
      ]
    }

    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(respBody),
      isBase64Encoded: false
    })
};
