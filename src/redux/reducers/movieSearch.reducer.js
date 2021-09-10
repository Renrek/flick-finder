const movieSearchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MOVIE_SEARCH':
        return action.payload;
      default:
        return state;
    }
  };

export default movieSearchReducer;
  