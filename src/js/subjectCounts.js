/*
  We should switch to using the Peregrine /datasets API at some point,
  but as of now that requires making all projects in a commons publicly
  available and some commons will not approve that

  The counts below are hardcoded when the API is not publicly available or
  the metadata is not stored in Gen3 and not available through the Gen3 API.

  Do NOT include data hubs/meshes so subjects are not counted twice
*/


const subjectCounts = {
  "anvil": "https://gen3.theanvil.io/api/search/datasets?nodes=subject",

  "bloodpac": "https://data.bloodpac.org/api/search/datasets?nodes=case",

  // "canine": "https://caninedc.org/api/search/datasets?nodes=subject",
  "canine": 1499,

  "covid19": "https://chicagoland.pandemicresponsecommons.org/api/search/datasets?nodes=subject",

  // "crdc": https://gdc.cancer.gov/ // cases count
  "crdc": 44637,

  // https://genomel.bionimbus.org/ // cases count, must have access to see counts
  "genomel": 1399,

  "icgc": "https://icgc.bionimbus.org/api/search/datasets?nodes=subject",

  // "jcoin": "https://jcoin.datacommons.io/api/search/datasets?nodes=participant",
  "jcoin": 22628,

  // "kf": https://portal.kidsfirstdrc.org/explore/ // participants count
  "kf": 35521,

  "midrc": "https://data.midrc.org/api/search/datasets?nodes=case",

  // TODO: https://ctds-planx.atlassian.net/browse/PXP-11306
  "nct": 2096,

  // "g3dh": https://gen3.datacommons.io/ // subjects count
  "g3dh": 1367,

  "bdc": "https://gen3.biodatacatalyst.nhlbi.nih.gov/api/search/datasets?nodes=subject",

  // https://www.ohdsi.org/data-standardization/ // not available publicly, must have access
  "va": 648242,

  //
  "vpodc": 163695,
};
