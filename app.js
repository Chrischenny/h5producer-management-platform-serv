var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs')
var multer = require('multer')


var login = require('./api/login');
var deleteMovie = require('./api/deleteMovie');
var deleteGame = require('./api/deleteGame');
var pcupload = require('./api/pcupload');
var movieupload = require('./api/movieupload');
var gameupload = require('./api/gameupload');
var getdata = require('./api/getdata');
var movieDetail = require('./api/movieDetail');
var gameDetail = require('./api/gameDetail');
var getallmovie = require('./api/getallmovie')
var getallgame = require('./api/getallgame')


var count = 0;
var eData = [];
var eDate = [];
var checkDate = new Date().getDate();
const TEN_MINUTES = 10*60;


var upload = multer();
var server = express();
server.listen(2138);
server.use(bodyParser.urlencoded());

fs.readFile('./data/Date.json','utf-8',(err,data)=>{
    if(err){
        console.log(err)
    }else{
        eDate = JSON.parse(data);
        eDate = eDate.slice(eDate.length-7);

    }
});
fs.readFile('./data/Data.json','utf-8',(err,data)=>{
    if(err){
        console.log(err)
    }else{
        eData = JSON.parse(data);
        eData = eData.slice(eData.length-7);

    }
});

setInterval(() => {
    var edate = new Date();
    if(!(edate.getDate()==checkDate)){
        var now = [edate.getFullYear(),edate.getMonth()+1,edate.getDate()-1].join('/');
        eDate.push(now);
        eData.push(count);
        eData.shift();
        eDate.shift();
        
        fs.readFile('./data/Data.json','utf-8',(err,data)=>{
            if(err){
                console.log(err)
            }else{
                var datalist = JSON.parse(data);
                datalist.push(count);
                count = 0;
                fs.writeFile('./data/Data.json',JSON.stringify(datalist),(err)=>{
                    if(err){
                        console.log(err);
                    }
                })

            }
        });
        fs.readFile('./data/Date.json','utf-8',(err,data)=>{
            if(err){
                console.log(err)
            }else{
                var datelist = JSON.parse(data);
                datelist.push(now);
                fs.writeFile('./data/Date.json',JSON.stringify(datelist),(err)=>{
                    if(err){
                        console.log(err);
                    }
                });
                console.log('done')
            }
        });
        checkDate = edate.getDate()
    }
}, TEN_MINUTES);


server.use('/login',login);

server.post('/movieupload',upload.any(),movieupload);

server.post('/gameupload',upload.any(),gameupload);

server.post('/upload',upload.any(),pcupload)

server.get('/getdata',getdata)

server.get('/movieDetail',movieDetail);

server.get('/gameDetail',gameDetail);

server.get('/getallmovie',getallmovie);

server.get('/getallgame',getallgame);

server.get('/deleteMovie',deleteMovie);

server.get('/deleteGame',deleteGame);


server.get('/count',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*');
    count++;
    res.send('');
});

server.get('/getVideoCount',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.send({eData,eDate});
})
server.use(express.static('./movie/img'))


