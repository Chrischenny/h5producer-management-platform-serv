var fs = require('fs')

var gameupload = (req,res)=>{
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
    

    
    fs.readFile('./movie/game.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            let obj = JSON.parse(data);
            let game = JSON.parse(req.body.game)
            obj[timestamp] = game;
            let gamejson = JSON.stringify(obj);
            fs.writeFile('./movie/game.json',gamejson,function(err){
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

module.exports = gameupload;