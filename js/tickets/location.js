var setting = require('./../appSetting')
get3 = callback => {

    const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: setting.server.url+'/api/site.location?query={id,partner_id{name,display_name},state_id{display_name},kelurahan_id{display_name},kecamatan_id{display_name},kota_id{display_name}}&filter=[["kecamatan_id","=",3878],["partner_id"],"!=",false]',
  headers: { 
    'Cookie': 'session_id='+obj.session_id+''
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
get2 = (obj,callback) => {
  const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: setting.server.url+'/api/site.location?query={id,partner_id{id,name,display_name},state_id{display_name},kelurahan_id{display_name},kecamatan_id{display_name},kota_id{display_name}}&filter=[["kecamatan_id","=",3878],["partner_id","!=",false]]',
  headers: { 
    'Cookie': 'session_id='+obj.session_id+''
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

get = (obj,callback) => {
  const axios = require('axios');
  console.log('OBJ : ',obj)
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: setting.server.url+'/api/site.location?'
    +'query={id,partner_id{id,name,display_name},address,RT,RW,state_id{display_name},kelurahan_id{display_name},kecamatan_id{display_name},kota_id{display_name}}'
    +'&filter=[["partner_id","!=",false]]',
    headers: { 
      'Cookie': 'session_id='+obj.session_id+''
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
getbypartneridx = (obj,callback) => {
  const axios = require('axios');
  console.log(callback)
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: setting.server.url+'/api/site.location?'
    +'query={id,partner_id{id,name,display_name},state_id{display_name},kelurahan_id{display_name},kecamatan_id{display_name},kota_id{display_name},address}'
    +'&filter=[["partner_id","=",obj.search]]',
    headers: { 
      'Cookie': 'session_id='+obj.session_id+''
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
getbypartnerid = (obj,callback) => {
  const axios = require('axios');
console.log('obj SEARCH',obj.search)
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: setting.server.url+'/api/site.location?query={id,partner_id{id,name,display_name},state_id,kelurahan_id,kecamatan_id,kota_id{display_name},address}&filter=[["partner_id","=",'+obj.search.partner_id+'],["address","ilike","'+obj.search.search+'"]]',
    headers: { 
      'Cookie': 'session_id='+obj.session_id+''
    }
  };

  axios.request(config)
  .then((response) => {
    console.log('Lokasi By Partner ID:',JSON.stringify(response.data));
    callback(JSON.stringify(response.data))
  })
  .catch((error) => {
    console.log(error);
  });

}
module.exports = {
    get:get,getbypartnerid:getbypartnerid
}
