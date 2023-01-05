# stats.gen3.org
Stats.gen3.org website provides statistics for Gen3 Data Commons and Gen3 Framework Services. Statistics include:
* Name/Graphic ID of Commons
* Number of Subjects (if applicable)
* Number of Attributes
* Total number of files
* Total size of data objects

## Adding Stats for a Commons
https://github.com/uc-cdis/stats.gen3.org/blob/master/src/js/commons.js

## Subject Counts
Currently, subject counts are entered manually by PMs and other parties at https://github.com/uc-cdis/stats.gen3.org/blob/master/src/js/subjectCounts.js. We should switch to using the Peregrine /datasets API at some point, but as of now that requires making all projects in a commons publicly available and some commons will not approve that

## IndexD Counts
In some envs the `/index/_stats` endpoint of IndexD could be slow, causing issues for loading data into this page. In that case, PMs and other parties can optionally enter the `fileCount` and `totalFileSize` values into https://github.com/uc-cdis/stats.gen3.org/blob/master/src/js/indexdCounts.js. In this way, the page will fetch these data from the local cache file instead of hitting the actual IndexD endpoint.

## Logos
Manually added at https://github.com/uc-cdis/stats.gen3.org/tree/master/src/logos

## Style
Defined in css at https://github.com/uc-cdis/stats.gen3.org/blob/master/src/css/main.css
Also, there is html written at https://github.com/uc-cdis/stats.gen3.org/blob/master/src/index.html. The person writing this readme doesn't know enough to tell you what that page does.
