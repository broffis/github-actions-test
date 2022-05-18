const simpleTimer = ({ context }) => {
  const {
    payload: { ref },
    workflow,
  } = context;
  console.log(`${workflow}-${ref}`);

  setTimeout(() => {
    console.log("Timer has run completely");
  }, 60000);
};

module.exports = simpleTimer;
