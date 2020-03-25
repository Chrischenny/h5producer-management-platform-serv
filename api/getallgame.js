var fs = require('fs')

var getallgame = (req,res)=>{
    // res.header('Access-Control-Allow-Origin','*');
    fs.readFile('./movie/game.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
}

module.exports = getallgame