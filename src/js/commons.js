let aggClinicalAttrs = 0;
let aggFiles = 0;
let aggFileSize = 0;

async function getCountsFromAPI(endpointURL, node) {
  const response = await fetch(
    endpointURL
  );
  const json = await response.json();
  const counts = Object.values(json)
    .map((dataset) => dataset[node])
    .reduce((a, b) => a + b, 0);
  return counts.toString();
}

async function isEndpointURL(s) {
  // if null return false
  if (s === null) {
    return false;
  }
  return s.startsWith("http://") || s.startsWith("https://");
}

async function updateSubjectCounts() {
  for (const key in subjectCounts) {
    subjectCounts[key] = subjectCounts[key].toString();
    const countValue = subjectCounts[key];
    if (await isEndpointURL(countValue)) {
      const nodeName = countValue.split("=")[1];
      const counts = await getCountsFromAPI(countValue, nodeName);
      subjectCounts[key] = counts.toString();
    }
  }
}

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
  // <div class="card common-card text-center">
  return `
    <div>
      <a href="${logoHrefLink}" target="_blank" class="common-card__logo-wrapper">
        <img src="logos/${commonAbbv}.png" class="card-img-top common-card__logo" alt="${commonAbbv} logo">
      </a>
    </div>
    <div class="card-body">
      <div class="card-text">
        <p class=common-card__title>${title}</p>
        ${subjectCount ? `<p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${numberWithCommas(subjectCount)}</span><span class="col-6 common-card__text--right"> Subjects</span></p>` : ''}
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${clinicalAttributeCount.toLocaleString()}</span><span class="col-6 common-card__text--right"> Attributes</span></p>
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${indexdFileCount.toLocaleString()}</span><span class="col-6 common-card__text--right"> Files</span></p>
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${humanFileSize(indexdFileSize)}</span><span class="col-6 common-card__text--right">Total Size </span></p>
      </div>
    </div>
  `;
  // </div>
}

function addPartnerHTML(commonAbbv, title, logoHrefLink){
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
      </div>
    </div>
  </div>
  `;
}

async function createHTMLByIndexdData(abbv, title, logoHrefLink, indexdData, dictionaryEndpoint, section) {
  $.getJSON(dictionaryEndpoint, async function(dictionaryData) {
    let clinicalAttributeCount = 0;
    const nodes = Object.keys(dictionaryData).filter(attr => !attr.startsWith('_'));
    nodes.forEach((node) => {
      clinicalAttributeCount += Object.keys(dictionaryData[node].properties).length;
    });
    const indexdFileCount = (Number.isNaN(indexdData.fileCount)) ? 0 : indexdData.fileCount;
    const indexdTotalFileSize = (Number.isNaN(indexdData.totalFileSize)) ? 0 : indexdData.totalFileSize;
    aggClinicalAttrs += clinicalAttributeCount;
    aggFiles += indexdFileCount;
    aggFileSize += indexdTotalFileSize;
    await updateSubjectCounts();
    $( "#" + abbv ).append(getCommonHTML(
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
  const indexdData = indexdCountsCache[abbv];
  if (!indexdData) {
    $.getJSON(indexdEndpoint, function(indexdData) {
      indexdCountsCache[abbv] = indexdData;
      createHTMLByIndexdData(abbv, title, logoHrefLink, indexdData, dictionaryEndpoint, section)
    });
  } else {
    createHTMLByIndexdData(abbv, title, logoHrefLink, indexdCountsCache[abbv], dictionaryEndpoint, section)
  }
}

function addPartner(abbv, logoHrefLink, title="") {
  $("#partners").append(addPartnerHTML(
    abbv,
    title,
    logoHrefLink,
  ));
}


function addAggHTML(commonAbbv, logoHrefLink, description, repos, title=""){
  return `
  <div class="card common-card text-center col-6">
    <div>
      <a href="${logoHrefLink}" target="_blank" class="common-card__logo-wrapper">
        <img src="logos/${commonAbbv}.png" class="card-img-top common-card__logo" alt="${commonAbbv} logo">
      </a>
    </div>
    <div class="card-body">
      <div class="card-text">
        <p class=common-card__title>${title}</p>
        <p class=mesh__description>${description}</p>
        <p class=common-card__info>Data Repositories:<span class="common-card__number"> ${repos.toLocaleString()}</span></p>

      </div>
    </div>
  </div>
  `;
}

function addAggCommons(abbv, logoHrefLink, description, repos, title=""){
  $("#meshes").append(addAggHTML(
    abbv,
    logoHrefLink,
    description,
    repos,
    title,
    ));
}

// function addAggregatedCommons(abbv, logoHrefLink, oidcEndpoint, dictionaryEndpoint, section, title=""){
//   let result = {'fileCount': 0, 'totalFileSize': 0};
//   $.getJSON(oidcEndpoint, commons => {
//     for (let cachedIndex in indexdCountsCache){
//       result = accumulateIndexdCounts(result, indexdCountsCache[cachedIndex]);
//     }
//     requests = commons.providers.filter(common => !indexdCountsCache.hasOwnProperty(common.base_url)).map(common => {
//       return fetch(`${common.base_url}/index/_stats`);
//     });
//     Promise.all(requests)
//       .then(responses => Promise.all(responses.map(r => r.json())))
//       .then(responseJson => {
//         result = responseJson.reduce((result, indexdData) => accumulateIndexdCounts(result,indexdData), result);
//         createHTMLByIndexdData(abbv, title, logoHrefLink, result, dictionaryEndpoint, section);
//       });
//   });
// }

$( document ).ready(function() {
  // (abbreviation, URL, indexd stats endpoint, dictionary endpoint, section, title (optional))

  // meshes
  addAggCommons("heal", "https://healdata.org/", "The HEAL Data Platform enables search and discovery across multiple data repositories supporting the hundreds of projects that are part of the Helping to End Addiction Long-term (HEAL) Initiative.", 9)
  addAggCommons("brh", "https://brh.data-commons.org/", "The Biomedical Research Hub enables search, discovery and the analysis of data from over 10 data commons from NIH Institutes, Centers and projects.", 11)
  // addCommons("heal", "https://healdata.org/", "https://healdata.org/index/_stats", "https://healdata.org/api/v0/submission/_dictionary/_all", "#meshes");
  // addAggregatedCommons("brh", "https://brh.data-commons.org/", "https://brh.data-commons.org/wts/external_oidc/", "https://brh.data-commons.org/api/v0/submission/_dictionary/_all", "#meshes");

  // commons
  addCommons("kf", "https://portal.kidsfirstdrc.org", "https://data.kidsfirstdrc.org/index/_stats", "https://data.kidsfirstdrc.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("covid19", "https://chicagoland.pandemicresponsecommons.org", "https://chicagoland.pandemicresponsecommons.org/index/_stats", "https://chicagoland.pandemicresponsecommons.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("crdc", "https://nci-crdc.datacommons.io", "https://nci-crdc.datacommons.io/index/_stats", "https://nci-crdc.datacommons.io/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("bdc", "https://gen3.biodatacatalyst.nhlbi.nih.gov", "https://gen3.biodatacatalyst.nhlbi.nih.gov/index/_stats", "https://gen3.biodatacatalyst.nhlbi.nih.gov/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("genomel", "https://genomel.bionimbus.org", "https://genomel.bionimbus.org/index/_stats", "https://genomel.bionimbus.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("edc", "https://portal.occ-data.org", "https://portal.occ-data.org/index/_stats", "https://portal.occ-data.org/api/v0/submission/_dictionary/_all", "#commons");
  // addCommons("acct", "https://acct.bionimbus.org", "https://acct.bionimbus.org/index/_stats", "https://acct.bionimbus.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("anvil", "https://gen3.theanvil.io", "https://gen3.theanvil.io/index/_stats", "https://gen3.theanvil.io/api/v0/submission/_dictionary/_all", "#commons", "The AnVIL");
  addCommons("canine", "https://caninedc.org", "https://caninedc.org/index/_stats", "https://caninedc.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("vpodc", "https://vpodc.data-commons.org", "https://vpodc.data-commons.org/index/_stats", "https://vpodc.data-commons.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("midrc", "https://midrc.org", "https://data.midrc.org/index/_stats", "https://data.midrc.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("nct", "https://accessclinicaldata.niaid.nih.gov", "https://accessclinicaldata.niaid.nih.gov/index/_stats", "https://accessclinicaldata.niaid.nih.gov/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("g3dh", "https://gen3.datacommons.io/", "https://gen3.datacommons.io//index/_stats", "https://gen3.datacommons.io/api/v0/submission/_dictionary/_all", "#commons", "Gen3 Data Hub");
  addCommons("jcoin", "https://jcoin.datacommons.io/", "https://jcoin.datacommons.io/index/_stats", "https://jcoin.datacommons.io/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("bloodpac", "https://data.bloodpac.org", "https://data.bloodpac.org/index/_stats", "https://data.bloodpac.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("va", "https://va.data-commons.org/", "https://va.data-commons.org/index/_stats", "https://va.data-commons.org/api/v0/submission/_dictionary/_all", "#commons");
  addCommons("icgc", "https://icgc.bionimbus.org/", "https://icgc.bionimbus.org/index/_stats", "https://icgc.bionimbus.org/api/v0/submission/_dictionary/_all", "#commons", "ICGC PCAWG & DREAM Challenge");

  // partners
  addPartner("pcdc", "https://portal.pedscommons.org/");
  addPartner("agdr", "https://data.agdr.org.nz/", "Aotearoa Genomics Data Repository");
  addPartner("abc", "https://www.biocommons.org.au/")
  addPartner("NIEHS", "https://www.niehs.nih.gov/")
  addPartner("ARDaC", "https://dev.ardac.org/")
});
