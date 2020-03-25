var fs = require('fs');

var pcupload = (req,res)=>{
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
}

module.exports = pcupload