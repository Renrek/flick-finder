const userlastAddedViewingReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_LAST_ADDED_VIEWING':
        return action.payload;
      case 'UNSET_LAST_ADDED_VIEWING':
        return {};
      default:
        return state;
    }
  };
  
  export default userlastAddedViewingReducer;
  