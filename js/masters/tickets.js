$(function () {
  var dt = $('#tObj').DataTable({
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
          "targets": 11,
          "data": null,
          "defaultContent":'<div class="btn-group">'
            +'<button type="button" class="btn btn-default">Aksi</button>'
            +'<button type="button" class="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown">'
              +'<span class="sr-only">Toggle Dropdown</span></button>'
              +'<div class="dropdown-menu dropdown-menu-right" role="menu">'
                +'<a class="dropdown-item btnEditTicket" style="cursor:pointer">Edit</a>'
                +'<a class="dropdown-item btnFollowUp" style="cursor:pointer;background:gold">Follow Up</a>'
                +'<div class="dropdown-divider"></div>'
                +'<a class="dropdown-item btnRemoveClient" style="cursor:pointer;color:red">Hapus</a>'
              +'</div>'
              +'</div>'
      },
      {
        targets:10,
        className:'telppelapor'
      },
      {
        targets:9,
        className:'pelapor'
      },
      {
        targets:8,
        className:'duration'
      },
      {
        targets:7,
        className:'timeend'
      },
      {
        targets:6,
        className:'timestart'
      },
      {
        targets:5,
        className:'complaint'
      },
      {
        targets:4,
        className:'idlocation dt-right'
      },
      {
        targets:3,
        className:"name dt-head-center"
      },
      {
        targets:2,
        className:"kdclient"
      },
      {
        targets:1,
        className:'kdticket'
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
  togglecolumn = colnum => {
    var column = dt.column(colnum);
    column.visible(!column.visible());
  }
  $('.buttontoggler').click(function(){
    var column = dt.column($(this).attr('mydata'));
    column.visible(!column.visible());
    $(this).toggleClass('btn-warning')
  })
  saveTicketLocation = obj => {
    $.ajax({
      url:'/getlocation/'+obj.location_id,
      dataType:'json'
    })
    .done(res=>{
      myl = res.result[0]
      loc = {
        id:myl.id,
        partner_id:myl.partner_id.id,
        partner_name:myl.partner_id.name,
        code:myl.code,
        name:myl.name,
        display_name:myl.display_name,
        address:myl.address,
        rt:myl.RT,rw:myl.RW,
        kelurahan_id:myl.kelurahan_id.id,kelurahan_name:myl.kelurahan_id.name,
        kecamatan_id:myl.kecamatan_id.id,kecamatan_name:myl.kecamatan_id.name,
        kota_id:myl.kota_id.id,kota_name:myl.kota_id.name,
        state_id:myl.state_id.id,state_name:myl.state_id.name,
        phone:myl.phone,pic:myl.pic,code:myl.code
      }
      $.ajax({
        url:'/saveticketlocation',
        data:{...loc,...obj},
        dataType:'json',
        type:'post'
      })
      .done(res=>{
        console.log('Success save ticket location',res)
      })
      .fail(err=>{
        console.log('Failed save ticket location',err)
      })
    })
    .fail(err=>{
      console.log('Err get Location',err)
    })
  }
  saveTicket = obj => {
    $.ajax({
      url:'/saveticket',
      type:'post',
      dataType:'json',
      data:{
        client_id:$('#partner').val(),
        location_id:$('#location').val(),
        clientname:$('#partner').text(),
        ticketstart:obj.ticketstart,
        cause:$('#subcause:selected').text(),
        cause_id:$('#subcause').val(),
        reporter:$('#pelapor').val(),
        reporterphone:$('#telp').val(),
        complaint:$('#complaint').val()
      }
    })
    .done(res=>{
      console.log('Sukses simpan ticket',res)
      dt.ajax.reload()
      saveTicketLocation({ticket_id:res.id,location_id:$('#location').val()})
    })
    .fail(err=>{
      console.log('Failed simpan ticket',err)
    })
  }
  $('#btnSaveTicket').click(function(){
    getInputDate({ticketstart : $('#ticketdatestart input').val() },ticketstart=>{
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
$('#tObj tbody').on('click','.btnFollowUp',function(){
  trid = $(this).stairUp({level:4}).find('.trid').text()
  console.log('anda klik ',trid)
  $('#modalFollowuplabel').text(trid)
  $('#lblfupelapor').html($(this).stairUp({level:4}).find('.pelapor').text())
  $('#lblKeluhan').html($(this).stairUp({level:4}).find('.complaint').text())
  $('#modalFollowup').modal({
    backdrop:'static'
  })
})



function select2_search ($el, term) {
  $el.select2('open');

  // Get the search box within the dropdown or the selection
  // Dropdown = single, Selection = multiple
  var $search = $el.data('select2').dropdown.$search || $el.data('select2').selection.$search;
  // This is undocumented and may change in the future

  $search.val(term);
  $search.trigger('input');
  setTimeout(function() { $('.select2-results__option').trigger("mouseup"); }, 1500);

}

/*$('button').on('click', function () {
  var $select = $($(this).data('target'));
  select2_search($select, 'Arizona');
});*/


$('#tObjx').on('click','.btnEditTicket',function(){
  tr = $(this).stairUp({level:4})
  console.log('KDClienT',tr.find('.kdclient').text())
  $('#editpartner').val(parseInt(tr.find('.kdclient').text())).trigger('mouseup')
  //$('#editpartner').val(parseInt(tr.find('.kdclient').text())).trigger('change')
  //$('.partnerselect2').val(parseInt(tr.find('.kdclient').text())).change()
  //select2_search($('#editpartner'),tr.find('.name').text())
  //$('.partnerselect2').val(5326).trigger('change')
  $('#edit-ticket').modal()
})
$('#tObjy').on('click','.btnEditTicket',function(){
  tr = $(this).stairUp({level:4})
  $('.partnerselect2').select2('destroy')
  $('.partnerselect2').select2({
    ajax:{
      url:'/partnerselect2',
      type:'post',
      data:function(params){
          var query = {
            kecamatan_id:'',
            search:params.hasOwnProperty('term')?params.term:' ',type:'public'
          }
          console.log('edit ZUERY',query)
          return query
        },dataType:'json',
      processResults:function(data){
        console.log("Process result",data)
        return data
      }
      }
    })

})

});
