require('dotenv').config();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();

var cloudinary = require('cloudinary');


var url;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

// request.open('POST','https://api.kairos.com/enroll');
//
// request.setRequestHeader('Content-Type', 'application/json')
// request.setRequestHeader('app_id', 'd63ffed3');
// request.setRequestHeader('app_key', 'e7e0da0ec38c0e67a52894e2698b99d8');
//
// request.onreadystatechange = function () {
//   if (this.readyState ===4){
//     console.log('Status', this.status);
//     console.log('Headers', this.getAllResponseHeaders);
//     console.log('Body', this.responseText);
//   }
// };
//
// var body = {
//   'image': 'http://i2.cdn.cnn.com/cnnnext/dam/assets/140116003943-kim-jong-un-north-korea-profile-dictator-horizontal-large-gallery.jpg',
//   'subject_id': 'kimjongun',
//   'gallery_name': 'mygallery'
// };
//
// request.send(JSON.stringify(body));


function faceRecog(u){
  var status;
  var confindence;

  request.open('POST','https://api.kairos.com/recognize');

  request.setRequestHeader('Content-Type', 'application/json')
  request.setRequestHeader('app_id', 'd63ffed3');
  request.setRequestHeader('app_key', 'e7e0da0ec38c0e67a52894e2698b99d8');

  request.onreadystatechange = function () {
    if (this.readyState ===4){
      console.log('Status', this.status);
      console.log('Headers', this.getAllResponseHeaders);
      console.log(this.responseText);
      responseJson = JSON.parse(this.responseText);
      confindence = responseJson.images[0].transaction.confidence;
      status = responseJson.images[0].transaction.status
      console.log("status: "+status);
      console.log("confindence" + confindence);
      // result = this.responseText[1].images;
      // console.log('This is the result:' +result);

    if(status == "success"){
      isMatch();
    }
    else{
      isNotMatch(u);
    }
    }
  };

  var body = {
    'image': u,
    'gallery_name': 'mygallery'
  };

  request.send(JSON.stringify(body));
}


cloudinary.uploader.upload("testface2.jpg", function(result) {
  var u = result.url;
  console.log("The URL is:" +u);
  faceRecog(u);

});

function isMatch() {

}

function isNotMatch(u) {
var accountSid = process.env.TWILIO_ID;
var authToken = process.env.TWILIO_TOKEN;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: process.env.TO_NUMBER,
    from: process.env.FROM_NUMBER,
    body: "Unknown visitor: "+ u
}, function(err, message) {
    if(err){
      console.log(err.message);
    }else {
      console.log(message.sid);
    }
});

}
