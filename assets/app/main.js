(function($){
    console.log("Hooh")
    $.ajax({
        url: '/cores/11',
        dataType: 'json',
      })
      .done(res=>{
          console.log("AJAZ",res)
      })
      .fail(err=>{
          console.log("FAIL",err)
      })
      doHide = callback => {
        $('.clienttype').hide()
        callback()
      }
    $('#siteTypeId').change(function(){
        console.log($(this).val())
        
        switch($(this).val()){
            case 'Core':
                console.log('hehe')
                doHide(_=>{
                    $('#dcores').show()
                })
            break;
        case 'Backbone':
            console.log('hohe')
            doHide(_=>{
                $('#dbackbones').show()
            })
            break;
        case 'BTS':
            console.log('hihe')
            doHide(_=>{
                $('#dbts').show()
            })
            break;
        case 'AP':
            console.log('hehe')
            doHide(_=>{
                $('#daps').show()
            })
            break;
        case 'Pelanggan':
            console.log('hahe')
            doHide(_=>{
                $('#dclients').show()
            })
            break;
        }
    })
    getParams = obj => {
        return {
            ajax: {
              url: function (params) {
                console.log("PARAMS",params)
                if(params.hasOwnProperty('term')){
                    return '/getmasters/'+obj.tableName+'/' + params.term;
                }else{
                    return '/getmasters/'+obj.tableName+'/ '
                }
              },
              dataType: 'json',
              delay: 250,
              processResults: function (response) {
                console.log("wwwwww")
                return {
                   results: response.results
                };
              },
            }
          }    
    }
    $("#showVal").click(function(){
        console.log("Awww")
        console.log($("#backbones").val())
    })
    $('.clienttype').hide()
    $("#backbones").select2(getParams({tableName:"backbones"}))
    $("#bts").select2(getParams({tableName:"btstowers"}))
    $("#aps").select2(getParams({tableName:"aps"}))
    $("#clients").select2(getParams({tableName:"clients"}))
    $('#cores').select2({
        ajax: {
          url: function (params) {
            if(params.hasOwnProperty('term')){
                return '/cores/' + params.term;
            }else{
                return '/cores/ '
            }
          },
          dataType: 'json',
          delay: 250,
          processResults: function (response) {
            console.log("wwwwww")
            return {
               results: response.results
            };
          },
        }
      })
      $('#hee').select2({
        ajax: {
          url:'/backbones',
          dataType: 'json',
          delay: 250,
          data: function (params) {
              console.log(params)
              return  {
                  search:params.term,
                  type:'public'
              }
          },
          processResults: function (response) {
              console.log("select2 results",response.results)
            return {
               results: response.results
            };
          },
        }
      })
  $("#sendWAs").click(function(){
    console.log("WA should be sent")
    $.ajax({
      url:'/sendmessages',
      type:'post',
      dataType:'json',
      data:{
        ticket_id:'123',
        email:'puji@padi.net.id',
        recipient:['+628813272107','+628885271669'],
        message:'xxxx'
      }
    })
  })
  $("#btnSavePhone").click(function(){
    console.log("client_id lagi",$("#clients").val())
    console.log("save clicked")
    $.ajax({
      url:'/savephone',
      type:'post',
      data:{
        client_id:$("#clients").val(),
        picname:$('#picname').val(),
        picrole:$('#picrole').val(),
        picphone:$('#picphone').val()
      },
//      dataType:'json'
    })
    .done(res=>{
      console.log("Res of",res)
      str = '<tr>'
      str+='<td>'+$('#picphone').val()+'</td>'
      str+='<td>'+$('#picname').val()+'</td>'
      str+='<td>'+$('#picrole').val()+'</td>'
      str+='<td class="btnHapusTelp">hapus</td>'
      str+='</tr>'
      str+=''
      console.log("STE",str)
      $("#tblphones tbody").append(str)
    })
    .fail(err=>{
      console.log("Err save Phone",err)
    })
  })
  $("#btnManageClientPhone").hide()
  $("#clients").change(function(){
    console.log('client val',$(this).val())
    if(!isNaN($(this).val())){
      $("#btnManageClientPhone").show()
    }else{
      $("#btnManageClientPhone").hide()
    }

  })
  $('#tblphones tbody').on('click','.btnHapusTelp',function(){
    console.log('EL',$(this).parent().parent().html())
    $.ajax({
      url:'/removePhone',
    })
  })
  $("#btnManageClientPhone").click(function(){
    console.log("client_id",$("#clients").val())
    console.log("clientname",$("#clients :selected").text())
    $('#tblphones tbody').empty()
    $.ajax({
      url:'/getphones/'+$('#clients').val(),
      dataType:'json'
    })
    .done(res=>{
      console.log('Res',res)
      res.forEach(element => {
        str = '<tr trid='+element.id+'>'
        str+='<td>'+element.picphone+'</td>'
        str+='<td>'+element.picname+'</td>'
        str+='<td>'+element.picrole+'</td>'
        str+='<td class="btnHapusTelp">Hapus</td>'
        str+='</tr>'
        str+=''
        $('#tblphones tbody').append(str)
      });
      $("#manage-contact-xl").modal()      
    })
    .fail(err=>{
      console.log("Err rtreve phones",err)
    })
  })
  $("#manage-contact-xl").on('show.bs.modal',function(e){
    console.log("E",e)
  })
  $("#inputStatus").change(function(){
    		$.ajax({
					url:"https://api.telegram.org/bot201184174:AAH2Fy_3wS8A5KGi2cn468dtFCMJjhOqISQ/sendMessage",
					data:{"chat_id":"@Padi","text":"boooohoooo"},
					headers: {
						'Access-Control-Allow-Origin':'*'
					},
					crossDomain:true,
					type:'post',
					dataType:'jsonp'
				});

  })
}(jQuery))