/*
  We should switch to using the Peregrine /datasets API at some point,
  but as of now that requires making all projects in a commons publicly
  available and some commons will not approve that
*/


const subjectCounts = {
  // "anvil": https://gen3.theanvil.io/api/search/datasets?nodes=subject
  "anvil": "41,933",
  // "bloodpac": https://data.bloodpac.org/api/search/datasets?nodes=case
  "bloodpac": "4,434",
  // "canine": https://caninedc.org/api/search/datasets?nodes=subject
  "canine": "1,499",
  // "covid19": https://chicagoland.pandemicresponsecommons.org/api/search/datasets?nodes=subject
  "covid19": "320,124",
  // "crdc": https://gdc.cancer.gov/ // cases count
  "crdc": "44,637",
  "edc": null,
  // https://genomel.bionimbus.org/ // cases count, must have access to see counts
  "genomel": "1,399",
  // "icgc": https://icgc.bionimbus.org/api/search/datasets?nodes=subject
  "icgc": "885",
  // "jcoin": https://jcoin.datacommons.io/api/search/datasets?nodes=participant
  "jcoin": "22,628",
  // "kf": https://portal.kidsfirstdrc.org/explore/ // participants count
  "kf": "35,521",
  // "midrc": https://data.midrc.org/api/search/datasets?nodes=case
  "midrc": "73,061",
  // TODO: https://ctds-planx.atlassian.net/browse/PXP-11306
  "nct": "2,096",
  // "g3dh": https://gen3.datacommons.io/ // subjects count
  "g3dh": "1,367",
  // "bdc": https://gen3.biodatacatalyst.nhlbi.nih.gov/api/search/datasets?nodes=subject
  "bdc": "512,554",
  // https://www.ohdsi.org/data-standardization/ // not available publicly, must have access
  "va": "648,242",
  // 
  "vpodc": "163,695",

  // "pcdc": https://portal.pedscommons.org/ // subjects count
  "pcdc": "43,285",
  "heal": null
};
