$(function () {
    init = _ => {
      dt = $('#tObj').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        "order":[[4,"desc"]],
        "oLanguage": {
          "sSearch": "Pencarian"
        },
        dom:'Bfrtip',
      ajax:{
          url:'/readlogs',
        },
        "columnDefs": [ 
          {
            targets:0,
            className:'trid'
          }],
          buttons:[
            {
              text:'Refresh',
              className:'btn btn-warning',
              action:function(e,dt_,node,config){
                dt.ajax.reload()
              }
            }
          ]
        })
    }
    init()
  })
