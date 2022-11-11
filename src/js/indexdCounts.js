/*
  Local cache of IndexD stats data for some envs
  To avoid the issue of slowness
  Values put in here will take precedence and prevent the main page from call the IndexD endpoint of that env
*/


const indexdCounts = {
  "crdc": {
    "fileCount": 52141509,
    "totalFileSize": 4903548011062603
  },
  "edc": {
    "fileCount": 33441289,
    "totalFileSize": 99197838516274
  },
};

const cacheIndexdCounts = {
  "https://nci-crdc.datacommons.io" : indexdCounts["crdc"]
};
