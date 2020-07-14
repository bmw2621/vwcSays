// 'use strict';
const Jimp = require('jimp');

module.exports.jeromeSays = async (event, context, callback) => {
  let url = 'https://vwcsays.s3.us-east-2.amazonaws.com/jerome/'
  const images = ['captainJS.jpeg','jeromeSays.jpeg','motivationSays.jpeg','musclesSays.jpeg']
  url = url + `${images[Math.floor(Math.random() * images.length)]}`

  const textData = {
    text: event.queryStringParameters.text ? event.queryStringParameters.text : 'Hello VWC', //the text to be rendered on the image
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

    callback(null, {
      statusCode: 200,
      headers: { 'Content-Type': 'image/jpeg' },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    })
};

module.exports.jodySays = async (event, context, callback) => {
  const Jimp = require('jimp');
  let url = 'https://vwcsays.s3.us-east-2.amazonaws.com/jody/'
  let imageFileName;
  console.log(event)
  switch(event.path){
    case '/jodySays/drill':
      imageFileName = 'jodyDrill.jpg';
      break;
    case '/jodySays/eyeroll':
      imageFileName = 'jodyEyeroll.jpg';
      break;
    case '/jodySays/mad':
      imageFileName = 'jodyMad.jpg';
      break;
    case '/jodySays/happy':
    default:
      imageFileName = 'jodyHappy.jpg';
  }
  url = url + imageFileName
  const textData = {
    text: event.queryStringParameters.text ? event.queryStringParameters.text : 'Hello VWC', //the text to be rendered on the image
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

    callback(
      null, 
      {
        statusCode: 200,
        headers: { 'Content-Type': 'image/jpeg' },
        body: buffer.toString('base64'),
        isBase64Encoded: true
      }
    )
};
