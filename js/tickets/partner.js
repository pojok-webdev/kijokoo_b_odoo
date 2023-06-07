var setting = require('./../appSetting')
gets = (obj,callback) => {
    callback({test:'hehe'})
}
get = (obj,callback) => {
    const axios = require('axios');
    console.log('OBJ get partner',obj)
    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: setting.server.url+'/api/res.partner?query={id,company_id,display_name,company_name,contact_address}&filter=[["display_name","ilike","'+obj.search+'"]]',
    headers: { 
        'Cookie': 'session_id='+obj.session_id+''
    }
    };

    axios.request(config)
    .then((response) => {
        console.log("SUKSES GOT PARTNERS",JSON.stringify(response.data));
        callback(JSON.stringify(response.data))
    })
    .catch((error) => {
    console.log("FAILED GOT PARTNERS",error);
    });

}
get2 = (obj,callback) => {
    const axios = require('axios');

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    //url: 'https://odoo.padi.net.id/api/res.partner?query={id,company_id,display_name,company_name,contact_address}&filter=[["id",">",10000]]',
    url: setting.server.url+'/api/res.partner?query={id,company_id,display_name,company_name,contact_address}',
    headers: { 
        'Cookie': 'session_id='+obj.session_id+''
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