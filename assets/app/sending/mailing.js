sendEMail = obj => {
    $.ajax({
        url:'/sendmail',
        type:'post',
        data:{
            text:obj.text,
            subject:obj.subject,cc:obj.cc,
            email:obj.email
        }
    })
    .done(res=>{
        console.log("Success send mail",res)
    })
    .fail(err=>{
        console.log("Fail send mail",err)
    })
}
getCC = (obj,callback) => {
    $.ajax({
        url:'/getccs/'+obj.client_id,
        dataType:'json'
    })
    .done(res=>{
        callback(res.map(cc=>{
            return cc.email
        }).join()
)
    })
    .fail(err=>{
        callback(err)
    })
}
$('#sendMail').click(function(){
    category = $('#cmbCategory').select2('data')
    console.log("Mailing KateGori",category)
    if(category.length>0){
        getClientsByCategory({category_id:category[0].id},res=>{
            console.log('clients by category',res)
            res.forEach(client=>{
                getCC({client_id:client.id},cc=>{
                    console.log("CC",cc)
                    switch($('#cmbTemplate').val()){
                        case '1':
                            sendEMail({
                                subject:'Maintenance',
                                text:notifikasiMaintenance({
                                    header:$('#maintenanceHeader').val(),
                                    waktu:$('#maintenanceWaktu').val(),
                                    durasidown:$('#maintenanceDurasiDown').val(),
                                    aktifitas:$('#maintenanceAktifitas').val(),
                                    client:client.name,
                                    location:client.address,
                                }),
                                email:client.email,
                                cc:cc
                            })
                        break;
                        case '2':
                            sendEMail({
                                subject:'Notifikasi Selesai Maintenance',
                                text:notifikasiSelesaiMaintenance({
                                    header:$('#maintenancefinishedHeader').val(),
                                    waktu:$('#maintenancefinishedWaktu').val(),
                                    durasidown:$('#maintenancefinishedDurasiDown').val(),
                                    aktifitas:$('#maintenancefinishedAktifitas').val(),
                                    client:client.name,
                                    location:client.address,
                                }),
                                email:client.email,
                                cc:cc
                            })    
                        break;
                        case '3':
                            sendEMail({
                                subject:'Notifikasi Gangguan',
                                text:notifikasiGangguan({
                                    header:$('#notifikasiGangguanHeader').val(),
                                    startproblem:$('#notifikasiGangguanStartProblem').val(),
                                    segmentasi:$('#notifikasiGangguanSegmentasi').val(),
                                    impact:$('#notifikasiGangguanImpact').val(),
                                    client:client.name,
                                    location:client.address,
                                }),
                                email:client.email,
                                cc:cc
                            })
                        break;
                        case '4':
                            sendEMail({
                                subject:'Notifikasi Update Gangguan',
                                text:notifikasiUpdateGangguan({
                                    gangguan:$('#notifikasiUpdateGangguanGangguan').val(),
                                    client:client.name,
                                    location:client.address,
                                }),
                                email:client.email,
                                cc:cc
                            })
                        break;
                        case '5':
                            sendEMail({
                                subject:'Notifikasi Penyelesaian Gangguan',
                                text:notifikasiPenyelesaianGangguan({
                                    header:$('#notifikasiUpdateGangguanGangguan').val(),
                                    start:$('#notifikasiPenyelesaianGangguanStart').val(),
                                    end:$('#notifikasiPenyelesaianGangguanEnd').val(),
                                    durasidown:$('#notifikasiPenyelesaianGangguanDurasiDown').val(),
                                    cause:$('#notifikasiPenyelesaianGangguanPenyebab').val(),
                                    action:$('#notifikasiPenyelesaianGangguanAction').val(),
                                    client:client.name,
                                    location:client.address,
                                }),
                                email:client.email,
                                cc:cc
                            })
                        break;            
                    }
                    })
            })
        })
    }else{
        alert("Kategori harus dipilih")
    }
})
