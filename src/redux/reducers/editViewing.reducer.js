const editViewingReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_VIEWING_EDIT':
        return action.payload;
      case 'UNSET_VIEWING_EDIT':
        return {};
      default:
        return state;
    }
  };
  
  export default editViewingReducer;
  