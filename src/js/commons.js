
function humanFileSize(size) {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    const sizeStr = (size / (1024 ** i)).toFixed(2) * 1;
    const suffix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'][i];
    return `${sizeStr} ${suffix}`;
}

function addCommons(logo, endpoint) {
    $.getJSON(endpoint,function(data) {
        $( "#main" ).append( "<div class=\"commons\"><div class=\"commonsimg\"><img src=\"logos/" + logo + ".png\" /></div><p>Total Files: " + data.fileCount.toLocaleString() + "</p><p>Total Size: " + humanFileSize(data.totalFileSize) + "</p></div>");
    });
}

$( document ).ready(function() {
    addCommons("bloodpac", "https://data.bloodpac.org/index/_stats");
    addCommons("brain", "https://data.braincommons.org/index/_stats");
    addCommons("niaid", "https://niaid.bionimbus.org/index/_stats");
    addCommons("crdc", "https://nci-crdc.datacommons.io/index/_stats");
    addCommons("stage", "https://gen3.datastage.io/index/_stats");
    addCommons("genomel", "https://genomel.bionimbus.org/index/_stats");
    addCommons("edc", "https://portal.occ-data.org/index/_stats");
    addCommons("kf", "https://data.kidsfirstdrc.org/index/_stats");
    addCommons("acct", "https://acct.bionimbus.org/index/_stats");
    addCommons("anvil", "https://gen3.theanvil.io/index/_stats");
    addCommons("ibdgc", "https://ibdgc.datacommons.io/index/_stats");
    addCommons("canine", "https://caninedc.org/index/_stats");
    addCommons("pcdc", "https://portal.pedscommons.org/index/_stats");
    addCommons("vpodc", "https://vpodc.org/index/_stats");
});
