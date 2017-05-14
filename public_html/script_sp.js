var get = "http://94.177.230.203:8080/sport/rest/";
var get_sp_all = "sport/entity/all";

var r_sp_all = new XMLHttpRequest();

function rGet_sp_init() {
    var sp = JSON.parse(r_sp_all.responseText);
    
    var table = document.getElementById("sp_list");
    
    table.innerHTML = "";
    for (var i = 0; i < sp.length; i++) {
        var row = table.insertRow(i);
        var col_details = row.insertCell(0);
        var style = 'style="animation-delay:' + (i / 8) + 's;"';
        var details = '<div class="panel panel-default sp-panel" ' + style + '>\n';
        details += '<div class="panel-body">\n';
        details += '<h3>' + sp[i].name + '</h3><br>\n';
        details += '<h5>' + sp[i].description + '</h5><br>\n';
        details += '</div>\n';
        details += '</div>\n';
        col_details.innerHTML = details;
        col_details.style.animationDelay = "1s";
        
        var specs = "";
        if (sp[i].specialization.length > 0) {
            specs += '<div class="list-group">\n';
            for (var j = 0; j < sp[i].specialization.length; j++) {
                var specsStyle = 'style="animation-delay:' + ((i / 8) + (j / 8)) + 's;"';
                specs += '<a href="#" class="list-group-item sp-specs-item" ' + specsStyle + '>';
                specs += '<font class="specs-title">' + sp[i].specialization[j].name + '</font><br>\n';
                if (sp[i].specialization[j].description !== null) {
                    if (sp[i].specialization[j].description !== "") {
                        specs += sp[i].specialization[j].description + '<br>\n';
                    }
                }
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

r_sp_all.addEventListener('load', rGet_sp_init);
r_sp_all.open("GET", get + get_sp_all, true);
r_sp_all.send();