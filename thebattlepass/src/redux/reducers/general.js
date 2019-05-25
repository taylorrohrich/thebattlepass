const initialState = {
  width: window.innerWidth,
  sideMenuVisible: false
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
    case "TOGGLE_SIDE_MENU_VISIBLE": {
      const { sideMenuVisible } = state;
      return {
        ...state,
        sideMenuVisible: !sideMenuVisible
      };
    }
    default:
      return state;
  }
};
