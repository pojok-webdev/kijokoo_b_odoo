const hsm = require('./assets/app/sending/hsm')
var i = require('./js/appInit')
i.app.post('/sendmessages',(req,res)=>{
  i.ctrl.sendMessages(req.body)
})
i.app.get('/main',(req,res)=>{
  res.redirect('/categories')
})
i.app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Manual'
  })
})
i.app.get('/categories',(req,res)=>{
  console.log('SessioN',req.session)
  i.auth.checkLogin({
    req:req,res:res,redirpath:'categories/table',title:'Kategori',pagename:'kategori'
  })
})
i.app.get('/getcategory/:id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.messagecategories',
      cols:['id','name','description'],
      conditions:[{key:'id',val:params.id}]
    })
  ,result=>{
    res.send(result)
  })
})
i.app.get('/datacategories',(req,res)=>{
  i.con.doQuery(
    'select id,name,description,count(b.client_id)cnt from qiscus.messagecategories a '
    +'left outer join qiscus.categories_clients b on b.category_id=a.id '
    +'group by id,name,description',result=>{
      console.log('datacategories',result)
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name,obj.description,obj.cnt]
      })})
    }
  )
})
i.app.post('/updatecategory',(req,res)=>{
  params = req.body
  console.log('X',i.crud.update({
    tableName:'qiscus.messagecategories',
    cols:[{key:'name',val:params.name},{key:'description',val:params.description}],
    conditions:[{key:'id',val:params.id}]
  }))
  i.con.doQuery(
    i.crud.update({
      tableName:'qiscus.messagecategories',
      cols:[{key:'name',val:params.name},{key:'description',val:params.description}],
      conditions:[{key:'id',val:params.id}]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,
        subject:'Update Kategori '+params.id+' '+params.name,
        description:'Update Kategori ('+params.id+') '+params.prevName+'->'+params.name+','+params.prevDesc+'->'+params.description,
        i:i
      },logresult=>{
        console.log('logresult',logresult)
        res.send(result)
      })
    }
  )
})
i.app.get('/removecategory/:id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.remove({
      tableName:'qiscus.messagecategories',
      conditions:[{key:'id',val:params.id}]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,subject:'Remove Category '+params.id,description:'Remove Category '+params.id,i:i
      },
        logresult=>{
          console.log('logresult',logresult)
          res.send(result)
        })
    }
  )
})
i.app.post('/savecategory',(req,res)=>{
  params = req.body
  i.con.doQuery(
    i.crud.create({
      tableName:'qiscus.messagecategories',
      cols:[{key:'name',val:params.name},{key:'description',val:params.description}]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,
        subject:'Save Category '+params.name,
        description:'Save Category '+params.name,i:i
      },logresult=>{
        console.log('logresult',logresult)
        res.send(result)
      })
    }
  )
})
i.app.get('/clients',(req,res)=>{
  i.auth.checkLogin({
    req:req,res:res,redirpath:'clients/table',title:'Pelanggan',pagename:'Pelanggan'
  })
})
i.app.get('/dataclients',(req,res)=>{
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.clients',
      cols:['id','name','location_id','address','picname','picwa','description','kdfb'],
      conditions:[{key:'1',val:'1'}]
    }),result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name,obj.location_id,obj.address,obj.picname,obj.picwa,obj.description,obj.kdfb]
      })})
    }
  )
})
i.app.get('/dataclientsbycategory/:category_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select distinct b.id,b.name,b.address,b.picname,b.picwa,b.description,b.kdfb from qiscus.categories_clients a '
    +'left outer join qiscus.clients b on b.id=a.client_id '
    +'where a.category_id = '+params.category_id
    ,result=>{
      console.log('ResulT',result)
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name,obj.description]
      })})
    }
  )
})
i.app.post('/saveclient',(req,res)=>{
  params = req.body
  i.con.doQuery(
    i.crud.create({
      tableName:'qiscus.clients',
      cols:[
        {key:'name',val:params.name},
        {key:'location_id',val:params.location_id},
        {key:'address',val:params.address},
        {key:'picname',val:params.picname},
        {key:'picwa',val:params.picwa},
        {key:'email',val:params.picemail},
        {key:'description',val:params.description},
        {key:'kdfb',val:params.kdfb},
      ]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,
        subject:'Save Client '+params.name,
        description:'Save Client '+params.name,i:i
      },logresult=>{
        console.log('logresult',logresult)
        res.send(result)
      })
    }
  )
})
i.app.get('/getclient/:id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.clients',
      cols:['id','name','location_id','address','description','picname','picwa','kdfb','email'],
      conditions:[{key:'id',val:params.id}]
    }),
    result=>{
      res.send(result)
    }
  )
})
i.app.get('/getclientsbycategory/:category_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select c.* from qiscus.messagecategories a '
    +'left outer join qiscus.categories_clients b '
    +'left outer join qiscus.clients c on c.id=b.client_id '
    +'on b.category_id=a.id '
    +'where a.id='+params.category_id,
    result=>{
      res.send(result)
    }
  )
})
i.app.post('/updateclient',(req,res)=>{
  params = req.body

  console.log(i.crud.update({
    'tableName':'qiscus.clients',
    cols:[
      {key:'name',val:params.name},
      {key:'location_id',val:params.location_id},
      {key:'address',val:params.address},
      {key:'description',val:params.description},
      {key:'picname',val:params.picname},
      {key:'picwa',val:params.picwa},
      {key:'email',val:params.picemail},
      {key:'kdfb',val:params.kdfb}
    ],
    conditions:[{key:'id',val:params.id}]
  }))
  i.con.doQuery(
    i.crud.update({
      'tableName':'qiscus.clients',
      cols:[
        {key:'name',val:params.name},
        {key:'location_id',val:params.location_id},
        {key:'address',val:params.address},
        {key:'description',val:params.description},
        {key:'picname',val:params.picname},
        {key:'picwa',val:params.picwa},
        {key:'email',val:params.picemail},
        {key:'kdfb',val:params.kdfb}
      ],
      conditions:[{key:'id',val:params.id}]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,
        subject:'Update Pelanggan ('+params.id+'):'+params.prevName+'->'+params.name+'',
        description:'Update Pelanggan ('+params.id+'):'
        +params.prevLocationID+'->'+params.location_id+','
        +params.prevName+'->'+params.name+','
        +params.prevDesc+'->'+params.description+','
        +params.prevPicname+'->'+params.picname+','+params.prevAddress+'->'+params.address+''
        +params.prevPicwa+'->'+params.picwa+','+params.prevKdfb+'->'+params.kdfb+' ',
        i:i
      },logresult=>{
        console.log('Logresult',logresult)
        res.send(result)
      })
    }
  )
})
i.app.get('/removeclient/:id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.remove({
      tableName:'qiscus.clients',
      conditions:[{key:'id',val:params.id}]
    }),
    result=>{
      i.master.getClientById({client_id:params.id},client=>{
        i.logging.writeLog({
          createuser:req.session.username,
          subject:'Remove client '+params.id,
          description:'Remove client '+client.name,i:i
        },logresult=>{
          console.log('Logresult',logresult)
          res.send(result)
        })
      })
    }
  )
})
i.app.get('/select2categoryproviders',(req,res)=>{
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.messagecategories',
      cols:['id','name','description'],
      conditions:[{key:'1',val:'1'}]
    }),
    result=>{
      res.send({results:result.map(obj=>{
        return {id:obj.id,text:obj.name}
      })})
    }
  )
})
i.app.get('/select2categoryprovider/:name',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.getslike({
      tableName:'qiscus.messagecategories',
      cols:['id','name','description'],
      conditions:[{key:'name',val:params.name}]
    }),
    result=>{
      res.send({results:result.map(obj=>{
        return {id:obj.id,text:obj.name}
      })})
    }
  )
})
i.app.get('/disassociatecategoryclient/:category_id/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.remove({
      tableName:'qiscus.categories_clients',
      conditions:[
        {key:'category_id',val:params.category_id},
        {key:'client_id',val:params.client_id}
      ]
    }),
    result=>{

      i.master.getClientById({id:params.client_id,i:i},client=>{
        i.master.getCategoryById({id:params.category_id,i:i},category=>{
          i.logging.writeLog({
            createuser:req.session.username,
            subject:'Disassociatecategoryclient, category_id '
            +params.category_id
            +', client_id:'+params.client_id,
            description:''
            + 'Pelanggan : ' + client.name
            + ', '
            + 'Kategori : '+ category.name,
            i:i
          },logresult=>{
            console.log('Logresult',logresult)
            res.send(result)
          })
    
        })
      })
    }
  )
})
i.app.get('/associatecategoryclient/:category_id/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.create({
      tableName:'qiscus.categories_clients',
      cols:[
        {key:'category_id',val:params.category_id},
        {key:'client_id',val:params.client_id}
      ]
    }),
    result=>{
      i.master.getClientById({id:params.client_id,i:i},client=>{
        i.master.getCategoryById({id:params.category_id,i:i},category=>{
          i.logging.writeLog({
            createuser:req.session.username,subject:'Associate category_id:'+params.category_id+', client_id : '+params.client_id,
            description:'Kategori : '+category.name+', Pelanggan : '+ client.name,
            i:i
          },logresult=>{
            console.log('Log Result',logresult)
            res.send(result)
          })    
    
        })
      })

    }
  )
})
i.app.get('/getcategories',(req,res)=>{
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.messagecategories',
      cols:['id','name'],
      conditions:[{key:'1',val:'1'}]
    }),
    result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name]
      })})
    }
  )
})
i.app.get('/getavailabelcategories/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select a.id,a.name from qiscus.messagecategories a where id not in '
    +'('
    +' select b.category_id from qiscus.categories_clients b '
    +' left outer join clients c on c.id=b.client_id '
    +' where c.id='+params.client_id
    +');'
    ,
    result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name]
      })})
    }
  )
})
i.app.get('/getavailabelclients/:category_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select a.id,a.name from qiscus.clients a where id not in '
    +'('
    +' select b.client_id from qiscus.categories_clients b '
    +' left outer join qiscus.messagecategories c on c.id=b.category_id '
    +' where c.id='+params.category_id
    +')',
    result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name]
      })})
    }
  )
})
i.app.get('/getcategoriesbyclient/:client_id',(req,res)=>{
  params = req.params
  console.log('select a.id,a.name,case when b.client_id is not null then true else false end selected from qiscus.messagecategories a '
  +'left outer join qiscus.categories_clients b on b.category_id=a.id '
  +'where client_id = ' + params.client_id)
  i.con.doQuery(
    'select a.id,a.name,case when b.client_id is not null then true else false end selected from qiscus.messagecategories a '
    +'left outer join qiscus.categories_clients b on b.category_id=a.id '
    +'where client_id = ' + params.client_id,
    result=>{
      console.log('qresult',result)
      res.send({results:result.map(obj=>{
        return {id:obj.category_id,text:obj.name,selected:true}
      })})
    }
  )
})
i.app.get('/datacategoriesbyclient/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select b.id,b.name,b.description from qiscus.categories_clients a '
    +'left outer join qiscus.messagecategories b '
    +'on b.id=a.category_id '
    +'where client_id='+params.client_id,result=>{
      console.log(result)
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name,obj.description]
      })})
    }
  )
})
i.app.get('/sending',(req,res)=>{
  i.auth.checkLogin({
    req:req,res:res,redirpath:'sending/main',title:'Pengiriman WA',message:i.messages.notifikasiGangguan({
      startproblem:'02 Juli 2022',
      segmentasi:'',
      impact:'',namapelanggan:'',lokasi:''
    }),pagename:'Pengiriman pesan'
  })
})
i.app.get('/previewwa/:category/:template',(req,res)=>{
  console.log(i.messages.notifikasiGangguan({
    startproblem:'02 Juli 2022',
    segmentasi:'',
    impact:'',namapelanggan:'',lokasi:''
  })
  )
  message = i.messages.notifikasiGangguan({
    startproblem:'02 Juli 2022',
    segmentasi:'',
    impact:'',namapelanggan:'',lokasi:''
  })
  res.render('sending/previewwa',{
    title:'Preview',message:message
  })
})
i.app.get('/auth',(req,res)=>{
  res.render('login',{
    title:'Otentikasi'
  })
})
i.app.get('/showsession',(req,res)=>{
  res.send({session:req.session})
})
i.app.post('/doauth',(req,res)=>{
  params = req.body
  i.auth.doLogin({
    i:i,params:params,res:res,req,req,redirpath:'/categories'
  },result=>{
    if(result.authenticated){
      i.logging.writeLog({
        createuser:result.username,subject:'Login '+result.email,description:'Login '+result.email,i:i
      },logresult=>{
        res.redirect('/categories')
      })
    }else{
      res.redirect('/auth')
    }
  })
})
i.app.post('/commonsave',(req,res)=>{
  params = req.body
  console.log("commonsave params",params)
  i.con.doQuery(
    i.crud.create({
      tableName:params.tableName,
      cols:params.cols
    }),
    result=>{
      res.send(result)
    }
  )
})
i.app.post('/writelog',(req,res)=>{
  params = req.body
  i.logging.writeLog({
    createuser:params.createuser,subject:params.subject,description:params.description,i:i
  },result=>{})
})
i.app.get('/readlogs',(req,res)=>{
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.logging',
      cols:['id','createuser','subject','description','createdate'],
      conditions:[
        {key:'1',val:'1'}
      ],
      orderby:[{key:'createdate',order:'desc'}]
    }),
    result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.createuser,obj.subject,obj.description,obj.createdate]
      })})
    }
  )
})
i.app.get('/viewlog',(req,res)=>{
  i.auth.checkLogin({
    req:req,res:res,redirpath:'viewlog',title:'Lihat Log',pagename:'Lihat Log'
  })
})
i.app.get('/logout',(req,res)=>{
  i.logging.logout({username:req.session.username,email:req.session.email,req:req},user=>{
    i.logging.writeLog({
      createuser:user.username,subject:'logout',description:'logout',i:i
    },result=>{
      console.log("Log written",result)
      res.redirect('/main')
    })
  })
})
i.app.post('/sendmail',(req,res)=>{
  params = req.body
  console.log("PARAMS CC",params.cc)
  transporter = i.mailer.createTransport(i.mail.mailAuth
)
transporter.sendMail({
  from:'puji@padi.net.id',
  to:params.email,
  cc:params.cc,
  subject:params.subject,
  html:params.text
},(err,result)=>{
  if(err){
    console.log("Err send mail",err)
    res.send({status:"error"})
  }else{
    console.log("Success send mail",result)
    res.send({status:"success"})
  }
})
})
i.app.post("/savecc",(req,res)=>{
  params = req.body
  i.con.doQuery(i.crud.create({
    tableName:'qiscus.ccs',
    cols:[{key:'client_id',val:params.client_id},{key:'email',val:params.email}]
  }),result=>{
    res.send(result)
  })
})
i.app.get('/getccs/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(i.crud.gets({
    tableName:'qiscus.ccs',
    cols:["id","client_id","email"],
    conditions:[{key:"client_id",val:params.client_id}]
  }),result=>{
    res.send(result)
  })
})
i.app.get('/sendhttp',(req,res)=>{
  var options = {
    host: 'https://multichannel.qiscus.com/whatsapp/v1/idmsw-g4y2wgpk6uv4vql/2687/messages',
    method: 'POST'
  };  
  i.http.request(options,res=>{
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });  })
})
i.app.get('/docs',(req,res)=>{
  res.render('docs',{
    title:'Dokumentasi'
  })
})
i.app.get('/curl',(req,res)=>{
  const querystring = require('querystring');
  const { Curl } = require('node-libcurl');

  const curl = new Curl();
  const close = curl.close.bind(curl);

  curl.setOpt( Curl.option.URL, 'https://multichannel.qiscus.com/whatsapp/v1/idmsw-g4y2wgpk6uv4vql/2687/messages' );
//  curl.setOpt( 'FOLLOWLOCATION', true );
  curl.setOpt(Curl.option.POST, true)
  let headers = {
    "Qiscus-Secret-Key": "58a8ac62fac448d33ab6978e16b372dd",
    "Qiscus-App-Id": "idmsw-g4y2wgpk6uv4vql",
    "Content-Type":"application/json"
  }
  curl.setOpt(Curl.option.POSTFIELDS,'{"to": "08813272107",'
  +'"type": "template",'
  +'"template": {'
    +'  "name": "notifikasi_maintenance_rev2",'
    +'"language": {'
      +'    "policy": "deterministic",'
      +'  "code": "id"'
      +'},'
      +'"components": ['
        +'  {'
          +'     "type":"header",'
          +'  "parameters":['
            +'      {'
              +'        "type":"text",'
              +'      "text":"01"'
              +'  }'
              +']'
              +'},'
              +'{'
                +'"type": "body",'
                +'"parameters": ['
                  +'{'
                    +'  "type": "text",'
                    +'"text": "Ticket 001"'
                    +'},'
                    +'{'
                      +'"type": "text",'
                      +'"text": "Ticket 002"'
                      +'},'
                      +'{'
                        +'"type": "text",'
                        +'"text": "Ticket 003"'
                        +'},'
                        +'{'
                          +'"type": "text",'
                          +'"text": "Ticket 004"'
                          +'},'
                          +'{'
                            +'"type": "text",'
                            +'"text": "Ticket 005"'
                            +'},'
                            +'{'
                              +'"type": "text",'
                              +'"text": "Ticket 006"'
                              +'},'
                              +'{'
                                +'"type": "text",'
                                +'"text": "Ticket 007"'
                                +'}'
                                +']'
                                +'}'
                                +']'
                                +'}}');
                                curl.on('end', close);
curl.on('error', close);
  //body = {}
  //curl.on( 'end', function( statusCode, body, headers ) {

    //console.info( statusCode );
    console.info( '---' );
    //console.info( body.length );
    console.info( '---' );
    console.info( headers );
    console.info( '---' );
    //console.info( this.getInfo( Curl.info.TOTAL_TIME ) );

    //this.close();
});
i.app.post('/axios',(req,res)=>{
  params = req.body
  var axios = require('axios');
  var data = JSON.stringify({
  "to": params.picwa,
  "type": "template",
  "template": {
    "name": "notifikasi_maintenance_rev2",
    "language": {
      "policy": "deterministic",
      "code": "id"
    },
    "components": [
      {
        "type": "header",
        "parameters": [
          {
            "type": "text",
            "text": params.header
          }
        ]
      },
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": params.par1
          },
          {
            "type": "text",
            "text": params.par2
          },
          {
            "type": "text",
            "text": params.par3
          },
          {
            "type": "text",
            "text": params.par4
          },
          {
            "type": "text",
            "text": params.par5
          },
          {
            "type": "text",
            "text": params.par6
          },
          {
            "type": "text",
            "text": params.par7
          }
        ]
      }
    ]
  }
});

var config = {
  method: 'post',
  url: 'https://multichannel.qiscus.com/whatsapp/v1/idmsw-g4y2wgpk6uv4vql/2687/messages',
  headers: { 
    'Qiscus-Secret-Key': '58a8ac62fac448d33ab6978e16b372dd', 
    'Qiscus-App-Id': 'idmsw-g4y2wgpk6uv4vql', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

})
//})
i.app.post('/notifikasi_maintenance_rev2',(req,res)=>{
  params = req.body
  var axios = require('axios');
  var data = JSON.stringify({
  "to": params.picwa,
  "type": "template",
  "template": {
    "name": "notifikasi_maintenance_rev2",
    "language": {
      "policy": "deterministic",
      "code": "id"
    },
    "components": [
      {
        "type": "header",
        "parameters": [
          {
            "type": "text",
            "text": params.header
          }
        ]
      },
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": params.par1
          },
          {
            "type": "text",
            "text": params.par2
          },
          {
            "type": "text",
            "text": params.par3
          },
          {
            "type": "text",
            "text": params.par4
          },
          {
            "type": "text",
            "text": params.par5
          },
          {
            "type": "text",
            "text": params.par6
          },
          {
            "type": "text",
            "text": params.par7
          }
        ]
      }
    ]
  }
});

var config = {
  method: 'post',
  url: 'https://multichannel.qiscus.com/whatsapp/v1/idmsw-g4y2wgpk6uv4vql/2687/messages',
  headers: { 
    'Qiscus-Secret-Key': '58a8ac62fac448d33ab6978e16b372dd', 
    'Qiscus-App-Id': 'idmsw-g4y2wgpk6uv4vql', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

})
i.app.post('/axiossend',(req,res)=>{
  params = req.body
  var axios = require('axios');
  var data = JSON.stringify({
  "to": params.picwa,
  "type": "template",
  "template": {
    "name": params.template,
    "language": {
      "policy": "deterministic",
      "code": "id"
    },
    "components":params.components
  }
});

var config = {
  method: 'post',
  url: 'https://multichannel.qiscus.com/whatsapp/v1/idmsw-g4y2wgpk6uv4vql/2687/messages',
  headers: { 
    'Qiscus-Secret-Key': '58a8ac62fac448d33ab6978e16b372dd', 
    'Qiscus-App-Id': 'idmsw-g4y2wgpk6uv4vql', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

})
i.app.post('/savebroadcastlog',(req,res)=>{

})
i.app.get('/gethsm/:term',(req,res)=>{
  params = req.params
  config = hsm.hsm()
  var axios = require('axios')
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send({results:response.data.data.hsm_templates.map(tmp=>{
      return {id:tmp.id,text:tmp.name}
    })})
  })
  .catch(function (error) {
    console.log(error);
    res.send({test:error})
  });
})
i.app.get('/gethsms',(req,res)=>{
  config = hsm.hsm()
  var axios = require('axios')
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send({results:response.data.data.hsm_templates.map(tmp=>{
      return {id:tmp.id,text:tmp.name}
    })})
  })
  .catch(function (error) {
    console.log(error);
    res.send({test:error})
  });  
})
i.app.get('/gettemplatedetail/:hsm_id',(req,res)=>{
  params = req.params
  config = hsm.template_detail(params)
  var axios = require('axios')
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send({id:response.data.data.hsm_template.hsm_details[0].id})
  })
  .catch(function (error) {
    console.log(error);
  });

})
i.app.get('/hsm',(req,res)=>{
  res.render('hsm',{
    title:'HSM',pagename:"HSM",email:req.session.email
  })
})
i.app.get('/uploadcsv/:template_detail_id',(req,res)=>{
  params = req.params
  var axios = require('axios')
  config = hsm.uploadcsv(params)
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send({results:response.data})
  })
  .catch(function (error) {
    console.log(error);
  });
})
i.app.post('/broadcast',(req,res)=>{
  params = req.body
  var axios = require('axios')
  config = hsm.broadcast(params)
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    //res.send({results:response.data})
    i.logging.writeLog({
      createuser:req.session.username,
      subject:'Broadcast ',
      description:response.data.data.broadcast_job.name,
      i:i
    },logresult=>{
      console.log('logresult',logresult)
      res.send({results:response.data})
    })

  })
  .catch(function (error) {
    console.log(error);
    res.send({error:error})
  });
})
i.app.post('/csvwriter',(req,res)=>{
  params = req.body
  csv = require('csv-writer').createObjectCsvWriter
  const writer = csv({
    path:i.setting.csvpath,//'/home/webdev/hehe.csv',
    header:params.header
  })
  const records = params.records
  writer.writeRecords(records)
  .then(_=>{
    console.log("Write records done")
    res.send({result:"success"})
  })
})
i.app.listen(i.setting.port,_=>{
    console.log('QisCus API Server start at port ',i.setting.port)
})