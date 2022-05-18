const simpleTimer = ({ github }) => {
  console.log(github);

  setTimeout(() => {
    console.log("Timer has run completely");
  }, 5000);
};

module.exports = simpleTimer;
