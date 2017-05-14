var get = "";
var get_ch_id = "championship/";

var r_ch_id = new XMLHttpRequest();

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

function rGet_ch_init() {
    var ch = JSON.parse(r_ch_id.responseText);
    
    var breadcrumbs = document.getElementById("ch_bc");
    breadcrumbs.innerHTML = ch.name;

    var title = document.getElementById("ch_title");
    title.innerHTML = '<a href="site_championships.html" class="btn btn-primary header-list-btn" role="button"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>' + "Vissza a bajnokságokhoz" + '</a>\n';
    title.innerHTML += '<h1 class="ch-title">' + ch.name + '</h1>';
    title.innerHTML += '<h1 class="ch-desc">' + ch.description + '</h1>';
    
    var table = document.getElementById("ch_sp_list");
    
    table.innerHTML = "";
    for (var i = 0; i < ch.event.length; i++) {
        var row = table.insertRow(i);
        var col_details = row.insertCell(0);
        var style = 'style="animation-delay:' + (i / 8) + 's;"';
        var details = '<div class="panel panel-default ch-panel" ' + style + '>\n';
        details += '<div class="panel-body">\n';
        details += '<h3>' + ch.event[i].sport.name + '</h3><br>\n';
        details += '<h5>' + ch.event[i].sport.description + '</h5><br>\n';
        details += '</div>\n';
        details += '</div>\n';
        col_details.innerHTML = details;
        col_details.style.animationDelay = "1s";
        
        var specs = "";
        if (ch.event[i].sport.specialization.length > 0) {
            specs += '<div class="list-group">\n';
            for (var j = 0; j < ch.event[i].sport.specialization.length; j++) {
                var specsStyle = 'style="animation-delay:' + ((i / 8) + (j / 8)) + 's;"';
                specs += '<a href="#" class="list-group-item ch-specs-item" ' + specsStyle + '>';
                specs += ch.event[i].sport.specialization[j].name + '<br>\n';
                specs += '</a>\n';
            }
            specs += '</div>';
        }
        else {
            specs += "N/A";
        }
        var col_specs = row.insertCell(1);
        col_specs.innerHTML = specs;
    }
}

readIP();
var url = window.location.href;
if (url.indexOf('?') > -1) {
    var id = url.split('?')[1].split('=')[1];
    
    r_ch_id.addEventListener('load', rGet_ch_init);
    r_ch_id.open("GET", get + get_ch_id + id, true);
    r_ch_id.send();
}