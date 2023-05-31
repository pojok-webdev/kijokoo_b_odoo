getClientById = (obj,callback) => {
    obj.i.con.doQuery(
        obj.i.crud.gets({
            tableName:'qiscus.clients',
            cols:['id','name','address'],
            conditions:[{key:'id',val:obj.id}]
        }),
        result => {
            if(result.length>0){
                callback(result[0])
            }else{
                callback({status:false})
            }
        }
    )
}
getCategoryById = (obj,callback) => {
    obj.i.con.doQuery(
        obj.i.crud.gets({
            tableName:'qiscus.messagecategories',
            cols:['id','name','description'],
            conditions:[{key:'id',val:obj.id}]
        }),
        result => {
            if(result.length>0){
                callback(result[0])
            }else{
                callback({status:false})
            }
        }
    )
}
module.exports = {
    getClientById:getClientById,getCategoryById:getCategoryById
}