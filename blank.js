context = {
  payload: {
    repository: {
      name: "test",
      owner: {
        login: "joe",
      },
    },
  },
};

let labelName;
const approvedLabel = "qa-approved";

// We can get labels off of pull_request regardless of triggering event
// if (context.payload.action === "labeled") {
//   labelName = context.payload.label.name;
// } else if (context.payload.action === "unlabeled") {
//   // TODO: Figure out how to get labels from pr
// } else {
//   const prLabels = context.payload.pull_request.labels;
// }

const prLabels = context.payload.pull_request.labels.map((label) => label.name);
const state = prLabels.includes(approvedLabel) ? "success" : "pending";

const { sha } = context.payload.pull_request.head;
const {
  name,
  owner: { login },
} = context.payload.repository;

console.log({
  owner: login,
  repo: name,
  sha,
  state,
});
const result = await github.rest.repos.createCommitStatus({
  owner: login,
  repo: name,
  sha: sha,
  state: state,
});

console.log({ result });
