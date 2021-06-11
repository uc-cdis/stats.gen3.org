/*
  Local cache of IndexD stats data for some envs
  To avoid the issue of slowness
  Values put in here will take precedence and prevent the main page from call the IndexD endpoint of that env
*/


const indexdCounts = {
  "crdc": {
    "fileCount": 5226838,
    "totalFileSize": 3714098755141590
  },
};
