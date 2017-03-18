var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();

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
    status = JSON.parse(this.responseText);
    confindence = status.images[0].transaction.confidence;
    console.log("status: "+status.images[0].transaction.status);
    console.log("confindence" + confindence);
    // result = this.responseText[1].images;
    // console.log('This is the result:' +result);
  }
};

var body = {
  'image': 'kim-jong-un-in-suit.jpg',
  'gallery_name': 'mygallery'
};

request.send(JSON.stringify(body));
