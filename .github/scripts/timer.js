const simpleTimer = ({ github }) => {
  console.log(github);

  setTimeout(() => {
    console.log("Timer has run completely");
  }, 500);
};

module.exports = simpleTimer;
