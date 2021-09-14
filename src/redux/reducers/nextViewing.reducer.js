const nextViewingReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_NEXT_VIEWING':
        return action.payload;
      case 'UNSET_NEXT_VIEWING':
        return {};
      default:
        return state;
    }
  };
  
  export default nextViewingReducer;
  