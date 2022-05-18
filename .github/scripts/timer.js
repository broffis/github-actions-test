const simpleTimer = ({ github, context }) => {
  // console.log(github);
  const {
    payload: { ref },
    workflow,
  } = context;
  console.log(`${workflow}-${ref}`);

  setTimeout(() => {
    console.log("Timer has run completely");
  }, 10000);
};

module.exports = simpleTimer;
