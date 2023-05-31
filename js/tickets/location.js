get3 = callback => {

    const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://odoo.padi.net.id/api/site.location?query={id,partner_id{name,display_name},state_id{display_name},kelurahan_id{display_name},kecamatan_id{display_name},kota_id{display_name}}&filter=[["kecamatan_id","=",3878],["partner_id"],"!=",false]',
  headers: { 
    'Cookie': 'session_id=b41d43ccc4d40ac32a20af6ab9045fa3530c77b9'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data.result));
  callback(JSON.stringify(response.data.result))
})
.catch((error) => {
  console.log(error);
});

}
get2 = (params,callback) => {
  const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://odoo.padi.net.id/api/site.location?query={id,partner_id{id,name,display_name},state_id{display_name},kelurahan_id{display_name},kecamatan_id{display_name},kota_id{display_name}}&filter=[["kecamatan_id","=",3878],["partner_id","!=",false]]',
  headers: { 
    'Cookie': 'session_id=b41d43ccc4d40ac32a20af6ab9045fa3530c77b9'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data.result));
  callback(JSON.stringify(response.data.result))
})
.catch((error) => {
  console.log(error);
});

}

get = (params,callback) => {
  const axios = require('axios');
  console.log(callback)
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://odoo.padi.net.id/api/site.location?query={id,partner_id{id,name,display_name},state_id{display_name},kelurahan_id{display_name},kecamatan_id{display_name},kota_id{display_name}}&filter=[["partner_id","!=",false]]',
    headers: { 
      'Cookie': 'session_id=481597c44dd5bd171524e3a879a52db38bb0e912'
    }
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data.result));
    callback(JSON.stringify(response.data.result))
  })
  .catch((error) => {
    console.log(error);
  });

}
getbypartneridx = (params,callback) => {
  const axios = require('axios');
  console.log(callback)
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://odoo.padi.net.id/api/site.location?query={id,partner_id{id,name,display_name},state_id{display_name},kelurahan_id{display_name},kecamatan_id{display_name},kota_id{display_name},address}&filter=[["partner_id","=",params.search]]',
    headers: { 
      'Cookie': 'session_id=481597c44dd5bd171524e3a879a52db38bb0e912'
    }
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data.result));
    //callback(JSON.stringify(response.data.result))
    callback(JSON.stringify(response.data))
  })
  .catch((error) => {
    console.log(error);
  });

}
getbypartnerid = (params,callback) => {
  const axios = require('axios');
console.log('PARAMS SEARCH',params.search)
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://odoo.padi.net.id/api/site.location?query={id,partner_id{id,name,display_name},state_id,kelurahan_id,kecamatan_id,kota_id{display_name},address}&filter=[["partner_id","=",'+params.search.partner_id+']]',
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
    get:get,getbypartnerid:getbypartnerid
}
