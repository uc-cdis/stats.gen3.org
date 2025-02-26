const instances = {
    "bloodpac": {
        "logo_link": "https://data.bloodpac.org",
        "dictionary_endpoint": "https://data.bloodpac.org/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://data.bloodpac.org/index/_stats",
        "subject_stats_endpoint": "https://data.bloodpac.org/api/search/datasets?nodes=case",
        "file_count": 36622,
        "total_file_size": 40987480983099,
        "subject_count": 4441
    },
    "canine": {
        "logo_link": "https://caninedc.org",
        "dictionary_endpoint": "https://caninedc.org/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://caninedc.org/index/_stats",
        "file_count": 3820,
        "total_file_size": 1884253865578,
        "subject_count": 1499
    },
    "covid19": {
        "logo_link": "https://chicagoland.pandemicresponsecommons.org",
        "dictionary_endpoint": "https://chicagoland.pandemicresponsecommons.org/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://chicagoland.pandemicresponsecommons.org/index/_stats",
        "subject_stats_endpoint": "https://chicagoland.pandemicresponsecommons.org/api/search/datasets?nodes=subject",
        "file_count": 285849,
        "total_file_size": 117637133283369,
        "subject_count": 320124
    },
    "crdc": {
        "logo_link": "https://nci-crdc.datacommons.io",
        "dictionary_endpoint": "https://nci-crdc.datacommons.io/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://nci-crdc.datacommons.io/index/_stats",
        "subject_stats_endpoint": "https://api.gdc.cancer.gov/projects?facets=summary.case_count",
        "file_count": 57467708,
        "total_file_size": 13503655185867196,
        "subject_count": 44736
    },
    "icgc": {
        "title": "ICGC PCAWG & DREAM Challenge",
        "logo_link": "https://icgc.bionimbus.org/",
        "dictionary_endpoint": "https://icgc.bionimbus.org/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://icgc.bionimbus.org/index/_stats",
        "subject_stats_endpoint": "https://icgc.bionimbus.org/api/search/datasets?nodes=subject",
        "file_count": 100247,
        "total_file_size": 264415017110459,
        "subject_count": 885
    },
    "jcoin": {
        "logo_link": "https://jcoin.datacommons.io/",
        "dictionary_endpoint": "https://jcoin.datacommons.io/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://jcoin.datacommons.io/index/_stats",
        "file_count": 481,
        "total_file_size": 2372104510,
        "subject_count": 22628
    },
    "kf": {
        "logo_link": "https://portal.kidsfirstdrc.org",
        "dictionary_endpoint": "https://data.kidsfirstdrc.org/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://data.kidsfirstdrc.org/index/_stats",
        "subject_stats_endpoint": "https://kf-api-arranger-next.kf-strides.org/statistics",
        "file_count": 2680151,
        "total_file_size": 8121102642299051,
        "subject_count": 28670
    },
    "midrc": {
        "logo_link": "https://data.midrc.org",
        "dictionary_endpoint": "https://data.midrc.org/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://data.midrc.org/index/_stats",
        "subject_stats_endpoint": "https://data.midrc.org/api/search/datasets?nodes=case",
        "file_count": 589273,
        "total_file_size": 11675835373491,
        "subject_count": 79194
    },
    "nct": {
        "logo_link": "https://accessclinicaldata.niaid.nih.gov",
        "dictionary_endpoint": "https://accessclinicaldata.niaid.nih.gov/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://accessclinicaldata.niaid.nih.gov/index/_stats",
        "file_count": 19,
        "total_file_size": 18710375614,
        "subject_count": 2096
    },
    "g3dh": {
        "title": "Gen3 Data Hub",
        "logo_link": "https://gen3.datacommons.io/",
        "dictionary_endpoint": "https://gen3.datacommons.io/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://gen3.datacommons.io//index/_stats",
        "file_count": 2376,
        "total_file_size": 14249287673715,
        "subject_count": 1367
    },
    "bdc": {
        "logo_link": "https://gen3.biodatacatalyst.nhlbi.nih.gov",
        "dictionary_endpoint": "https://gen3.biodatacatalyst.nhlbi.nih.gov/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://gen3.biodatacatalyst.nhlbi.nih.gov/index/_stats",
        "subject_stats_endpoint": "https://gen3.biodatacatalyst.nhlbi.nih.gov/api/search/datasets?nodes=subject",
        "file_count": 1554166,
        "total_file_size": 4298341969891918,
        "subject_count": 1005710
    },
    "va": {
        "logo_link": "https://va.data-commons.org/",
        "dictionary_endpoint": "https://va.data-commons.org/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://va.data-commons.org/index/_stats",
        "file_count": 17514,
        "total_file_size": 3014750147095,
        "subject_count": 648242
    },
    "vpodc": {
        "logo_link": "https://vpodc.data-commons.org",
        "dictionary_endpoint": "https://vpodc.data-commons.org/api/v0/submission/_dictionary/_all",
        "file_stats_endpoint": "https://vpodc.data-commons.org/index/_stats",
        "file_count": 352786,
        "total_file_size": 2184859714735,
        "subject_count": 163695
    }
}