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
};

const cacheIndexdCounts = {
  "https://nci-crdc.datacommons.io" : indexdCounts["crdc"]
};

function addAggregatedCommons(abbv, logoHrefLink, oidcEndpoint, dictionaryEndpoint, title=""){
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
        createHTMLByIndexdData(abbv, title, logoHrefLink, result, dictionaryEndpoint);
      });
  });
}
