setting = require('../../../js/appSetting')
hsm_ = obj => {
  var axios = require('axios');
  var FormData = require('form-data');
  var data = new FormData();

  var config = {
    method: 'get',
    url: 'https://multichannel.qiscus.com/api/v2/admin/hsm?page=1&limit=10&approved=true',
    headers: { 
      'Qiscus-Secret-Key': '58a8ac62fac448d33ab6978e16b372dd', 
      'Qiscus-App-Id': 'idmsw-g4y2wgpk6uv4vql', 
      'Content-Type': 'application/json', 
      ...data.getHeaders()
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return response.data
  })
  .catch(function (error) {
    console.log(error);
    return error
  });
}
hsm = obj => {
  var axios = require('axios');
  var FormData = require('form-data');
  var data = new FormData();

  return config = {
    method: 'get',
    url: 'https://multichannel.qiscus.com/api/v2/admin/hsm?page=1&limit=10&approved=true',
    headers: { 
      'Qiscus-Secret-Key': '58a8ac62fac448d33ab6978e16b372dd', 
      'Qiscus-App-Id': 'idmsw-g4y2wgpk6uv4vql', 
      'Content-Type': 'application/json', 
      ...data.getHeaders()
    },
    data : data
  };
}
template_detail = obj => {
  var axios = require('axios');
  var FormData = require('form-data');
  var data = new FormData();

  return config = {
    method: 'get',
    url: 'https://multichannel.qiscus.com/api/v2/admin/hsm/show/'+obj.hsm_id, //28095
    headers: { 
      'Qiscus-Secret-Key': '58a8ac62fac448d33ab6978e16b372dd', 
      'Qiscus-App-Id': 'idmsw-g4y2wgpk6uv4vql', 
      'Content-Type': 'application/json', 
      ...data.getHeaders()
    },
    data : data
  };
}
uploadcsv = obj =>{
  var axios = require('axios');
  var FormData = require('form-data');
  var fs = require('fs');
  var data = new FormData();
//  data.append('file', fs.createReadStream('/home/webdev/csvqiscus.csv'));
  //data.append('file', fs.createReadStream('/home/webdev/hehe.csv'));
  data.append('file',fs.createReadStream(setting.csvpath))
  data.append('template_detail_id', obj.template_detail_id);//'30579'

return config = {
  method: 'post',
  url: 'https://multichannel.qiscus.com/api/v3/admin/broadcast/upload_csv',
  headers: { 
    'Qiscus-Secret-Key': '58a8ac62fac448d33ab6978e16b372dd', 
    'Qiscus-App-Id': 'idmsw-g4y2wgpk6uv4vql', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    ...data.getHeaders()
  },
  data : data
};
}
broadcast = obj =>{
  const d = new Date();
  d.getTime();
  var axios = require('axios');
  var FormData = require('form-data');
  var data = new FormData();
  //data.append('template_detail_id', '30579');
  //data.append('broadcast_file_id', '2323080');
  data.append('template_detail_id', obj.template_detail_id);
  data.append('broadcast_file_id', obj.broadcast_file_id);
  data.append('name', obj.email+'-'+obj.templatename+'-'+obj.categoryname+'-'+d.getFullYear()+'-'+(parseInt(d.getMonth())+1).toString()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());

  return config = {
    method: 'post',
    url: 'https://multichannel.qiscus.com/api/v3/admin/broadcast/send_broadcast',
    headers: { 
      'Qiscus-Secret-Key': '58a8ac62fac448d33ab6978e16b372dd', 
      'Qiscus-App-Id': 'idmsw-g4y2wgpk6uv4vql', 
      'Content-Type': 'application/json', 
      ...data.getHeaders()
    },
    data : data
  };

}
module.exports = {
  hsm:hsm,template_detail:template_detail,uploadcsv:uploadcsv,broadcast:broadcast
}