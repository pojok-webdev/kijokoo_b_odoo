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
i.app.get('/getpartners',(req,res)=>{
  i.partner.gets({session_id:req.cookies.session_id,search:""},result=>{
    console.log('RESULT of getpartners',result)
    res.send({data:JSON.parse(result).result.map(obj=>{
      return [
        obj.id,
        obj.company_id,
        obj.display_name,
        obj.company_name,
        obj.contact_address
      ]
    })})
  })
})
i.app.get('/partnerbylocation',(req,res)=>{
  i.location.partnerbylocationwithlimit({session_id:req.cookies.session_id,search:""},locations=>{
    res.send({data:JSON.parse(locations).result.map(obj=>{
      return [
        obj.id,
        obj.display_name,
        obj.partner_id.id,
        obj.partner_id.name
      ]
    })})
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
      return [
        obj.id,
        obj.kdticket,
        obj.client_id,
        obj.clientname,
        obj.location_id,
        obj.complaint,
        obj.ticketstart,
        obj.ticketend,"",
        obj.reporter,
        obj.reporterphone,
        obj.cause_id,
        obj.cause,
        obj.causecategory_id,
        obj.causecategory,
        obj.status
      ]
    })})
  })
})
i.app.get('/getcausecategories',(req,res)=>{
  let src = []
  i.ticket.getcausecategories({},result=>{
    res.send({data:result.forEach(obj=>{
      src[obj.id] = obj.name
    })})
  })
})
i.app.get('/getcausecategorybyid/:id',(req,res)=>{
  id = req.params.id
  i.ticket.getcausecategorybyid({id:id},result=>{
    console.log(result)
    res.send({data:result})
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
i.app.get('/logout',(req,res)=>{
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
i.app.post('/savefollowup',(req,res)=>{
  params = req.body
  console.log('save followup params',params)
  i.followup.save(params,id=>{
    res.send({id:id})
  })
})
i.app.get('/doc',(req,res)=>{
  res.render('docs/index')
})
i.app.get('/getlocation/:location_id',(req,res)=>{
  params = req.params
  console.log('PARAms GoT',params)
  i.location.getbyid({session_id:req.cookies.session_id,id:params.location_id},result=>{
    res.send(result)
  })
})
i.app.post('/saveticketlocation',(req,res)=>{
  params = req.body
  console.log('Paras',params)
  i.ticketlocation.save(params,result=>{
    console.log('success save ticket location',result)
    res.send(result)
  })
})
i.app.get('/testselect',(req,res)=>{
  res.render('testselect/index')
})
i.app.post('/closeticket',(req,res)=>{
  params = req.body
  i.ticket.closeTicket(params,result=>{
    res.send({res:result})    
  })
})
i.app.post('/setbelumok',(req,res)=>{
  params = req.body
  res.send({res:i.ticket.setbelumok(params,result=>{})})
})
i.app.get('/testobj',(req,res)=>{
  let myobj = {
    satu:'setong',dua:'duwek',tiga:'tigo'
  }
  properties = Object.keys(myobj).forEach(x=>{
    console.log(x)
  })
  keys = Object.keys(myobj).join()
  console.log('KEYS',keys)
  vals = Object.values(myobj).join()
  console.log('VALS',vals)
})
i.app.get('/getbackbones/:params',(req,res)=>{
  params = req.params.params
  i.backbone.gets({search:params},result=>{
    console.log('Result',result)
    res.send({results:result.map(obj=>{
      return {"id":obj.id,"text":obj.name}
    })
    })
  })
})
i.app.get('/getbtses/:params',(req,res)=>{
  params = req.params.params
  i.bts.gets({search:params},result=>{
    console.log('Result',result)
    res.send({results:result.map(obj=>{
      return {"id":obj.id,"text":obj.name}
    })
    })
  })
})
i.app.get('/getdatacenters/:params',(req,res)=>{
  params = req.params.params
  i.datacenters.gets({search:params},result=>{
    console.log('Result',result)
    res.send({results:result.map(obj=>{
      return {"id":obj.id,"text":obj.name}
    })
    })
  })
})
i.app.get('/getptps/:params',(req,res)=>{
  params = req.params.params
  i.ptp.gets({search:params},result=>{
    console.log('Result',result)
    res.send({results:result.map(obj=>{
      return {"id":obj.id,"text":obj.name}
    })
    })
  })
})
i.app.get('/getcores/:params',(req,res)=>{
  params = req.params.params
  i.cores.gets({search:params},result=>{
    console.log('Result',result)
    res.send({results:result.map(obj=>{
      return {"id":obj.id,"text":obj.name}
    })
    })
  })
})
i.app.get('/getaps/:params',(req,res)=>{
  params = req.params.params
  i.aps.gets({search:params},result=>{
    console.log('Result',result)
    res.send({results:result.map(obj=>{
      return {"id":obj.id,"text":obj.name}
    })
    })
  })
})
i.app.post('/saveselectedlocation',(req,res)=>{
  params = req.body
  console.log('Params got',params)
  //res.send(params)
  i.ticket.insertChildren(params,result=>{
    console.log('REZZ',result)
    res.send(result)
  })
})
i.app.post('/saveparent',(req,res)=>{
  params = req.body
  i.ticket.insertParent(params,result=>{})
})
i.app.post('/savegamas',(req,res)=>{
  params = req.body
  i.ticket.insertParent(params,result=>{
    res.send(result)
  })

})
i.app.get('/getfus/:id',(req,res)=>{
  params = req.params
  i.followup.gets(params,result=>{
    console.log('ReS',res)
    res.send({data:result.map(obj=>{
      return [obj.id,obj.description,obj.conclusion,obj.createdate] 
    })})
  })
})
i.app.listen(i.setting.port,_=>{
    console.log('Padi4Odoo API Server start at port ',i.setting.port)
})