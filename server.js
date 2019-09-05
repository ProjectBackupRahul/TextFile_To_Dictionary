var express = require('express');
var formidable = require('formidable');
const path = require('path');
var multer  = require('multer')
var bodyParser = require('body-parser');

var fs = require('fs');  // Reqire Statement for read file 

var app = express();
var recivedData = '';
var wordArr = [];
var myJSON = {}
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);
    

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/data/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
  
   try {
    recivedData = fs.readFileSync('data/file.txt', 'utf8');
    console.log(recivedData);   
    arr (recivedData) ;
   } catch(e) {
    console.log('Error:', e.stack);

      
    } 
       function arr() {
        wordArr =  recivedData.trim().split(" ");
       };
        //console.log("Final Array" , wordArr);
        myJSON = JSON.stringify(wordArr);
        console.log(myJSON);
       
    });
  //res.send(__dirname + '/public/search.html');
   res.send(myJSON);
});

app.get('/test', function (req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://test.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.sendFile(__dirname + '/public/search.html');
    res.send(wordArr);
});
app.listen(9090, () => console.log('File Upload Dictionary app listening on port 9090!'))


