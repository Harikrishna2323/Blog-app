const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAIL":
      return {
        user: null,
        error: action.payload,
        isFetching: false,
      };

    case "LOGOUT_SUCCESS":
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "UPDATE_FAIL":
      return {
        user: state.user,
        error: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default Reducer;
