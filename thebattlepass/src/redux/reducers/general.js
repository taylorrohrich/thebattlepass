const initialState = {
  width: window.innerWidth
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_WIDTH": {
      const { width } = action;
      return {
        ...state,
        width
      };
    }
    default:
      return state;
  }
};
