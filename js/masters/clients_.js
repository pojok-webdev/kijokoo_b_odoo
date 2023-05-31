const { crud } = require('../appInit')
const { con } = require('../appInit')
associateCategoriesClients = {
    deleteAllCategoriesByClient : obj => {
        con.doQuery(
            crud.remove({
                tableName:'qiscus.categories_clients',
                conditions:[{key:'client_id',val:obj.client_id}]
            }),
            result=>{
                return associateCategoriesClients
            }
        )
    }
}
module.exports = {
    associateCategoriesClients:associateCategoriesClients
}