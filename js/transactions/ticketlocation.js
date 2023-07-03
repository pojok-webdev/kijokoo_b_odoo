var dbexecute = require('./../dbexecute')
save = (obj,callback) =>{
    console.log('MODEL RECEIVED',obj)
    sql = 'insert into ticketlocationodoo '
    sql+= '(ticket_id, location_id , address,RT,RW,kelurahan_id,kelurahan_name,kecamatan_id,kecamatan_name,kota_id,kota_name,state_id,state_name,partner_id,partner_name,phone,pic,name,code,display_name)'
    sql+= 'values '
    sql+= '("'+obj.ticket_id+'", "'+obj.location_id+'" , "'+obj.address+'","'+obj.RT+'","'+obj.RW+'","'+obj.kelurahan_id+'","'+obj.kelurahan_name+'","'+obj.kecamatan_id+'","'+obj.kecamatan_name+'","'+obj.kota_id+'","'+obj.kota_name+'","'+obj.state_id+'","'+obj.state_name+'","'+obj.partner_id+'","'+obj.partner_name+'","'+obj.phone+'","'+obj.pic+'","'+obj.name+'","'+obj.code+'","'+obj.display_name+'")'
    console.log('SQL',sql)
    dbexecute.doQuery(sql,result=>{
        callback(result)
    })
}
module.exports = {
    save:save
}