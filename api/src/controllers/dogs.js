const axios = require("axios");

const { Dog } = require("../db");

const createDog = async (post, id) => {
  const newDog = await Dog.create(post);
  return newDog;
};

const callToApi = async () => {
  const dogs = await axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((err) => console.log(err));

  dogs &&
    dogs.forEach((e) => {
      e.weight = e.weight.metric;
      e.height = e.height.metric;
      e.image = e.image.url;
      e.createInDB = false;
    });
  return dogs;
};

const allDogs = async () => {
  const dataApi = await callToApi();
  const dataDb = await Dog.findAll();

  return dataApi.concat(dataDb);
};

const someDog = async (breed) => {
  const callToApi = await axios
    .get(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return callToApi;
};

module.exports = { allDogs, someDog, createDog };
