template = obj => {
    return 'Notifikasi Selesai Maintenance {{h-var}}'

    +'Pelanggan Yang Terhormat,'

    +'Informasi selesai maintenance jaringan:'
    +'- Waktu: {{b-var}}'
    +'- Durasi Down: {{b-var}}'
    +'- Aktifitas: {{b-var}}'
    +'- Status: Done'

    +'Dampak maintenance:'
    +'- Nama Pelanggan: {{b-var}}'
    +'- Lokasi: {{b-var}}'

    +'Demikian yang dapat kami sampaikan. Terima kasih.'

    +'Customer Support PadiNET'
}
module.exports = {
    template:template
}