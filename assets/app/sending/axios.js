broadcastlog = (obj,callback) => {
  console.log("broadcast log",obj)
  $.ajax({
    url:'/commonsave',
    type:'post',
    dataType:'json',
    data:{
      tableName:'qiscus.broadcast_logs',
      cols:[
        {key:"name",val:obj.name},
        {key:"createuser",val:obj.email},
        {key:"template_id",val:obj.template_id},
        {key:"category_id",val:obj.category_id},
      ]
    }
  })
  .done(res=>{
    console.log("broadcast res",res)
    callback(res)
  })
  .fail(err=>{
    callback(err)
    console.log("broadcast err",err)
  })
}
broadcastdetaillog = obj => {
  $.ajax({
    url:'/commonsave',
    type:'post',
    dataType:'json',
    data:{
      tableName:'qiscus.broadcastdetail_logs',
      cols:[
        {key:"broadcast_id",val:obj.broadcast_id},
        {key:"client_id",val:obj.client_id},
        {key:"picwa",val:obj.picwa}
      ]
    }
  })
  console.log("broadcast detail log",obj)
}
axiossend_notifikasi_maintenance_rev2 = (obj,callback) => {
    $.ajax({
        url:'/notifikasi_maintenance_rev2',
        type:'post',
        dataType:'json',
        data:{
            picwa:'08813272107',
            header:obj.header,
            par1:obj.date,
            par2:obj.hour,
            par3:obj.activity,
            par4:obj.priority,
            par5:obj.impact,
            par6:obj.clientName,
            par7:obj.location
        }
    })
    .done(res=>{
      callback(res)
    })
    .fail(err=>{
      callback(err)
    })
}
axiosbc_maintenance = (obj,callback) => {
    $.ajax({
        url:'/axiossend',
        type:'post',
        dataType:'json',
        data:{
            template:'bc_maintenance',
            picwa:obj.picwa,
            components: [
                {
                  "type": "header",
                  "parameters": [
                    {
                      "type": "text",
                      "text": obj.header
                    }
                  ]
                },
                {
                  "type": "body",
                  "parameters": [
                    {
                      "type": "text",
                      "text": obj.waktu
                    },
                    {
                      "type": "text",
                      "text": obj.durasiDown
                    },
                    {
                      "type": "text",
                      "text": obj.aktivitas
                    },
                    {
                      "type": "text",
                      "text": obj.clientName
                    },
                    {
                      "type": "text",
                      "text": obj.location
                    }
                  ]
                }
              ]
        }
    })
    .done(res=>{
      callback(res)
    })
    .fail(err=>{
      callback(err)
    })
}
axiosbc_selesaimaintenance = (obj,callback) => {
    $.ajax({
        url:'/axiossend',
        type:'post',
        dataType:'json',
        data:{
            template:'bc_selesaimaintenance',
            picwa:obj.picwa,
            components: [
                {
                  "type": "header",
                  "parameters": [
                    {
                      "type": "text",
                      "text": obj.header
                    }
                  ]
                },
                {
                  "type": "body",
                  "parameters": [
                    {
                      "type": "text",
                      "text": obj.waktu
                    },
                    {
                      "type": "text",
                      "text": obj.durasiDown
                    },
                    {
                      "type": "text",
                      "text": obj.aktivitas
                    },
                    {
                      "type": "text",
                      "text": obj.clientName
                    },
                    {
                      "type": "text",
                      "text": obj.location
                    }
                  ]
                }
              ]
        }
    })
    .done(res=>{
      callback(res)
    })
    .fail(err=>{
      callback(err)
    })
}