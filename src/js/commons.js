let aggClinicalAttrs = 0;
let aggFiles = 0;
let aggFileSize = 0;

function addTotals() {
  let total = 0;
  Object.keys(subjectCounts).forEach((commons) => {
    total += subjectCounts[commons] ? parseInt(subjectCounts[commons].replace(/,/g, '')) : 0;
  });
  $( ".total-count-card").remove();
  $( "#header" ).append(`
    <div class="total-count-card">
      <div class="total-count-card__number">${numberWithCommas(total)}</div>
      <div class="total-count-card__text">Total Subjects</div>
    </div>
    <div class="total-count-card">
      <div class="total-count-card__number">${numberWithCommas(aggFiles)}</div>
      <div class="total-count-card__text">Total Files</div>
    </div>
    <div class="total-count-card">
      <div class="total-count-card__number">${humanFileSize(aggFileSize)}</div>
      <div class="total-count-card__text">Total File Size</div>
    </div>
  `);
}

function numberWithCommas(str) {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function humanFileSize(size) {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    const sizeStr = (size / (1000 ** i)).toFixed(2) * 1;
    const suffix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'][i];
    return `${sizeStr} ${suffix}`;
}

function getCommonHTML(commonAbbv, logoHrefLink, subjectCount, clinicalAttributeCount, indexdFileCount, indexdFileSize) {
  return `
  <div class="card common-card text-center">
    <div>
      <a href="${logoHrefLink}" target="_blank" class="common-card__logo-wrapper">
        <img src="logos/${commonAbbv}.png" class="card-img-top common-card__logo" alt="...">
      </a>
    </div>
    <div class="card-body">
      <p class="card-text">
        ${subjectCount ? `<p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${subjectCount}</span><span class="col-6 common-card__text--right"> Subjects</span></p>` : ''}
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${clinicalAttributeCount.toLocaleString()}</span><span class="col-6 common-card__text--right"> Attributes</span></p>
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${indexdFileCount.toLocaleString()}</span><span class="col-6 common-card__text--right"> Files</span></p>
        <p class="common-card__info"><span class="col-6 common-card__text--left">Total Size </span><span class="common-card__number col-6 common-card__text--right">${humanFileSize(indexdFileSize)}</span></p>
      </p>
    </div>
  </div>
  `;
}

function addCommons(abbv, logoHrefLink, indexdEndpoint, dictionaryEndpoint) {
  $.getJSON(indexdEndpoint,function(indexdData) {
    $.getJSON(dictionaryEndpoint, function(dictionaryData) {
      let clinicalAttributeCount = 0;
      const nodes = Object.keys(dictionaryData).filter(attr => !attr.startsWith('_'));
      nodes.forEach((node) => {
        clinicalAttributeCount += Object.keys(dictionaryData[node].properties).length;
      });
      aggClinicalAttrs += clinicalAttributeCount;
      aggFiles += indexdData.fileCount;
      aggFileSize += indexdData.totalFileSize;
      $( "#main" ).append(getCommonHTML(
        abbv,
        logoHrefLink,
        subjectCounts[abbv],
        clinicalAttributeCount,
        indexdData.fileCount,
        indexdData.totalFileSize,
      ));
      addTotals();
    });
  });
}

$( document ).ready(function() {
  addCommons("bloodpac", "https://data.bloodpac.org", "https://data.bloodpac.org/index/_stats", "https://data.bloodpac.org/api/v0/submission/_dictionary/_all");
  addCommons("covid19", "https://chicagoland.pandemicresponsecommons.org", "https://chicagoland.pandemicresponsecommons.org/index/_stats", "https://chicagoland.pandemicresponsecommons.org/api/v0/submission/_dictionary/_all");
  addCommons("niaid", "https://niaid.bionimbus.org", "https://niaid.bionimbus.org/index/_stats", "https://niaid.bionimbus.org/api/v0/submission/_dictionary/_all");
  addCommons("crdc", "https://nci-crdc.datacommons.io", "https://nci-crdc.datacommons.io/index/_stats", "https://nci-crdc.datacommons.io/api/v0/submission/_dictionary/_all");
  addCommons("stage", "https://gen3.biodatacatalyst.nhlbi.nih.gov", "https://gen3.biodatacatalyst.nhlbi.nih.gov/index/_stats", "https://gen3.biodatacatalyst.nhlbi.nih.gov/api/v0/submission/_dictionary/_all");
  addCommons("genomel", "https://genomel.bionimbus.org", "https://genomel.bionimbus.org/index/_stats", "https://genomel.bionimbus.org/api/v0/submission/_dictionary/_all");
  addCommons("edc", "https://portal.occ-data.org", "https://portal.occ-data.org/index/_stats", "https://portal.occ-data.org/api/v0/submission/_dictionary/_all");
  addCommons("kf", "https://data.kidsfirstdrc.org", "https://data.kidsfirstdrc.org/index/_stats", "https://data.kidsfirstdrc.org/api/v0/submission/_dictionary/_all");
  addCommons("acct", "https://acct.bionimbus.org", "https://acct.bionimbus.org/index/_stats", "https://acct.bionimbus.org/api/v0/submission/_dictionary/_all");
  addCommons("anvil", "https://gen3.theanvil.io", "https://gen3.theanvil.io/index/_stats", "https://gen3.theanvil.io/api/v0/submission/_dictionary/_all");
  addCommons("ibdgc", "https://ibdgc.datacommons.io", "https://ibdgc.datacommons.io/index/_stats", "https://ibdgc.datacommons.io/api/v0/submission/_dictionary/_all");
  addCommons("canine", "https://caninedc.org", "https://caninedc.org/index/_stats", "https://caninedc.org/api/v0/submission/_dictionary/_all");
  addCommons("vpodc", "https://vpodc.org", "https://vpodc.org/index/_stats", "https://vpodc.org/api/v0/submission/_dictionary/_all");
  addCommons("pcdc", "https://portal.pedscommons.org", "https://portal.pedscommons.org/index/_stats", "https://portal.pedscommons.org/api/v0/submission/_dictionary/_all");
  addCommons("midrc", "https://data.midrc.org", "https://data.midrc.org/index/_stats", "https://data.midrc.org/api/v0/submission/_dictionary/_all");
});
