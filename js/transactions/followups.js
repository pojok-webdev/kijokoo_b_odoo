var dbexecute = require('./../dbexecute')
save = (obj,callback) => {
    console.log('OBJ',obj)
    sql = 'insert into ticketfollowupodoo '
    sql+= '(ticket_id,followUpDate,cause_id) '
    sql+= 'values '
    sql+= '("'+obj.ticket_id+'","'+obj.followUpDate+'","'+obj.cause_id+'") '
    console.log('SQL',sql)
    dbexecute.doQuery(sql,result=>{
        callback(result)
    })
}
module.exports = {
    save:save
}