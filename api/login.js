var login = (req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    console.log(req.query);
    if(vip[req.query.user] && req.query.pass == vip[req.query.user].pass){
        res.send(vip[req.query.user])
    }else{
        res.send('-1')
    }
}
const vip ={
    'chen':{
        pass:'123',
        movieuploadVisible:false,
        gameuploadVisible:false,
        moviemanagerVisible:false
    },
    'yujy':{
        pass:'china603',
        movieuploadVisible:false,
        gameuploadVisible:false,
        moviemanagerVisible:false
    },
    'jiangkn':{
        pass:'china603',
        movieuploadVisible:true,
        gameuploadVisible:true,
        moviemanagerVisible:true
    }
}

module.exports = login