template = obj => {
    return 'Notifikasi Maintenance '+obj.maintenance+''
    +''
    +'Pelanggan Yang Terhormat,'
    +'Informasi maintenance jaringan:'
    +'- Waktu: '+obj.waktu+''
    +'- Durasi Down: '+obj.durasidown+''
    +'- Aktifitas: '+obj.activity+''
    +''
    +'Dampak maintenance:'
    +'- Nama Pelanggan: '+obj.clientname+''
    +'- Lokasi: '+obj.location+''
    +''
    +'Demikian yang dapat kami sampaikan. Terima kasih.'
    +''
    +'Customer Support PadiNET '
}
module.exports = {
    template:template
}