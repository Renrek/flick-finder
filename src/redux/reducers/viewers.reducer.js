const viewerListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_VIEWER_LIST':
        return action.payload;
      case 'UNSET_VIEWER_LIST':
        return [];
      default:
        return state;
    }
  };

export default viewerListReducer;
  