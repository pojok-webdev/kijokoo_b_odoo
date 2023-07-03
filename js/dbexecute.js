var mysql = require('promise-mysql'),setting = require('./appSetting')
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
module.exports = {
    doQuery:doQuery
}