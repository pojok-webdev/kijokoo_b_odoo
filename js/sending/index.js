$(function () {
    //Initialize Select2 Elements
    /*getTemplateName = (obj,callback) => {
        $.ajax({
            url:'/gethsms'
        })
        .done(res=>{
                return tmp.id==obj.id
            }))
            callback(res.results.filter(tmp=>{
                console.log("ini lho",tmp,obj)
                return tmp.id==obj.id
            })[0].text)
        })
        .fail(err=>{
            console.log('error get template name',err)
            callback(err)
        })
    }*/
    $("#cmbHsm").select2({
        ajax:{
            url:function(params){
                if(params.hasOwnProperty('term')){
                    return '/gethsm/'+params.term
                }else{
                    return '/gethsms'
                }
            },
            processResults:function(obj){
                console.log(obj)
                return obj
            }
        },
    })
    $("#cmbCategory").select2({
        ajax:{
            url:function(params){
                if(params.hasOwnProperty('term')){
                    return '/select2categoryprovider/'+params.term
                }else{
                    return '/select2categoryproviders'
                }
            },
            processResults:function(obj){
                return obj
            }
        
        },
        })
    getTemplateDetailId = (obj,callback) => {
      $.ajax({
        url:'/gettemplatedetail/'+obj.hsm_id,
        type:'get'
      })
      .done(res=>{
          console.log("TEmplateDetail",res)
        callback(res.id)
      })
      .fail(err=>{
        callback(err)
      })
    }
    uploadCsv = (obj,callback) => {
      $.ajax({
        url:'/uploadcsv/'+obj.template_detail_id
      })
      .done(res=>{
        console.log("RESSS",res.results.broadcast_file_id)
        console.log("Upload Result",res)
        callback(res.results.broadcast_file_id)
      })
      .fail(err=>{
        console.log("error upload",err)
      })
    }
    broadcast = obj=>{
      $.ajax({
        url:'/broadcast',
        type:'post',
        dataType:'json',
        data:obj
      })
      .done(res=>{
        console.log("SUkses terkirim",res)
        $('#sending_report_content').html("Nama Broadcast "+res.results.data.broadcast_job.name)
        $('#sending_report_start').html("Waktu Mulai Pengiriman "+res.results.data.broadcast_job.started_at)
        $('#sending_report_detail').html("Total Penerima "+res.results.data.broadcast_job.total_recipient)
        $("#modal_success").modal()
      })
      .fail(err=>{
        console.log("Gagal terkirim",err)
      })
    }

    createCsv = (obj,callback)=>{
        category = $('#cmbCategory').select2('data')
        if(category.length>0){
            getClientsByCategory({category_id:category[0].id},res=>{
                console.log("Res Get Clients",res)
                $.ajax({
                    url:'/csvwriter',
                    type:'post',
                    dataType:'json',
                    data:{
                    header:obj.header,
                    records:res.map(client=>{
                        switch(obj.hsm_id){
                        case "28095":
                            return {
                                phone_number:client.picwa,
                                customer_name:client.name,
                                ...obj.body,
                                body_variable4:client.name,
                                body_variable5:client.address,
                            }
                            break
                        case "28094":
                            return {
                                phone_number:client.picwa,
                                customer_name:client.name,
                                ...obj.body,
                                body_variable4:client.name,
                                body_variable5:client.address,
                            }
                            break
                        case "18615":
                            return {
                                phone_number:client.picwa,
                                customer_name:client.name,
                                ...obj.body,
                                body_variable6:client.name,
                                body_variable7:client.address,
                            }
                            break
                        case "18598":
                            return {
                                phone_number:client.picwa,
                                customer_name:client.name,
                                ...obj.body,
                                body_variable4:client.name,
                                body_variable5:client.address,
                                body_variable6:client.description,
                            }
                            break
                        case "18597":
                            return {
                                phone_number:client.picwa,
                                customer_name:client.name,
                                ...obj.body,
                            }
                            break;
                        case "18596":
                            return {
                                phone_number:client.picwa,
                                customer_name:client.name,
                                ...obj.body,
                            }
                        break
                        case "18594":
                            return {
                                phone_number:client.picwa,
                                customer_name:client.name,
                                ...obj.body,
                            }
                        break
                        case "18590":
                            return {
                                phone_number:client.picwa,
                                customer_name:client.name,
                                ...obj.body,
                                body_variable8:client.name,
                                body_variable9:client.address,
                                body_variable10:client.description,
                                        }
                        break
                        }
                    })
                }
                })
                .done(res=>{
                    callback(res)
                })
                .fail(err=>{
                    callback(err)
                })
            })
        }
    }
    getParams = obj => {
        switch(obj.tplName){
            case "28095"://bc_maintenance
            return {
                hsm_id:"28095",
                header: [
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable1",title:"body_variable1"},
                    {id:"body_variable2",title:"body_variable2"},
                    {id:"body_variable3",title:"body_variable3"},
                    {id:"body_variable4",title:"body_variable4"},
                    {id:"body_variable5",title:"body_variable5"},
                    {id:"header_variable",title:"header_variable"}
                ],
                body:{
                    body_variable1:$("#tpl1var1").val(),
                    body_variable2:$("#tpl1var2").val(),
                    body_variable3:$("#tpl1var3").val(),
                    header_variable:$("#tpl1var4").val()
                }
            }
            break
            case "28094"://bc_selesai_maintenance
            return {
                hsm_id:"28094",
                header:[
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable1",title:"body_variable1"},
                    {id:"body_variable2",title:"body_variable2"},
                    {id:"body_variable3",title:"body_variable3"},
                    {id:"body_variable4",title:"body_variable4"},
                    {id:"body_variable5",title:"body_variable5"},
                    {id:"header_variable",title:"header_variable"}
                ],
                body:{
                    body_variable1:$("#tpl2var1").val(),
                    body_variable2:$("#tpl2var2").val(),
                    body_variable3:$("#tpl2var3").val(),
                    header_variable:$("#tpl2var4").val()
                }
            }
            break
            case "18615"://notifikasi_maintenance_rev2
            return {
                hsm_id:"18615",
                header:[
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable1",title:"body_variable1"},
                    {id:"body_variable2",title:"body_variable2"},
                    {id:"body_variable3",title:"body_variable3"},
                    {id:"body_variable4",title:"body_variable4"},
                    {id:"body_variable5",title:"body_variable5"},
                    {id:"body_variable6",title:"body_variable6"},
                    {id:"body_variable7",title:"body_variable7"},
                    {id:"header_variable",title:"header_variable"}
                ],
                body:{
                    body_variable1:$("#tpl3var1").val(),
                    body_variable2:$("#tpl3var2").val(),
                    body_variable3:$("#tpl3var3").val(),
                    body_variable4:$("#tpl3var4").val(),
                    body_variable5:$("#tpl3var5").val(),
                    header_variable:$("#tpl3var6").val()
                }
            }
            break
            case "18598"://notifikasi_gangguan
            return {
                hsm_id:"18598",
                header:[
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable1",title:"body_variable1"},
                    {id:"body_variable2",title:"body_variable2"},
                    {id:"body_variable3",title:"body_variable3"},
                    {id:"body_variable4",title:"body_variable4"},
                    {id:"body_variable5",title:"body_variable5"},
                    {id:"body_variable6",title:"body_variable6"},
                    {id:"header_variable",title:"header_variable"}
                ],
                body:{
                    body_variable1:$("#tpl4var1").val(),
                    body_variable2:$("#tpl4var2").val(),
                    body_variable3:$("#tpl4var3").val(),
                    header_variable:$("#tpl4var4").val(),
                }
            }
            case "18597"://notifikasi_penyelesaian_gangguan
            return {
                hsm_id:"18597",
                header:[
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable2",title:"body_variable2"},
                    {id:"body_variable3",title:"body_variable3"},
                    {id:"body_variable4",title:"body_variable4"},
                    {id:"body_variable5",title:"body_variable5"},
                    {id:"body_variable6",title:"body_variable6"},
                    {id:"body_variable7",title:"body_variable7"},
                    {id:"body_variable8",title:"body_variable8"},
                    {id:"body_variable9",title:"body_variable9"},
                    {id:"header_variable",title:"header_variable"}
                ],
                body:{
                    body_variable2:$("#tpl5var2").val(),
                    body_variable3:$("#tpl5var3").val(),
                    body_variable4:$("#tpl5var4").val(),
                    body_variable5:$("#tpl5var5").val(),
                    body_variable6:$("#tpl5var6").val(),
                    body_variable7:$("#tpl5var7").val(),
                    body_variable8:$("#tpl5var8").val(),
                    body_variable9:$("#tpl5var9").val(),
                    header_variable:$("#tpl5var1").val(),
                }
            }
            case "18596"://update_gangguan
            return {
                hsm_id:"18596",
                header:[
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable2",title:"body_variable2"},
                    {id:"header_variable",title:"header_variable"}
                ],
                body:{
                    body_variable2:$("#tpl6var2").val(),
                    header_variable:$("#tpl6var1").val(),
                }
            }
            case "18594"://notifikasi_selesai_maintenance
            return {
                hsm_id:"18594",
                header:[
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable2",title:"body_variable2"},
                    {id:"body_variable3",title:"body_variable3"},
                    {id:"body_variable4",title:"body_variable4"},
                    {id:"body_variable5",title:"body_variable5"},
                    {id:"body_variable6",title:"body_variable6"},
                    {id:"header_variable",title:"header_variable"}
                ],
                body:{
                    body_variable2:$("#tpl7var2").val(),
                    body_variable3:$("#tpl7var3").val(),
                    body_variable4:$("#tpl7var4").val(),
                    body_variable5:$("#tpl7var5").val(),
                    body_variable6:$("#tpl7var6").val(),
                    header_variable:$("#tpl7var1").val(),
                }
            }
            case "18590"://notifikasi_maintenance
            return {
                hsm_id:"18590",
                header:[
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable8",title:"body_variable8"},
                    {id:"body_variable9",title:"body_variable9"},
                    {id:"body_variable10",title:"body_variable10"},
                    {id:"body_variable2",title:"body_variable2"},
                    {id:"body_variable3",title:"body_variable3"},
                    {id:"body_variable4",title:"body_variable4"},
                    {id:"body_variable5",title:"body_variable5"},
                    {id:"body_variable6",title:"body_variable6"},
                    {id:"body_variable7",title:"body_variable7"},
                    {id:"header_variable",title:"header_variable"}
                ],
                body:{
                    body_variable2:$("#tpl8var2").val(),
                    body_variable3:$("#tpl8var3").val(),
                    body_variable4:$("#tpl8var4").val(),
                    body_variable5:$("#tpl8var5").val(),
                    body_variable6:$("#tpl8var6").val(),
                    body_variable7:$("#tpl8var7").val(),
                    header_variable:$("#tpl8var1").val(),
                }
            }
            case "18559"://update1_notifikasi_gangguan
            return {
                hsm_id:"18559",
                header:[
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable1",title:"body_variable1"},
                    {id:"body_variable2",title:"body_variable2"}
                ],
                body:{
                    body_variable2:"lokasi dari sistem",
                    body_variable1:"nama dari sistem",
                }
            }
            case "18548"://notifikasi_gangguan  
            return {
                hsm_id:"18548",
                header:[
                    {id:"phone_number",title:"phone_number"},
                    {id:"customer_name",title:"customer_name"},
                    {id:"body_variable1",title:"body_variable1"},
                    {id:"body_variable2",title:"body_variable2"}
                ],
                body:{
                    body_variable2:"lokasi dari sistem",
                    body_variable1:"nama dari sistem",
                }
            }
        }
    }
    getClientsByCategory = (obj,callback) => {
        $.ajax({
            url:'/getclientsbycategory/'+obj.category_id,
            dataType:'json'
        })
        .done(res=>{
            callback(res)
        })
        .fail(err=>{
            callback(err)
        })
    }
    $("#btnTest").click(function(){
      createCsv(getParams({tplName:$("#cmbHsm").val()}),res=>{
        console.log("create Csv",$("#cmbHsm").val())
        console.log("HSM Detail",res)
        getTemplateDetailId({hsm_id:$("#cmbHsm").val()},templateDetailId=>{
          console.log("templateDetailId",templateDetailId)
          uploadCsv({template_detail_id:templateDetailId},res=>{
            console.log("upload result",res)
            broadcast({
                broadcast_file_id:res,
                template_detail_id:templateDetailId,
                templatename:$('#cmbHsm :selected').text(),
                categoryname:$("#cmbCategory :selected").text(),
                email:email
              })      
          })
        })  
      })
    })
    $('#btnsendbroadcast').click(function(){
      console.log('send')
      $.ajax({
        url:'/broadcast',
        type:'get'
      })
      .done(res=>{
        console.log("Res",res)
      })
      .fail(err=>{
        console.log("Err",err)
      })
    })
    $(".allcategory").hide()
    $("#cmbHsm").change(function(){
        console.log("cmbhsmchange",$(this).val())
        $(".allcategory").hide()
        switch($(this).val()){
          case "28095"://bc_maintenance
          $(".bc_maintenance").show()
          break
          case "28094"://bc_selesai_maintenance
          $(".bc_selesaimaintenance").show()
          break
          case "18615"://notifikasi_maintenance_rev2
          $(".notifikasi_maintenance_rev2").show()
          break
          case "18598"://notifikasi_gangguan
          $(".notifikasi_gangguan").show()
          break
          case "18597"://notifikasi_penyelesaian_gangguan
          $(".notifikasi_penyelesaian_gangguan").show()
          break
          case "18596"://update_gangguan
          $(".update_gangguan").show()
          break
          case "18594"://notifikasi_selesai_maintenance
          $(".notifikasi_selesai_maintenance").show()
          break
          case "18590"://notifikasi_maintenance
          $(".notifikasi_maintenance").show()
          break
          case "18559"://update1_notifikasi_gangguan
          case "18548"://notifikasi_gangguan
        }
    }) 
    $("#cmbCategory").change(function(){
        console.log($(this).val())
        getClientsByCategory({category_id:$(this).val()},res=>{
            console.log("Jumlah Pelanggan",res.length)
            console.log("Email",email)
        })
    })   
})
