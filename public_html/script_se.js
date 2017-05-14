var get = "";
var get_se_all = "seria/entity/all";

var r_se_all = new XMLHttpRequest();

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

function rGet_se_init_list() {
    var se = JSON.parse(r_se_all.responseText);
    var table = document.getElementById("se_list");

    table.innerHTML = "";
    for (var i = 0; i < se.length; i++) {
        var row = table.insertRow(i);
        row.setAttribute("style", 'animation-delay: ' + (i / 16) + 's;');
        var col_name = row.insertCell(0);
        col_name.innerHTML = se[i].name;
        var col_show = row.insertCell(1);
        col_show.innerHTML = '<a href="site_seria.html?id=' + se[i].id + '" class="btn btn-primary header-list-btn" role="button">' + "Tovább a részletekhez" + '</a>';
    }
}

readIP();
r_se_all.addEventListener('load', rGet_se_init_list);
r_se_all.open("GET", get + get_se_all, true);
r_se_all.send();