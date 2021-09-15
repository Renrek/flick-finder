const viewingListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_VIEWING_LIST':
        return action.payload;
      default:
        return state;
    }
  };

export default viewingListReducer;
  