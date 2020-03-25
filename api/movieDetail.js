var fs = require('fs')

var movieDetail = (req,res)=>{
    res.header('Access-Control-Allow-Origin','*');
    fs.readFile('./movie/movie.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            var movieDetails = JSON.parse(data);
            var detail = movieDetails[req.query.stamp];
            console.log(detail);
            res.send(JSON.stringify(detail));
        }
    })
}

module.exports = movieDetail