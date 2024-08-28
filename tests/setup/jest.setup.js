require("../../src/server");

module.exports = async () => {
  try {
    console.log("Ich werde vor den eigentlichen Test cases ausgeführt");
  } catch (e) {
    console.error("MY DB Issue", e);
  }
};
