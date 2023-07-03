var dbexecute = require('./../dbexecute')
saveticket = (obj,callback) => {
    sql = 'insert into ticketodoo '
    sql+= '(clientname,client_id,location_id,cause_id,cause,ticketstart,reporter,reporterphone,complaint)'
    sql+= 'values '
    sql+= '("'+obj.clientname+'","'+obj.client_id+'","'+obj.location_id+'","'+obj.cause_id+'","'+obj.cause+'","'+obj.ticketstart+'","'+obj.reporter+'","'+obj.reporterphone+'","'+obj.complaint+'")'
    dbexecute.doQuery(sql,result=>{
        console.log('sukesi save ticket',sql)
        callback(result.insertId)
    })
}
gets = (obj,callback) => {
    sql = 'select id,kdticket,client_id,location_id,clientname,date_format(ticketstart,"%Y-%m-%d %H:%i:%s") ticketstart,reporter,reporterphone,complaint from ticketodoo a '
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
    gets:gets,saveticket:saveticket,getyearmonth:getyearmonth
}