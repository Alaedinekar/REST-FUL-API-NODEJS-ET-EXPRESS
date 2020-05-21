const express = require('express')
const app = express()
const fs = require('fs')
const path = require("path")
const bodyParser = require('body-parser');
const readline = require('readline');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static("./public"))

app.set("views",path.join(__dirname,"views"));


let img = fs.readFileSync('./insa.jpg')
let web = fs.readFileSync('./web.html')
let style = fs.readFileSync('public/style.css')


let rawdata = fs.readFileSync('listeliv.json');
let student = JSON.parse(rawdata);
//listelivre= listelivre.toString;

app.get('/image', function (req, res) {
   res.writeHead(200,{'Content-Type': 'image/jpeg'});
   res.end(img);
  })

app.get('/', function (req, res) {
  res.writeHead(200,{'Content-Type': 'text/html'});
  res.end(web);
  
})
app.get('/ressource', function (req, res) {
  
  if(req.query["name"] != null){
    let ressource = fs.readFileSync('./public/'+ req.query["name"])
    res.writeHead(200,{'Content-Type': 'text/css'});
    res.end(style);
  }
  else {
    res.status(404).send();
  }
})

app.get('/listelivre', function (req, res) {
  res.writeHead(200, {'Content-Type' : 'application/json'})
  res.end(JSON.stringify(student));
  
})


app.post("/emprunt", (req, res) => {
  let data = {};
  
   data.found = false;
  var re = req.body.name;
  
  student.list.forEach(element => {
    

    if(element.name == re){
      data.found = true;
      
      res.end(JSON.stringify(data))
      //delete rawdata[element]
      return
    }
    
    
  });
  if(!data.found){
  res.end(JSON.stringify(data));
  }
  
});



app.listen(3000, function () {
  console.log('En ecoute sur le port 3000!')
})

