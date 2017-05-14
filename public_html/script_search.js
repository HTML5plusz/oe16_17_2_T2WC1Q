var get = "";
var get_search_ch_idname = "championship/idname/all";
var get_search_se_idname = "seria/idname/all";

var r_search_ch_idname = new XMLHttpRequest();
var r_search_se_idname = new XMLHttpRequest();

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

function rGet_search_ch_init() {
    var ch = JSON.parse(r_search_ch_idname.responseText);

    var searchbox = document.getElementById("searchbox");
    searchbox.value = searchtext;

    var table = document.getElementById("search-list-ch");

    table.innerHTML = "";
    var j = 0;
    for (var i = 0; i < ch.length; i++) {
        var chname = "n/a";
        var chid = "n/a";
        var cherror = false;

        try { chname = ch[i].name; } catch (e) { cherror = true; }
        try { chid = ch[i].id; } catch (e) { cherror = true; }

        if (cherror == false) {
            var idx = chname.toLowerCase().indexOf(searchtext.toLowerCase());
            if (idx > -1) {
                var row = table.insertRow(j);
                j++;
                var col_result = row.insertCell(0);
                col_result.innerHTML = chname.substring(0, idx);
                col_result.innerHTML += '<font class="searchresult-text">' + chname.substring(idx, idx + searchtext.length) + '</font>';
                col_result.innerHTML += chname.substring(idx + searchtext.length, chname.length);
                var col_show = row.insertCell(1);
                col_show.innerHTML = '<a href="site_championship.html?id=' + chid + '" class="btn btn-primary header-list-btn" role="button">' + "Tovább a részletekhez" + '</a>';
            }
        }
    }
}

function rGet_search_se_init() {
    var se = JSON.parse(r_search_se_idname.responseText);

    var table = document.getElementById("search-list-se");

    table.innerHTML = "";
    var j = 0;
    for (var i = 0; i < se.length; i++) {
        var idx = se[i].name.toLowerCase().indexOf(searchtext.toLowerCase());
        if (idx > -1) {
            var row = table.insertRow(j);
            j++;
            var col_result = row.insertCell(0);
            col_result.innerHTML = se[i].name.substring(0, idx);
            col_result.innerHTML += '<font class="searchresult-text">' + se[i].name.substring(idx, idx + searchtext.length) + '</font>';
            col_result.innerHTML += se[i].name.substring(idx + searchtext.length, se[i].name.length);
            var col_show = row.insertCell(1);
            col_show.innerHTML = '<a href="site_seria.html?id=' + se[i].id + '" class="btn btn-primary header-list-btn" role="button">' + "Tovább a részletekhez" + '</a>';
        }
    }
}

readIP();
var url = window.location.href;
var searchtext = "";
if (url.indexOf('?') > -1) {
    searchtext = decodeURIComponent(url.split('?')[1].split('=')[1]);

    r_search_ch_idname.addEventListener('load', rGet_search_ch_init);
    r_search_ch_idname.open("GET", get + get_search_ch_idname, true);
    r_search_ch_idname.send();

    r_search_se_idname.addEventListener('load', rGet_search_se_init);
    r_search_se_idname.open("GET", get + get_search_se_idname, true);
    r_search_se_idname.send();
}