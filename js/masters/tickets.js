$(function () {
  console.log('TICKET INVOKED')
    init = _ => {
      dt = $('#tObj').DataTable({
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
    }
    $('#tObj').on('click','.btnManageClient',function(){
      $('#tObj tr').removeClass('selected')
      tr = $(this).stairUp({level:4})
      tr.addClass('selected')
      trid = tr.find('.trid').text()
      categoryname = tr.find('.name').text()
      console.log('TRID',trid)
      dtReserve = $('#tReserve').DataTable({
        "info": false,destroy:true,
        columnDefs:[
          {targets:0,className:'trid'},
          {targets:2,defaultContent:'<button class="btn btn-primary associate"> > </button>'}
        ],
        ajax:{
          url:'/getavailabelclients/'+trid,
          dataType:'json',
          processResults:res=>{
            return res
          }
        },
      })
      dtAssociated = $('#tClient').DataTable({
        destroy:true,info:false,
        ajax:{
          url:'/dataclientsbycategory/'+trid,
          dataType:'json',
          processResults:res=>{
            return res
          }
        },
        columnDefs:[
          {
            targets:0,
            className:'trid'
          },
          {
            "targets": 3,
            "data": null,
            "defaultContent":'<button class="btn btn-danger btnRemoveClient"> < </button>'
          }
        ]
      })
      $('#modalEditCategoryClient').html(' <strong>'+categoryname+'</strong>')
      $('#edit-client').modal({
        backdrop:'static'
      })
    })
    $('#tClient').on('click','.btnRemoveClient',function(){
      $.ajax({
        url:'/disassociatecategoryclient/'+$('#tObj tr.selected').find('.trid').text()+'/'+$(this).stairUp({level:2}).find('.trid').text()
      })
      .done(res=>{
        dtAssociated.ajax.reload()
        dtReserve.ajax.reload()
        dt.ajax.reload()
      })
      .fail(err=>{
        console.log('Err',err)
      })
    })
    $('#tReserve').on('click','.associate',function(){
      $.ajax({
        url:'/associatecategoryclient/'+$('#tObj tr.selected').find('.trid').text()+'/'+$(this).stairUp({level:2}).find('.trid').text()
      })
      .done(res=>{
        dtAssociated.ajax.reload()
        dtReserve.ajax.reload()
      })
      .fail(err=>{
        console.log('Err',err)
      })
    })
    $('#btnCloseCategoryClient').click(function(){
        dt.ajax.reload()
    })
    init()
    $('#tObj').on('click','.btnEditClient',function(){
      $('#tObj tr').removeClass('selected')
      tr = $(this).stairUp({
        level:4
      })
      tr.addClass('selected')
      console.log('U click ',tr.find('.trid').text())
      $.ajax({
        url:'/getcategory/'+tr.find('.trid').text(),
        dataType:'json',
        type:'get'
      })
      .done(res=>{
        console.log('getcategory res',res)
        $('#editCategoryName').val(res[0].name)
        $('#editCategoryDescription').val(res[0].description)
        $('#edit-category').modal({
          backdrop:'static'
        })
      })
      .fail(err=>{
        console.log('Err',err)
      })
    })


    $("#btnUpdateCategory").click(function(){
      $.ajax({
        url:'/updatecategory',
        type:'post',
        data:{
          id:$('#tObj tr.selected').find('.trid').text(),
          name:$('#editCategoryName').val(),
          description:$('#editCategoryDescription').val(),
          prevName:$('#tObj tbody tr.selected').find('.name').text(),
          prevDesc:$('#tObj tbody tr.selected').find('.description').text()
        },
        dataType:'json'
      })
      .done(res=>{
        console.log(res)
 /*       $('#tObj tbody tr.selected').find('.description').html($('#editCategoryDescription').val())
        $('#tObj tbody tr.selected').find('.name').html($('#editCategoryName').val())*/
        dt.ajax.reload()
      })
      .fail(err=>{
        console.log(err)
      })
    })

    $('#tObj').on('click','.btnRemoveClient',function(){
      $('#tObj tr').removeClass('selected')
      tr = $(this).stairUp({
        level:4
      })
      tr.addClass('selected')
      console.log('U click ',tr.find('.trid').text())
      $('#confirmRemoveCustomData').modal({
        backdrop:'static'
      })
    })

    $('#btnYesRemoveCustomData').click(function(){
      $.ajax({
        url:'/removecategory/'+$('#tObj tr.selected').find('.trid').text()
      })
      .done(res=>{
        console.log('Res',res)
        $('#tObj tr.selected').remove()
      })
      .fail(err=>{
        console.log('Err',err)
      })
    })
    $('#btnSaveCategory').click(function(){
      $.ajax({
        url:'/savecategory',
        type:'post',
        dataType:'json',
        data:{
          name:$('#addCategoryName').val(),
          description:$('#addCategoryDescription').val()
        }
      })
      .done(res=>{
        console.log('Res',res)
        dt.row.add([
            res.insertId,
            $('#addCategoryName').val(),
            $('#addCategoryDescription').val(),
            0])
        .draw()
      })
      .fail(err=>{
        console.log('Error',err)
      })
    })
  });
