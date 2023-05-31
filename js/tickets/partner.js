gets = (obj,callback) => {
    callback({test:'hehe'})
}
get = (obj,callback) => {
    const axios = require('axios');

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://odoo.padi.net.id/api/res.partner?query={id,company_id,display_name,company_name,contact_address}&filter=[["display_name","ilike","'+obj.search+'"]]',
    headers: { 
        'Cookie': 'session_id=481597c44dd5bd171524e3a879a52db38bb0e912'
    }
    };

    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        callback(JSON.stringify(response.data))
    })
    .catch((error) => {
    console.log(error);
    });

}
get2 = (obj,callback) => {
    const axios = require('axios');

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    //url: 'https://odoo.padi.net.id/api/res.partner?query={id,company_id,display_name,company_name,contact_address}&filter=[["id",">",10000]]',
    url: 'https://odoo.padi.net.id/api/res.partner?query={id,company_id,display_name,company_name,contact_address}',
    headers: { 
        'Cookie': 'session_id=481597c44dd5bd171524e3a879a52db38bb0e912'
    }
    };

    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        callback(JSON.stringify(response.data))
    })
    .catch((error) => {
    console.log(error);
    });

}
module.exports = {
    get:get
}