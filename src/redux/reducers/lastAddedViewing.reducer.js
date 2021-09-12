const userlastAddedViewingReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_LAST_ADDED_VIEWING':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userlastAddedViewingReducer;
  