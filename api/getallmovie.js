var fs = require('fs')

var getallmovie = (req,res)=>{
    // res.header('Access-Control-Allow-Origin','*');
    fs.readFile('./movie/movie.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
}

module.exports = getallmovie