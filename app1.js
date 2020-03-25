var express = require('express');
var https = require('https')
var bodyParser = require('body-parser')
var fs = require('fs')
var multer = require('multer')


var path =require("path");

const options={
    key : fs.readFileSync("./https/server.key"),
    cert : fs.readFileSync("./https/server.crt")
}

const vip ={
    'chen':'123',
    'yujy':'china603'
}

var count = 0;
var eData = [];
var eDate = [];
var checkDate = new Date().getDate();
const TEN_MINUTES = 10*60;


var upload = multer();
var server = express();
https.createServer(options,server).listen(2138);
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
        var now = [edate.getFullYear(),edate.getMonth()+1,edate.getDate()].join('/');
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

function deleteFolderRecursive(url) {
    var files = [];
    /**
     * 判断给定的路径是否存在
     */
    if (fs.existsSync(url)) {
        /**
         * 返回文件和子目录的数组
         */
        files = fs.readdirSync(url);
        files.forEach(function (file, index) {

            var curPath = path.join(url, file);
            /**
             * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
             */
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);

            } else {
                fs.unlinkSync(curPath);
            }
        });
        /**
         * 清除文件夹
         */
        fs.rmdirSync(url);
    } else {
        console.log("给定的路径不存在，请给出正确的路径");
    }
}

server.use('/login',function(req,res){
    //res.header('Access-Control-Allow-Origin','*')
    console.log(req.query);
    if(vip[req.query.user] && req.query.pass == vip[req.query.user]){
        res.send('1')
    }else{
        res.send('-1')
    }
});

server.post('/movieupload',upload.any(),function(req,res){
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
    
});


server.post('/gameupload',upload.any(),function(req,res){
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
    
});

server.post('/upload',upload.any(),function(req,res){
    // res.header('Access-Control-Allow-Origin','*')
    fs.readFile('./upload/url.JSON','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            let urlobj = JSON.parse(data);//获取JSON格式文本转换为大对象
            for(item in urlobj){ //二级对象获取

                var len = urlobj[item].length;//二级对象数组长度
              
                for(let i = 0;i<len;i++){
                    
                    var keys = Object.keys((urlobj[item][i])); //获取数组中对象的属性
                    
                    if(req.files[0].fieldname == keys[0]){

                        urlobj[item][i][keys[0]] = req.body.url; //如果前端传入数据匹配则修改地址；
                    }
                }
            }
            
            let urldata = JSON.stringify(urlobj);
            fs.writeFile('./upload/url.JSON',urldata,(err)=>{//转换成JSON格式后 存入文件；
                if(err){
                    console.log(err)
                }else{
                    console.log('URL地址修改完成！')
                }
            })
        }
    })

    let filename = req.files[0].fieldname+'.png';//获取图片名称

    fs.writeFile('./upload/'+filename,req.files[0].buffer,function(err){ //写入覆盖原图片；
        if(err){
            console.log(err);
        }else{
            console.log('创建成功');
        }
    });

    res.send('活动修改完成！');
})

server.get('/getdata',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*');
    fs.readFile('./upload/url.JSON','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    })
})

server.get('/movieDetail',(req,res)=>{
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
});

server.get('/gameDetail',(req,res)=>{
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
});

server.get('/getallmovie',(req,res)=>{
    // res.header('Access-Control-Allow-Origin','*');
    fs.readFile('./movie/movie.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
});

server.get('/getallgame',(req,res)=>{
    // res.header('Access-Control-Allow-Origin','*');
    fs.readFile('./movie/game.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
});

server.get('/deleteMovie',(req,res)=>{
    // res.header('Access-Control-Allow-Origin','*');
    var imgpath = './movie/img/'+req.query.number;
    fs.readFile('./movie/movie.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            var allmovie = JSON.parse(data)
            delete allmovie[req.query.number];
            data = JSON.stringify(allmovie);
            fs.writeFile('./movie/movie.json',data,err=>{
                if(err){
                    console.log(err)
                }else{
                    res.send('删除成功！');
                }
            })
            
        }
    });
    deleteFolderRecursive(imgpath);
});

server.get('/deleteGame',(req,res)=>{
    // res.header('Access-Control-Allow-Origin','*');
    var imgpath = './movie/img/'+req.query.number;
    fs.readFile('./movie/game.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            var allgame = JSON.parse(data)
            delete allgame[req.query.number];
            data = JSON.stringify(allgame);
            fs.writeFile('./movie/game.json',data,err=>{
                if(err){
                    console.log(err)
                }else{
                    res.send('删除成功！');
                }
            })
            
        }
    });
    deleteFolderRecursive(imgpath);
});

server.get('/count',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*');
    count++;
    res.send('');
});

server.get('/getVideoCount',(req,res)=>{
    // res.header('Access-Control-Allow-Origin','*');
    res.send({eData,eDate});
})

server.use(express.static('./movie/img'))


