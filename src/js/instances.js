/*
TODO comment
- test and see if hubs/meshes should be excluded (counts)
- how to add a new one - explain counts will be populated automatically - logo with same name as dict key
- python script should sort by name
- this comment may need to leave somewhere else so it's not overwritten - readme?
- number of files and total size don't use the same format for number dots
*/

const instances = {
    "anvil": {
        "logo_link": "https://gen3.theanvil.io",
        "file_stats_endpoint": "https://gen3.theanvil.io/index/_stats",
        "dictionary_endpoint": "https://gen3.theanvil.io/api/v0/submission/_dictionary/_all",
        "subject_stats_endpoint": "https://gen3.theanvil.io/api/search/datasets?nodes=subject",
        "title": "The AnVIL",
        "fileCount": 200398,
        "totalFileSize": 803961394349649,
        "subjectCount": 41933
    },
    "bloodpac": {
        "logo_link": "https://data.bloodpac.org",
        "file_stats_endpoint": "https://data.bloodpac.org/index/_stats",
        "dictionary_endpoint": "https://data.bloodpac.org/api/v0/submission/_dictionary/_all",
        "subject_stats_endpoint": "https://data.bloodpac.org/api/search/datasets?nodes=case",
        "fileCount": 35624,
        "totalFileSize": 34713564745000,
        "subjectCount": 4434
    },
    "canine": {
        "logo_link": "https://caninedc.org",
        "file_stats_endpoint": "https://caninedc.org/index/_stats",
        "dictionary_endpoint": "https://caninedc.org/api/v0/submission/_dictionary/_all",
        "fileCount": 3820,
        "totalFileSize": 1884253865578,
        "subjectCount": 1499
    },
    "covid19": {
        "logo_link": "https://chicagoland.pandemicresponsecommons.org",
        "file_stats_endpoint": "https://chicagoland.pandemicresponsecommons.org/index/_stats",
        "dictionary_endpoint": "https://chicagoland.pandemicresponsecommons.org/api/v0/submission/_dictionary/_all",
        "subject_stats_endpoint": "https://chicagoland.pandemicresponsecommons.org/api/search/datasets?nodes=subject",
        "fileCount": 285849,
        "totalFileSize": 117637133283369,
        "subjectCount": 320124
    },
    "crdc": {
        "logo_link": "https://nci-crdc.datacommons.io",
        "file_stats_endpoint": "https://nci-crdc.datacommons.io/index/_stats",
        "dictionary_endpoint": "https://nci-crdc.datacommons.io/api/v0/submission/_dictionary/_all",
        "subject_stats_endpoint": "https://api.gdc.cancer.gov/projects?facets=summary.case_count",
        "fileCount": 56400007,
        "totalFileSize": 13220857449660732,
        "subjectCount": 44637
    },
    "genomel": {
        "logo_link": "https://genomel.bionimbus.org",
        "file_stats_endpoint": "https://genomel.bionimbus.org/index/_stats",
        "dictionary_endpoint": "https://genomel.bionimbus.org/api/v0/submission/_dictionary/_all",
        "fileCount": 6555,
        "totalFileSize": 31600413892340,
        "subjectCount": 1399
    },
    "icgc": {
        "logo_link": "https://icgc.bionimbus.org/",
        "file_stats_endpoint": "https://icgc.bionimbus.org/index/_stats",
        "dictionary_endpoint": "https://icgc.bionimbus.org/api/v0/submission/_dictionary/_all",
        "subject_stats_endpoint": "https://icgc.bionimbus.org/api/search/datasets?nodes=subject",
        "title": "ICGC PCAWG & DREAM Challenge",
        "fileCount": 100247,
        "totalFileSize": 264415017110459,
        "subjectCount": 885
    },
    "jcoin": {
        "logo_link": "https://jcoin.datacommons.io/",
        "file_stats_endpoint": "https://jcoin.datacommons.io/index/_stats",
        "dictionary_endpoint": "https://jcoin.datacommons.io/api/v0/submission/_dictionary/_all",
        "fileCount": 480,
        "totalFileSize": 2369986245,
        "subjectCount": 22628
    },
    "kf": {
        "logo_link": "https://portal.kidsfirstdrc.org",
        "file_stats_endpoint": "https://data.kidsfirstdrc.org/index/_stats",
        "dictionary_endpoint": "https://data.kidsfirstdrc.org/api/v0/submission/_dictionary/_all",
        "subject_stats_endpoint": "https://kf-api-arranger-next.kf-strides.org/statistics",
        "fileCount": 1509796,
        "totalFileSize": 7711477711203490,
        "subjectCount": 28670
    },
    "midrc": {
        "logo_link": "https://midrc.org",
        "file_stats_endpoint": "https://data.midrc.org/index/_stats",
        "dictionary_endpoint": "https://data.midrc.org/api/v0/submission/_dictionary/_all",
        "subject_stats_endpoint": "https://data.midrc.org/api/search/datasets?nodes=case",
        "fileCount": 3745572,
        "totalFileSize": 14421992745321,
        "subjectCount": 73714
    },
    "nct": {
        "logo_link": "https://accessclinicaldata.niaid.nih.gov",
        "file_stats_endpoint": "https://accessclinicaldata.niaid.nih.gov/index/_stats",
        "dictionary_endpoint": "https://accessclinicaldata.niaid.nih.gov/api/v0/submission/_dictionary/_all",
        "fileCount": 15,
        "totalFileSize": 5383124570,
        "subjectCount": 2096
    },
    "g3dh": {
        "logo_link": "https://gen3.datacommons.io/",
        "file_stats_endpoint": "https://gen3.datacommons.io//index/_stats",
        "dictionary_endpoint": "https://gen3.datacommons.io/api/v0/submission/_dictionary/_all",
        "title": "Gen3 Data Hub",
        "fileCount": 2376,
        "totalFileSize": 14249287673715,
        "subjectCount": 1367
    },
    "bdc": {
        "logo_link": "https://gen3.biodatacatalyst.nhlbi.nih.gov",
        "file_stats_endpoint": "https://gen3.biodatacatalyst.nhlbi.nih.gov/index/_stats",
        "dictionary_endpoint": "https://gen3.biodatacatalyst.nhlbi.nih.gov/api/v0/submission/_dictionary/_all",
        "subject_stats_endpoint": "https://gen3.biodatacatalyst.nhlbi.nih.gov/api/search/datasets?nodes=subject",
        "fileCount": 843064,
        "totalFileSize": 4025958017631429,
        "subjectCount": 533656
    },
    "va": {
        "logo_link": "https://va.data-commons.org/",
        "file_stats_endpoint": "https://va.data-commons.org/index/_stats",
        "dictionary_endpoint": "https://va.data-commons.org/api/v0/submission/_dictionary/_all",
        "fileCount": 7765,
        "totalFileSize": 1268232970032,
        "subjectCount": 648242
    },
    "vpodc": {
        "logo_link": "https://vpodc.data-commons.org",
        "file_stats_endpoint": "https://vpodc.data-commons.org/index/_stats",
        "dictionary_endpoint": "https://vpodc.data-commons.org/api/v0/submission/_dictionary/_all",
        "fileCount": 352786,
        "totalFileSize": 2184859714735,
        "subjectCount": 163695
    },
    "edc": {
        "logo_link": "https://portal.occ-data.org",
        "file_stats_endpoint": "https://portal.occ-data.org/index/_stats",
        "dictionary_endpoint": "https://portal.occ-data.org/api/v0/submission/_dictionary/_all",
        "fileCount": 33441289,
        "totalFileSize": 99197838516274
    }
}
