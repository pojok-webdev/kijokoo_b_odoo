gets = obj => {
    if(obj.hasOwnProperty('orderby')){
        orderby = 'order by '+obj.orderby.map(ord=>{
            return ord.key+' '+ord.order+' '
        }).join(',')     
    }else{
        orderby = ''
    }

    return 'select ' + obj.cols.join() + ' from ' + obj.tableName + ' '
    + ' where ' + obj.conditions.map(cond=>{return cond.key+'='+cond.val}).join()+' '
    + orderby
}
getslike = obj => {
    return 'select ' + obj.cols.join() + ' from ' + obj.tableName + ' '
    + ' where ' + obj.conditions.map(cond=>{return cond.key+' like "%'+cond.val+'%" '}).join()
}
create = obj => {
    return 'insert into '+obj.tableName+' '
    +'('+obj.cols.map(col=>{return col.key}).join()+') '
    +' values '
    +'('+obj.cols.map(col=>{return '"'+col.val+'"'}).join()+') '
}
remove = obj => {
    return 'delete from '+obj.tableName+' '
    +'where '+obj.conditions.map(cond=>{
        return cond.key+'="'+cond.val+'" '
    }).join(' and ')
}
update = obj => {
    return 'update '+obj.tableName+' '
    +'set '+obj.cols.map(col=>{
        return col.key+'="'+col.val+'" '
    }).join()+' where '+obj.conditions.map(cond=>{
        return cond.key+'="'+cond.val+'" '
    }).join()
}
module.exports = {
    gets:gets,
    getslike:getslike,
    create:create,
    remove:remove,
    update:update
}