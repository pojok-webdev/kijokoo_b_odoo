createSalt = obj => {
    return obj.sha1('abcdefgh')
}
login = obj => {
    //console.log('p1',obj.sha1(obj.db.salt+obj.password))
    console.log('p2',obj.db.password)
    if(obj.sha1(obj.password+obj.db.salt)==obj.db.password){
        console.log(" true")
    }else{
        console.log(" false")
    }
}
doAuth = obj => {
    if(obj.session.hasOwnProperty('email')){
        return {
            email:obj.session,
            state:true
        }
    }
}
doLogin = (obj,callback) => {
    obj.i.con.doQuery(
        'select email,password,salt,username from users '
        +'where email="'+obj.params.email+'"',
        result=>{
          console.log("RESUlt",result)
          salt = result[0].password.substr(0, 10)
          salted = obj.i.sha1(salt+params.password)
          tail = salted.substr(0,salted.length-10)
          if(salt+tail===result[0].password){
            console.log("Password cocok")
            obj.req.session.email = result[0].email
            obj.req.session.username = result[0].username
            //obj.res.redirect(obj.redirpath)
            callback({email:result[0].email,username:result[0].username,authenticated:true})
          }else{
            console.log("Password tidak cocok")
            //obj.res.redirect('/auth')
            callback({authenticated:false})
          }
        }
      )
}
checkLoginReturn = (doneVal,failVal) => {
    return {
        done : res => {},
        fail : err => {}
    }
}
checkLogin = (obj) => {
    if(obj.req.session.hasOwnProperty('email')){
        console.log('Email',obj.req.session.email)
        obj.res.render(obj.redirpath,{
          title:obj.title,
          id:1,
          email:obj.req.session.email,
          pagename:obj.pagename
        })
    }else{
        console.log("Not logged in yet")
        obj.res.redirect('/auth')
    }    
}
module.exports = {
    createSalt:createSalt,
    login:login,doLogin:doLogin,checkLogin:checkLogin
}