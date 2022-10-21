import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    return axios.get("http://localhost:3001/dogs").then((response) => {
      dispatch({ type: "GET_DOGS", payload: response.data });
    });
  };
}

export function getDog(breed) {
  return async function (dispatch) {
    return axios.get(`http://localhost:3001/dogs/${breed}`).then((response) => {
      dispatch({ type: "GET_DOG", payload: response.data });
    });
  };
}

export function getTempes() {
  return async function (dispatch) {
    return axios.get("http://localhost:3001/temperaments").then((response) => {
      dispatch({ type: "GET_TEMPS", payload: response.data });
    });
  };
}
