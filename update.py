import json
import requests

try:
    inst_file = open("./src/js/instances.json")
    instances = json.load(inst_file)
except:
    print("ERROR: instances.json not found.")
    exit(1)
try:
    subj_file = open("./src/js/subjectCounts.json", "r+")
    subject_counts = json.load(subj_file)
except:
    print("ERROR: subjectCounts.json not found.")
    exit(1)
try:
    indx_file = open("./src/js/indexdCounts.json", "r+")
    indexd_counts = json.load(indx_file)
except:
    print("ERROR: indexdCounts.json not found.")
    exit(1)


def handle_counts(resp, instance):
    subj_count = 0
    subjects = resp.json()
    if instance == "kf":
        return subjects["samples"]
    elif instance == "crdc":
        return int(subjects["data"]["aggregations"]["summary.case_count"]["stats"]["sum"])
    else:
        for key, val in subjects.items():
            for k, v in val.items():
                subj_count += v
        return subj_count


for instance, vals in instances.items():
    resp = requests.get(vals["file_stats_endpoint"])
    if resp.status_code == 200:
        indexd_counts[instance] = resp.json()
    if "subject_stats_endpoint" in vals:
        resp = requests.get(vals["subject_stats_endpoint"])
        if resp.status_code == 200:
            subject_counts[instance] = handle_counts(resp, instance)

indx_file.seek(0)
json.dump(indexd_counts, indx_file)
indx_file.truncate()
indx_file.close()
subj_file.seek(0)
json.dump(subject_counts, subj_file)
subj_file.truncate()
subj_file.close()
inst_file.close()
