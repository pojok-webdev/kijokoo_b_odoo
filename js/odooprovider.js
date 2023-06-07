const kecamatan = require('./kecamatan');
const kota = require('./kota')
const kelurahan = require('./kelurahan')
var setting = require('./appSetting')
gets = (obj,callback) => {
    var axios = require('axios');
    console.log("session got",obj.session_id)
    var config = {
    method: 'get',
    url: setting.server.url+'/api/sale.subscription/?query={id,name,display_name,site_location_id}',
    headers: { 
        'Cookie': 'session_id='+obj.session_id
    }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        //callback(JSON.stringify(response.data))
        callback(response.data)
    })
    .catch(function (error) {
        console.log(error);
        callback(error)
    });

}
login = (obj,callback) => {
    var axios = require('axios');    
    var data = JSON.stringify({
    "params": {
        "login": setting.server.login,
        "password": setting.server.password,
        "db": setting.server.db
    }
    });

    var config = {
    method: 'post',
    url: setting.server.url + '/auth',
    headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'padi internet'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.headers));
        callback(JSON.stringify(response.headers))
    })
    .catch(function (error) {
        console.log(error);
        callback(error)
    });

}
getkota = (obj,callback) => {
    var axios = require('axios');

    var config = {
    method: 'get',
    url: setting.server.url+'/api/vit.kota?'
        +'query={id,display_name,name,state_id}'
        +'&filter=[["state_id","=",'+obj.state_id+']]',
    headers: { 
        'Cookie': 'session_id='+obj.session_id
    }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        callback(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });

}
getkecamatan = (obj,callback) => {
    var axios = require('axios');

    var config = {
    method: 'get',
    url: setting.server.url+'/api/vit.kecamatan?'
        +'query={id,display_name,name,kota_id}'
        +'&filter=[["kota_id","=",'+obj.kota_id+']]',
    headers: { 
        'Cookie': 'session_id='+obj.session_id
    }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        callback(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });

}
getkelurahan = (obj,callback) => {
    var axios = require('axios');

    var config = {
    method: 'get',
    url: setting.server.url+'/api/vit.kelurahan?'
        +'filter=[["kecamatan_id.id","=","'+obj.kecamatan_id+'"]]'
        +'&query={id,display_name,name,kecamatan_id}',
    headers: { 
        'Cookie': 'session_id='+obj.session_id
    }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        callback(response.data)
    })
    .catch(function (error) {
    console.log(error);
    });

}
getOdooSession = callback => {
    login({},auth=>{
        console.log('AUTH',auth)
        let myfind = auth.search('session_id')
        console.log('MyFind',myfind)
        let mystr = auth.substring(myfind,auth.length)
        console.log('my substring',mystr)
        myfind2 = mystr.search(';')
        mysubstr = mystr.substring(11,myfind2)
        console.log('FInal subString',mysubstr)
        callback(mysubstr)
        //res.cookie('session_id',mysubstr)
        //res.redirect('tickets')
    })

}
module.exports = {
    login:login,gets:gets,kecamatan:getkecamatan,kota:getkota,kelurahan:getkelurahan,getOdooSession:getOdooSession
}