template = obj => {
    return 'Notifikasi gangguan '+obj.gangguan+''
    +''
    +'Pelanggan Yang Terhormat,'
    +''
    +'Informasi gangguan jaringan:'
    +'- Start Problem: '+obj.start+''
    +'- Segmentasi: '+obj.segmentation+''
    +'- Impact: '+obj.impact+''
    +'- Status: dalam penanganan'
    +''
    +'Dampak gangguan:'
    +'- Nama Pelanggan: '+obj.clientname+''
    +'- Lokasi: '+obj.location+''
    +'Kami mohon maaf atas gangguan yang terjadi. Update selanjutnya akan kami sampaikan kembali.'
    +''
    +'Customer Support PadiNET'
}
module.exports = {
    template:template
}