const axios = require("axios");

const { Dog, Temper } = require("../db");

const weightAverage = (string) => {
  let result = string;
  //Si tiene una sola medida de peso envio directamente el dato
  if (result.length === 1 || result.length === 2) {
    let aux = Number(result);
    return aux;
  }

  let sum = 0;
  result = result?.replace(" - ", " ").split(" "); //2 - 8 // 2 8 // ["2","8"]

  for (let i = 0; i < result.length; i++) {
    let aux = Number(result[i]);
    sum += aux;
  }

  return Math.ceil(sum / 2);
};

const createDog = async (post) => {
  const { temperaments } = post;
  const newDog = await Dog.create(post);
  temperaments.map(async (temp) => {
    const find = await Temper.findAll({
      where: { name: temp },
    });

    newDog.addTemper(find);
  });

  return newDog;
};

const callToApi = async () => {
  let dogs = await axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((err) => console.log(err));

  dogs =
    dogs &&
    dogs.map((e) => {
      //Arreglo que tuve que hacer debido a que estas dos razas presentan problemas en esta propiedad
      let aux = "";
      if (e.name === "Smooth Fox Terrier") {
        aux = "6 - 8";
      } else if (e.name === "Olde English Bulldogge") {
        aux = "30 - 39";
      }
      return {
        id: e.id,
        name: e.name,
        height: e.height.metric,
        weight: aux ? aux : e.weight.metric,
        life_span: e.life_span,
        image: e.image.url,
        createInDB: false,
        temperament: e.temperament,
        weightAverage: weightAverage(aux ? aux : e.weight.metric), //2 - 3
      };
    });
  return dogs;
};

const bdDogs = async () => {
  let dataDb = await Dog.findAll({
    include: {
      model: Temper,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  let formatData = dataDb.map((e) => {
    let tempArr = [];

    e.tempers.map((e) => {
      tempArr.push(e.name);
    });
    // De esta forma evito los elementos repetidos
    const dataArr = new Set(tempArr);
    let result = [...dataArr];

    return {
      id: e.id,
      name: e.name,
      height: e.height,
      weight: e.weight,
      life_span: e.life_span,
      image: e.image,
      createInDB: e.createInDB,
      temperament: result.join(", "),
      weightAverage: weightAverage(e.weight),
    };
  });

  return formatData;
};

const allDogs = async () => {
  const dataApi = await callToApi();
  const dataDb = await bdDogs();
  return dataApi.concat(dataDb);
};

module.exports = { allDogs, createDog };
