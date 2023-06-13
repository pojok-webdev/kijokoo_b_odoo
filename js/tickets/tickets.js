var mysql = require('promise-mysql'),setting = require('./../appSetting')
doQuery = (sql,callback) => {
    var con = mysql.createConnection({
        host:setting.sql.host,user:setting.sql.user,password:setting.sql.password,database:setting.sql.database
    })
    .then(cn=>{
        var result = cn.query(sql)
        cn.end()
        return result
    })
    .then(rows=>{
        callback(rows)
    })
}
saveticket = (obj,callback) => {
    sql = 'insert into ticketodoo '
    sql+= '(clientname,client_id,location_id,ticketstart)'
    sql+= 'values '
    sql+= '("'+obj.clientname+'","'+obj.client_id+'","'+obj.location_id+'","'+obj.ticketstart+'")'
    doQuery(sql,result=>{
        console.log('sukesi save ticket',sql)
        callback(result.insertId)
    })
}
gets = (obj,callback) => {
    sql = 'select kdticket,client_id,location_id,clientname,date_format(ticketstart,"%Y-%m-%d %H:%i:%s") ticketstart from ticketodoo a '
    doQuery(sql,result=>{
        console.log('GetS Result',result)
        callback(result)
    })
}
getyearmonth = _ => {
    sql = ' select concat(year(now()),lpad(month(now()),2,0))'
}
getyearmonthmax = _ =>{
    sql = 'select case when mx is null then "000" else mx+1 end m from '
    sql = '(select substring(trim(max(kdticket)),7,3)mx from ticketodoo '
    sql+= 'where substring(kdticket,1,6)= concat(year(now()),lpad(month(now()),2,0)))X'
}
module.exports = {
    gets:gets,saveticket:saveticket,doQuery:doQuery,getyearmonth:getyearmonth
}