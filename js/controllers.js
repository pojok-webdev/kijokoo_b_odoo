var i = require('./appInit'),
con = require('./connection'),
crud = require('./orm/crud'),
https = require('https')
doRequest = obj => {
    console.log('Get Clients invoked')
    params = obj.req.params
    con.doQuery(crud.gets({
        tableName:'clients',
        cols:['id','name','address'],
        conditions:[{key:params.key,val:params.val}]
    }),res=>{
        console.log(res)
    })
    obj.res.send({'request':'clients'})

}
executeRequest = obj => {
    console.log("CRUDQUERY",crud.getslike({
        tableName:obj.tableName,
        cols:obj.cols,
        conditions:obj.conditions
    }))
    con.doQuery(crud.getslike({
        tableName:obj.tableName,
        cols:obj.cols,
        conditions:obj.conditions
    }),res=>{
        console.log("ExecuteRequest",res)
        obj.res.send({"results":res.map(res=>{
            return {id:res.id,text:res.name}
        })})
    })
}
save = obj => {
    con.doQuery(crud.create({
        tableName:obj.tableName,cols:obj.cols
    }),res=>{
        console.log("save res",res)
        return res
        //obj.res.send({resullt:res})
    })
}
send = obj => {
    options = {
        hostname:'',port:'',path:'',method:'POST'
    }
    req = https.request(options,res=>{
        console.log('Res',)
    })
}
sendMessages = obj => {
    console.log("Obj",obj)
    obj.recipient.forEach(recipient => {
        console.log(crud.create({
            tableName:'sentmessages',
            cols:[
                    {
                        key:'ticket_id',val:obj.ticket_id
                    },{
                        key:'email',val:obj.email
                    },{
                        key:'recipient',val:recipient
                    },{
                        key:'message',val:obj.message
                    }
            ]
        }))
    });
}
gets = obj => {
    console.log("CRUDQUERY",crud.gets({
        tableName:obj.tableName,
        cols:obj.cols,
        conditions:obj.conditions
    }))
    con.doQuery(crud.gets({
        tableName:obj.tableName,
        cols:obj.cols,
        conditions:obj.conditions
    }),res=>{
        console.log("ExecuteRequest",res)
        /*obj.res.send({"results":res.map(res=>{
            return {id:res.id,text:res.name}
        })})*/
        obj.res.send(res)
    })
}
module.exports = {
    doRequest:doRequest,executeRequest:executeRequest,
    send:send,sendMessages:sendMessages,save:save,gets:gets
}