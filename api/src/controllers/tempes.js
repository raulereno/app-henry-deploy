const axios = require("axios");
const { Temper } = require("./../db");

const createTempes = async (tempes) => {
  tempes.forEach((e) => {
    Temper.create({ name: e });
  });
};

const getTempes = async () => {
  const callToApi = await axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err.message);
    });

  let tempes = [];

  callToApi.map((e) => {
    let aux = e.temperament?.split(",").splice(0, 1, " ");
    tempes = tempes.concat(aux);
  });
  tempes = [...new Set(tempes)].filter((e) => e !== undefined).sort();

  return createTempes(tempes);
};

module.exports = getTempes;
