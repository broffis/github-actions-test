const checkForChanges = async ({ github, context, core }) => {
  const { name, owner } = context.payload.repository;

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

  console.log(files);

  const hasPackageLockChanges = files.some(
    (file) => file.filename === "package-lock.json"
  );

  core.setOutput("should-notify-slack", hasPackageLockChanges);
};

module.exports = checkForChanges;
