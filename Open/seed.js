var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();

request.open('POST','https://api.kairos.com/enroll');

request.setRequestHeader('Content-Type', 'application/json')
request.setRequestHeader('app_id', 'd63ffed3');
request.setRequestHeader('app_key', 'e7e0da0ec38c0e67a52894e2698b99d8');

request.onreadystatechange = function () {
  if (this.readyState ===4){
    console.log('Status', this.status);
    console.log('Headers', this.getAllResponseHeaders);
    console.log('Body', this.responseText);
  }
};

var body = {
  'image': 'http://i2.cdn.cnn.com/cnnnext/dam/assets/140116003943-kim-jong-un-north-korea-profile-dictator-horizontal-large-gallery.jpg',
  'subject_id': 'kimjongun',
  'gallery_name': 'mygallery'
};

request.send(JSON.stringify(body));