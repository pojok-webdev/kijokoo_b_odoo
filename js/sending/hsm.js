getHsm = _=>{var form = new FormData();
var settings = {
  "url": "https://multichannel.qiscus.com/api/v2/admin/hsm?page=1&limit=10&approved=true",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Qiscus-Secret-Key": "58a8ac62fac448d33ab6978e16b372dd",
    "Qiscus-App-Id": "idmsw-g4y2wgpk6uv4vql",
    "Content-Type": "application/json"
  },
  "processData": false,
  "mimeType": "multipart/form-data",
  "contentType": false,
  "data": form,
  dataType:'json'
};

$.ajax(settings).done(res=> {
    templates =res.data.hsm_templates
  console.log(res.data.hsm_templates);
  console.log(templates.map(template=>{
      return {"id":template.id,"name":template.name}
  }))
})
.fail(err=>{
    console.log("Err hsm",err)
});
}
getTemplate = _=>{
  var form = new FormData();
var settings = {
  "url": "https://multichannel.qiscus.com/api/v2/admin/hsm/show/28095",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Qiscus-Secret-Key": "58a8ac62fac448d33ab6978e16b372dd",
    "Qiscus-App-Id": "idmsw-g4y2wgpk6uv4vql",
    "Content-Type": "application/json"
  },
  "processData": false,
  "mimeType": "multipart/form-data",
  "contentType": false,
  "data": form
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
}