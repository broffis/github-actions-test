module.exports = async ({ github, context }) => {
  // console.log({ github });
  // console.log({ context });

  const latestCommit = context.payload.after;
  const previousCommit = context.payload.before;

  console.log(
    `Comparing latest commit ${latestCommit} with previous commit ${previousCommit} on ${context.ref}`
  );
};
