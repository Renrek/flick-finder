const viewerListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_VIEWER_LIST':
        return action.payload;
      default:
        return state;
    }
  };

export default viewerListReducer;
  