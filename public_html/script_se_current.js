var get = "";
var get_se_id = "seria/";
var get_ch_all = "championship/entity/all";

var r_se_id = new XMLHttpRequest();
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
    var table = document.getElementById("se_ch_list");

    table.innerHTML = "";
    var id = url.split('?')[1].split('=')[1];
    var j = 0;
    for (var i = 0; i < ch.length; i++) {
        if (ch[i].seria !== null) {
            if (ch[i].seria.id == id) {
                var row = table.insertRow(j);
                row.setAttribute("style", 'animation-delay: ' + (i / 16) + 's;');
                j++;
                var col_name = row.insertCell(0);
                col_name.innerHTML = ch[i].name;
                var col_season = row.insertCell(1);
                col_season.innerHTML = ch[i].season.name;
                var col_show = row.insertCell(2);
                col_show.innerHTML = '<a href="site_championship.html?id=' + ch[i].id + '" class="btn btn-primary header-list-btn" role="button">' + "Tovább a részletekhez" + '</a>';
            }
        }
    }
}

function rGet_se_init() {
    var se = JSON.parse(r_se_id.responseText);

    var breadcrumbs = document.getElementById("se_bc");
    breadcrumbs.innerHTML = se.name;

    var title = document.getElementById("se_title");
    title.innerHTML = '<a href="site_series.html" class="btn btn-primary header-list-btn" role="button"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>' + "Vissza a szériákhoz" + '</a>\n';
    title.innerHTML += '<h1 class="se-title">' + se.name + '</h1>';
    title.innerHTML += '<h1 class="se-desc">' + se.description + '</h1>';
}

readIP();
r_ch_all.addEventListener('load', rGet_ch_init_list);
r_ch_all.open("GET", get + get_ch_all, true);
r_ch_all.send();

var url = window.location.href;
if (url.indexOf('?') > -1) {
    var id = url.split('?')[1].split('=')[1];

    r_se_id.addEventListener('load', rGet_se_init);
    r_se_id.open("GET", get + get_se_id + id, true);
    r_se_id.send();
}