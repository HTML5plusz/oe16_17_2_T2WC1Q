var get = "";
var get_ch_all = "championship/entity/all";

var r_ch_all = new XMLHttpRequest();

function readIP() {
    var cookies = document.cookie;
    var idx = cookies.indexOf("restip=");
    if (idx > -1) {
        var ip = "";
        var cookiesraw = cookies.split(';');
        for (i in cookiesraw) {
            var data = cookiesraw[i].split('=');
            if (data[0] == "restip") {
                ip = data[1];
                break;
            }
        }
        get = "http://" + ip + ":8080/sport/rest/";
    } else {
        var ip = prompt("Írd be a REST API IP címét (port nélkül): ", '');
        var error = false;
        var segments = ip.split(".");

        var chksum = 0;
        for (i in segments) { chksum += parseInt(segments[i]); }
        if (chksum !== 704) { error = true; }

        if (error === false) {
            document.cookie = "restip=" + ip;
            get = "http://" + ip + ":8080/sport/rest/";
        } else {
            readIP();
        }
    }
}

function rGet_ch_init_list() {
    var ch = JSON.parse(r_ch_all.responseText);
    var table = document.getElementById("ch_list");

    table.innerHTML = "";
    for (var i = 0; i < ch.length; i++) {
        var chname = "n/a";
        var chseria = "n/a";
        var chseason = "n/a";
        var chid = "n/a";
        var cherror = false;

        try { chname = ch[i].name; } catch (e) { cherror = true; }
        try { chid = ch[i].id; } catch (e) { cherror = true; }
        try { chseria = ch[i].seria.name; } catch (e) { cherror = true; }
        try { chseason = ch[i].season.name; } catch (e) { cherror = true; }
        
        var row = table.insertRow(i);
        row.className = "table-row";
        row.setAttribute("style", 'animation-delay: ' + (i / 16) + 's;');
        var col_name = row.insertCell(0);
        col_name.innerHTML = chname;
        var col_seria = row.insertCell(1);
        col_seria.innerHTML = chseria;
        var col_season = row.insertCell(2);
        col_season.innerHTML = chseason;
        var col_show = row.insertCell(3);
        if (cherror == false) {
            col_show.innerHTML = '<a href="site_championship.html?id=' + chid + '" class="btn btn-primary header-list-btn" role="button">' + "Tovább a részletekhez" + '</a>';
        } else {
            row.className = "table-row-error";
        }

    }
}

readIP();
r_ch_all.addEventListener('load', rGet_ch_init_list);
r_ch_all.open("GET", get + get_ch_all, true);
r_ch_all.send();