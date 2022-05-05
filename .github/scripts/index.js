module.exports = async ({ github, context }) => {
  // console.log({ github });
  // console.log({ ...context.payload.repository });

  console.log(process.env["webhook-url"]);

  const { name, owner } = context.payload.repository;

  // console.log({ name, owner });

  const latestCommit = context.payload.after;
  const previousCommit = context.payload.before;

  console.log(
    `Comparing latest commit ${latestCommit} with previous commit ${previousCommit} on ${context.ref}`
  );

  const compareCommits = await github.rest.repos.compareCommits({
    owner: owner.login,
    repo: name,
    base: previousCommit,
    head: latestCommit,
  });

  const { files } = compareCommits.data;
};
