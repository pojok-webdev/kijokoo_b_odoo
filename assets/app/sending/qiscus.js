doQiscus = _ => {
    var settings = {
        "url": "https://multichannel.qiscus.com/api/v2/admin/broadcast/client_broadcast",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Qiscus-secret-key": "58a8ac62fac448d33ab6978e16b372dd",
          "Content-Type": "application/json",
          "Qiscus-App-Id": "idmsw-g4y2wgpk6uv4vql"
        },
        "data": JSON.stringify({
          "channel_id": "2687",
          "namespace": "da19e231_1789_4fc2_ab74_fed5fcbcf0f0",
          "language": "id",
          "hide_variables": false,
          "template_name": "notifikasi_maintenance_rev2",
          "header_value": {
            "type": "text",
            "text": "Qiscus Test"
          },
          "variables": [
            "Ticket 001",
            "Ticket 002",
            "Ticket 003",
            "Ticket 004",
            "Ticket 005",
            "Ticket 006",
            "Ticket 007"
          ],
          "phone_numbers": [
            "628813272107","6281333831997"
          ]
        }),
        };
        
        
        $.ajax(settings).done(function (response) {
        console.log(response);
        });
}
doSendQiscus = obj => {
    var settings = {
        "url": "https://multichannel.qiscus.com/api/v2/admin/broadcast/client_broadcast",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Qiscus-secret-key": "58a8ac62fac448d33ab6978e16b372dd",
          "Content-Type": "application/json",
          "Qiscus-App-Id": "idmsw-g4y2wgpk6uv4vql"
        },
        "data": JSON.stringify({
          "channel_id": "2687",
          "namespace": "da19e231_1789_4fc2_ab74_fed5fcbcf0f0",
          "language": "id",
          "hide_variables": false,
          "template_name": obj.template,
          "header_value": {
            "type": "text",
            "text": obj.header_value
          },
          "variables": obj.variables,
          "phone_numbers": obj.picwa
        }),
        };
        
        
        $.ajax(settings).done(function (response) {
        console.log(response);
        });
}
