#!/bin/sh

if [ true]
then
  curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/octocat/hello-world/statuses/SHA \
  -d '{"state":"success"}'
fi