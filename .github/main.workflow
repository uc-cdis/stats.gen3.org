workflow "Push" {
  on = "push"
  resolves = ["Push to S3"]
}

action "master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Push to S3" {
  uses = "actions/aws/cli@master"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  needs = "master branch only"
  runs = "sh -l -c"
  args = ["cd src && echo \"I am in $PWD\" && aws s3 cp --recursive . s3://stats.gen3.org/"]
}
