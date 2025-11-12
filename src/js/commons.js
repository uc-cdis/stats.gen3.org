let aggClinicalAttrs = 0;
let aggFiles = 0;
let aggFileSize = 0;
let aggSubjectCount = 0;

function displayTotals() {
  $(".total-count-card").remove();
  $("#header").append(`
    <div class="total-count-card">
      <div class="total-count-card__number">${numberWithCommas(aggSubjectCount)}</div>
      <div class="total-count-card__text">Total Subjects</div>
    </div>
    <div class="total-count-card">
      <div class="total-count-card__number">${numberWithCommas(aggFiles)}</div>
      <div class="total-count-card__text">Number of FAIR Data Objects</div>
    </div>
    <div class="total-count-card">
      <div class="total-count-card__number">${humanFileSize(aggFileSize)}</div>
      <div class="total-count-card__text">Size of FAIR Data Objects</div>
    </div>
    <div class="total-count-card">
      <div class="total-count-card__number">300,000+</div>
      <div class="total-count-card__text">Core Hours Per Month</div>
    </div>
    <div class="total-count-card">
      <div class="total-count-card__number">14+</div>
      <div class="total-count-card__text">External Oganizations</div>
    </div>
    <div class="total-count-card">
      <div class="total-count-card__number">3600+</div>
      <div class="total-count-card__text">Number of Studies in Gen3 Meshes</div>
    </div>
  `);
}
// update these last categories by looking for data here: https://docs.google.com/spreadsheets/d/1qsF9cMJMlmOW4e9Ox5WF7IGzNfz01pnf7JkQ7B0BKb0/edit?gid=2108603732#gid=2108603732

function numberWithCommas(str) {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function humanFileSize(size) {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizeStr = (size / (1000 ** i)).toFixed(2);
  const suffix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'][i];
  return `${sizeStr} ${suffix}`;
}

function accumulateIndexdCounts(total, current) {
  total['fileCount'] += current['fileCount'];
  total['totalFileSize'] += current['totalFileSize'];
  return total;
}

function addPartner(commonAbbv, logoHrefLink, title = "") {
  let logoHtml = "";

  if (logoHrefLink) {
    // If there's a link, wrap the image in <a>
    logoHtml = `
      <a href="${logoHrefLink}" target="_blank" class="common-card__logo-wrapper">
        <img src="logos/${commonAbbv}.png" class="card-img-top common-card__logo" alt="${commonAbbv} logo">
      </a>
    `;
  } else {
    // If no link, just the image
    logoHtml = `
      <div class="common-card__logo-wrapper">
        <img src="logos/${commonAbbv}.png" class="card-img-top common-card__logo" alt="${commonAbbv} logo">
      </div>
    `;
  }

  let html = `
    <div class="card common-card text-center">
      <div>
        ${logoHtml}
      </div>
      <div class="card-body">
        <div class="card-text">
          <p class="common-card__title">${title}</p>
        </div>
      </div>
    </div>
  `;
  $("#partners").append(html);
}

const excludeSystemProperties = (node) => {
  const properties = node.properties && Object.keys(node.properties)
    .filter((key) => (node.systemProperties ? !node.systemProperties.includes(key) : true))
    .reduce((acc, key) => {
      acc[key] = node.properties[key];
      return acc;
    }, {});
  return properties;
};

async function addCommons(abbv, logoHrefLink, dictionaryEndpoint, subjectCount, fileCount, totalFileSize, title = "") {
  $.getJSON(dictionaryEndpoint, async function (dictionaryData) {
    // Filtering nodes and attributes based on the logic in data-portal:
    // - https://github.com/uc-cdis/data-portal/blob/0ce1345ee1a7ed9b25c22912c4961e60b7aec840/src/Submission/utils.js#L1
    // - https://github.com/uc-cdis/data-portal/blob/47fae20700d3e162eb9b660f19ae6e5c2be6f2c4/src/DataDictionary/utils.js#L146
    let clinicalAttributeCount = 0;
    const nodes = Object.keys(dictionaryData).filter(attr => !attr.startsWith('_') && attr === dictionaryData[attr].id);
    nodes.forEach((node) => {
      if (dictionaryData[node].category && dictionaryData[node].id) {
        clinicalAttributeCount += Object.keys(excludeSystemProperties(dictionaryData[node])).length;
      }
    });

    const indexdFileCount = (Number.isNaN(fileCount)) ? 0 : fileCount;
    const indexdTotalFileSize = (Number.isNaN(totalFileSize)) ? 0 : totalFileSize;
    aggClinicalAttrs += clinicalAttributeCount;
    aggFiles += indexdFileCount;
    aggFileSize += indexdTotalFileSize;
    if (subjectCount) {
      aggSubjectCount += subjectCount;
    }
    let html = `
    <div>
      <a href="${logoHrefLink}" target="_blank" class="common-card__logo-wrapper">
        <img src="logos/${abbv}.png" class="card-img-top common-card__logo" alt="${abbv} logo">
      </a>
    </div>
    <div class="card-body">
      <div class="card-text">
        <p class=common-card__title>${title}</p>
        ${subjectCount ? `<p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${numberWithCommas(subjectCount)}</span><span class="col-6 common-card__text--right"> Subjects</span></p>` : ''}
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${clinicalAttributeCount.toLocaleString()}</span><span class="col-6 common-card__text--right"> Attributes</span></p>
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${indexdFileCount.toLocaleString()}</span><span class="col-6 common-card__text--right"> Files</span></p>
        <p class="common-card__info"><span class="common-card__number col-6 common-card__text--left">${humanFileSize(indexdTotalFileSize)}</span><span class="col-6 common-card__text--right">Total Size </span></p>
      </div>
    </div>
  `;
    $("#" + abbv).append(html);
    displayTotals();
  });
}

function addAggCommons(commonAbbv, logoHrefLink, description, repos, title = "") {
  let html = `
  <div class="card common-card text-center">
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
  $("#meshes").append(html);
}

$(document).ready(async function () {
  // meshes
  addAggCommons("brh", "https://brh.data-commons.org/", "The Biomedical Research Hub enables search, discovery and the analysis of data from data commons from across NIH Institutes, Centers and projects. <br> </br> <br>", 8)
  addAggCommons("heal", "https://healdata.org/", "The HEAL Data Platform enables search and discovery across multiple data repositories supporting the Helping to End Addiction Long-term (HEAL) Initiative.<br> </br>", 21)
  addAggCommons("bdf", "https://imaging-hub.data-commons.org/Explorer", "The MIDRC BDF Imaging Hub (BIH) allows researchers to query and analyze data from independent data repositories or resources related to medical imaging.<br> </br>", 6)
  addAggCommons("murtha_cancer_center_logo", "https://mc2dp.data-commons.org/", "The vision of Murtha Cancer Center Data Platform (MC2DP) is to integrate federal scientific platforms with public-private innovators revealing the impact of service-related exposures to environmental contaminants and toxin hazards and developing prevention and early detection approaches and advanced treatments of cancers arising from these exposures.", 6)

  // commons
  for (let [abbreviation, data] of Object.entries(instances)) {
    addCommons(abbreviation, data["logo_link"], data["dictionary_endpoint"], data["subject_count"], data["file_count"], data["total_file_size"], data["title"]);
  }

  // partners
  addPartner("ACED", "");
  addPartner("agdr", "https://data.agdr.org.nz/", "Aotearoa Genomics Data Repository");
  addPartner("ARDaC", "https://portal.ardac.org/");
  addPartner("abc", "https://www.biocommons.org.au/");
  addPartner("CHORDS", "https://chordshealth.org/discovery");
  addPartner("pcdc", "https://portal.pedscommons.org/");
  addPartner("princess", "https://nl4c-dataportal.prinsesmaximacentrum.nl/");
  addPartner("tox", "https://toxdatacommons.com/");
  addPartner("ufcdc", "https://ufcdc-portal.org/")
});
