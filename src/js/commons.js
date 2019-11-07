function humanFileSize(size) {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    const sizeStr = (size / (1024 ** i)).toFixed(2) * 1;
    const suffix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'][i];
    return `${sizeStr} ${suffix}`;
}

function addCommons(abbv, indexdEndpoint, dictionaryEndpoint) {
    $.getJSON(indexdEndpoint,function(indexdData) {
      $.getJSON(dictionaryEndpoint, function(dictionaryData) {
        let clinicalAttributeCount = 0;
        const nodes = Object.keys(dictionaryData).filter(attr => !attr.startsWith('_'));
        nodes.forEach((node) => {
          clinicalAttributeCount += Object.keys(dictionaryData[node].properties).length;
        });
        let subjectCount = subjectCounts[abbv] > 0 ? ("<p>Number of Subjects: " + subjectCounts[abbv]) : "";
        $( "#main" ).append( "<div class=\"commons\"><div class=\"commonsimg\"><img src=\"logos/" + abbv + ".png\" /></div>" + subjectCount + "<p>Number of Attributes: " + clinicalAttributeCount.toLocaleString() + "</p><p>Total Files: " + indexdData.fileCount.toLocaleString() + "</p><p>Total Size: " + humanFileSize(indexdData.totalFileSize) + "</p></div>");
      });
    });
}

$( document ).ready(function() {
    addCommons("bloodpac", "https://data.bloodpac.org/index/_stats", "https://data.bloodpac.org/api/v0/submission/_dictionary/_all");
    addCommons("brain", "https://data.braincommons.org/index/_stats", "https://data.braincommons.org/api/v0/submission/_dictionary/_all");
    addCommons("niaid", "https://niaid.bionimbus.org/index/_stats", "https://niaid.bionimbus.org/api/v0/submission/_dictionary/_all");
    addCommons("crdc", "https://nci-crdc.datacommons.io/index/_stats", "https://nci-crdc.datacommons.io/api/v0/submission/_dictionary/_all");
    addCommons("stage", "https://gen3.datastage.io/index/_stats", "https://gen3.datastage.io/api/v0/submission/_dictionary/_all");
    addCommons("genomel", "https://genomel.bionimbus.org/index/_stats", "https://genomel.bionimbus.org/api/v0/submission/_dictionary/_all");
    addCommons("edc", "https://portal.occ-data.org/index/_stats", "https://portal.occ-data.org/api/v0/submission/_dictionary/_all");
    addCommons("kf", "https://data.kidsfirstdrc.org/index/_stats", "https://data.kidsfirstdrc.org/api/v0/submission/_dictionary/_all");
    addCommons("acct", "https://acct.bionimbus.org/index/_stats", "https://acct.bionimbus.org/api/v0/submission/_dictionary/_all");
    addCommons("anvil", "https://gen3.theanvil.io/index/_stats", "https://gen3.theanvil.io/api/v0/submission/_dictionary/_all");
    addCommons("ibdgc", "https://ibdgc.datacommons.io/index/_stats", "https://ibdgc.datacommons.io/api/v0/submission/_dictionary/_all");
    addCommons("canine", "https://caninedc.org/index/_stats", "https://caninedc.org/api/v0/submission/_dictionary/_all");
    addCommons("vpodc", "https://vpodc.org/index/_stats", "https://vpodc.org/api/v0/submission/_dictionary/_all");
    addCommons("pcdc", "https://portal.pedscommons.org/index/_stats", "https://portal.pedscommons.org/api/v0/submission/_dictionary/_all");
});
