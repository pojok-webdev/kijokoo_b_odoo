$(function () {
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
            "targets": 4,
            "data": null,
            "defaultContent":'<div class="btn-group">'
              +'<button type="button" class="btn btn-default">Aksi</button>'
              +'<button type="button" class="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown">'
                +'<span class="sr-only">Toggle Dropdown</span></button>'
                +'<div class="dropdown-menu dropdown-menu-right" role="menu">'
                  +'<a class="dropdown-item btnEditClient" style="cursor:pointer">Edit</a>'
                  +'<a class="dropdown-item btnManageClient" style="cursor:pointer;background:gold">Pengaturan Anggota</a>'
                  +'<div class="dropdown-divider"></div>'
                  +'<a class="dropdown-item btnRemoveClient" style="cursor:pointer;color:red">Hapus</a>'
                +'</div>'
                +'</div>'
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
    $('#btnSaveTicket').click(function(){
      console.log('simpan ticket',$('#ticketdatestart').val())
      $.ajax({
        url:'/saveticket',
        type:'post',
        dataType:'json',
        data:{
          client_id:$('#partner').val(),
          location_id:$('#location').val(),
          clientname:$('#partner').text(),
          ticketstart:$('#ticketdatestart').val()
        }
      })
      .done(res=>{
        console.log('Sukses simpan ticket',res)
        dt.ajax.reload()
      })
      .fail(err=>{
        console.log('Failed simpan ticket',err)
      })
    })
  


  });
