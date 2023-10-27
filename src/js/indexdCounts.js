/*
  Local cache of IndexD stats data for some envs
  To avoid the issue of slowness
  Values put in here will take precedence and prevent the main page from call the IndexD endpoint of that env
*/


const indexdCountsCache = {
  "edc": { fileCount: 33441289, totalFileSize: 99197838516274 },
  "nct": { fileCount: 10, totalFileSize: 3883267 },
  "oadc": { fileCount: 1605, totalFileSize: 13773567905048 },
  "jcoin": { fileCount: 464, totalFileSize: 1540606213 },
  "va": { fileCount: 7640, totalFileSize: 4101940731150 },
  "bloodpac": { fileCount: 35569, totalFileSize: 34663094742719 },
  "genomel": { fileCount: 6555, totalFileSize: 31600413892340 },
  "canine": { fileCount: 3820, totalFileSize: 1884253865578 },
  "ibdgc": { fileCount: 17580, totalFileSize: 14297453198841 },
  "anvil": { fileCount: 200397, totalFileSize: 803961394349649 },
  "icgc": { fileCount: 100272, totalFileSize: 264413720651857 },
  "covid19": { fileCount: 285849, totalFileSize: 117637133283369 },
  "bdc": { fileCount: 749297, totalFileSize: 4000909355592939 },
  "vpodc": { fileCount: 352786, totalFileSize: 2184859714735 },
  "kf": { fileCount: 1198736, totalFileSize: 7261751379232888 },
  "midrc": { fileCount: 3709533, totalFileSize: 13599327337305 },
  "crdc": {fileCount: 52873264, totalFileSize: 9849559206241160}
};

const cacheIndexdCounts = {
  "https://nci-crdc.datacommons.io": indexdCountsCache["crdc"]
};
