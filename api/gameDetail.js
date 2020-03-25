var fs = require('fs')

var gameDetail = (req,res)=>{
    res.header('Access-Control-Allow-Origin','*');
    fs.readFile('./movie/game.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            var gameDetails = JSON.parse(data);
            var detail = gameDetails[req.query.stamp];
            console.log(detail);
            res.send(JSON.stringify(detail));
        }
    })
}  

module.exports = gameDetail