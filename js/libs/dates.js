getInputDate = (obj,callback) => {
    spliter = obj.ticketstart.split(' ')
    dtpart = obj.ticketstart.substring(1,10)
    tmpart = obj.ticketstart.substring(12,4)
    tmp = dtpart.split('/')
    dtout = tmp[2]+'-'+tmp[0]+'-'+tmp[1]
    tmout = spliter[1]
    callback(dtout+' '+tmout)
  }
