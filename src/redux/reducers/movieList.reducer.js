const movieListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MOVIE_LIST':
        return action.payload;
      default:
        return state;
    }
  };

export default movieListReducer;
  