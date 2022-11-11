let aggClinicalAttrs = 0;
let aggFiles = 0;
let aggFileSize = 0;

function addTotals() {
  let total = 0;
  Object.keys(subjectCounts).forEach((commons) => {
    if(commons != "brh"){
      // brh is a mesh and we don't want to count subjects twice in the total
      total += subjectCounts[commons] ? parseInt(subjectCounts[commons].replace(/,/g, '')) : 0;
    }
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
    const sizeStr = (size / (1000 ** i)).toFixed(2);
    const suffix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'][i];
    return `${sizeStr} ${suffix}`;
}

function accumulateIndexdCounts(total, current){
  total['fileCount'] += current['fileCount'];
  total['totalFileSize'] += current['totalFileSize'];
  return total;
}

function getCommonHTML(commonAbbv, title, logoHrefLink, subjectCount, clinicalAttributeCount, indexdFileCount, indexdFileSize) {
  return `
  <div class="card common-card text-center">
    <div>
      <a href="${logoHrefLink}" target="_blank" class="common-card__logo-wrapper">
        <img src="logos/${commonAbbv}.png" class="card-img-top common-card__logo" alt="${commonAbbv} logo">
      </a>
    </div>
    <div class="card-body">
      <div class="card-text">
        <p class=common-card__title>${title}</p>
        ${subjectCount ? `<p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${subjectCount}</span><span class="col-6 common-card__text--right"> Subjects</span></p>` : ''}
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${clinicalAttributeCount.toLocaleString()}</span><span class="col-6 common-card__text--right"> Attributes</span></p>
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${indexdFileCount.toLocaleString()}</span><span class="col-6 common-card__text--right"> Files</span></p>
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${humanFileSize(indexdFileSize)}</span><span class="col-6 common-card__text--right">Total Size </span></p>
      </div>
    </div>
  </div>
  `;
}

async function createHTMLByIndexdData(abbv, title, logoHrefLink, indexdData, dictionaryEndpoint, section) {
  $.getJSON(dictionaryEndpoint, function(dictionaryData) {
    let clinicalAttributeCount = 0;
    const nodes = Object.keys(dictionaryData).filter(attr => !attr.startsWith('_'));
    nodes.forEach((node) => {
      clinicalAttributeCount += Object.keys(dictionaryData[node].properties).length;
    });
    const indexdFileCount = (Number.isNaN(indexdData.fileCount)) ? 0 : indexdData.fileCount;
    const indexdTotalFileSize = (Number.isNaN(indexdData.totalFileSize)) ? 0 : indexdData.totalFileSize;
    if(abbv != "brh"){
      // brh is a mesh of existing data commons, therefore we don't want to count them twice in the total
      aggClinicalAttrs += clinicalAttributeCount;
      aggFiles += indexdFileCount;
      aggFileSize += indexdTotalFileSize;
    }
    $( section ).append(getCommonHTML(
      abbv,
      title,
      logoHrefLink,
      subjectCounts[abbv],
      clinicalAttributeCount,
      indexdFileCount,
      indexdTotalFileSize,
    ));
    addTotals();
  });
}

async function addCommons(abbv, logoHrefLink, indexdEndpoint, dictionaryEndpoint, section, title="",) {
  // only fetch from indexd endpoint if there is no local data cache in indexdCounts.js
  // to prevent issue of a slow IndexD in some envs
  const indexdData = indexdCounts[abbv];
  if (!indexdData) {
  $.getJSON(indexdEndpoint, function(indexdData) {
    // cacheIndexdCounts[indexdEndpoint] = indexdData;
    createHTMLByIndexdData(abbv, title, logoHrefLink, indexdData, dictionaryEndpoint, section)
  });
  } else {
    createHTMLByIndexdData(abbv, title, logoHrefLink, indexdCounts[abbv], dictionaryEndpoint, section)
  }
}

function addAggregatedCommons(abbv, logoHrefLink, oidcEndpoint, dictionaryEndpoint, section, title=""){
  let result = {'fileCount': 0, 'totalFileSize': 0};
  $.getJSON(oidcEndpoint, commons => {
    for (let cachedIndex in cacheIndexdCounts){
      result = accumulateIndexdCounts(result, cacheIndexdCounts[cachedIndex]);
    }
    requests = commons.providers.filter(common => !cacheIndexdCounts.hasOwnProperty(common.base_url)).map(common => {
      return fetch(`${common.base_url}/index/_stats`);
    });
    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(responseJson => {
        result = responseJson.reduce((result, indexdData) => accumulateIndexdCounts(result,indexdData), result);
        createHTMLByIndexdData(abbv, title, logoHrefLink, result, dictionaryEndpoint, section);
      });
  });
}

$( document ).ready(function() {
  // (abbreviation, URL, indexd stats endpoint, dictionary endpoint, section, title (optional))
  // meshes
  addCommons("heal", "https://healdata.org/", "https://healdata.org/index/_stats", "https://healdata.org/api/v0/submission/_dictionary/_all", "#meshes");
  addAggregatedCommons("brh", "https://brh.data-commons.org/", "https://brh.data-commons.org/wts/external_oidc/", "https://brh.data-commons.org/api/v0/submission/_dictionary/_all", "#meshes");

  // commons
  addCommons("bloodpac", "https://data.bloodpac.org", "https://data.bloodpac.org/index/_stats", "https://data.bloodpac.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("covid19", "https://chicagoland.pandemicresponsecommons.org", "https://chicagoland.pandemicresponsecommons.org/index/_stats", "https://chicagoland.pandemicresponsecommons.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("crdc", "https://nci-crdc.datacommons.io", "https://nci-crdc.datacommons.io/index/_stats", "https://nci-crdc.datacommons.io/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("stage", "https://gen3.biodatacatalyst.nhlbi.nih.gov", "https://gen3.biodatacatalyst.nhlbi.nih.gov/index/_stats", "https://gen3.biodatacatalyst.nhlbi.nih.gov/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("genomel", "https://genomel.bionimbus.org", "https://genomel.bionimbus.org/index/_stats", "https://genomel.bionimbus.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("edc", "https://portal.occ-data.org", "https://portal.occ-data.org/index/_stats", "https://portal.occ-data.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("kf", "https://data.kidsfirstdrc.org", "https://data.kidsfirstdrc.org/index/_stats", "https://data.kidsfirstdrc.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("acct", "https://acct.bionimbus.org", "https://acct.bionimbus.org/index/_stats", "https://acct.bionimbus.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("anvil", "https://gen3.theanvil.io", "https://gen3.theanvil.io/index/_stats", "https://gen3.theanvil.io/api/v0/submission/_dictionary/_all", "#commons", "The AnVIL");
  addCommons("ibdgc", "https://ibdgc.datacommons.io", "https://ibdgc.datacommons.io/index/_stats", "https://ibdgc.datacommons.io/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("canine", "https://caninedc.org", "https://caninedc.org/index/_stats", "https://caninedc.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("vpodc", "https://vpodc.data-commons.org", "https://vpodc.data-commons.org/index/_stats", "https://vpodc.data-commons.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("midrc", "https://data.midrc.org", "https://data.midrc.org/index/_stats", "https://data.midrc.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("nct", "https://accessclinicaldata.niaid.nih.gov", "https://accessclinicaldata.niaid.nih.gov/index/_stats", "https://accessclinicaldata.niaid.nih.gov/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("oadc", "https://gen3.datacommons.io/", "https://gen3.datacommons.io//index/_stats", "https://gen3.datacommons.io/api/v0/submission/_dictionary/_all", "#commons", "Open Access Data Commons");
  addCommons("jcoin", "https://jcoin.datacommons.io/", "https://jcoin.datacommons.io/index/_stats", "https://jcoin.datacommons.io/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("va", "https://va.data-commons.org/", "https://va.data-commons.org/index/_stats", "https://va.data-commons.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("icgc", "https://icgc.bionimbus.org/", "https://icgc.bionimbus.org/index/_stats", "https://icgc.bionimbus.org/api/v0/submission/_dictionary/_all", "#commons", "ICGC PCAWG & DREAM Challenge");

});
