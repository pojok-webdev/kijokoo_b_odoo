showError = obj => {
    switch(obj.errCode){
        case '1':
            return 'No table specified'
            break
        case '2':
            return 'Main table has no name'
            break
    }
}
checkProperty = obj => {
    if(obj.hasOwnProperty('tables')){
        if(1==2)
        console.log('>>it has tables')
        if(obj.tables.hasOwnProperty('name')){
            if(1==2)
            console.log('>>it has name')
            return true
        }else{
            showError({errCode:'2'})
            return false
        }
    }else{
        showError({errCode:'1'})
        return false;
    }
}
mergeCols = obj => {
    return obj.tables.cols.map(cols=>{
        return obj.tables.name+'.'+cols
    })
    .concat(obj.tables.leftjoin.map(tbl=>{
        console.log("Left Joiner",tbl.cols)
        return tbl.cols.map(col=>{
            return tbl.name+'.'+col
        })
    }))
    .join(',')
}
join = obj => {
    console.log('OBJ',obj)
    if(obj.tables.hasOwnProperty('conditions')){
        console.log('It has condition')
        condition = ' where '+obj.tables.conditions.map(condition=>{
            return condition.key + ' = ' +condition.val
        }).join(' and ')
    }else{
        console.log('It has no condition')
        condition = 'where 1 '
    }
    if(checkProperty(obj)){
        maintbl = 'select ' + mergeCols(obj)
        + ' from ' + obj.tables.name + ' left outer join ' + obj.tables.leftjoin.map(tbl=>{
            return tbl.name + ' on ' + tbl.glue.map(glue=>{
                return tbl.name+'.'+glue.child+'='+obj.tables.name+'.'+glue.parent
            }).join(',')
        }).join(' left outer join ')
        return maintbl+' '+condition
    }
}
module.exports = {
    join:join
}
