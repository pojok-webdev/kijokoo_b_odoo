var i = require('./js/appInit')
i.app.post('/doauth',(req,res)=>{
  params = req.body
  i.auth.doLogin({
    i:i,params:params,res:res,req,req,redirpath:'/tickets'
  },result=>{
    if(result.authenticated){
      i.logging.writeLog({
        createuser:result.username,subject:'Login '+result.email,description:'Login '+result.email,i:i
      },logresult=>{


        i.odoo.getOdooSession(session_id=>{
          res.cookie('session_id',mysubstr)
          res.redirect('/tickets')
        })
      })
    }else{
      res.redirect('/login')
    }
  })
})
i.app.get('/locations',(req,res)=>{
  res.render('locations/table',{
    title:'Location',pagename:'Location',email:'puji@padi.net.id'
  })
})
i.app.get('/locationsgrouping',(req,res)=>{
  res.render('locations/tablegrouping',{
    title:'Location',pagename:'Location',email:'puji@padi.net.id'
  })
})
i.app.get('/partners',(req,res)=>{
  i.partner.get({session_id:req.cookies.session_id,search:''},partner=>{
    res.render('partners/table',{
      title:'Partner',
      pagename:'Partner',
      email:'puji@padi.net.id',
      partners:JSON.parse(partner)
    })
  })
})
i.app.get('/datapartners',(req,res)=>{
  params = req.params
  i.partner.get({session_id:req.cookies.session_id,search:""},partners=>{
    console.log('Partners',JSON.parse(partners).result)
    res.send({data:JSON.parse(partners).result.map(obj=>{
      return [obj.id,obj.display_name,obj.contact_address,obj.name]
    })})
  })
})
i.app.get('/testlocations',(req,res)=>{
  console.log('req',req)
  i.location.get({param:"act",session_id:req.cookies.session_id},locations=>{
    console.log('Locations',locations)
    res.send(locations)
  })
})
i.app.get('/datalocations',(req,res)=>{
  params = req.params
  console.log('ParaMs',req.cookies.session_id)
  i.location.get({param:"act",session_id:req.cookies.session_id},partners=>{
    console.log('Locations',partners)
    res.send({data:JSON.parse(partners).map(obj=>{
      return [obj.id,obj.partner_id.display_name,obj.address,obj.RT,obj.RW,obj.kelurahan_id.display_name,obj.kecamatan_id.display_name,obj.kota_id.display_name,obj.state_id.display_name]
    })})
    })
})
i.app.get('/getavailabelclients',(req,res)=>{
  
})
i.app.get('/getlocations',(req,res)=>{
  params = req.body
  params.session_id = req.cookies.session_id
  params.search = ""
  console.log('Params',params)
  i.partner.get(params,loc=>{
    res.send(
      JSON.parse(loc)
    )
  })
})
i.app.get('/tickets',(req,res)=>{
  params = req.body
  res.render('tickets/index',{
    title:'Ticket',
    pagename:'Ticket',
    email:'puji@padi.net.id',
    partners:{}
  })
})
i.app.get('/datatickets',(req,res)=>{
  i.ticket.gets({},result=>{
    res.send({data:result.map(obj=>{
      return [obj.kdticket,obj.client_id,obj.clientname,obj.location_id,obj.ticketstart]
    })})
  })
})
i.app.post('/partnerselect2',(req,res)=>{
  params = req.body
  console.log('PARAMS',params)
  i.partner.get({session_id:req.cookies.session_id,search:params.search},partners=>{
    console.log('Partners',JSON.parse(partners).result)
    res.send({results:JSON.parse(partners).result.map(obj=>{
      return {id:obj.id,text:obj.display_name}
    })})
  })

})
i.app.post('/locationbypartnerselect2',(req,res)=>{
  params = req.body
  console.log('PARAMS',params)
  i.location.getbypartnerid({session_id:req.cookies.session_id,search:params},locations=>{
    console.log('locations',JSON.parse(locations).result)
    res.send({results:JSON.parse(locations).result.map(obj=>{
      return {id:obj.id,text:obj.address}
    })})
  })
})
i.app.post('/saveticket',(req,res)=>{
  params = req.body
  i.ticket.saveticket(params,id=>{
    res.send({id:id})
  })
})
i.app.get('/login',(req,res)=>{
  res.render('commons/login')
})
i.app.post('/loginhandler',(req,res)=>{
  params = req.body
  res.send(params)
})
i.app.get('/handlelogin',(req,res)=>{
    i.odoo.login({},auth=>{
        console.log('AUTH',auth)
        let myfind = auth.search('session_id')
        console.log('MyFind',myfind)
        let mystr = auth.substring(myfind,auth.length)
        console.log('my substring',mystr)
        myfind2 = mystr.search(';')
        mysubstr = mystr.substring(11,myfind2)
        console.log('FInal subString',mysubstr)
        res.cookie('session_id',mysubstr)
        res.redirect('partners')
    })
})
i.app.get('/getcookies',(req,res)=>{
    console.log('Req Cookies',req.cookies.session_id)
    res.send({'cookie':req.cookies})
})
i.app.post('/causeselect2',(req,res)=>{
  params = req.body
  i.cause.gets({search:params.search,category_id:params.category_id},result=>{
    res.send({results:result.map(obj=>{
      return {id:obj.id,text:obj.name}
    })})
  })
})
i.app.post('/causecategoryselect2',(req,res)=>{
  params = req.body
  i.cause.getcategories({search:params.search},result=>{
    res.send({results:result.map(obj=>{
      return {id:obj.id,text:obj.name}
    })})
  })
})
i.app.listen(i.setting.port,_=>{
    console.log('Padi4Odoo API Server start at port ',i.setting.port)
})