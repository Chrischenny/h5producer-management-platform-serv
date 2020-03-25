var fs = require('fs')

var movieupload = (req,res)=>{
    // res.header('Access-Control-Allow-Origin','*');
    var timestamp = Date.now();
    var dc = './movie/img/'+timestamp
    fs.mkdir(dc,(err)=>{
        if(err){
            console.log(err);
        }else{
            for(i =0;i<req.files.length;i++){
                fs.writeFileSync(dc+'/'+req.files[i].fieldname+'.jpg',req.files[i].buffer,function(err){ //写入覆盖原图片；
                    if(err){
                        console.log(err);
                    }else{
                        console.log('创建成功')
                    }
                });
            }
            
        }
    });
    

    
    fs.readFile('./movie/movie.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            let obj = JSON.parse(data);
            let movie = JSON.parse(req.body.movie)
            obj[timestamp] = movie;
            let moviejson = JSON.stringify(obj);
            fs.writeFile('./movie/movie.json',moviejson,function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('success');
                    res.send(timestamp.toString());
                }
                
            });
        }
    })
    
}

module.exports = movieupload