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
} from "./../actions/Types";

const initialState = {
  dogs: [],
  dog: {},
  tempes: [],
  notFound: false,
};

const order = (arr, orden) => {
  if (orden === "Z-A") {
    return arr.sort(function (b, a) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  } else {
    return arr.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
};

const orderByWeight = (arr, orden) => {
  if (orden === "heavys") {
    return arr.sort(function (a, b) {
      return b.weightAverage - a.weightAverage;
    });
  } else {
    return arr.sort(function (a, b) {
      return a.weightAverage - b.weightAverage;
    });
  }
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
        notFound: false,
      };
    case GET_DOG:
      let find = state.dogs.find((e) => e.name === payload);

      return {
        ...state,
        dog: find,
      };
    case GET_TEMPS:
      return {
        ...state,
        tempes: payload,
      };
    case "FILTER_BY_ESPECIF_WEIGHT":
      let filterByWeight = state.dogs.filter(
        (e) => e.weightAverage > Number(payload)
      );
      return {
        ...state,
        dogs: filterByWeight,
      };
    case CREATED_DOG:
      return {
        ...state,
        dogs: [...state.dogs, payload],
      };
    case SEARCH_DOGS:
      const findDogs = state.dogs.filter((e) =>
        e.name.toLowerCase().includes(payload.toLowerCase())
      );
      if (findDogs.length === 0) {
        return {
          ...state,
          notFound: true,
        };
      }
      return {
        ...state,
        dogs: findDogs,
        notFound: false,
      };

    case FILTER_DOGS_BY_CREATION:
      let result = [];
      switch (payload) {
        case "API":
          result = state.dogs.filter((e) => !e.createInDB);
          break;
        case "dataBase":
          result = state.dogs.filter((e) => e.createInDB);
          break;
        default:
          result = state.dogs;
          break;
      }
      return {
        ...state,
        dogs: result,
      };
    case FILTER_DOGS_BY_LETTER:
      let result2 = [];

      payload === "Z-A"
        ? (result2 = order(state.dogs, payload))
        : (result2 = order(state.dogs, payload));

      return {
        ...state,
        dogs: result2,
      };

    case FILTER_DOGS_BY_TEMPER:
      let result3 = [];

      result3 = state.dogs.filter((e) => e.temperament?.includes(payload));
      if (result3.length === 0) {
        return {
          ...state,
          notFound: true,
        };
      }
      return {
        ...state,
        dogs: result3,
        notFound: false,
      };
    case FILTER_DOGS_BY_WEIGHT:
      let result4 = [];

      payload === "heavys"
        ? (result4 = orderByWeight(state.dogs, payload))
        : (result4 = orderByWeight(state.dogs, payload));
      return {
        ...state,
        dogs: result4,
      };
    case CLEAN_DOG:
      return {
        ...state,
        dog: payload,
      };

    default: {
      return { ...state };
    }
  }
};

export default reducer;
