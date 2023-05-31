template = obj => {
    return 'Notifikasi Penyelesaian Gangguan'
    +''
    +'Pelanggan Yang Terhormat,'
    +'Informasi penyelesaian gangguan jaringan:'
    +'- Start: '+obj.start+''
    +'- End: '+obj.end+''
    +'- Durasi down: '+obj.durasidown+''
    +'- Penyebab: '+obj.cause+''
    +'- Action: '+obj.action+''
    +'- Status: Solved & Monitoring'
    +''
    +'Dampak gangguan:'
    +'- Nama Pelanggan: '+obj.clientname+' '
    +'- Lokasi: '+obj.location+''
    +''
    +'Kami mohon maaf atas ketidaknyamanan yang terjadi.'
    +'Demikian yang kami sampaikan. Terima kasih.'
    +''
    +'Customer Support PadiNET'
}
module.exports = {
    template:template
}