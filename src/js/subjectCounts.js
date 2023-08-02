/*
  We should switch to using the Peregrine /datasets API at some point,
  but as of now that requires making all projects in a commons publicly
  available and some commons will not approve that
*/


const subjectCounts = {
  "acct": "1,516",
  "anvil": "41,933",
  "bloodpac": "4,839",
  "canine": "1,499",
  "covid19": "53,728",
  "crdc": "83,709",
  "edc": null,
  "genomel": "1,390",
  "ibdgc": "107,418",
  "kf": "21,833",
  "midrc": null,
  "niaid": "48,268",
  "pcdc": "20,446",
  "stage": "438,874",
  "vpodc": "163,695",
  "nct": "2,096",
  "oadc": "1,366",
  "jcoin": "237",
  "va": "658,278",
  "icgc": "885",
  "brh": "558,214",
  "heal": null
};

async function getMIDRCCountsFromAPI() {
  const response = await fetch(
    "https://data.midrc.org/api/search/datasets?nodes=case"
  );
  const json = await response.json();
  const counts = Object.values(json)
    .map((dataset) => dataset.case)
    .reduce((a, b) => a + b, 0);
  return counts.toString();
}

(async () => {
  const midrcCounts = await getMIDRCCountsFromAPI();
  subjectCounts.midrc = midrcCounts; // Update the 'midrc' property with fetched data
  console.log(subjectCounts); // This will log the updated subjectCounts object
})();
