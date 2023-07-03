
gets = (obj,callback) => {
    sql = 'select id,category_id,name,active,status from ticketcauses '
    sql+= 'where name like "%'+obj.search+'%" '
    sql+= 'and category_id='+obj.category_id+' '
    doQuery(sql,result=>{
        console.log('GetS Result',result)
        callback(result)
    })
}
getcategories = (obj,callback) => {
    sql = 'select id,name,description from ticketcausecategories '
    sql+= 'where name like "%'+obj.search+'%" '
    doQuery(sql,result=>{
        console.log('GetS Result',result)
        callback(result)
    })
}
module.exports = {
    gets:gets,getcategories:getcategories
}