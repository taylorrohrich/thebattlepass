export default {
  updateWidth: width => {
    return {
      type: "UPDATE_WIDTH",
      width
    };
  },
  toggleSideMenuVisible: () => {
    return {
      type: "TOGGLE_SIDE_MENU_VISIBLE"
    };
  }
};
