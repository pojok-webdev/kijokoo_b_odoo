notifikasiMaintenance = obj => {
    message = '**Notifikasi Maintenance '+obj.header+'**'
    message+= '\n'
    message+= ''
    message+= '  Pelanggan Yang Terhormat,'
    message+= '  Informasi maintenance jaringan:'
    message+= '  \n'
    message+= '    -Waktu: '+obj.waktu+'\n'
    message+= '    -Durasi Down: '+obj.durasidown+'\n'
    message+= '    -Aktifitas: '+obj.aktifitas+'\n'
    message+= '  \n'                  
    message+= '\n'
    message+= '**Dampak maintenance:**'
    message+= '  \n'
    message+= '    -Nama Pelanggan: '+obj.client+'\n'
    message+= '    -Lokasi: '+obj.location+'\n'
    message+= '  \n'
    message+= '\n'
    message+= '**Demikian yang dapat kami sampaikan. Terima kasih.**'
    message+= '\n'
    message+= '**Customer Support PadiNET**'
    message+= '\n'
    return message
}
notifikasiSelesaiMaintenance = obj => {
    message = '**Notifikasi Selesai Maintenance '+obj.header+'**'
    message+= '\n'
    message+= 'Pelanggan Yang Terhormat,'
    message+= '\n'
    message+= 'Informasi selesai maintenance jaringan:'
    message+= '\n'
    message+= '- Waktu: '+obj.waktu+'\n'
    message+= '- Durasi Down: '+obj.durasidown+'\n'
    message+= '- Aktifitas: '+obj.aktifitas+'\n'
    message+= '- Status: Done\n'
    message+= '\n'
    message+= '\n'
    message+= 'Dampak maintenance:'
    message+= '\n'
    message+= '- Nama Pelanggan: '+obj.client+'\n'
    message+= '-  Lokasi: '+obj.location+'\n'
    message+= '\n'
    message+= '\n'
    message+= 'Demikian yang dapat kami sampaikan. Terima kasih.'
    message+= '\n'
    message+= '**Customer Support PadiNET**'
    return message
}
notifikasiGangguan = obj => {
    message = '**Notifikasi gangguan '+obj.header+'**'
    message+= '\n'
    message+= 'Pelanggan Yang Terhormat,'
    message+= '\n'
    message+= 'Informasi gangguan jaringan:'
    message+= '\n'
    message+= '-  Start Problem: '+obj.startproblem+'\n'
    message+= '-  Segmentasi: '+obj.segmentasi+'\n'
    message+= '-  Impact: '+obj.impact+'\n'
    message+= '-  Status: dalam penanganan\n'
    message+= '\n'
    message+= '\n'
    message+= 'Dampak gangguan:'
    message+= '\n'
    message+= '-  Nama Pelanggan: '+obj.client+'\n'
    message+= '-  Lokasi: '+obj.location+'\n'
    message+= '\n'
    message+= 'Kami mohon maaf atas gangguan yang terjadi. Update selanjutnya akan kami sampaikan kembali.'
    message+= '\n' 
    message+= '**Customer Support PadiNET**' 
    return message
}
notifikasiUpdateGangguan = obj => {
    message = 'Pelanggan Yang Terhormat,'
    message+= '\n' 
    message+= 'Update penanganan gangguan:'
    message+= '\n' 
    message+= ' '+obj.gangguan+'\n'
    message+= '\n' 
    message+= 'Update selanjutnya akan kami sampaikan kembali.'
    message+= '\n' 
    message+= '**Customer Support PadiNET**'
    return message
}
notifikasiPenyelesaianGangguan = obj => {
    message = '**Notifikasi Penyelesaian Gangguan**'
    message+= '\n' 
    message+= 'Pelanggan Yang Terhormat,'
    message+= 'Informasi penyelesaian gangguan jaringan:'
    message+= '\n'
    message+= '-  Start: '+obj.start+'\n'
    message+= '-  End: '+obj.end+'\n'
    message+= '-  Durasi down: '+obj.durasidown+'\n'
    message+= '-  Penyebab: '+obj.cause+'\n'
    message+= '-  Action: '+obj.action+'\n'
    message+= '-  Status: Solved & Monitoring\n'
    message+= '\n'
    message+= '\n' 
    message+= 'Dampak gangguan:'
    message+= '\n'
    message+= '-  Nama Pelanggan: '+obj.client+' \n'
    message+= '-  Lokasi:  '+obj.location+' \n'
    message+= '\n'
    message+= '\n' 
    message+= 'Kami mohon maaf atas ketidaknyamanan yang terjadi.'
    message+= 'Demikian yang kami sampaikan. Terima kasih.'
    message+= '\n' 
    message+= '**Customer Support PadiNET**'
    return message
}