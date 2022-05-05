import * as core from "@actions/core";
import * as github from "@actions/github";
import { Context } from "@actions/github/lib/context";
import { GitHub } from "@actions/github/lib/utils";

const DEBUG = false; // set this to true for extra logging

export const info = (stuff) => core.info(stuff);
const warning = (stuff) => core.warning(stuff);
const error = (stuff) => {
  if (typeof stuff !== "string" && stuff.stack) {
    core.error(stuff.stack);
  } else {
    core.error(stuff);
  }
};
const debug = (stuff) => DEBUG && core.info(`DEBUG: ${stuff}`);

let context;
const client = github.getOctokit(core.getInput("token"));

module.exports = async () => {
  const latestCommit = context.payload.after;
  const previousCommit = context.payload.before;
  info(
    `Comparing latest commit ${latestCommit} with previous commit ${previousCommit} on ${context.ref}`
  );

  const compareCommits = await client.rest.repos.compareCommitsWithBasehead({
    basehead: `${previousCommit}...${latestCommit}`,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  const files = compareCommits.data.files;
  info(
    `Files different between commits: ${files
      .map((file) => file.filename)
      .join(", ")}`
  );
};
