const anticipationOptionsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ANTICIPATION_OPTIONS':
        return action.payload;
      default:
        return state;
    }
  };

export default anticipationOptionsReducer;
  