const simpleTimer = ({ github, context }) => {
  // console.log(github);
  console.log(context);

  setTimeout(() => {
    console.log("Timer has run completely");
  }, 5000);
};

module.exports = simpleTimer;
