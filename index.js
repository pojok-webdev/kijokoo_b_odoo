const hsm = require('./assets/app/sending/hsm')
var i = require('./js/appInit')
i.app.get('/locations',(req,res)=>{
  i.location.get({param:'test'},location=>{
    res.render('locations/table',{
      title:'Partner',
      pagename:'Partner',
      email:'puji@padi.net.id',
      location:JSON.parse(location)
    })
  })
})
i.app.get('/partners',(req,res)=>{
  i.partner.get({param:'test'},partner=>{
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
  i.partner.get({},partners=>{
    console.log('Partners',JSON.parse(partners).result)
    res.send({data:JSON.parse(partners).result.map(obj=>{
      return [obj.id,obj.display_name,obj.contact_address,obj.name]
    })})
  })
})
i.app.get('/datalocations',(req,res)=>{
  params = req.params
  i.location.get({param:"act"},partners=>{
    console.log('Locations',JSON.parse(partners).result)
    res.send({data:JSON.parse(partners).result.map(obj=>{
      return [obj.id,obj.display_name,obj.contact_address,obj.name]
    })})
  })
})

i.app.get('/getlocations',(req,res)=>{
  params = req.body
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
i.app.post('/partnerselect2',(req,res)=>{
  params = req.body
  console.log('PARAMS',params)
  i.partner.get({search:params.search},partners=>{
    console.log('Partners',JSON.parse(partners).result)
    res.send({results:JSON.parse(partners).result.map(obj=>{
      //return [obj.id,obj.display_name,obj.contact_address,obj.name]
      return {id:obj.id,text:obj.display_name}
    })})
  })

})
i.app.post('/locationbypartnerselect2',(req,res)=>{
  params = req.body
  console.log('PARAMS',params)
  i.location.getbypartnerid({search:params},locations=>{
    console.log('locations',JSON.parse(locations).result)
    res.send({results:JSON.parse(locations).result.map(obj=>{
      //return [obj.id,obj.display_name,obj.contact_address,obj.name]
      return {id:obj.id,text:obj.address}
    })})
  })

})
i.app.listen(i.setting.port,_=>{
    console.log('Padi4Odoo API Server start at port ',i.setting.port)
})