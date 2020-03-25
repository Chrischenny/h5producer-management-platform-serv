var path = require("path");
var fs = require('fs')

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

var deleteGame = (req,res)=>{
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
}

module.exports = deleteGame