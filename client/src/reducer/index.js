const initialState = {
  dogs: [],
  dog: {},
  tempes: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: payload,
      };
    case "GET_DOG":
      return {
        ...state,
        dog: payload,
      };
    case "GET_TEMPS":
      return {
        ...state,
        tempes: payload,
      };
    default: {
      return { ...state };
    }
  }
};

export default reducer;
