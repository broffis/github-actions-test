module.exports = async ({ github, context }) => {
  // console.log({ github });
  // console.log({ context });

  const {
    name,
    owner: { login },
  } = context.payload.repository;

  const latestCommit = context.payload.after;
  const previousCommit = context.payload.before;

  console.log(
    `Comparing latest commit ${latestCommit} with previous commit ${previousCommit} on ${context.ref}`
  );

  const compareCommits = await github.octokit.rest.repos.compareCommits({
    owner,
    repo: name,
    base: previousCommit,
    head: latestCommit,
  });

  console.log({ compareCommits });
};
