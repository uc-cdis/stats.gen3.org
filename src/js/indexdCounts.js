/*
  Local cache of IndexD stats data for some envs
  To avoid the issue of slowness
  Values put in here will take precedence and prevent the main page from call the IndexD endpoint of that env
*/


const indexdCountsCache = {
  "edc": { fileCount: 33441289, totalFileSize: 99197838516274 },
  "nct": { fileCount: 10, totalFileSize: 3883267 },
  "g3dh": { fileCount: 1605, totalFileSize: 14249286198498 },
  "jcoin": { fileCount: 464, totalFileSize: 1540606213 },
  "va": { fileCount: 8575, totalFileSize: 4399326262650 },
  "bloodpac": { fileCount: 35569, totalFileSize: 34663094742719 },
  "genomel": { fileCount: 6555, totalFileSize: 31600413892340 },
  "canine": { fileCount: 3820, totalFileSize: 1884253865578 },
  "anvil": { fileCount: 200397, totalFileSize: 803961394349649 },
  "icgc": { fileCount: 100272, totalFileSize: 264413720651857 },
  "covid19": { fileCount: 285849, totalFileSize: 117637133283369 },
  "bdc": { fileCount: 749297, totalFileSize: 4001256752492255 },
  "vpodc": { fileCount: 352786, totalFileSize: 2184859714735 },
  "kf": { fileCount: 1201691, totalFileSize: 7332321647105624 },
  "midrc": { fileCount: 3722994, totalFileSize: 13928280076013 },
  "crdc": {fileCount: 52874987, totalFileSize: 9809725145803930}
};
