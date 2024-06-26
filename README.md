# stats.gen3.org
The stats.gen3.org website provides statistics for Gen3 Data Commons and Gen3 Framework Services. Statistics include:
* Name/Graphic ID of Commons
* Number of Subjects (if applicable)
* Number of Attributes
* Total number of files
* Total size of data objects

## Adding a Commons to the Stats page
Data Commons are listed in [the instances.js file](https://github.com/uc-cdis/stats.gen3.org/blob/master/src/js/instances.js). A new one can be added by choosing a new abbreviation and adding a new block to the file. Make sure to also include a logo [here](https://github.com/uc-cdis/stats.gen3.org/blob/master/src/logos) - the logo file name should be `<Commons abbreviation>.png`.
- Speficy a `title` if the Data Commons name is not on the logo, so it can be displayed under the logo.
- Specify the `logo_link`: clicking on the Commons' logo will redirect the user to that link.
- Specify the `dictionary_endpoint`.
- Specify `file_stats_endpoint` and/or `subject_stats_endpoint` if the Commons uses indexd and/or sheepdog respectively.
- `file_count` and `total_file_size` do not need to be specified if `file_stats_endpoint` is specified. The file counts will be updated automatically. If `file_stats_endpoint` is not specified, the counts can be specified manually and will not be updated automatically.
- `subject_count` does not need to be specified if `subject_stats_endpoint` is specified. The subject count will be updated automatically. If `subject_stats_endpoint` is not specified, the count can be specified manually and will not be updated automatically.


Data Hubs / Data Meshes and Partners can be added at the bottom of [this file](https://github.com/uc-cdis/stats.gen3.org/blob/master/src/js/commons.js) by following the same format as other entries.

> Do not include Data Hubs / Data Meshes in the `instances.js` file where Data Commons are listed: the stats would be inaccurate since files and subjects are already counted in the individual Data Commons.

## Subject Counts
Subject counts are fetched automatically by using the Peregrine `/datasets` endpoint. However, that requires making all project stats in a Commons publicly available, which is not always acceptable. Some Commons also do not use Sheepdog for their data dictionary, so the subject count cannot be fetched this way. In those cases, the subject count is manually updated in [the instances.js file](https://github.com/uc-cdis/stats.gen3.org/blob/master/src/js/instances.js).

## IndexD Counts
File counts are fetched automatically by using the Indexd `/_stats` endpoint. When the request is slow or times out, the counts can be manually updated in [the instances.js file](https://github.com/uc-cdis/stats.gen3.org/blob/master/src/js/instances.js). Slow `/_stats` requests should not be a problem anymore after Data Commons update to the version of indexd that supports the `stats` database table.

## Logos
Manually added at https://github.com/uc-cdis/stats.gen3.org/tree/master/src/logos.

## Style
Defined in css at https://github.com/uc-cdis/stats.gen3.org/blob/master/src/css/main.css.

## Potential improvements
- The `dictionary_endpoint` field should be optional since some Data Commons do not use the Sheepdog data dictionary. In those cases the attributes should not be counted, or should be counted a different way.
- There should be an easy way to add/update Data Hubs / Data Meshes and Partners, like `instances.js` for Data Commons.
- See if counting Partner stats in the total stats would be desirable.
