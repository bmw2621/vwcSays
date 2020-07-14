'use strict';
const Jimp = require('jimp');

module.exports.jeromeSays = async (event, context, callback) => {

  let url = 'https://s3.console.aws.amazon.com/s3/object/vwcsays/jerome/'
  const images = ['captainJS.jpeg','jeromeSays.jpeg','motivationSays.jpeg','musclesSays.jpeg']
  url = url + `${images[Math.floor(Math.random() * images.length)]}`

  const textData = {
    text: event.queryStringParameters.phrase ? event.queryStringParameters.phrase : 'Hello VWC', //the text to be rendered on the image
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
    
    return {
      statusCode: 200,
      headers: {
        'content-type': 'image/jpeg'
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };
};

module.exports.jodySays = async event => {
  const Jimp = require('jimp');
  let url = 'https://s3.console.aws.amazon.com/s3/object/vwcsays/jody/'
  const images = ['jodyDrill.jpg','jodyEyeroll.jpg','jodyHappy.jpg','jodyMad.jpg']
  url = url + `${images[Math.floor(Math.random() * images.length)]}`
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        url: `${url}`,
        message: event.queryStringParameters.phrase ? event.queryStringParameters.phrase : "Hello VWC"
      },
      null,
      2
    ),
  };
};
