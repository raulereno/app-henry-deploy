import axios from "axios";
import {
  GET_DOGS,
  GET_DOG,
  GET_TEMPS,
  CREATED_DOG,
  SEARCH_DOGS,
  FILTER_DOGS_BY_CREATION,
  FILTER_DOGS_BY_LETTER,
  FILTER_DOGS_BY_TEMPER,
  FILTER_DOGS_BY_WEIGHT,
  CLEAN_DOG,
} from "./Types";

export function getDogs() {
  return async function (dispatch) {
    try {
      setTimeout(async () => {
        return axios.get("http://localhost:3001/dogs").then((response) => {
          dispatch({ type: GET_DOGS, payload: response.data });
        });
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getDog(breed) {
  return async function (dispatch) {
    setTimeout(() => {
      return dispatch({ type: GET_DOG, payload: breed });
    }, 2000);
  };
}

export function getTempes() {
  return async function (dispatch) {
    try {
      return axios
        .get("http://localhost:3001/temperaments")
        .then((response) => {
          dispatch({ type: GET_TEMPS, payload: response.data });
        });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function createDog(data) {
  return async function (dispatch) {
    try {
      return axios
        .post(`http://localhost:3001/dogs`, data)
        .then((response) => {})
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error.messagey);
    }
  };
}

export function searchDogs(options) {
  return async function (dispatch) {
    return dispatch({ type: SEARCH_DOGS, payload: options });
  };
}

export function filterDogsByCreation(option) {
  return async function (dispatch) {
    return dispatch({ type: FILTER_DOGS_BY_CREATION, payload: option });
  };
}
export function filterDogsByLetter(option) {
  return async function (dispatch) {
    return dispatch({ type: FILTER_DOGS_BY_LETTER, payload: option });
  };
}
export function filterDogsByTemps(option) {
  //dispatch(filterDogsByTemps(value))
  return async function (dispatch) {
    return dispatch({ type: FILTER_DOGS_BY_TEMPER, payload: option });
  };
}
export function filterDogsByWeight(option) {
  return async function (dispatch) {
    return dispatch({ type: FILTER_DOGS_BY_WEIGHT, payload: option });
  };
}

export function cleanDog() {
  return async function (dispatch) {
    return dispatch({ type: CLEAN_DOG, payload: {} });
  };
}
