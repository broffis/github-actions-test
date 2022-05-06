const checkForChanges = async ({ github, context }) => {
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

  let hasPackageLockChanges = false;

  files.forEach((file) => {
    if (file.filename.includes("package-lock.json"))
      hasPackageLockChanges = true;
  });

  return hasPackageLockChanges;
};

const run = async ({ github, context, core }) => {
  console.log({ core });

  const shouldNotifySlack = await checkForChanges({ github, context });

  console.log(
    "should notify slack: ",
    shouldNotifySlack,
    typeof shouldNotifySlack
  );

  core.setOutput("should-notify-slack", shouldNotifySlack);
};

module.exports = run;
