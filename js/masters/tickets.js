$(function () {
  getTicketStart = (obj,callback) => {
    spliter = obj.ticketstart.split(' ')
    dtpart = obj.ticketstart.substring(1,10)
    tmpart = obj.ticketstart.substring(12,4)
    tmp = dtpart.split('/')
    dtout = tmp[2]+'-'+tmp[0]+'-'+tmp[1]
    tmout = spliter[1]
    callback(dtout+' '+tmout)
  }
  let dt = $('#tObj').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "responsive": true,
    dom:"Bfrtip",
    ajax:{
      url:'/datatickets',
    },
    "columnDefs": [ 
      {
          "targets": 5,
          "data": null,
          "defaultContent":'<div class="btn-group">'
            +'<button type="button" class="btn btn-default">Aksi</button>'
            +'<button type="button" class="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown">'
              +'<span class="sr-only">Toggle Dropdown</span></button>'
              +'<div class="dropdown-menu dropdown-menu-right" role="menu">'
                +'<a class="dropdown-item btnEditClient" style="cursor:pointer">Edit</a>'
                +'<a class="dropdown-item btnFollowUp" style="cursor:pointer;background:gold">Follow Up</a>'
                +'<div class="dropdown-divider"></div>'
                +'<a class="dropdown-item btnRemoveClient" style="cursor:pointer;color:red">Hapus</a>'
              +'</div>'
              +'</div>'
      },
      {
        targets:4,
        className:'timestart'
      },
      {
        targets:3,
        className:'dt-right'
      },
      {
        targets:2,
        className:"description dt-head-center"
      },
      {
        targets:1,
        className:"name"
      },
      {
        targets:0,
        className:'trid'
      }],
      buttons:[{
        text: 'Penambahan Ticket',
        className:'btn btn-success',
        action: function ( e, dt, node, config ) {
          $('#add-category').modal({
            backdrop:'static'
          })
          }
        },
        {
          text:'Refresh',
          className:'btn btn-warning',
          action:function(e,dt_,node,config){
            dt.ajax.reload()
          }
        }
      ]
  })
  saveTicket = obj => {
    $.ajax({
      url:'/saveticket',
      type:'post',
      dataType:'json',
      data:{
        client_id:$('#partner').val(),
        location_id:$('#location').val(),
        clientname:$('#partner').text(),
        ticketstart:obj.ticketstart
      }
    })
    .done(res=>{
      console.log('Sukses simpan ticket',res)
      dt.ajax.reload()
    })
    .fail(err=>{
      console.log('Failed simpan ticket',err)
    })

  }
  $('#btnSaveTicket').click(function(){
    
    getTicketStart({ticketstart : $('#ticketdatestart input').val() },ticketstart=>{
      console.log('simpan ticket dengan tanggal start ticket',ticketstart)
      saveTicket({ticketstart:ticketstart})
    })
  })
  getTicketDate = obj => {
    spliter = obj.split('T')
    dtpart = spliter[0]
    tmpart = spliter[1].substring(0,5)
    return dtpart+' '+tmpart
  }
  doCounting = _ => {
    $('#tObj tbody tr .timestart').each(function(){
      console.log('tr',$(this).html())
      console.log('dt',getTicketDate($(this).html()))
    });
  }
  counter = _ => {
    console.log('HellO')
    setInterval(() => {
      doCounting()
    }, 1000);
  }
  //counter()
$('#tObj tbody').on('click','.btnFollowUp',function(){
  trid = $(this).stairUp({level:4}).find('.trid').text()
  console.log('anda klik ',trid)
  $('#modalFollowuplabel').text(trid)
  $('#modalFollowup').modal({
    backdrop:'static'
  })
})
});
