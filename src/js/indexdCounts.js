/*
  Local cache of IndexD stats data for some envs
  To avoid the issue of slowness
  Values put in here will take precedence and prevent the main page from call the IndexD endpoint of that env

  Do NOT include data hubs/meshes so files are not counted twice
*/


const indexdCountsCache = {
  "edc": { fileCount: 33441289, totalFileSize: 99197838516274 },
  "nct": { fileCount: 14, totalFileSize: 5340484368 },
  "g3dh": { fileCount: 2376, totalFileSize: 14249287673715 },
  "jcoin": { fileCount: 477, totalFileSize: 1664804769 },
  "va": { fileCount: 4445, totalFileSize: 746554301906 },
  "bloodpac": { fileCount: 35611, totalFileSize: 34664955732839 },
  "genomel": { fileCount: 6555, totalFileSize: 31600413892340 },
  "canine": { fileCount: 3820, totalFileSize: 1884253865578 },
  "anvil": { fileCount: 200398, totalFileSize: 803961394349649 },
  "icgc": { fileCount: 100247, totalFileSize: 264415017110459 },
  "covid19": { fileCount: 285849, totalFileSize: 117637133283369 },
  "bdc": { fileCount: 774560, totalFileSize: 4018437188907752 },
  "vpodc": { fileCount: 352786, totalFileSize: 2184859714735 },
  "kf": { fileCount: 1460942, totalFileSize: 7553825037514911 },
  "midrc": { fileCount: 3739993, totalFileSize: 14386986834925 },
  "crdc": {fileCount: 55863065, totalFileSize: 12034276288619353}
};
