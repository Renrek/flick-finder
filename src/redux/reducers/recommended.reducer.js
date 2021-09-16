const recommendedReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_RECOMMENDED':
        return action.payload;
      case 'UNSET_RECOMMENDED':
        return {};
      default:
        return state;
    }
  };
  
  export default recommendedReducer;
  